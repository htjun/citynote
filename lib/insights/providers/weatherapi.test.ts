import { parseWeatherApiPayload } from "@/lib/insights/providers/weatherapi"

describe("weatherapi parser", () => {
  it("parses current weather payload", () => {
    const parsed = parseWeatherApiPayload({
      current: {
        temp_c: 22.5,
        feelslike_c: 21.9,
        uv: 7.3,
        last_updated_epoch: 1_777_777_777,
        condition: {
          text: "Partly cloudy",
        },
        air_quality: {
          "us-epa-index": 2,
        },
      },
    })

    expect(parsed).toStrictEqual({
      condition: "Partly cloudy",
      temperatureC: 22.5,
      feelsLikeC: 21.9,
      uvIndex: 7.3,
      aqiIndex: 2,
      updatedAt: new Date(1_777_777_777 * 1000).toISOString(),
    })
  })

  it("returns null for malformed payload", () => {
    expect(parseWeatherApiPayload({ current: {} })).toBeNull()
    expect(parseWeatherApiPayload(null)).toBeNull()
  })
})
