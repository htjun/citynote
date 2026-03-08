export interface CityRuntimeConfig {
  slug: string
  weatherQuery: string
  localCurrency: string
  newsProfile: {
    cityAliases: string[]
    countryAliases: string[]
    impactKeywords: string[]
    excludedAmbiguities: string[]
  }
  newsFallbackLinks: {
    title: string
    url: string
    source: string
  }[]
}

export const cityRuntimeConfigBySlug = {
  melbourne: {
    slug: "melbourne",
    weatherQuery: "-37.8136,144.9631",
    localCurrency: "AUD",
    newsProfile: {
      cityAliases: ["melbourne", "victoria"],
      countryAliases: ["australia", "australian", "victorian"],
      impactKeywords: [
        "disruption",
        "transport",
        "train",
        "tram",
        "bus",
        "incident",
        "fire",
        "emergency",
        "warning",
        "alert",
        "policy",
        "visa",
        "travel advisory",
        "flood",
        "storm",
        "inflation",
        "interest rate",
      ],
      excludedAmbiguities: ["melbourne florida", "florida usa"],
    },
    newsFallbackLinks: [
      {
        title: "Visit Melbourne updates",
        url: "https://www.visitmelbourne.com/",
        source: "Visit Melbourne",
      },
      {
        title: "Victoria transport disruptions",
        url: "https://www.ptv.vic.gov.au/disruptions/",
        source: "PTV",
      },
    ],
  },
  seoul: {
    slug: "seoul",
    weatherQuery: "37.5665,126.9780",
    localCurrency: "KRW",
    newsProfile: {
      cityAliases: ["seoul"],
      countryAliases: ["south korea", "republic of korea", "korea", "korean"],
      impactKeywords: [
        "subway",
        "metro",
        "transport",
        "strike",
        "warning",
        "advisory",
        "visa",
        "entry",
        "policy",
        "typhoon",
        "flood",
        "air quality",
        "missile",
        "north korea",
        "security",
        "emergency",
      ],
      excludedAmbiguities: [],
    },
    newsFallbackLinks: [
      {
        title: "Visit Seoul updates",
        url: "https://english.visitseoul.net/",
        source: "Visit Seoul",
      },
      {
        title: "Korea tourism updates",
        url: "https://english.visitkorea.or.kr/",
        source: "Visit Korea",
      },
    ],
  },
} as const satisfies Record<string, CityRuntimeConfig>

export function getCityRuntimeConfig(
  slug: string
): CityRuntimeConfig | undefined {
  if (!(slug in cityRuntimeConfigBySlug)) {
    return undefined
  }

  return cityRuntimeConfigBySlug[slug as keyof typeof cityRuntimeConfigBySlug]
}
