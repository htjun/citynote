import { render, screen } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import type { ReactNode } from "react"

import { RuntimeRail } from "@/components/city/runtime-rail"
import cityMessages from "@/messages/en/city.json"
import type { CityRuntimeInsights } from "@/lib/insights/types"

function renderWithIntl(node: ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{ city: cityMessages }}>
      {node}
    </NextIntlClientProvider>
  )
}

describe("runtime rail", () => {
  it("renders compact weather, fx, and news cards", () => {
    const runtimeInsights: CityRuntimeInsights = {
      weatherNow: {
        condition: "Cloudy",
        temperatureC: 17.2,
        feelsLikeC: 16.4,
        uvIndex: 3.2,
        aqiIndex: 18.3,
        updatedAt: "2026-03-05T09:10:00.000Z",
        meta: {
          provider: "weatherapi",
          fetchedAt: "2026-03-05T09:10:00.000Z",
          freshness: "fresh",
          sourceUrl: "https://www.weatherapi.com/",
        },
      },
      currencyWatch: {
        localCurrency: "KRW",
        quotes: [{ base: "USD", target: "KRW", rate: 1388.12 }],
        asOfDate: "2026-03-05",
        updatedAt: "2026-03-05T09:10:00.000Z",
        meta: {
          provider: "frankfurter",
          fetchedAt: "2026-03-05T09:10:00.000Z",
          freshness: "stale",
          sourceUrl: "https://frankfurter.dev/",
        },
      },
      cityNews: {
        headlines: [
          {
            id: "1",
            title: "Transit service changes this week",
            url: "https://example.com/transit",
            source: "Example News",
            publishedAt: "2026-03-05T08:00:00.000Z",
            language: "en",
            provider: "feed",
            relevanceScore: 0.9,
            relevanceSignals: ["city"],
            sourceTier: 1,
          },
        ],
        updatedAt: "2026-03-05T09:10:00.000Z",
        meta: {
          provider: "news-sources",
          fetchedAt: "2026-03-05T09:10:00.000Z",
          freshness: "fallback",
          sourceUrl: "https://www.sbs.com.au/news/feeds/",
        },
      },
    }

    renderWithIntl(
      <RuntimeRail locale="en" runtimeInsights={runtimeInsights} />
    )

    expect(screen.getByText("Right Now")).toBeTruthy()
    expect(screen.getByRole("link", { name: "Weather Now" })).toBeTruthy()
    expect(screen.getByText("Cloudy")).toBeTruthy()
    expect(screen.getByText("1 USD = 1388.12 KRW")).toBeTruthy()
    expect(
      screen.getByRole("link", { name: "Transit service changes this week" })
    ).toBeTruthy()
  })

  it("renders empty headline fallback state", () => {
    const runtimeInsights: CityRuntimeInsights = {
      weatherNow: {
        condition: "Unavailable",
        temperatureC: null,
        feelsLikeC: null,
        uvIndex: null,
        aqiIndex: null,
        updatedAt: "2026-03-05T09:10:00.000Z",
        meta: {
          provider: "weatherapi",
          fetchedAt: "2026-03-05T09:10:00.000Z",
          freshness: "unavailable",
          sourceUrl: "https://www.weatherapi.com/",
        },
      },
      currencyWatch: {
        localCurrency: "KRW",
        quotes: [],
        asOfDate: null,
        updatedAt: "2026-03-05T09:10:00.000Z",
        meta: {
          provider: "frankfurter",
          fetchedAt: "2026-03-05T09:10:00.000Z",
          freshness: "unavailable",
          sourceUrl: "https://frankfurter.dev/",
        },
      },
      cityNews: {
        headlines: [],
        updatedAt: "2026-03-05T09:10:00.000Z",
        meta: {
          provider: "news-sources",
          fetchedAt: "2026-03-05T09:10:00.000Z",
          freshness: "unavailable",
          sourceUrl: "https://www.sbs.com.au/news/feeds/",
        },
      },
    }

    renderWithIntl(
      <RuntimeRail locale="en" runtimeInsights={runtimeInsights} />
    )

    expect(screen.getByText("No headlines available right now.")).toBeTruthy()
    expect(screen.getByText("N/A · feels like N/A")).toBeTruthy()
  })
})
