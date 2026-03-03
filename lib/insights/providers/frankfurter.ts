import type { CityRuntimeConfig } from "@/data/city-runtime-config"
import {
  getCurrencyBases,
  providerCadenceSeconds,
} from "@/lib/insights/cadence"
import type {
  CurrencyWatchData,
  ProviderResult,
  RuntimeErrorCode,
} from "@/lib/insights/types"
import { fetchWithTimeout, isRecord, normalizeErrorCode } from "./shared"

const CURRENCY_SOURCE_URL = "https://frankfurter.dev/"
const CURRENCY_ENDPOINT = "https://api.frankfurter.dev/v1/latest"

interface ParsedFrankfurterRate {
  date: string
  rate: number | null
}

interface RateFetchResult {
  base: string
  rate: number | null
  date: string | null
  errorCode?: RuntimeErrorCode
}

function buildRateUrl(base: string, target: string): URL {
  const url = new URL(CURRENCY_ENDPOINT)
  url.searchParams.set("base", base)
  url.searchParams.set("symbols", target)
  return url
}

function rateFailure(
  base: string,
  errorCode: RuntimeErrorCode
): RateFetchResult {
  return {
    base,
    rate: null,
    date: null,
    errorCode,
  }
}

function rateSuccess(
  base: string,
  parsed: ParsedFrankfurterRate
): RateFetchResult {
  return {
    base,
    rate: parsed.rate,
    date: parsed.date,
  }
}

async function toJsonResponse(
  response: Response
): Promise<ProviderResult<unknown>> {
  if (!response.ok) {
    return {
      ok: false,
      fetchedAt: new Date().toISOString(),
      sourceUrl: CURRENCY_SOURCE_URL,
      errorCode: normalizeErrorCode(response.status, null),
    }
  }

  try {
    return {
      ok: true,
      payload: await response.json(),
      fetchedAt: new Date().toISOString(),
      sourceUrl: CURRENCY_SOURCE_URL,
    }
  } catch {
    return {
      ok: false,
      fetchedAt: new Date().toISOString(),
      sourceUrl: CURRENCY_SOURCE_URL,
      errorCode: "schema",
    }
  }
}

export function parseFrankfurterPayload(
  payload: unknown,
  targetCurrency: string
): ParsedFrankfurterRate | null {
  if (!isRecord(payload) || !isRecord(payload.rates)) {
    return null
  }

  if (typeof payload.date !== "string") {
    return null
  }

  const rateValue = payload.rates[targetCurrency]

  return {
    date: payload.date,
    rate: typeof rateValue === "number" ? rateValue : null,
  }
}

async function fetchRate(
  base: string,
  target: string
): Promise<RateFetchResult> {
  try {
    const response = await fetchWithTimeout(buildRateUrl(base, target), {
      method: "GET",
      next: {
        revalidate: providerCadenceSeconds.currency,
      },
    })

    const payload = await toJsonResponse(response)

    if (!payload.ok) {
      return rateFailure(base, payload.errorCode)
    }

    const parsed = parseFrankfurterPayload(payload.payload, target)
    return parsed ? rateSuccess(base, parsed) : rateFailure(base, "schema")
  } catch (error) {
    return rateFailure(base, normalizeErrorCode(null, error))
  }
}

function hasAnyRate(results: RateFetchResult[]): boolean {
  return results.some((result) => typeof result.rate === "number")
}

function pickErrorCode(results: RateFetchResult[]): RuntimeErrorCode {
  return results.find((result) => result.errorCode)?.errorCode ?? "upstream"
}

function pickLatestDate(results: RateFetchResult[]): string | null {
  return results.find((result) => typeof result.date === "string")?.date ?? null
}

export async function fetchCurrencyWatch(
  config: CityRuntimeConfig
): Promise<ProviderResult<Omit<CurrencyWatchData, "meta">>> {
  const fetchedAt = new Date().toISOString()
  const bases = getCurrencyBases()
  const rateResults = await Promise.all(
    bases.map((base) => fetchRate(base, config.localCurrency))
  )

  if (!hasAnyRate(rateResults)) {
    return {
      ok: false,
      fetchedAt,
      sourceUrl: CURRENCY_SOURCE_URL,
      errorCode: pickErrorCode(rateResults),
    }
  }

  return {
    ok: true,
    payload: {
      localCurrency: config.localCurrency,
      quotes: rateResults.map((result) => ({
        base: result.base,
        target: config.localCurrency,
        rate: result.rate,
      })),
      asOfDate: pickLatestDate(rateResults),
      updatedAt: fetchedAt,
    },
    fetchedAt,
    sourceUrl: CURRENCY_SOURCE_URL,
  }
}
