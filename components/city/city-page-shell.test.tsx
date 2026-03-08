import { fireEvent, render, screen } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import type { ComponentProps, ReactNode } from "react"
import type * as I18nNavigationModule from "@/i18n/navigation"
import type * as PreferencesPopoverModule from "@/components/preferences-popover"
import type * as RuntimeRailModule from "@/components/city/runtime-rail"

import { CityPageShell } from "@/components/city/city-page-shell"
import type { SectionNavGroup } from "@/components/city/section-nav"
import cityMessages from "@/messages/en/city.json"
import commonMessages from "@/messages/en/common.json"
import type { CityRuntimeInsights } from "@/lib/insights/types"

type MockLinkProps = ComponentProps<typeof I18nNavigationModule.Link>

vi.mock<typeof I18nNavigationModule>(import("@/i18n/navigation"), () => ({
  Link: (({ href, className, children, onClick }: MockLinkProps) => (
    <a href={String(href)} className={className} onClick={onClick}>
      {children}
    </a>
  )) as unknown as typeof I18nNavigationModule.Link,
  usePathname: (() => "/seoul") as typeof I18nNavigationModule.usePathname,
}))

vi.mock<typeof PreferencesPopoverModule>(
  import("@/components/preferences-popover"),
  () => ({
    PreferencesPopover: () => <button type="button">Preferences</button>,
  })
)

vi.mock<typeof RuntimeRailModule>(
  import("@/components/city/runtime-rail"),
  () => ({
    RuntimeRail: (() => (
      <aside>Right Now</aside>
    )) as unknown as typeof RuntimeRailModule.RuntimeRail,
  })
)

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
  it("renders local city header and right rail summary", () => {
    renderWithIntl(
      <CityPageShell
        city={{
          country: "South Korea",
          name: "Seoul",
          tagline: "Dense city rhythm and neighborhood contrast.",
        }}
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
