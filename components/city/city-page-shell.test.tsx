import { fireEvent, render, screen } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import type * as I18nNavigationModule from "@/i18n/navigation"
import type { ReactNode } from "react"

import { CityPageShell } from "@/components/city/city-page-shell"
import type {
  SectionNavGroup,
  SectionNavItem,
} from "@/components/city/section-nav"
import cityMessages from "@/messages/en/city.json"
import commonMessages from "@/messages/en/common.json"
import type { CityRuntimeInsights } from "@/lib/insights/types"

vi.mock<typeof I18nNavigationModule>(import("@/i18n/navigation"), () => ({
  Link: ({
    href,
    className,
    children,
    onClick,
  }: {
    href: string
    className?: string
    children: ReactNode
    onClick?: () => void
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
  usePathname: () => "/seoul",
}))

function renderWithIntl(node: ReactNode) {
  return render(
    <NextIntlClientProvider
      locale="en"
      messages={{ city: cityMessages, common: commonMessages }}
    >
      {node}
    </NextIntlClientProvider>
  )
}

const navGroups: SectionNavGroup[] = [
  {
    id: "essentials",
    label: "Essentials",
    items: [
      { id: "at-a-glance", label: "At a Glance" },
      { id: "live-pulse", label: "Live Pulse" },
    ],
  },
]

const forYouItems: SectionNavItem[] = [
  { id: "live-pulse", label: "Live Pulse" },
  { id: "weather-now", label: "Weather Now" },
  { id: "currency-watch", label: "Currency Watch" },
]

const heroFacts = [
  { label: "Best months", value: "Apr-Jun, Sep-Oct" },
  { label: "Mid-range", value: "$95-160/day" },
  { label: "Neighborhoods", value: "Myeongdong · Hongdae" },
]

const runtimeInsights: CityRuntimeInsights = {
  weatherNow: {
    condition: "Clear",
    temperatureC: 22.3,
    feelsLikeC: 21.8,
    uvIndex: 4.2,
    aqiIndex: 15.2,
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
    quotes: [{ base: "USD", target: "KRW", rate: 1380.51 }],
    asOfDate: "2026-03-05",
    updatedAt: "2026-03-05T09:10:00.000Z",
    meta: {
      provider: "frankfurter",
      fetchedAt: "2026-03-05T09:10:00.000Z",
      freshness: "fresh",
      sourceUrl: "https://frankfurter.dev/",
    },
  },
  cityNews: {
    headlines: [
      {
        id: "h1",
        title: "City opens new late-night transit corridor",
        url: "https://example.com/news-1",
        source: "Example",
        publishedAt: "2026-03-05T08:10:00.000Z",
        language: "en",
        provider: "feed",
        relevanceScore: 0.8,
        relevanceSignals: ["city"],
        sourceTier: 1,
      },
    ],
    updatedAt: "2026-03-05T09:10:00.000Z",
    meta: {
      provider: "news-sources",
      fetchedAt: "2026-03-05T09:10:00.000Z",
      freshness: "fresh",
      sourceUrl: "https://www.sbs.com.au/news/feeds/",
    },
  },
}

describe("city page shell", () => {
  it("renders local city header, for-you block, and right rail summary", () => {
    renderWithIntl(
      <CityPageShell
        city={{
          country: "South Korea",
          name: "Seoul",
          tagline: "Dense city rhythm and neighborhood contrast.",
        }}
        forYouItems={forYouItems}
        heroFacts={heroFacts}
        locale="en"
        navGroups={navGroups}
        runtimeInsights={runtimeInsights}
      >
        <section>
          <h2>Section Content</h2>
        </section>
      </CityPageShell>
    )

    expect(screen.getByText("Citynote Guide")).toBeTruthy()
    expect(screen.getByText("For You Now")).toBeTruthy()
    expect(
      screen.getAllByRole("link", { name: "Live Pulse" }).length
    ).toBeGreaterThan(0)
    expect(screen.getByRole("button", { name: "Preferences" })).toBeTruthy()
    expect(screen.getByText("Right Now")).toBeTruthy()
    expect(screen.getByText("Section Content")).toBeTruthy()
  })

  it("opens the mobile drawer menu and renders close controls", () => {
    renderWithIntl(
      <CityPageShell
        city={{
          country: "South Korea",
          name: "Seoul",
          tagline: "Dense city rhythm and neighborhood contrast.",
        }}
        forYouItems={forYouItems}
        heroFacts={heroFacts}
        locale="en"
        navGroups={navGroups}
        runtimeInsights={runtimeInsights}
      >
        <section>
          <h2>Section Content</h2>
        </section>
      </CityPageShell>
    )

    fireEvent.click(screen.getByLabelText("Open city menu"))

    expect(screen.getAllByLabelText("Close city menu").length).toBeGreaterThan(
      0
    )
    expect(
      screen.getAllByRole("link", { name: "At a Glance" }).length
    ).toBeGreaterThan(1)
  })
})
