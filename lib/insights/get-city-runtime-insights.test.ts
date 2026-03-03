import { getCity } from "@/data/cities"
import {
  clearRuntimeInsightsCacheForTests,
  getCityRuntimeInsights,
} from "@/lib/insights/get-city-runtime-insights"
import type * as CurrentsProvider from "@/lib/insights/providers/currents"
import type * as FrankfurterProvider from "@/lib/insights/providers/frankfurter"
import type * as WeatherProvider from "@/lib/insights/providers/weatherapi"
import { fetchCityNews } from "@/lib/insights/providers/currents"
import { fetchCurrencyWatch } from "@/lib/insights/providers/frankfurter"
import { fetchWeatherNow } from "@/lib/insights/providers/weatherapi"
import type {
  CityNewsData,
  CurrencyWatchData,
  WeatherNowData,
} from "@/lib/insights/types"

vi.mock<typeof WeatherProvider>(
  import("@/lib/insights/providers/weatherapi"),
  () => ({
    fetchWeatherNow: vi.fn(),
  })
)

vi.mock<typeof FrankfurterProvider>(
  import("@/lib/insights/providers/frankfurter"),
  () => ({
    fetchCurrencyWatch: vi.fn(),
  })
)

vi.mock<typeof CurrentsProvider>(
  import("@/lib/insights/providers/currents"),
  () => ({
    fetchCityNews: vi.fn(),
  })
)

function getCityOrThrow(slug: string) {
  const city = getCity("en", slug)

  if (!city) {
    throw new Error(`Missing city fixture: ${slug}`)
  }

  return city
}

function setInsightsEnv(): void {
  process.env.WEATHERAPI_KEY = "test-weather-key"
  process.env.CURRENTS_API_KEY = "test-currents-key"
  process.env.CURRENCY_BASES = "USD,EUR"
  process.env.NEWS_HEADLINE_LIMIT = "5"
  process.env.NEWS_FALLBACK_LANG = "en"
}

function clearInsightsEnv(): void {
  delete process.env.WEATHERAPI_KEY
  delete process.env.CURRENTS_API_KEY
  delete process.env.CURRENCY_BASES
  delete process.env.NEWS_HEADLINE_LIMIT
  delete process.env.NEWS_FALLBACK_LANG
}

function weatherSuccess(): {
  ok: true
  payload: Omit<WeatherNowData, "meta">
  fetchedAt: string
  sourceUrl: string
} {
  return {
    ok: true,
    payload: {
      condition: "Clear",
      temperatureC: 23.1,
      feelsLikeC: 22.6,
      uvIndex: 6.2,
      aqiIndex: 2,
      updatedAt: "2026-03-03T10:00:00.000Z",
    },
    fetchedAt: "2026-03-03T10:00:00.000Z",
    sourceUrl: "https://www.weatherapi.com/",
  }
}

function currencySuccess(): {
  ok: true
  payload: Omit<CurrencyWatchData, "meta">
  fetchedAt: string
  sourceUrl: string
} {
  return {
    ok: true,
    payload: {
      localCurrency: "AUD",
      quotes: [
        { base: "USD", target: "AUD", rate: 1.53 },
        { base: "EUR", target: "AUD", rate: 1.64 },
      ],
      asOfDate: "2026-03-03",
      updatedAt: "2026-03-03T10:00:00.000Z",
    },
    fetchedAt: "2026-03-03T10:00:00.000Z",
    sourceUrl: "https://frankfurter.dev/",
  }
}

function newsSuccess(): {
  ok: true
  payload: Omit<CityNewsData, "meta">
  fetchedAt: string
  sourceUrl: string
} {
  return {
    ok: true,
    payload: {
      headlines: [
        {
          id: "headline-1",
          title: "City headline",
          url: "https://example.com/headline-1",
          source: "Example News",
          publishedAt: "2026-03-03T10:00:00.000Z",
          language: "en",
        },
      ],
      updatedAt: "2026-03-03T10:00:00.000Z",
    },
    fetchedAt: "2026-03-03T10:00:00.000Z",
    sourceUrl: "https://currentsapi.services/en/docs/",
  }
}

function upstreamFailure(sourceUrl: string) {
  return {
    ok: false as const,
    fetchedAt: "2026-03-03T10:00:00.000Z",
    sourceUrl,
    errorCode: "upstream" as const,
  }
}

function resetRuntimeInsightsTestState(): void {
  clearRuntimeInsightsCacheForTests()
  clearInsightsEnv()
  setInsightsEnv()
  vi.clearAllMocks()
}

function mockAllProvidersSuccessOnce(): void {
  vi.mocked(fetchWeatherNow).mockResolvedValueOnce(weatherSuccess())
  vi.mocked(fetchCurrencyWatch).mockResolvedValueOnce(currencySuccess())
  vi.mocked(fetchCityNews).mockResolvedValueOnce(newsSuccess())
}

describe("runtime insights orchestrator", () => {
  it("returns fresh runtime sections when providers succeed", async () => {
    resetRuntimeInsightsTestState()
    mockAllProvidersSuccessOnce()

    const runtime = await getCityRuntimeInsights({
      city: getCityOrThrow("melbourne"),
      locale: "en",
    })

    expect(runtime.weatherNow.meta.freshness).toBe("fresh")
    expect(runtime.currencyWatch.meta.freshness).toBe("fresh")
    expect(runtime.cityNews.meta.freshness).toBe("fresh")
    expect(runtime.cityNews.headlines).toHaveLength(1)
  })

  it("falls back to stale cache after a provider failure", async () => {
    resetRuntimeInsightsTestState()

    vi.mocked(fetchWeatherNow)
      .mockResolvedValueOnce(weatherSuccess())
      .mockResolvedValueOnce(upstreamFailure("https://www.weatherapi.com/"))

    vi.mocked(fetchCurrencyWatch)
      .mockResolvedValueOnce(currencySuccess())
      .mockResolvedValueOnce(currencySuccess())

    vi.mocked(fetchCityNews)
      .mockResolvedValueOnce(newsSuccess())
      .mockResolvedValueOnce(newsSuccess())

    await getCityRuntimeInsights({
      city: getCityOrThrow("melbourne"),
      locale: "en",
    })

    const runtime = await getCityRuntimeInsights({
      city: getCityOrThrow("melbourne"),
      locale: "en",
    })

    expect(runtime.weatherNow.meta.freshness).toBe("stale")
    expect(runtime.weatherNow.meta.errorCode).toBe("upstream")
  })

  it("uses static fallback when no fresh or stale provider data exists", async () => {
    resetRuntimeInsightsTestState()

    vi.mocked(fetchWeatherNow).mockResolvedValueOnce(
      upstreamFailure("https://www.weatherapi.com/")
    )
    vi.mocked(fetchCurrencyWatch).mockResolvedValueOnce(
      upstreamFailure("https://frankfurter.dev/")
    )
    vi.mocked(fetchCityNews).mockResolvedValueOnce(
      upstreamFailure("https://currentsapi.services/en/docs/")
    )

    const runtime = await getCityRuntimeInsights({
      city: getCityOrThrow("seoul"),
      locale: "en",
    })

    expect(runtime.weatherNow.meta.freshness).toBe("fallback")
    expect(runtime.currencyWatch.meta.freshness).toBe("fallback")
    expect(runtime.cityNews.meta.freshness).toBe("fallback")
  })
})
