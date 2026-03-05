import { seoul } from "@/data/cities/en/seoul"
import type { CityRuntimeInsights } from "@/lib/insights/types"
import {
  getRuntimeFreshnessMap,
  getVisibleSectionCandidates,
} from "@/lib/ia/section-registry"

function runtimeInsights(
  overrides?: Partial<CityRuntimeInsights>
): CityRuntimeInsights {
  return {
    weatherNow: {
      condition: "Sunny",
      temperatureC: 25.1,
      feelsLikeC: 26.3,
      uvIndex: 7.1,
      aqiIndex: 21,
      updatedAt: "2026-03-05T10:00:00.000Z",
      meta: {
        provider: "weatherapi",
        fetchedAt: "2026-03-05T10:00:00.000Z",
        freshness: "fresh",
        sourceUrl: "https://www.weatherapi.com/",
      },
    },
    currencyWatch: {
      localCurrency: "KRW",
      quotes: [{ base: "USD", target: "KRW", rate: 1350.12 }],
      asOfDate: "2026-03-05",
      updatedAt: "2026-03-05T10:00:00.000Z",
      meta: {
        provider: "frankfurter",
        fetchedAt: "2026-03-05T10:00:00.000Z",
        freshness: "fresh",
        sourceUrl: "https://frankfurter.dev/",
      },
    },
    cityNews: {
      headlines: [],
      updatedAt: "2026-03-05T10:00:00.000Z",
      meta: {
        provider: "news-sources",
        fetchedAt: "2026-03-05T10:00:00.000Z",
        freshness: "fallback",
        sourceUrl: "https://www.sbs.com.au/news/feeds/",
      },
    },
    ...overrides,
  }
}

describe("section registry", () => {
  it("excludes optional sections when their data is missing", () => {
    const cityWithoutOptional = {
      ...seoul,
      livePulse: undefined,
      ruleTraps: undefined,
      neighborhoodFit: undefined,
      accessibility: undefined,
    }

    const ids = getVisibleSectionCandidates({
      city: cityWithoutOptional,
      runtimeInsights: runtimeInsights(),
    }).map((section) => section.id)

    expect(ids).not.toContain("live-pulse")
    expect(ids).not.toContain("rule-traps")
    expect(ids).not.toContain("neighborhood-fit")
    expect(ids).not.toContain("accessibility")
    expect(ids).toContain("climate")
  })

  it("maps runtime freshness for ranking input", () => {
    const freshness = getRuntimeFreshnessMap({
      city: seoul,
      runtimeInsights: runtimeInsights(),
    })

    expect(freshness["weather-now"]).toBe("fresh")
    expect(freshness["currency-watch"]).toBe("fresh")
    expect(freshness["city-news"]).toBe("fallback")
    expect(freshness["live-pulse"]).toBeTruthy()
  })

  it("applies completeness penalty when news headlines are empty", () => {
    const newsCandidate = getVisibleSectionCandidates({
      city: seoul,
      runtimeInsights: runtimeInsights({
        cityNews: {
          ...runtimeInsights().cityNews,
          headlines: [],
        },
      }),
    }).find((section) => section.id === "city-news")

    expect(newsCandidate?.completenessBoost).toBeLessThan(0)
  })
})
