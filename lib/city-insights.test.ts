import type { LiveSignal } from "@/data/types"
import { formatSignalTimestamp, isSignalStale } from "@/lib/city-insights"

const baseSignal: LiveSignal = {
  name: "transport",
  status: "Operational",
  updatedAt: "2026-03-03T09:00:00+09:00",
  sourceUrl: "https://example.com",
  staleAfterMinutes: 120,
}

describe("city insights helper functions", () => {
  it("marks live signals as fresh inside stale window", () => {
    const now = new Date("2026-03-03T10:30:00+09:00")

    expect(isSignalStale(baseSignal, now)).toBeFalsy()
  })

  it("marks live signals as stale after stale window", () => {
    const now = new Date("2026-03-03T12:30:00+09:00")

    expect(isSignalStale(baseSignal, now)).toBeTruthy()
  })

  it("treats invalid timestamps as stale", () => {
    const now = new Date("2026-03-03T10:00:00+09:00")

    expect(
      isSignalStale({ ...baseSignal, updatedAt: "invalid-timestamp" }, now)
    ).toBeTruthy()
  })

  it("uses fallback label for invalid update timestamp text", () => {
    expect(formatSignalTimestamp("invalid")).toBe("Unknown update time")
  })
})
