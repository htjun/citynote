import type { CityRuntimeConfig } from "@/data/city-runtime-config"
import { providerCadenceSeconds } from "@/lib/insights/cadence"
import type {
  ProviderResult,
  RuntimeErrorCode,
  WeatherNowData,
} from "@/lib/insights/types"
import { fetchWithTimeout, isRecord, normalizeErrorCode } from "./shared"

const WEATHER_SOURCE_URL = "https://www.weatherapi.com/"
const WEATHER_ENDPOINT = "https://api.weatherapi.com/v1/current.json"

function nowIso(): string {
  return new Date().toISOString()
}

function readNumber(
  record: Record<string, unknown>,
  key: string
): number | null {
  const value = record[key]
  return typeof value === "number" ? value : null
}

function readCurrent(payload: unknown): Record<string, unknown> | null {
  if (!isRecord(payload) || !isRecord(payload.current)) {
    return null
  }

  return payload.current
}

function readCondition(current: Record<string, unknown>): string | null {
  if (
    !isRecord(current.condition) ||
    typeof current.condition.text !== "string"
  ) {
    return null
  }

  return current.condition.text
}

function readUpdatedAt(current: Record<string, unknown>): string {
  if (typeof current.last_updated_epoch !== "number") {
    return nowIso()
  }

  return new Date(current.last_updated_epoch * 1000).toISOString()
}

function readAqiIndex(current: Record<string, unknown>): number | null {
  if (!isRecord(current.air_quality)) {
    return null
  }

  return readNumber(current.air_quality, "us-epa-index")
}

function weatherFailure(
  fetchedAt: string,
  errorCode: RuntimeErrorCode
): ProviderResult<Omit<WeatherNowData, "meta">> {
  return {
    ok: false,
    fetchedAt,
    sourceUrl: WEATHER_SOURCE_URL,
    errorCode,
  }
}

function weatherSuccess(
  payload: Omit<WeatherNowData, "meta">,
  fetchedAt: string
): ProviderResult<Omit<WeatherNowData, "meta">> {
  return {
    ok: true,
    payload,
    fetchedAt,
    sourceUrl: WEATHER_SOURCE_URL,
  }
}

function buildWeatherUrl(config: CityRuntimeConfig, apiKey: string): URL {
  const url = new URL(WEATHER_ENDPOINT)
  url.searchParams.set("key", apiKey)
  url.searchParams.set("q", config.weatherQuery)
  url.searchParams.set("aqi", "yes")
  return url
}

async function toJsonResponse(
  response: Response,
  fetchedAt: string
): Promise<ProviderResult<unknown>> {
  if (!response.ok) {
    return weatherFailure(fetchedAt, normalizeErrorCode(response.status, null))
  }

  try {
    return weatherSuccess(await response.json(), fetchedAt)
  } catch {
    return weatherFailure(fetchedAt, "schema")
  }
}

async function requestWeatherPayload(
  url: URL,
  fetchedAt: string
): Promise<ProviderResult<unknown>> {
  try {
    const response = await fetchWithTimeout(url, {
      method: "GET",
      next: {
        revalidate: providerCadenceSeconds.weather,
      },
    })
    return toJsonResponse(response, fetchedAt)
  } catch (error) {
    return weatherFailure(fetchedAt, normalizeErrorCode(null, error))
  }
}

export function parseWeatherApiPayload(
  payload: unknown
): Omit<WeatherNowData, "meta"> | null {
  const current = readCurrent(payload)

  if (!current) {
    return null
  }

  const condition = readCondition(current)

  if (!condition) {
    return null
  }

  return {
    condition,
    temperatureC: readNumber(current, "temp_c"),
    feelsLikeC: readNumber(current, "feelslike_c"),
    uvIndex: readNumber(current, "uv"),
    aqiIndex: readAqiIndex(current),
    updatedAt: readUpdatedAt(current),
  }
}

export async function fetchWeatherNow(
  config: CityRuntimeConfig
): Promise<ProviderResult<Omit<WeatherNowData, "meta">>> {
  const fetchedAt = nowIso()
  const apiKey = process.env.WEATHERAPI_KEY

  if (!apiKey) {
    return weatherFailure(fetchedAt, "missing_key")
  }

  const response = await requestWeatherPayload(
    buildWeatherUrl(config, apiKey),
    fetchedAt
  )

  if (!response.ok) {
    return response
  }

  return buildParsedWeatherResult(response.payload, fetchedAt)
}

function buildParsedWeatherResult(
  payload: unknown,
  fetchedAt: string
): ProviderResult<Omit<WeatherNowData, "meta">> {
  const parsed = parseWeatherApiPayload(payload)
  return parsed
    ? weatherSuccess(parsed, fetchedAt)
    : weatherFailure(fetchedAt, "schema")
}
