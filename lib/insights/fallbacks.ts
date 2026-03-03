import type { CityRuntimeConfig } from "@/data/city-runtime-config"
import { getCurrencyBases } from "@/lib/insights/cadence"
import type {
  CityNewsData,
  CityNewsHeadline,
  CurrencyWatchData,
  RuntimeErrorCode,
  WeatherNowData,
} from "@/lib/insights/types"

interface FallbackMetaInput {
  fetchedAt: string
  errorCode: RuntimeErrorCode
}

export function buildWeatherFallback(
  input: FallbackMetaInput
): Omit<WeatherNowData, "meta"> {
  return {
    condition: "Live weather feed unavailable. Check the provider source.",
    temperatureC: null,
    feelsLikeC: null,
    uvIndex: null,
    aqiIndex: null,
    updatedAt: input.fetchedAt,
  }
}

export function buildCurrencyFallback(
  config: CityRuntimeConfig,
  input: FallbackMetaInput
): Omit<CurrencyWatchData, "meta"> {
  return {
    localCurrency: config.localCurrency,
    quotes: getCurrencyBases().map((base) => ({
      base,
      target: config.localCurrency,
      rate: null,
    })),
    asOfDate: null,
    updatedAt: input.fetchedAt,
  }
}

export function buildCityNewsFallback(
  config: CityRuntimeConfig,
  input: FallbackMetaInput
): Omit<CityNewsData, "meta"> {
  const headlines: CityNewsHeadline[] = config.newsFallbackLinks.map(
    (link, index) => ({
      id: `${config.slug}-fallback-${index}`,
      title: link.title,
      url: link.url,
      source: link.source,
      publishedAt: input.fetchedAt,
      language: "en",
      provider: "fallback",
      relevanceScore: 0,
      relevanceSignals: ["curated_fallback"],
      sourceTier: 1,
    })
  )

  return {
    headlines,
    updatedAt: input.fetchedAt,
  }
}
