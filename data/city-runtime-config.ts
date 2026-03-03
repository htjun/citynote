export interface CityRuntimeConfig {
  slug: string
  weatherQuery: string
  localCurrency: string
  newsKeywords: string[]
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
    newsKeywords: ["Melbourne", "Victoria Australia"],
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
    newsKeywords: ["Seoul", "South Korea"],
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
  return cityRuntimeConfigBySlug[slug]
}
