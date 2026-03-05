import { selectContent } from "@/lib/ia/select-content"
import type { PersonalizationProfile } from "@/lib/ia/types"

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

describe("content selection", () => {
  it("uses concise defaults for trip profile", () => {
    const selection = selectContent(profile("trip", "international"))

    expect(selection.atAGlance.maxItems).toBe(8)
    expect(selection.languageCulture.phraseLimit).toBe(5)
    expect(selection.costOfLiving.emphasize).toBe("daily")
  })

  it("emphasizes monthly planning for live profile", () => {
    const selection = selectContent(profile("live", "domestic"))

    expect(selection.costOfLiving.emphasize).toBe("monthly")
    expect(selection.languageCulture.phraseLimit).toBe(10)
  })

  it("uses compact currency cards for domestic relation", () => {
    const domestic = selectContent(profile("study", "domestic"))
    const international = selectContent(profile("study", "international"))

    expect(domestic.currencyWatch.compact).toBeTruthy()
    expect(international.currencyWatch.compact).toBeFalsy()
  })
})
