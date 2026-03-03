import { getCityList } from "@/data/cities"
import { defaultLocale, locales } from "@/i18n/locales"

describe("city insights data quality", () => {
  it("requires source and verification date for every rule trap", () => {
    for (const locale of locales) {
      const cityList = getCityList(locale)

      for (const city of cityList) {
        const traps = city.ruleTraps
        expect(traps).toBeDefined()

        for (const trap of traps as NonNullable<typeof traps>) {
          expect(trap.sourceUrl.length).toBeGreaterThan(0)
          expect(trap.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        }
      }
    }
  })

  it("uses parseable timestamps for live pulse cards", () => {
    for (const locale of locales) {
      const cityList = getCityList(locale)

      for (const city of cityList) {
        const { livePulse } = city
        expect(livePulse).toBeDefined()

        for (const signal of livePulse as NonNullable<typeof livePulse>) {
          expect(Number.isNaN(Date.parse(signal.updatedAt))).toBeFalsy()
        }
      }
    }
  })

  it("requires neighborhood fit and accessibility data for each city", () => {
    for (const locale of locales) {
      const cityList = getCityList(locale)

      for (const city of cityList) {
        expect(city.neighborhoodFit).toBeDefined()
        expect(city.neighborhoodFit?.length).toBeTruthy()
        expect(city.accessibility).toBeDefined()
        expect(city.accessibility?.notes.length).toBeTruthy()
      }
    }
  })

  it("keeps city slug coverage identical across locales", () => {
    const baseSlugs = getCityList(defaultLocale)
      .map((city) => city.slug)
      .toSorted()

    for (const locale of locales) {
      const localeSlugs = getCityList(locale)
        .map((city) => city.slug)
        .toSorted()

      expect(localeSlugs).toStrictEqual(baseSlugs)
    }
  })
})
