import type { DataFreshness } from "@/lib/insights/types"
import type { TravelType } from "@/lib/personalization/schema"
import type { CitySectionId, NationalityRelation } from "@/lib/ia/types"

export const baseWeights: Record<CitySectionId, number> = {
  "at-a-glance": 100,
  safety: 90,
  "getting-around": 86,
  "rule-traps": 84,
  "cost-of-living": 82,
  neighborhoods: 74,
  connectivity: 72,
  practical: 70,
  "weather-now": 68,
  "live-pulse": 66,
  "language-culture": 62,
  "neighborhood-fit": 60,
  "currency-watch": 58,
  "city-news": 56,
  "food-drink": 54,
  climate: 52,
  accessibility: 50,
}

export const purposeWeights: Record<
  TravelType,
  Partial<Record<CitySectionId, number>>
> = {
  trip: {
    "getting-around": 12,
    "weather-now": 12,
    "rule-traps": 10,
    neighborhoods: 8,
    "cost-of-living": 4,
    connectivity: 3,
    practical: 2,
    "language-culture": 4,
    "neighborhood-fit": 2,
    "food-drink": 6,
  },
  study: {
    "getting-around": 8,
    "weather-now": 4,
    "rule-traps": 6,
    neighborhoods: 6,
    "cost-of-living": 8,
    connectivity: 10,
    practical: 12,
    "language-culture": 14,
    "neighborhood-fit": 8,
    "food-drink": 2,
  },
  live: {
    "getting-around": 4,
    "weather-now": 2,
    "rule-traps": 6,
    neighborhoods: 8,
    "cost-of-living": 16,
    connectivity: 12,
    practical: 10,
    "language-culture": 6,
    "neighborhood-fit": 14,
    "food-drink": 2,
  },
}

export const nationalityWeights: Record<
  NationalityRelation,
  Partial<Record<CitySectionId, number>>
> = {
  unknown: {},
  international: {
    "rule-traps": 10,
    "language-culture": 8,
    "getting-around": 6,
    practical: 6,
    "currency-watch": 5,
    safety: 4,
  },
  domestic: {
    "rule-traps": -4,
    "language-culture": -8,
    "currency-watch": -6,
    "getting-around": 2,
    practical: 4,
    safety: 2,
  },
}

export const freshnessWeights: Record<DataFreshness, number> = {
  fresh: 6,
  stale: 2,
  fallback: -2,
  unavailable: -8,
}

export const cityWeightOverrides: Partial<
  Record<string, Partial<Record<CitySectionId, number>>>
> = {}
