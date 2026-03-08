import { render, screen } from "@testing-library/react"
import type * as TopNavModule from "@/components/top-nav"

import MarketingLayout from "@/app/[locale]/(marketing)/layout"

function hasLocale<LocaleType extends string>(
  locales: readonly LocaleType[],
  candidate: unknown
): candidate is LocaleType {
  return locales.includes(candidate as LocaleType)
}

vi.mock(import("next-intl"), async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    hasLocale: hasLocale as typeof actual.hasLocale,
  }
})

vi.mock(import("next/navigation"), async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    notFound: (() => {
      throw new Error("notFound")
    }) as typeof actual.notFound,
  }
})

vi.mock(import("@/components/top-nav"), () => ({
  TopNav: (({ locale }: { locale: string }) => (
    <nav>mock-top-nav-{locale}</nav>
  )) as unknown as typeof TopNavModule.TopNav,
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
