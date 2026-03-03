import {
  getCurrencyBases,
  providerCadenceSeconds,
} from "@/lib/insights/cadence"

describe("insights cadence", () => {
  it("uses cost-minimal default refresh cadence", () => {
    expect(providerCadenceSeconds.weather).toBe(3 * 60 * 60)
    expect(providerCadenceSeconds.currency).toBe(24 * 60 * 60)
    expect(providerCadenceSeconds.news).toBe(12 * 60 * 60)
  })

  it("uses USD/EUR currency bases by default", () => {
    const previous = process.env.CURRENCY_BASES
    delete process.env.CURRENCY_BASES

    expect(getCurrencyBases()).toStrictEqual(["USD", "EUR"])

    process.env.CURRENCY_BASES = previous
  })
})
