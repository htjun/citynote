import { render, screen } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import type { ReactNode } from "react"

import { CityNews } from "@/components/city/sections/city-news"
import { CurrencyWatch } from "@/components/city/sections/currency-watch"
import { WeatherNow } from "@/components/city/sections/weather-now"
import cityMessages from "@/messages/en/city.json"
import type {
  CityNewsData,
  CurrencyWatchData,
  WeatherNowData,
} from "@/lib/insights/types"

function renderWithIntl(node: ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{ city: cityMessages }}>
      {node}
    </NextIntlClientProvider>
  )
}

describe("runtime sections", () => {
  it("renders weather section and non-fresh warning", () => {
    const weather: WeatherNowData = {
      condition: "Unavailable",
      temperatureC: null,
      feelsLikeC: null,
      uvIndex: null,
      aqiIndex: null,
      updatedAt: "2026-03-03T10:00:00.000Z",
      meta: {
        provider: "weatherapi",
        fetchedAt: "2026-03-03T10:00:00.000Z",
        freshness: "fallback",
        sourceUrl: "https://www.weatherapi.com/",
      },
    }

    renderWithIntl(<WeatherNow weather={weather} locale="en" />)

    expect(screen.getByText("Weather Now")).toBeTruthy()
    expect(
      screen.getByText(
        "Live weather is not fresh. Verify before making time-sensitive plans."
      )
    ).toBeTruthy()
  })

  it("renders currency unavailable state", () => {
    const currencyWatch: CurrencyWatchData = {
      localCurrency: "KRW",
      quotes: [
        { base: "USD", target: "KRW", rate: null },
        { base: "EUR", target: "KRW", rate: null },
      ],
      asOfDate: null,
      updatedAt: "2026-03-03T10:00:00.000Z",
      meta: {
        provider: "frankfurter",
        fetchedAt: "2026-03-03T10:00:00.000Z",
        freshness: "fallback",
        sourceUrl: "https://frankfurter.dev/",
      },
    }

    renderWithIntl(<CurrencyWatch currencyWatch={currencyWatch} locale="en" />)

    expect(screen.getByText("Currency Watch")).toBeTruthy()
    expect(
      screen.getByText("Live currency quotes are currently unavailable.")
    ).toBeTruthy()
  })

  it("renders news empty state", () => {
    const cityNews: CityNewsData = {
      headlines: [],
      updatedAt: "2026-03-03T10:00:00.000Z",
      meta: {
        provider: "currents",
        fetchedAt: "2026-03-03T10:00:00.000Z",
        freshness: "unavailable",
        sourceUrl: "https://currentsapi.services/en/docs/",
      },
    }

    renderWithIntl(<CityNews cityNews={cityNews} locale="en" />)

    expect(screen.getByText("City News")).toBeTruthy()
    expect(screen.getByText("No headlines available right now.")).toBeTruthy()
  })
})
