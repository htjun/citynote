import { rankSections } from "@/lib/ia/rank-sections"
import type { PersonalizationProfile, SectionCandidate } from "@/lib/ia/types"

function profile(
  purpose: PersonalizationProfile["purpose"],
  nationalityRelation: PersonalizationProfile["nationalityRelation"]
): PersonalizationProfile {
  return {
    purpose,
    nationality: null,
    nationalityRelation,
  }
}

function section(
  id: SectionCandidate["id"],
  group: SectionCandidate["group"],
  canonicalOrder: number,
  completenessBoost = 0
): SectionCandidate {
  return {
    id,
    group,
    canonicalOrder,
    navLabelKey: id,
    completenessBoost,
  }
}

describe("section ranking", () => {
  it("is deterministic for same inputs", () => {
    const sections = [
      section("at-a-glance", "essentials", 0),
      section("getting-around", "essentials", 1),
      section("safety", "essentials", 2),
      section("weather-now", "right-now", 3),
    ]
    const input = {
      sections,
      profile: profile("trip", "international"),
      runtimeFreshness: {
        "weather-now": "fresh",
      },
      citySlug: "seoul",
    } as const

    const first = rankSections(input).map((item) => item.id)
    const second = rankSections(input).map((item) => item.id)

    expect(first).toStrictEqual(second)
  })

  it("pins at-a-glance first even when score is lower", () => {
    const ordered = rankSections({
      sections: [
        section("at-a-glance", "essentials", 0, -200),
        section("getting-around", "essentials", 1),
        section("safety", "essentials", 2),
      ],
      profile: profile("trip", "international"),
      runtimeFreshness: {},
      citySlug: "seoul",
    })

    expect(ordered[0]?.id).toBe("at-a-glance")
  })

  it("applies static trip + international override for rule traps", () => {
    const ordered = rankSections({
      sections: [
        section("getting-around", "essentials", 0),
        section("rule-traps", "essentials", 1),
      ],
      profile: profile("trip", "international"),
      runtimeFreshness: {},
      citySlug: "melbourne",
    })

    expect(ordered[0]?.id).toBe("rule-traps")
  })

  it("demotes runtime sections when freshness is unavailable", () => {
    const ordered = rankSections({
      sections: [
        section("weather-now", "right-now", 0),
        section("currency-watch", "right-now", 1),
      ],
      profile: profile("live", "international"),
      runtimeFreshness: {
        "weather-now": "unavailable",
        "currency-watch": "fresh",
      },
      citySlug: "seoul",
    })

    expect(ordered[0]?.id).toBe("currency-watch")
  })
})
