import { render, screen } from "@testing-library/react"
import type * as RoutingModule from "@/i18n/routing"
import type * as NextIntlModule from "next-intl"
import type * as NextNavigationModule from "next/navigation"
import type * as TopNavModule from "@/components/top-nav"

import MarketingLayout from "@/app/[locale]/(marketing)/layout"

vi.mock<typeof NextIntlModule>(import("next-intl"), () => ({
  hasLocale: () => true,
}))

vi.mock<typeof RoutingModule>(import("@/i18n/routing"), () => ({
  routing: {
    locales: ["en", "ko"],
  },
}))

vi.mock<typeof NextNavigationModule>(import("next/navigation"), () => ({
  notFound: vi.fn(),
}))

vi.mock<typeof TopNavModule>(import("@/components/top-nav"), () => ({
  TopNav: ({ locale }: { locale: string }) => <nav>mock-top-nav-{locale}</nav>,
}))

describe("marketing layout", () => {
  it("renders top nav and page children", async () => {
    const node = await MarketingLayout({
      children: <div>home-content</div>,
      params: Promise.resolve({ locale: "en" }),
    })

    render(node)

    expect(screen.getByText("mock-top-nav-en")).toBeTruthy()
    expect(screen.getByText("home-content")).toBeTruthy()
  })
})
