import { getCityRuntimeConfig } from "@/data/city-runtime-config"
import {
  clearNewsSourceCacheForTests,
  fetchCityNews,
  rankCityNewsHeadlines,
} from "@/lib/insights/providers/news-sources"

type RankedHeadlineInput = Parameters<typeof rankCityNewsHeadlines>[0][number]

const sbsAustraliaFeedUrl = "https://www.sbs.com.au/news/topic/australia/feed"

function getConfigOrThrow(slug: string) {
  const config = getCityRuntimeConfig(slug)
  if (!config) {
    throw new Error(`Missing city runtime config for ${slug}`)
  }

  return config
}

function resetTestState(): void {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  clearNewsSourceCacheForTests()
}

function headline(
  overrides: Partial<RankedHeadlineInput> & {
    title: string
    url: string
  }
): RankedHeadlineInput {
  return {
    title: overrides.title,
    url: overrides.url,
    source: overrides.source ?? "Example Source",
    publishedAt: overrides.publishedAt ?? "2026-03-03T10:00:00.000Z",
    language: overrides.language ?? "en",
    provider: overrides.provider ?? "feed",
    sourceTier: overrides.sourceTier ?? 1,
  }
}

function successfulRssResponse(etag: string): Response {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <rss><channel><title>SBS Australia</title>
      <item>
        <title>Melbourne train disruption advisory</title>
        <link>https://example.com/live?utm_source=foo</link>
        <pubDate>Tue, 03 Mar 2026 10:00:00 GMT</pubDate>
      </item>
    </channel></rss>`,
    {
      status: 200,
      headers: {
        ETag: etag,
      },
    }
  )
}

function upstreamFailureResponse(): Response {
  return new Response("upstream", { status: 503 })
}

function createStaticResponseFetchMock(responseMap: Map<string, Response>) {
  return vi.fn((input: URL | RequestInfo): Promise<Response> => {
    const requestUrl = String(input)
    const response = responseMap.get(requestUrl) ?? upstreamFailureResponse()
    return Promise.resolve(response)
  })
}

function createSequencedResponseFetchMock(
  responseQueues: Map<string, Response[]>,
  seenEtagHeaders: string[]
) {
  return vi.fn(
    (input: URL | RequestInfo, init?: RequestInit): Promise<Response> => {
      const requestUrl = String(input)
      const headers = new Headers(init?.headers)
      seenEtagHeaders.push(headers.get("If-None-Match") ?? "")

      const queue = responseQueues.get(requestUrl)
      const response = queue?.shift() ?? upstreamFailureResponse()
      return Promise.resolve(response)
    }
  )
}

describe("news-sources ranking", () => {
  it("keeps a direct Melbourne transport story and ranks it highest", () => {
    const melbourne = getConfigOrThrow("melbourne")
    const ranked = rankCityNewsHeadlines(
      [
        headline({
          title: "Melbourne tram disruptions after severe storm warning",
          url: "https://example.com/melbourne-1",
        }),
        headline({
          title: "Unrelated celebrity awards show highlights",
          url: "https://example.com/noise-1",
        }),
      ],
      melbourne,
      5
    )

    expect(ranked).toHaveLength(1)
    expect(ranked[0].title).toContain("Melbourne")
    expect(ranked[0].relevanceSignals).toContain("city_alias")
    expect(ranked[0].relevanceSignals).toContain("impact_keyword")
  })

  it("includes Australia-wide policy spillover for Melbourne", () => {
    const melbourne = getConfigOrThrow("melbourne")
    const ranked = rankCityNewsHeadlines(
      [
        headline({
          title:
            "Australia updates travel advisory policy for incoming visitors",
          url: "https://example.com/melbourne-national",
        }),
      ],
      melbourne,
      5
    )

    expect(ranked).toHaveLength(1)
    expect(ranked[0].relevanceSignals).toContain("country_alias")
    expect(ranked[0].relevanceSignals).toContain("impact_keyword")
  })

  it("drops ambiguous non-Australia Melbourne stories", () => {
    const melbourne = getConfigOrThrow("melbourne")
    const ranked = rankCityNewsHeadlines(
      [
        headline({
          title: "Melbourne Florida issues bus disruption alert",
          url: "https://example.com/melbourne-florida",
        }),
      ],
      melbourne,
      5
    )

    expect(ranked).toHaveLength(0)
  })

  it("includes Seoul direct and national-geopolitical spillover stories", () => {
    const seoul = getConfigOrThrow("seoul")
    const ranked = rankCityNewsHeadlines(
      [
        headline({
          title: "Seoul subway strike causes major transport disruption",
          url: "https://example.com/seoul-direct",
        }),
        headline({
          title:
            "South Korea issues travel advisory update for inbound visitors",
          url: "https://example.com/seoul-national",
        }),
        headline({
          title:
            "North Korea missile launch prompts South Korea security advisory",
          url: "https://example.com/seoul-geopolitical",
        }),
        headline({
          title: "Global entertainment trend of the week",
          url: "https://example.com/seoul-noise",
        }),
      ],
      seoul,
      5
    )

    expect(ranked).toHaveLength(3)
    expect(ranked[0].url).toBe("https://example.com/seoul-direct")
    expect(
      ranked
        .map((item) => item.url)
        .slice(1)
        .toSorted()
    ).toStrictEqual(
      [
        "https://example.com/seoul-geopolitical",
        "https://example.com/seoul-national",
      ].toSorted()
    )
  })
})

describe("news-sources fetch pipeline", () => {
  it("returns fresh headlines when one source succeeds and others fail", async () => {
    resetTestState()

    vi.stubGlobal(
      "fetch",
      createStaticResponseFetchMock(
        new Map([[sbsAustraliaFeedUrl, successfulRssResponse('"v1"')]])
      )
    )

    const result = await fetchCityNews(getConfigOrThrow("melbourne"), "en")
    const successResult = result as Extract<typeof result, { ok: true }>

    expect(result.ok).toBeTruthy()
    expect(successResult.payload.headlines).toHaveLength(1)
    expect(successResult.payload.headlines[0].title).toContain("Melbourne")
    expect(successResult.payload.headlines[0].url).toBe(
      "https://example.com/live"
    )

    resetTestState()
  })

  it("sends If-None-Match on subsequent fetches when ETag is cached", async () => {
    resetTestState()

    const seenHeaders: string[] = []
    const responseQueues = new Map<string, Response[]>([
      [
        sbsAustraliaFeedUrl,
        [
          successfulRssResponse('"etag-australia-v1"'),
          new Response(null, { status: 304 }),
        ],
      ],
    ])

    vi.stubGlobal(
      "fetch",
      createSequencedResponseFetchMock(responseQueues, seenHeaders)
    )

    const config = getConfigOrThrow("melbourne")
    await fetchCityNews(config, "en")
    await fetchCityNews(config, "en")

    expect(seenHeaders).toContain('"etag-australia-v1"')

    resetTestState()
  })
})
