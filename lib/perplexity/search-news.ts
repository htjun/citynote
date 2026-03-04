import type { SearchResult } from "./types"
import { searchWeb } from './client';
import type { SearchWebOptions } from './client';

export interface CityNewsSearchOptions {
  maxResults?: number
  language?: string
  excludeDomains?: string[]
}

export interface CityNewsSearchResult {
  results: SearchResult[]
  query: string
  searchedAt: string
}

const COUNTRY_CODES: Record<string, string> = {
  "South Korea": "KR",
  Australia: "AU",
  Japan: "JP",
  Thailand: "TH",
  Vietnam: "VN",
  Taiwan: "TW",
  Singapore: "SG",
  Malaysia: "MY",
  Indonesia: "ID",
  Philippines: "PH",
  "United States": "US",
  "United Kingdom": "GB",
  Germany: "DE",
  France: "FR",
  Spain: "ES",
  Italy: "IT",
  Portugal: "PT",
  Netherlands: "NL",
  Canada: "CA",
  Mexico: "MX",
  Brazil: "BR",
  Argentina: "AR",
  Colombia: "CO",
}

export async function searchCityNews(
  cityName: string,
  country: string,
  options?: CityNewsSearchOptions
): Promise<CityNewsSearchResult> {
  const query = `${cityName} ${country} travel news alerts updates`
  const countryCode = COUNTRY_CODES[country]

  const searchOptions: SearchWebOptions = {
    maxResults: options?.maxResults ?? 5,
    maxTokensPerPage: 512,
  }

  if (countryCode) {
    searchOptions.country = countryCode
  }

  if (options?.language) {
    searchOptions.searchLanguageFilter = [options.language]
  }

  if (options?.excludeDomains?.length) {
    searchOptions.searchDomainFilter = options.excludeDomains.map(
      (d) => `-${d}`
    )
  }

  const response = await searchWeb(query, searchOptions)

  return {
    results: response.results,
    query,
    searchedAt: new Date().toISOString(),
  }
}
