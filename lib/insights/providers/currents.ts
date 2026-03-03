import type { CityRuntimeConfig } from "@/data/city-runtime-config"
import type { Locale } from "@/i18n/locales"
import { providerCadenceSeconds } from "@/lib/insights/cadence"
import type {
  CityNewsData,
  CityNewsHeadline,
  ProviderResult,
  RuntimeErrorCode,
} from "@/lib/insights/types"
import { fetchWithTimeout, isRecord, normalizeErrorCode } from "./shared"

const CURRENTS_SOURCE_URL = "https://currentsapi.services/en/docs/"
const CURRENTS_ENDPOINT = "https://api.currentsapi.services/v1/search"

function getNewsHeadlineLimit(): number {
  const parsed = Number.parseInt(process.env.NEWS_HEADLINE_LIMIT ?? "5", 10)
  return Number.isNaN(parsed) || parsed < 1 ? 5 : parsed
}

function getNewsFallbackLanguage(): string {
  const configured = process.env.NEWS_FALLBACK_LANG?.trim().toLowerCase()
  return configured || "en"
}

function resolveLocaleLanguage(locale: Locale): string {
  return locale === "ko" ? "ko" : "en"
}

function normalizePublishedAt(value: unknown): string {
  if (typeof value !== "string") {
    return new Date().toISOString()
  }

  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime())
    ? new Date().toISOString()
    : parsed.toISOString()
}

function normalizeHeadline(
  item: unknown,
  fallbackId: string
): CityNewsHeadline | null {
  if (!isRecord(item)) {
    return null
  }

  const title = typeof item.title === "string" ? item.title.trim() : ""
  const url = typeof item.url === "string" ? item.url.trim() : ""

  if (!title || !url) {
    return null
  }

  return {
    id: typeof item.id === "string" ? item.id : fallbackId,
    title,
    url,
    source: typeof item.author === "string" ? item.author : "Unknown source",
    publishedAt: normalizePublishedAt(item.published),
    language: typeof item.language === "string" ? item.language : "unknown",
  }
}

function dedupeAndLimit(
  items: CityNewsHeadline[],
  limit: number
): CityNewsHeadline[] {
  const seen = new Set<string>()
  const deduped: CityNewsHeadline[] = []

  for (const item of items) {
    if (seen.has(item.url)) {
      continue
    }

    seen.add(item.url)
    deduped.push(item)

    if (deduped.length === limit) {
      return deduped
    }
  }

  return deduped
}

export function parseCurrentsPayload(
  payload: unknown,
  limit: number
): CityNewsHeadline[] | null {
  if (!isRecord(payload) || !Array.isArray(payload.news)) {
    return null
  }

  const normalized = payload.news
    .map((item, index) => normalizeHeadline(item, `fallback-${index}`))
    .filter((item): item is CityNewsHeadline => item !== null)

  return dedupeAndLimit(normalized, limit)
}

function currentsFailure(
  fetchedAt: string,
  errorCode: RuntimeErrorCode
): ProviderResult<CityNewsHeadline[]> {
  return {
    ok: false,
    fetchedAt,
    sourceUrl: CURRENTS_SOURCE_URL,
    errorCode,
  }
}

function currentsSuccess(
  headlines: CityNewsHeadline[],
  fetchedAt: string
): ProviderResult<CityNewsHeadline[]> {
  return {
    ok: true,
    payload: headlines,
    fetchedAt,
    sourceUrl: CURRENTS_SOURCE_URL,
  }
}

function buildSearchUrl(
  config: CityRuntimeConfig,
  language: string,
  limit: number
): URL {
  const url = new URL(CURRENTS_ENDPOINT)
  url.searchParams.set("keywords", config.newsKeywords.join(","))
  url.searchParams.set("language", language)
  url.searchParams.set("limit", String(limit))
  url.searchParams.set("page_size", String(limit))
  return url
}

async function toJsonResponse(
  response: Response,
  fetchedAt: string
): Promise<ProviderResult<unknown>> {
  if (!response.ok) {
    return currentsFailure(fetchedAt, normalizeErrorCode(response.status, null))
  }

  try {
    return {
      ok: true,
      payload: await response.json(),
      fetchedAt,
      sourceUrl: CURRENTS_SOURCE_URL,
    }
  } catch {
    return currentsFailure(fetchedAt, "schema")
  }
}

async function requestCityNews(
  config: CityRuntimeConfig,
  language: string,
  limit: number
): Promise<ProviderResult<CityNewsHeadline[]>> {
  const fetchedAt = new Date().toISOString()
  const apiKey = process.env.CURRENTS_API_KEY

  if (!apiKey) {
    return currentsFailure(fetchedAt, "missing_key")
  }

  const payload = await fetchCityNewsPayload(
    config,
    language,
    limit,
    apiKey,
    fetchedAt
  )

  if (!payload.ok) {
    return payload
  }

  const parsed = parseCurrentsPayload(payload.payload, limit)
  return parsed
    ? currentsSuccess(parsed, fetchedAt)
    : currentsFailure(fetchedAt, "schema")
}

async function fetchCityNewsPayload(
  config: CityRuntimeConfig,
  language: string,
  limit: number,
  apiKey: string,
  fetchedAt: string
): Promise<ProviderResult<unknown>> {
  try {
    const response = await fetchWithTimeout(
      buildSearchUrl(config, language, limit),
      {
        method: "GET",
        headers: { Authorization: apiKey },
        next: { revalidate: providerCadenceSeconds.news },
      }
    )

    return toJsonResponse(response, fetchedAt)
  } catch (error) {
    return currentsFailure(fetchedAt, normalizeErrorCode(null, error))
  }
}

function shouldUsePrimary(
  headlines: CityNewsHeadline[],
  requestedLanguage: string
): boolean {
  return headlines.length > 0 || requestedLanguage === getNewsFallbackLanguage()
}

function cityNewsSuccess(
  result: ProviderResult<CityNewsHeadline[]>
): ProviderResult<Omit<CityNewsData, "meta">> {
  if (!result.ok) {
    return result
  }

  return {
    ok: true,
    payload: {
      headlines: result.payload,
      updatedAt: result.fetchedAt,
    },
    fetchedAt: result.fetchedAt,
    sourceUrl: result.sourceUrl,
  }
}

export async function fetchCityNews(
  config: CityRuntimeConfig,
  locale: Locale
): Promise<ProviderResult<Omit<CityNewsData, "meta">>> {
  const limit = getNewsHeadlineLimit()
  const requestedLanguage = resolveLocaleLanguage(locale)
  const primary = await requestCityNews(config, requestedLanguage, limit)

  if (!primary.ok) {
    return primary
  }

  if (shouldUsePrimary(primary.payload, requestedLanguage)) {
    return cityNewsSuccess(primary)
  }

  const fallback = await requestCityNews(
    config,
    getNewsFallbackLanguage(),
    limit
  )
  return cityNewsSuccess(fallback)
}
