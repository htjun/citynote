import {
  baseWeights,
  cityWeightOverrides,
  freshnessWeights,
  nationalityWeights,
  purposeWeights,
} from "@/lib/ia/weights"
import { RUNTIME_SECTION_IDS, SECTION_GROUP_ORDER } from "@/lib/ia/types"
import type {
  PersonalizationProfile,
  RankedSection,
  RuntimeFreshnessBySection,
  RuntimeSectionId,
  SectionCandidate,
} from "@/lib/ia/types"

interface RankSectionsInput {
  sections: SectionCandidate[]
  profile: PersonalizationProfile
  runtimeFreshness: RuntimeFreshnessBySection
  citySlug: string
}

function isRuntimeSectionId(
  sectionId: SectionCandidate["id"]
): sectionId is RuntimeSectionId {
  return (RUNTIME_SECTION_IDS as readonly string[]).includes(sectionId)
}

// oxlint-disable-next-line max-statements
function getStaticOverrideBoost(
  sectionId: SectionCandidate["id"],
  profile: PersonalizationProfile
): number {
  if (
    profile.purpose === "trip" &&
    profile.nationalityRelation === "international"
  ) {
    if (sectionId === "rule-traps") {
      return 14
    }
    if (sectionId === "getting-around") {
      return 10
    }
  }

  if (
    profile.purpose === "live" &&
    profile.nationalityRelation === "domestic"
  ) {
    if (sectionId === "cost-of-living") {
      return 14
    }
    if (sectionId === "neighborhood-fit") {
      return 10
    }
  }

  return 0
}

function getScore(section: SectionCandidate, input: RankSectionsInput): number {
  const base = baseWeights[section.id]
  const purposeBoost = input.profile.purpose
    ? (purposeWeights[input.profile.purpose][section.id] ?? 0)
    : 0
  const nationalityBoost =
    nationalityWeights[input.profile.nationalityRelation][section.id] ?? 0
  const freshnessBoost = isRuntimeSectionId(section.id)
    ? freshnessWeights[input.runtimeFreshness[section.id] ?? "stale"]
    : 0
  const cityOverride = cityWeightOverrides[input.citySlug]?.[section.id] ?? 0
  const staticOverrideBoost = getStaticOverrideBoost(section.id, input.profile)

  return (
    base +
    purposeBoost +
    nationalityBoost +
    freshnessBoost +
    section.completenessBoost +
    cityOverride +
    staticOverrideBoost
  )
}

function compareWithinGroup(a: RankedSection, b: RankedSection): number {
  if (a.id === "at-a-glance" && b.id !== "at-a-glance") {
    return -1
  }

  if (a.id !== "at-a-glance" && b.id === "at-a-glance") {
    return 1
  }

  if (a.score !== b.score) {
    return b.score - a.score
  }

  return a.canonicalOrder - b.canonicalOrder
}

// oxlint-disable-next-line max-statements
function applyGuardrails(
  ordered: RankedSection[],
  profile: PersonalizationProfile
): RankedSection[] {
  const next = [...ordered]

  const atAGlanceIndex = next.findIndex(
    (section) => section.id === "at-a-glance"
  )
  if (atAGlanceIndex > 0) {
    const [atAGlance] = next.splice(atAGlanceIndex, 1)
    next.unshift(atAGlance)
  }

  const safetyIndex = next.findIndex((section) => section.id === "safety")
  if (safetyIndex > 3) {
    const [safety] = next.splice(safetyIndex, 1)
    next.splice(3, 0, safety)
  }

  if (profile.nationalityRelation === "international") {
    const ruleTrapIndex = next.findIndex(
      (section) => section.id === "rule-traps"
    )
    if (ruleTrapIndex > 5) {
      const [ruleTraps] = next.splice(ruleTrapIndex, 1)
      next.splice(5, 0, ruleTraps)
    }
  }

  const topFive = next.slice(0, 5)
  const runtimeInTopFive = topFive.filter((section) =>
    isRuntimeSectionId(section.id)
  )

  if (runtimeInTopFive.length > 2) {
    const runtimeIdsToDemote = runtimeInTopFive
      .slice(2)
      .map((section) => section.id)
    for (const runtimeId of runtimeIdsToDemote) {
      const index = next.findIndex((section) => section.id === runtimeId)
      if (index !== -1) {
        const [section] = next.splice(index, 1)
        next.push(section)
      }
    }
  }

  const weatherIndex = next.findIndex((section) => section.id === "weather-now")
  const climateIndex = next.findIndex((section) => section.id === "climate")

  if (
    weatherIndex !== -1 &&
    climateIndex !== -1 &&
    climateIndex < weatherIndex
  ) {
    const [climate] = next.splice(climateIndex, 1)
    const nextWeatherIndex = next.findIndex(
      (section) => section.id === "weather-now"
    )
    next.splice(nextWeatherIndex + 1, 0, climate)
  }

  return next
}

export function rankSections(input: RankSectionsInput): RankedSection[] {
  const withScores: RankedSection[] = input.sections.map((section) => ({
    ...section,
    score: getScore(section, input),
  }))

  const byGroup = new Map<string, RankedSection[]>()

  for (const section of withScores) {
    const existing = byGroup.get(section.group) ?? []
    existing.push(section)
    byGroup.set(section.group, existing)
  }

  const ordered = SECTION_GROUP_ORDER.flatMap((group) => {
    const groupSections = byGroup.get(group) ?? []
    return groupSections.toSorted(compareWithinGroup)
  })

  return applyGuardrails(ordered, input.profile)
}
