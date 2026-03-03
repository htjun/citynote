import { getCityRuntimeConfig } from "@/data/city-runtime-config"
import type { City } from "@/data/types"
import type { Locale } from "@/i18n/locales"
import { providerMaxStaleSeconds } from "@/lib/insights/cadence"
import {
  buildCityNewsFallback,
  buildCurrencyFallback,
  buildWeatherFallback,
} from "@/lib/insights/fallbacks"
import {
  clearRuntimeCache,
  readRuntimeCache,
  writeRuntimeCache,
} from "@/lib/insights/provider-cache"
import { fetchCityNews } from "@/lib/insights/providers/currents"
import { fetchCurrencyWatch } from "@/lib/insights/providers/frankfurter"
import { fetchWeatherNow } from "@/lib/insights/providers/weatherapi"
import type {
  CityNewsData,
  CityRuntimeInsights,
  CurrencyWatchData,
  DataFreshness,
  ProviderResult,
  RuntimeErrorCode,
  RuntimeMeta,
  RuntimeProvider,
  WeatherNowData,
} from "@/lib/insights/types"

interface MetaInput {
  provider: RuntimeProvider
  sourceUrl: string
  fetchedAt: string
  freshness: DataFreshness
  errorCode?: RuntimeErrorCode
}

interface ResolveSectionInput<T extends { meta: RuntimeMeta }> {
  cacheKey: string
  staleWindowSeconds: number
  provider: RuntimeProvider
  fetcher: () => Promise<ProviderResult<Omit<T, "meta">>>
  fallback: (input: {
    fetchedAt: string
    errorCode: RuntimeErrorCode
  }) => Omit<T, "meta"> | null
  unavailable: (input: {
    fetchedAt: string
    sourceUrl: string
    errorCode: RuntimeErrorCode
  }) => T
}

function buildMeta(input: MetaInput): RuntimeMeta {
  return {
    provider: input.provider,
    sourceUrl: input.sourceUrl,
    fetchedAt: input.fetchedAt,
    freshness: input.freshness,
    ...(input.errorCode ? { errorCode: input.errorCode } : {}),
  }
}

function withMeta<T extends { meta: RuntimeMeta }>(
  payload: Omit<T, "meta">,
  input: MetaInput
): T {
  return {
    ...payload,
    meta: buildMeta(input),
  } as T
}

function unavailableWeather(input: {
  fetchedAt: string
  sourceUrl: string
  errorCode: RuntimeErrorCode
}): WeatherNowData {
  return withMeta(
    {
      condition: "Weather data unavailable.",
      temperatureC: null,
      feelsLikeC: null,
      uvIndex: null,
      aqiIndex: null,
      updatedAt: input.fetchedAt,
    },
    {
      provider: "weatherapi",
      sourceUrl: input.sourceUrl,
      fetchedAt: input.fetchedAt,
      freshness: "unavailable",
      errorCode: input.errorCode,
    }
  )
}

function unavailableCurrency(input: {
  fetchedAt: string
  sourceUrl: string
  errorCode: RuntimeErrorCode
  localCurrency: string
}): CurrencyWatchData {
  return withMeta(
    {
      localCurrency: input.localCurrency,
      quotes: [],
      asOfDate: null,
      updatedAt: input.fetchedAt,
    },
    {
      provider: "frankfurter",
      sourceUrl: input.sourceUrl,
      fetchedAt: input.fetchedAt,
      freshness: "unavailable",
      errorCode: input.errorCode,
    }
  )
}

function unavailableCityNews(input: {
  fetchedAt: string
  sourceUrl: string
  errorCode: RuntimeErrorCode
}): CityNewsData {
  return withMeta(
    {
      headlines: [],
      updatedAt: input.fetchedAt,
    },
    {
      provider: "currents",
      sourceUrl: input.sourceUrl,
      fetchedAt: input.fetchedAt,
      freshness: "unavailable",
      errorCode: input.errorCode,
    }
  )
}

async function resolveSection<T extends { meta: RuntimeMeta }>(
  input: ResolveSectionInput<T>
): Promise<T> {
  const result = await input.fetcher()

  if (result.ok) {
    return persistFreshValue(input, result)
  }

  const stale = readRuntimeCache<T>(input.cacheKey, input.staleWindowSeconds)

  if (stale) {
    return buildStaleValue(input, stale, result.errorCode)
  }

  const fallback = input.fallback({
    fetchedAt: result.fetchedAt,
    errorCode: result.errorCode,
  })

  if (fallback) {
    return buildFallbackValue(input, fallback, result)
  }

  return input.unavailable({
    fetchedAt: result.fetchedAt,
    sourceUrl: result.sourceUrl,
    errorCode: result.errorCode,
  })
}

function persistFreshValue<T extends { meta: RuntimeMeta }>(
  input: ResolveSectionInput<T>,
  result: Extract<ProviderResult<Omit<T, "meta">>, { ok: true }>
): T {
  const fresh = withMeta(result.payload, {
    provider: input.provider,
    sourceUrl: result.sourceUrl,
    fetchedAt: result.fetchedAt,
    freshness: "fresh",
  })

  writeRuntimeCache(input.cacheKey, fresh)
  return fresh
}

function buildStaleValue<T extends { meta: RuntimeMeta }>(
  input: ResolveSectionInput<T>,
  stale: T,
  errorCode: RuntimeErrorCode
): T {
  return withMeta(stale, {
    provider: input.provider,
    sourceUrl: stale.meta.sourceUrl,
    fetchedAt: stale.meta.fetchedAt,
    freshness: "stale",
    errorCode,
  })
}

function buildFallbackValue<T extends { meta: RuntimeMeta }>(
  input: ResolveSectionInput<T>,
  fallback: Omit<T, "meta">,
  result: Extract<ProviderResult<Omit<T, "meta">>, { ok: false }>
): T {
  return withMeta(fallback, {
    provider: input.provider,
    sourceUrl: result.sourceUrl,
    fetchedAt: result.fetchedAt,
    freshness: "fallback",
    errorCode: result.errorCode,
  })
}

function resolveWeather(city: City): Promise<WeatherNowData> {
  const config = getCityRuntimeConfig(city.slug)

  if (!config) {
    return Promise.resolve(
      unavailableWeather({
        fetchedAt: new Date().toISOString(),
        sourceUrl: "https://www.weatherapi.com/",
        errorCode: "upstream",
      })
    )
  }

  return resolveSection({
    cacheKey: `weather:${city.slug}`,
    staleWindowSeconds: providerMaxStaleSeconds.weather,
    provider: "weatherapi",
    fetcher: () => fetchWeatherNow(config),
    fallback: buildWeatherFallback,
    unavailable: unavailableWeather,
  })
}

function resolveCurrency(city: City): Promise<CurrencyWatchData> {
  const config = getCityRuntimeConfig(city.slug)

  if (!config) {
    return Promise.resolve(
      unavailableCurrency({
        fetchedAt: new Date().toISOString(),
        sourceUrl: "https://frankfurter.dev/",
        errorCode: "upstream",
        localCurrency: "USD",
      })
    )
  }

  return resolveSection({
    cacheKey: `currency:${city.slug}`,
    staleWindowSeconds: providerMaxStaleSeconds.currency,
    provider: "frankfurter",
    fetcher: () => fetchCurrencyWatch(config),
    fallback: (input) => buildCurrencyFallback(config, input),
    unavailable: (input) =>
      unavailableCurrency({
        ...input,
        localCurrency: config.localCurrency,
      }),
  })
}

function resolveNews(city: City, locale: Locale): Promise<CityNewsData> {
  const config = getCityRuntimeConfig(city.slug)

  if (!config) {
    return Promise.resolve(
      unavailableCityNews({
        fetchedAt: new Date().toISOString(),
        sourceUrl: "https://currentsapi.services/en/docs/",
        errorCode: "upstream",
      })
    )
  }

  return resolveSection({
    cacheKey: `news:${city.slug}:${locale}`,
    staleWindowSeconds: providerMaxStaleSeconds.news,
    provider: "currents",
    fetcher: () => fetchCityNews(config, locale),
    fallback: (input) => buildCityNewsFallback(config, input),
    unavailable: unavailableCityNews,
  })
}

interface CityRuntimeInsightsInput {
  city: City
  locale: Locale
}

export async function getCityRuntimeInsights({
  city,
  locale,
}: CityRuntimeInsightsInput): Promise<CityRuntimeInsights> {
  const [weatherNow, currencyWatch, cityNews] = await Promise.all([
    resolveWeather(city),
    resolveCurrency(city),
    resolveNews(city, locale),
  ])

  return {
    weatherNow,
    currencyWatch,
    cityNews,
  }
}

export function clearRuntimeInsightsCacheForTests(): void {
  clearRuntimeCache()
}
