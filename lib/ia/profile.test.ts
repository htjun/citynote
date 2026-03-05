import {
  buildPersonalizationProfile,
  deriveNationalityRelation,
} from "@/lib/ia/profile"

describe("personalization profile", () => {
  it("derives domestic relation when nationality matches city country", () => {
    expect(deriveNationalityRelation("au", "AU")).toBe("domestic")
  })

  it("derives international relation when nationality differs", () => {
    expect(deriveNationalityRelation("US", "KR")).toBe("international")
  })

  it("returns unknown relation when nationality is missing", () => {
    expect(deriveNationalityRelation(null, "AU")).toBe("unknown")
  })

  it("builds normalized profile values", () => {
    const profile = buildPersonalizationProfile({
      personalization: {
        purpose: "LIVE",
        nationality: "kr",
      },
      cityCountryCode: "KR",
    })

    expect(profile).toMatchObject({
      purpose: "live",
      nationality: "KR",
      nationalityRelation: "domestic",
    })
  })
})
