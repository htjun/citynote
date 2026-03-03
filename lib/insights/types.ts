export type RuntimeProvider = "weatherapi" | "frankfurter" | "news-sources"

export type RuntimeErrorCode =
  | "timeout"
  | "quota"
  | "upstream"
  | "schema"
  | "missing_key"

export type DataFreshness = "fresh" | "stale" | "fallback" | "unavailable"

export interface RuntimeMeta {
  provider: RuntimeProvider
  fetchedAt: string
  freshness: DataFreshness
  sourceUrl: string
  errorCode?: RuntimeErrorCode
}

export interface ProviderSuccess<T> {
  ok: true
  payload: T
  fetchedAt: string
  sourceUrl: string
}

export interface ProviderFailure {
  ok: false
  fetchedAt: string
  sourceUrl: string
  errorCode: RuntimeErrorCode
}

export type ProviderResult<T> = ProviderSuccess<T> | ProviderFailure

export interface WeatherNowData {
  condition: string
  temperatureC: number | null
  feelsLikeC: number | null
  uvIndex: number | null
  aqiIndex: number | null
  updatedAt: string
  meta: RuntimeMeta
}

export interface CurrencyQuote {
  base: string
  target: string
  rate: number | null
}

export interface CurrencyWatchData {
  localCurrency: string
  quotes: CurrencyQuote[]
  asOfDate: string | null
  updatedAt: string
  meta: RuntimeMeta
}

export interface CityNewsHeadline {
  id: string
  title: string
  url: string
  source: string
  publishedAt: string
  language: string
  provider: "feed" | "html" | "fallback"
  relevanceScore: number
  relevanceSignals: string[]
  sourceTier: 1 | 2 | 3
}

export interface CityNewsData {
  headlines: CityNewsHeadline[]
  updatedAt: string
  meta: RuntimeMeta
}

export interface CityRuntimeInsights {
  weatherNow: WeatherNowData
  currencyWatch: CurrencyWatchData
  cityNews: CityNewsData
}
