import {
  getCityRuntimeConfig,
  cityRuntimeConfigBySlug,
} from "@/data/city-runtime-config"

describe("city runtime config", () => {
  it("returns undefined for unknown slugs", () => {
    expect(getCityRuntimeConfig("unknown-city")).toBeUndefined()
  })

  it("returns the configured object for known slugs", () => {
    expect(getCityRuntimeConfig("melbourne")).toBe(
      cityRuntimeConfigBySlug.melbourne
    )
  })
})
