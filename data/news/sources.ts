export type CityNewsScope = "global" | "melbourne" | "seoul"

export type NewsSourceKind = "rss" | "atom" | "html"

export type NewsSourceParser =
  | "rss"
  | "atom"
  | "ptvDisruptions"
  | "seoulPressReleases"
  | "kmaWarnings"

export type NewsSourceLegalStatus = "approved" | "review_required"

export interface NewsSourceDefinition {
  id: string
  name: string
  url: string
  kind: NewsSourceKind
  parser: NewsSourceParser
  sourceTier: 1 | 2 | 3
  legalStatus: NewsSourceLegalStatus
  enabled: boolean
  pollIntervalSeconds: number
  cityScope: CityNewsScope[]
  language: string
}

const TWELVE_HOURS_SECONDS = 12 * 60 * 60
const THIRTY_MINUTES_SECONDS = 30 * 60

export const newsSourceRegistry: NewsSourceDefinition[] = [
  {
    id: "sbs-australia",
    name: "SBS Australia",
    url: "https://www.sbs.com.au/news/topic/australia/feed",
    kind: "rss",
    parser: "rss",
    sourceTier: 1,
    legalStatus: "approved",
    enabled: true,
    pollIntervalSeconds: TWELVE_HOURS_SECONDS,
    cityScope: ["melbourne"],
    language: "en",
  },
  {
    id: "sbs-world",
    name: "SBS World",
    url: "https://www.sbs.com.au/news/topic/world/feed",
    kind: "rss",
    parser: "rss",
    sourceTier: 1,
    legalStatus: "approved",
    enabled: true,
    pollIntervalSeconds: TWELVE_HOURS_SECONDS,
    cityScope: ["global"],
    language: "en",
  },
  {
    id: "cfa-incidents",
    name: "CFA Incidents",
    url: "https://data.emergency.vic.gov.au/Show?pageId=getIncidentRSS",
    kind: "rss",
    parser: "rss",
    sourceTier: 1,
    legalStatus: "approved",
    enabled: true,
    pollIntervalSeconds: THIRTY_MINUTES_SECONDS,
    cityScope: ["melbourne"],
    language: "en",
  },
  {
    id: "ptv-disruptions",
    name: "PTV Disruptions",
    url: "https://www.ptv.vic.gov.au/disruptions/disruptions-information/nochrome",
    kind: "html",
    parser: "ptvDisruptions",
    sourceTier: 1,
    legalStatus: "approved",
    enabled: true,
    pollIntervalSeconds: THIRTY_MINUTES_SECONDS,
    cityScope: ["melbourne"],
    language: "en",
  },
  {
    id: "seoul-press-releases",
    name: "Seoul Metropolitan Government Press Releases",
    url: "https://english.seoul.go.kr/category/news/city-news/press-releases/",
    kind: "html",
    parser: "seoulPressReleases",
    sourceTier: 1,
    legalStatus: "approved",
    enabled: true,
    pollIntervalSeconds: TWELVE_HOURS_SECONDS,
    cityScope: ["seoul"],
    language: "en",
  },
  {
    id: "koreanet-news",
    name: "Korea.net News",
    url: "https://www.korea.net/koreanet/rss/news/2",
    kind: "rss",
    parser: "rss",
    sourceTier: 1,
    legalStatus: "approved",
    enabled: true,
    pollIntervalSeconds: TWELVE_HOURS_SECONDS,
    cityScope: ["seoul"],
    language: "en",
  },
  {
    id: "kma-warnings",
    name: "KMA Warnings",
    url: "https://www.kma.go.kr/neng/forecast/warning.do",
    kind: "html",
    parser: "kmaWarnings",
    sourceTier: 1,
    legalStatus: "approved",
    enabled: true,
    pollIntervalSeconds: THIRTY_MINUTES_SECONDS,
    cityScope: ["seoul"],
    language: "en",
  },
  {
    id: "koreatimes-rss",
    name: "Korea Times RSS (Awaiting legal review)",
    url: "https://w3.koreatimes.co.kr/www2/common/rss.asp",
    kind: "rss",
    parser: "rss",
    sourceTier: 2,
    legalStatus: "review_required",
    enabled: false,
    pollIntervalSeconds: TWELVE_HOURS_SECONDS,
    cityScope: ["seoul"],
    language: "en",
  },
  {
    id: "bbc-global",
    name: "BBC Global (Awaiting legal review)",
    url: "https://feeds.bbci.co.uk/news/world/rss.xml",
    kind: "rss",
    parser: "rss",
    sourceTier: 1,
    legalStatus: "review_required",
    enabled: false,
    pollIntervalSeconds: TWELVE_HOURS_SECONDS,
    cityScope: ["global"],
    language: "en",
  },
  {
    id: "guardian-world",
    name: "Guardian World (Awaiting legal review)",
    url: "https://www.theguardian.com/world/rss",
    kind: "rss",
    parser: "rss",
    sourceTier: 2,
    legalStatus: "review_required",
    enabled: false,
    pollIntervalSeconds: TWELVE_HOURS_SECONDS,
    cityScope: ["global"],
    language: "en",
  },
]

export function getNewsSourcesForCity(slug: string): NewsSourceDefinition[] {
  return newsSourceRegistry.filter((source) => {
    const inScope =
      source.cityScope.includes("global") ||
      source.cityScope.includes(slug as CityNewsScope)
    return inScope && source.enabled && source.legalStatus === "approved"
  })
}
