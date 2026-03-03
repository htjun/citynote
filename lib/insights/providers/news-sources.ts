import type { CityRuntimeConfig } from "@/data/city-runtime-config"
import { getNewsSourcesForCity } from "@/data/news/sources"
import type { NewsSourceDefinition } from "@/data/news/sources"
import type { Locale } from "@/i18n/locales"
import type {
  CityNewsData,
  CityNewsHeadline,
  ProviderResult,
  RuntimeErrorCode,
} from "@/lib/insights/types"
import { fetchWithTimeout, normalizeErrorCode } from "./shared"

const DEFAULT_NEWS_SOURCE_URL = "https://www.sbs.com.au/news/feeds/"
const HEADLINE_SCORE_THRESHOLD = 35

interface SourceHeadlineInput {
  title: string
  url: string
  source: string
  publishedAt: string
  language: string
  provider: "feed" | "html"
  sourceTier: 1 | 2 | 3
}

interface FetchCacheEntry {
  etag?: string
  lastModified?: string
  items: SourceHeadlineInput[]
}

interface HeadlineScore {
  score: number
  signals: string[]
}

interface RankedHeadlineCandidate {
  dedupeKey: string
  headline: CityNewsHeadline
}

const sourceCache = new Map<string, FetchCacheEntry>()
const trackingParamsToDrop = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
  "mc_cid",
  "mc_eid",
])

function getNewsHeadlineLimit(): number {
  const parsed = Number.parseInt(process.env.NEWS_HEADLINE_LIMIT ?? "5", 10)
  return Number.isNaN(parsed) || parsed < 1 ? 5 : parsed
}

function escapeRegex(value: string): string {
  return value.replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function collapseWhitespace(value: string): string {
  return value.replaceAll(/\s+/g, " ").trim()
}

function decodeEntities(value: string): string {
  const withoutCdata = value.replaceAll(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")

  return withoutCdata
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&#x2F;", "/")
    .replaceAll("&#x27;", "'")
}

function stripTags(value: string): string {
  return collapseWhitespace(decodeEntities(value).replaceAll(/<[^>]+>/g, " "))
}

function extractTagValue(payload: string, tagName: string): string | null {
  const pattern = new RegExp(
    `<${escapeRegex(tagName)}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapeRegex(tagName)}>`,
    "i"
  )
  const match = payload.match(pattern)
  if (!match?.[1]) {
    return null
  }

  const parsed = stripTags(match[1])
  return parsed || null
}

function normalizePublishedAt(value: string | null, fallback: string): string {
  if (!value) {
    return fallback
  }

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? fallback : parsed.toISOString()
}

function toAbsoluteUrl(candidate: string, baseUrl: string): string | null {
  const trimmed = candidate.trim()
  if (!trimmed) {
    return null
  }

  try {
    return new URL(trimmed, baseUrl).toString()
  } catch {
    return null
  }
}

function removeTrackingParams(url: URL): void {
  for (const param of url.searchParams.keys()) {
    if (trackingParamsToDrop.has(param.toLowerCase())) {
      url.searchParams.delete(param)
    }
  }
}

function canonicalizeUrl(url: string): string {
  try {
    const parsed = new URL(url)
    parsed.hash = ""
    removeTrackingParams(parsed)

    if (parsed.pathname !== "/" && parsed.pathname.endsWith("/")) {
      parsed.pathname = parsed.pathname.slice(0, -1)
    }

    return parsed.toString()
  } catch {
    return url.trim()
  }
}

function normalizeTitleForDedup(value: string): string {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, " ")
    .trim()
}

function sourceProvider(kind: NewsSourceDefinition["kind"]): "feed" | "html" {
  return kind === "html" ? "html" : "feed"
}

function parseRssPayload(
  payload: string,
  source: NewsSourceDefinition,
  fetchedAt: string
): SourceHeadlineInput[] {
  const itemMatches = payload.match(/<item\b[\s\S]*?<\/item>/gi) ?? []
  const channel = payload.match(/<channel\b[\s\S]*?<\/channel>/i)?.[0]
  const channelTitle =
    (channel ? extractTagValue(channel, "title") : null) ?? source.name

  return itemMatches
    .map((item) => {
      const title = extractTagValue(item, "title")
      const link = extractTagValue(item, "link")
      const url = link ? toAbsoluteUrl(link, source.url) : null
      if (!title || !url) {
        return null
      }

      return {
        title,
        url,
        source: channelTitle,
        publishedAt: normalizePublishedAt(
          extractTagValue(item, "pubDate") ??
            extractTagValue(item, "dc:date") ??
            extractTagValue(item, "published") ??
            extractTagValue(item, "updated"),
          fetchedAt
        ),
        language: source.language,
        provider: sourceProvider(source.kind),
        sourceTier: source.sourceTier,
      } satisfies SourceHeadlineInput
    })
    .filter((item): item is SourceHeadlineInput => item !== null)
}

function parseAtomEntryLink(entry: string): string | null {
  const alternateMatch = entry.match(
    /<link\b[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["'][^>]*\/?>/i
  )

  if (alternateMatch?.[1]) {
    return alternateMatch[1]
  }

  const plainMatch = entry.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*\/?>/i)
  return plainMatch?.[1] ?? null
}

function parseAtomPayload(
  payload: string,
  source: NewsSourceDefinition,
  fetchedAt: string
): SourceHeadlineInput[] {
  const entryMatches = payload.match(/<entry\b[\s\S]*?<\/entry>/gi) ?? []
  const feedTitle = extractTagValue(payload, "title") ?? source.name

  return entryMatches
    .map((entry) => {
      const title = extractTagValue(entry, "title")
      const link = parseAtomEntryLink(entry)
      const url = link ? toAbsoluteUrl(link, source.url) : null
      if (!title || !url) {
        return null
      }

      return {
        title,
        url,
        source: feedTitle,
        publishedAt: normalizePublishedAt(
          extractTagValue(entry, "updated") ??
            extractTagValue(entry, "published"),
          fetchedAt
        ),
        language: source.language,
        provider: sourceProvider(source.kind),
        sourceTier: source.sourceTier,
      } satisfies SourceHeadlineInput
    })
    .filter((item): item is SourceHeadlineInput => item !== null)
}

function parseHtmlLinks(
  payload: string,
  baseUrl: string
): { url: string; title: string }[] {
  const links: { url: string; title: string }[] = []
  const linkRegex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi

  for (const match of payload.matchAll(linkRegex)) {
    const href = match[1] ?? ""
    const label = stripTags(match[2] ?? "")
    const absoluteUrl = toAbsoluteUrl(href, baseUrl)

    if (!absoluteUrl || !label) {
      continue
    }

    links.push({
      url: absoluteUrl,
      title: label,
    })
  }

  return links
}

function mapHtmlLinksToHeadlines(
  links: { url: string; title: string }[],
  source: NewsSourceDefinition,
  fetchedAt: string
): SourceHeadlineInput[] {
  return links.map((link) => ({
    title: link.title,
    url: link.url,
    source: source.name,
    publishedAt: fetchedAt,
    language: source.language,
    provider: sourceProvider(source.kind),
    sourceTier: source.sourceTier,
  }))
}

function parsePtvDisruptions(
  payload: string,
  source: NewsSourceDefinition,
  fetchedAt: string
): SourceHeadlineInput[] {
  const transportKeywords = [
    "disruption",
    "disruptions",
    "line",
    "train",
    "tram",
    "bus",
    "service",
  ]

  const links = parseHtmlLinks(payload, source.url)
    .filter((link) => {
      const text = link.title.toLowerCase()
      const href = link.url.toLowerCase()
      return (
        transportKeywords.some((term) => text.includes(term)) ||
        href.includes("/disruptions/")
      )
    })
    .slice(0, 30)

  return mapHtmlLinksToHeadlines(links, source, fetchedAt)
}

function parseSeoulPressReleases(
  payload: string,
  source: NewsSourceDefinition,
  fetchedAt: string
): SourceHeadlineInput[] {
  const links = parseHtmlLinks(payload, source.url)
    .filter((link) => {
      const url = link.url.toLowerCase()
      return (
        url.includes("english.seoul.go.kr") &&
        !url.includes("/category/") &&
        link.title.split(" ").length >= 3
      )
    })
    .slice(0, 30)

  return mapHtmlLinksToHeadlines(links, source, fetchedAt)
}

function parseKmaWarnings(
  payload: string,
  source: NewsSourceDefinition,
  fetchedAt: string
): SourceHeadlineInput[] {
  const keywords = ["warning", "advisory", "typhoon", "heavy rain", "wind"]

  const links = parseHtmlLinks(payload, source.url)
    .filter((link) => {
      const text = link.title.toLowerCase()
      const url = link.url.toLowerCase()
      return (
        keywords.some((term) => text.includes(term)) || url.includes("warning")
      )
    })
    .slice(0, 30)

  return mapHtmlLinksToHeadlines(links, source, fetchedAt)
}

function parseSourcePayload(
  source: NewsSourceDefinition,
  payload: string,
  fetchedAt: string
): SourceHeadlineInput[] {
  if (source.parser === "atom") {
    return parseAtomPayload(payload, source, fetchedAt)
  }

  if (source.parser === "ptvDisruptions") {
    return parsePtvDisruptions(payload, source, fetchedAt)
  }

  if (source.parser === "seoulPressReleases") {
    return parseSeoulPressReleases(payload, source, fetchedAt)
  }

  if (source.parser === "kmaWarnings") {
    return parseKmaWarnings(payload, source, fetchedAt)
  }

  return parseRssPayload(payload, source, fetchedAt)
}

function sourceFailure(
  fetchedAt: string,
  sourceUrl: string,
  errorCode: RuntimeErrorCode
): ProviderResult<SourceHeadlineInput[]> {
  return {
    ok: false,
    fetchedAt,
    sourceUrl,
    errorCode,
  }
}

function sourceSuccess(
  fetchedAt: string,
  sourceUrl: string,
  payload: SourceHeadlineInput[]
): ProviderResult<SourceHeadlineInput[]> {
  return {
    ok: true,
    fetchedAt,
    sourceUrl,
    payload,
  }
}

function buildConditionalHeaders(cached?: FetchCacheEntry): Headers {
  const headers = new Headers()

  if (cached?.etag) {
    headers.set("If-None-Match", cached.etag)
  }

  if (cached?.lastModified) {
    headers.set("If-Modified-Since", cached.lastModified)
  }

  return headers
}

function cacheSourceItems(
  source: NewsSourceDefinition,
  response: Response,
  cached: FetchCacheEntry | undefined,
  items: SourceHeadlineInput[]
): void {
  sourceCache.set(source.id, {
    etag: response.headers.get("etag") ?? cached?.etag,
    lastModified: response.headers.get("last-modified") ?? cached?.lastModified,
    items,
  })
}

function handleSourceResponse(
  source: NewsSourceDefinition,
  response: Response,
  fetchedAt: string,
  cached: FetchCacheEntry | undefined,
  payload: string
): ProviderResult<SourceHeadlineInput[]> {
  if (response.status === 304) {
    return sourceSuccess(fetchedAt, source.url, cached?.items ?? [])
  }

  if (!response.ok) {
    return sourceFailure(
      fetchedAt,
      source.url,
      normalizeErrorCode(response.status, null)
    )
  }

  const parsed = parseSourcePayload(source, payload, fetchedAt)
  cacheSourceItems(source, response, cached, parsed)
  return sourceSuccess(fetchedAt, source.url, parsed)
}

async function fetchSourceHeadlines(
  source: NewsSourceDefinition
): Promise<ProviderResult<SourceHeadlineInput[]>> {
  const fetchedAt = new Date().toISOString()
  const cached = sourceCache.get(source.id)

  try {
    const response = await fetchWithTimeout(source.url, {
      method: "GET",
      headers: buildConditionalHeaders(cached),
      next: { revalidate: source.pollIntervalSeconds },
    })

    const payload = response.status === 304 ? "" : await response.text()
    return handleSourceResponse(source, response, fetchedAt, cached, payload)
  } catch (error) {
    return sourceFailure(fetchedAt, source.url, normalizeErrorCode(null, error))
  }
}

function hasAnyMatch(text: string, candidates: string[]): boolean {
  return candidates.some((candidate) => text.includes(candidate.toLowerCase()))
}

function sourceTierScore(sourceTier: 1 | 2 | 3): number {
  if (sourceTier === 1) {
    return 10
  }

  if (sourceTier === 2) {
    return 5
  }

  return 0
}

function collectMatchSignals(
  text: string,
  config: CityRuntimeConfig
): string[] {
  const signals: string[] = []

  if (hasAnyMatch(text, config.newsProfile.cityAliases)) {
    signals.push("city_alias")
  }

  if (hasAnyMatch(text, config.newsProfile.countryAliases)) {
    signals.push("country_alias")
  }

  if (hasAnyMatch(text, config.newsProfile.impactKeywords)) {
    signals.push("impact_keyword")
  }

  return signals
}

function signalWeight(signal: string): number {
  if (signal === "city_alias") {
    return 40
  }

  if (signal === "country_alias") {
    return 20
  }

  return signal === "impact_keyword" ? 25 : 0
}

function signalScore(signals: string[]): number {
  let score = 0

  for (const signal of signals) {
    score += signalWeight(signal)
  }

  return score
}

function scoreHeadline(
  headline: SourceHeadlineInput,
  config: CityRuntimeConfig
): HeadlineScore | null {
  const text = `${headline.title} ${headline.source}`.toLowerCase()

  if (hasAnyMatch(text, config.newsProfile.excludedAmbiguities)) {
    return null
  }

  const signals = collectMatchSignals(text, config)
  const tierSignal = `source_tier_${headline.sourceTier}`
  const score = signalScore(signals) + sourceTierScore(headline.sourceTier)

  if (score < HEADLINE_SCORE_THRESHOLD) {
    return null
  }

  return {
    score,
    signals: [...signals, tierSignal],
  }
}

function createStableHeadlineId(value: string): string {
  const modulo = 1_000_000_007
  let checksum = 0

  for (const character of value) {
    const codePoint = character.codePointAt(0) ?? 0
    checksum = (checksum * 31 + codePoint) % modulo
  }

  return checksum.toString(36)
}

function toRankedHeadlineCandidate(
  headline: SourceHeadlineInput,
  config: CityRuntimeConfig
): RankedHeadlineCandidate | null {
  const score = scoreHeadline(headline, config)
  if (!score) {
    return null
  }

  const canonicalUrl = canonicalizeUrl(headline.url)
  const normalizedTitle = normalizeTitleForDedup(headline.title)
  const dedupeKey = `${canonicalUrl}|${normalizedTitle}`

  return {
    dedupeKey,
    headline: {
      id: createStableHeadlineId(dedupeKey),
      title: collapseWhitespace(headline.title),
      url: canonicalUrl,
      source: headline.source,
      publishedAt: normalizePublishedAt(
        headline.publishedAt,
        new Date().toISOString()
      ),
      language: headline.language,
      provider: headline.provider,
      relevanceScore: score.score,
      relevanceSignals: score.signals,
      sourceTier: headline.sourceTier,
    },
  }
}

function dedupeRankedCandidates(
  candidates: RankedHeadlineCandidate[]
): CityNewsHeadline[] {
  const seen = new Set<string>()

  return candidates
    .filter((candidate) => {
      if (seen.has(candidate.dedupeKey)) {
        return false
      }

      seen.add(candidate.dedupeKey)
      return true
    })
    .map((candidate) => candidate.headline)
}

function sortRankedHeadlines(
  headlines: CityNewsHeadline[]
): CityNewsHeadline[] {
  return headlines.toSorted((left, right) => {
    if (right.relevanceScore !== left.relevanceScore) {
      return right.relevanceScore - left.relevanceScore
    }

    return right.publishedAt.localeCompare(left.publishedAt)
  })
}

export function rankCityNewsHeadlines(
  headlines: SourceHeadlineInput[],
  config: CityRuntimeConfig,
  limit: number
): CityNewsHeadline[] {
  const candidates = headlines
    .map((headline) => toRankedHeadlineCandidate(headline, config))
    .filter(
      (candidate): candidate is RankedHeadlineCandidate => candidate !== null
    )

  const deduped = dedupeRankedCandidates(candidates)
  return sortRankedHeadlines(deduped).slice(0, limit)
}

function collectErrorCode(
  results: ProviderResult<SourceHeadlineInput[]>[]
): RuntimeErrorCode {
  const firstFailure = results.find(
    (
      result
    ): result is Extract<
      ProviderResult<SourceHeadlineInput[]>,
      { ok: false }
    > => !result.ok
  )
  return firstFailure?.errorCode ?? "upstream"
}

function collectSourceUrl(
  results: ProviderResult<SourceHeadlineInput[]>[]
): string {
  const firstSuccess = results.find(
    (
      result
    ): result is Extract<ProviderResult<SourceHeadlineInput[]>, { ok: true }> =>
      result.ok
  )
  if (firstSuccess) {
    return firstSuccess.sourceUrl
  }

  const firstFailure = results.find(
    (
      result
    ): result is Extract<
      ProviderResult<SourceHeadlineInput[]>,
      { ok: false }
    > => !result.ok
  )
  return firstFailure?.sourceUrl ?? DEFAULT_NEWS_SOURCE_URL
}

function noSourceFailure(
  fetchedAt: string
): ProviderResult<Omit<CityNewsData, "meta">> {
  return {
    ok: false,
    fetchedAt,
    sourceUrl: DEFAULT_NEWS_SOURCE_URL,
    errorCode: "upstream",
  }
}

function pipelineFailure(
  fetchedAt: string,
  results: ProviderResult<SourceHeadlineInput[]>[]
): ProviderResult<Omit<CityNewsData, "meta">> {
  return {
    ok: false,
    fetchedAt,
    sourceUrl: collectSourceUrl(results),
    errorCode: collectErrorCode(results),
  }
}

function pipelineSuccess(
  fetchedAt: string,
  config: CityRuntimeConfig,
  results: ProviderResult<SourceHeadlineInput[]>[],
  successful: Extract<ProviderResult<SourceHeadlineInput[]>, { ok: true }>[],
  limit: number
): ProviderResult<Omit<CityNewsData, "meta">> {
  const merged = successful.flatMap((result) => result.payload)

  return {
    ok: true,
    payload: {
      headlines: rankCityNewsHeadlines(merged, config, limit),
      updatedAt: fetchedAt,
    },
    fetchedAt,
    sourceUrl: collectSourceUrl(results),
  }
}

function successfulResults(
  results: ProviderResult<SourceHeadlineInput[]>[]
): Extract<ProviderResult<SourceHeadlineInput[]>, { ok: true }>[] {
  return results.filter(
    (
      result
    ): result is Extract<ProviderResult<SourceHeadlineInput[]>, { ok: true }> =>
      result.ok
  )
}

export async function fetchCityNews(
  config: CityRuntimeConfig,
  _locale: Locale
): Promise<ProviderResult<Omit<CityNewsData, "meta">>> {
  const fetchedAt = new Date().toISOString()
  const sources = getNewsSourcesForCity(config.slug)
  if (sources.length === 0) {
    return noSourceFailure(fetchedAt)
  }

  const results = await Promise.all(
    sources.map((source) => fetchSourceHeadlines(source))
  )

  const successful = successfulResults(results)
  if (successful.length === 0) {
    return pipelineFailure(fetchedAt, results)
  }

  return pipelineSuccess(
    fetchedAt,
    config,
    results,
    successful,
    getNewsHeadlineLimit()
  )
}

export function clearNewsSourceCacheForTests(): void {
  sourceCache.clear()
}
