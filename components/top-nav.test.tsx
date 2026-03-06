import { render, screen } from "@testing-library/react"
import type * as CityDataModule from "@/data/cities"
import type * as NextIntlServerModule from "next-intl/server"
import type * as I18nNavigationModule from "@/i18n/navigation"
import type * as PreferencesPopoverModule from "@/components/preferences-popover"

import { TopNav } from "@/components/top-nav"

vi.mock<typeof CityDataModule>(import("@/data/cities"), () => ({
  getCityList: () => [
    { slug: "seoul", name: "Seoul", country: "South Korea", tagline: "" },
    { slug: "melbourne", name: "Melbourne", country: "Australia", tagline: "" },
  ],
}))

vi.mock<typeof NextIntlServerModule>(import("next-intl/server"), () => ({
  getTranslations: () => (key: string) => (key === "brand" ? "Citynote" : key),
}))

vi.mock<typeof I18nNavigationModule>(import("@/i18n/navigation"), () => ({
  Link: ({ href, className, children }: Record<string, unknown>) => (
    <a href={String(href)} className={String(className)}>
      {children as string}
    </a>
  ),
}))

vi.mock<typeof PreferencesPopoverModule>(
  import("@/components/preferences-popover"),
  () => ({
    PreferencesPopover: () => <button type="button">Preferences</button>,
  })
)

describe("top nav shell", () => {
  it("uses base/surface token classes", async () => {
    const node = await TopNav({ locale: "en" as never })
    render(node)

    const nav = screen.getByRole("navigation")
    expect(nav.className).toContain("bg-base")
    expect(nav.className).toContain("border-subtlest")

    const [cityLink] = screen.getAllByRole("link", { name: "Seoul" })
    expect(cityLink.className).toContain("text-quiet")
    expect(cityLink.className).toContain("hover:bg-subtle")
  })
})
