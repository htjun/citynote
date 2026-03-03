import { parseFrankfurterPayload } from "@/lib/insights/providers/frankfurter"

describe("frankfurter parser", () => {
  it("parses rate payload for a target currency", () => {
    const parsed = parseFrankfurterPayload(
      {
        amount: 1,
        base: "USD",
        date: "2026-03-03",
        rates: {
          AUD: 1.53,
        },
      },
      "AUD"
    )

    expect(parsed).toStrictEqual({
      date: "2026-03-03",
      rate: 1.53,
    })
  })

  it("returns null for malformed response", () => {
    expect(
      parseFrankfurterPayload({ date: "2026-03-03", rates: [] }, "AUD")
    ).toBeNull()
    expect(parseFrankfurterPayload({}, "AUD")).toBeNull()
  })
})
