import type { City } from "@/data/types"
import type { CityRuntimeInsights, DataFreshness } from "@/lib/insights/types"
import { isSignalStale } from "@/lib/city-insights"
import type {
  RuntimeFreshnessBySection,
  SectionCandidate,
  SectionGroupId,
} from "@/lib/ia/types"

interface SectionRegistryEntry {
  id: SectionCandidate["id"]
  group: SectionGroupId
  canonicalOrder: number
  navLabelKey: string
  isVisible: (input: SectionRegistryContext) => boolean
  completenessBoost: (input: SectionRegistryContext) => number
}

interface SectionRegistryContext {
  city: City
  runtimeInsights: CityRuntimeInsights
}

const REGISTRY: SectionRegistryEntry[] = [
  {
    id: "at-a-glance",
    group: "essentials",
    canonicalOrder: 0,
    navLabelKey: "atAGlance",
    isVisible: () => true,
    completenessBoost: () => 0,
  },
  {
    id: "getting-around",
    group: "essentials",
    canonicalOrder: 1,
    navLabelKey: "transport",
    isVisible: () => true,
    completenessBoost: () => 0,
  },
  {
    id: "safety",
    group: "essentials",
    canonicalOrder: 2,
    navLabelKey: "safety",
    isVisible: () => true,
    completenessBoost: () => 0,
  },
  {
    id: "rule-traps",
    group: "essentials",
    canonicalOrder: 3,
    navLabelKey: "ruleTraps",
    isVisible: ({ city }) => Boolean(city.ruleTraps?.length),
    completenessBoost: ({ city }) => (city.ruleTraps?.length ? 0 : -20),
  },
  {
    id: "live-pulse",
    group: "right-now",
    canonicalOrder: 4,
    navLabelKey: "livePulse",
    isVisible: ({ city }) => Boolean(city.livePulse?.length),
    completenessBoost: ({ city }) => {
      if (!city.livePulse?.length) {
        return -20
      }

      const staleCount = city.livePulse.filter((signal) =>
        isSignalStale(signal)
      ).length

      if (staleCount === 0) {
        return 0
      }

      return staleCount === city.livePulse.length ? -8 : -4
    },
  },
  {
    id: "weather-now",
    group: "right-now",
    canonicalOrder: 5,
    navLabelKey: "weatherNow",
    isVisible: () => true,
    completenessBoost: ({ runtimeInsights }) => {
      const weather = runtimeInsights.weatherNow
      const hasCoreData =
        weather.temperatureC !== null || weather.feelsLikeC !== null

      return hasCoreData ? 0 : -6
    },
  },
  {
    id: "currency-watch",
    group: "right-now",
    canonicalOrder: 6,
    navLabelKey: "currencyWatch",
    isVisible: () => true,
    completenessBoost: ({ runtimeInsights }) => {
      const hasAnyRate = runtimeInsights.currencyWatch.quotes.some(
        (quote) => quote.rate !== null
      )

      return hasAnyRate ? 0 : -6
    },
  },
  {
    id: "city-news",
    group: "right-now",
    canonicalOrder: 7,
    navLabelKey: "cityNews",
    isVisible: () => true,
    completenessBoost: ({ runtimeInsights }) =>
      runtimeInsights.cityNews.headlines.length ? 0 : -6,
  },
  {
    id: "cost-of-living",
    group: "plan-your-stay",
    canonicalOrder: 8,
    navLabelKey: "cost",
    isVisible: () => true,
    completenessBoost: () => 0,
  },
  {
    id: "neighborhoods",
    group: "plan-your-stay",
    canonicalOrder: 9,
    navLabelKey: "neighborhoods",
    isVisible: () => true,
    completenessBoost: () => 0,
  },
  {
    id: "neighborhood-fit",
    group: "plan-your-stay",
    canonicalOrder: 10,
    navLabelKey: "fitMatrix",
    isVisible: ({ city }) => Boolean(city.neighborhoodFit?.length),
    completenessBoost: ({ city }) => (city.neighborhoodFit?.length ? 0 : -12),
  },
  {
    id: "connectivity",
    group: "plan-your-stay",
    canonicalOrder: 11,
    navLabelKey: "connectivity",
    isVisible: () => true,
    completenessBoost: () => 0,
  },
  {
    id: "practical",
    group: "plan-your-stay",
    canonicalOrder: 12,
    navLabelKey: "practical",
    isVisible: () => true,
    completenessBoost: () => 0,
  },
  {
    id: "accessibility",
    group: "plan-your-stay",
    canonicalOrder: 13,
    navLabelKey: "accessibility",
    isVisible: ({ city }) => Boolean(city.accessibility),
    completenessBoost: ({ city }) => (city.accessibility ? 0 : -12),
  },
  {
    id: "language-culture",
    group: "local-context",
    canonicalOrder: 14,
    navLabelKey: "language",
    isVisible: () => true,
    completenessBoost: () => 0,
  },
  {
    id: "food-drink",
    group: "local-context",
    canonicalOrder: 15,
    navLabelKey: "food",
    isVisible: () => true,
    completenessBoost: () => 0,
  },
  {
    id: "climate",
    group: "local-context",
    canonicalOrder: 16,
    navLabelKey: "climate",
    isVisible: () => true,
    completenessBoost: () => 0,
  },
]

function toSectionCandidate(
  section: SectionRegistryEntry,
  context: SectionRegistryContext
): SectionCandidate {
  return {
    id: section.id,
    group: section.group,
    canonicalOrder: section.canonicalOrder,
    navLabelKey: section.navLabelKey,
    completenessBoost: section.completenessBoost(context),
  }
}

function toLivePulseFreshness(city: City): DataFreshness | undefined {
  if (!city.livePulse?.length) {
    return undefined
  }

  const allStale = city.livePulse.every((signal) => isSignalStale(signal))
  return allStale ? "stale" : "fresh"
}

export function getRuntimeFreshnessMap(input: {
  city: City
  runtimeInsights: CityRuntimeInsights
}): RuntimeFreshnessBySection {
  return {
    "live-pulse": toLivePulseFreshness(input.city),
    "weather-now": input.runtimeInsights.weatherNow.meta.freshness,
    "currency-watch": input.runtimeInsights.currencyWatch.meta.freshness,
    "city-news": input.runtimeInsights.cityNews.meta.freshness,
  }
}

export function getVisibleSectionCandidates(
  input: SectionRegistryContext
): SectionCandidate[] {
  return REGISTRY.filter((section) => section.isVisible(input)).map((section) =>
    toSectionCandidate(section, input)
  )
}
