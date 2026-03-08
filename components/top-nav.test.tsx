import { render, screen } from "@testing-library/react"
import type { ComponentProps } from "react"
import type * as NextIntlServerModule from "next-intl/server"
import type * as I18nNavigationModule from "@/i18n/navigation"
import type * as PreferencesPopoverModule from "@/components/preferences-popover"

import { TopNav } from "@/components/top-nav"

type MockLinkProps = ComponentProps<typeof I18nNavigationModule.Link>

function createTranslator(
  valueByKey: Record<string, string>
): Awaited<ReturnType<typeof NextIntlServerModule.getTranslations>> {
  return ((key: string) => valueByKey[key] ?? key) as unknown as Awaited<
    ReturnType<typeof NextIntlServerModule.getTranslations>
  >
}

async function resolveTranslations() {
  return await Promise.resolve(
    createTranslator({
      brand: "Citynote",
    })
  )
}

vi.mock(import("next-intl/server"), async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    getTranslations: resolveTranslations as typeof actual.getTranslations,
  }
})

vi.mock<typeof I18nNavigationModule>(import("@/i18n/navigation"), () => ({
  Link: (({ href, className, children }: MockLinkProps) => (
    <a href={String(href)} className={className}>
      {children}
    </a>
  )) as unknown as typeof I18nNavigationModule.Link,
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
