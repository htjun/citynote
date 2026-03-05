import type { DataFreshness } from "@/lib/insights/types"
import type { TravelType } from "@/lib/personalization/schema"

export type SectionGroupId =
  | "essentials"
  | "right-now"
  | "plan-your-stay"
  | "local-context"

export type CitySectionId =
  | "at-a-glance"
  | "live-pulse"
  | "weather-now"
  | "currency-watch"
  | "city-news"
  | "rule-traps"
  | "climate"
  | "cost-of-living"
  | "getting-around"
  | "connectivity"
  | "neighborhoods"
  | "neighborhood-fit"
  | "accessibility"
  | "food-drink"
  | "language-culture"
  | "safety"
  | "practical"

export type NationalityRelation = "domestic" | "international" | "unknown"

export interface PersonalizationProfile {
  purpose: TravelType | null
  nationality: string | null
  nationalityRelation: NationalityRelation
}

export type RuntimeSectionId =
  | "live-pulse"
  | "weather-now"
  | "currency-watch"
  | "city-news"

export type RuntimeFreshnessBySection = Partial<
  Record<RuntimeSectionId, DataFreshness>
>

export interface SectionCandidate {
  id: CitySectionId
  group: SectionGroupId
  canonicalOrder: number
  navLabelKey: string
  completenessBoost: number
}

export interface RankedSection extends SectionCandidate {
  score: number
}

export const SECTION_GROUP_ORDER: SectionGroupId[] = [
  "essentials",
  "right-now",
  "plan-your-stay",
  "local-context",
]

export const RUNTIME_SECTION_IDS: RuntimeSectionId[] = [
  "live-pulse",
  "weather-now",
  "currency-watch",
  "city-news",
]
