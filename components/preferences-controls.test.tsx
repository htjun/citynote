import { render, screen } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import type { ComponentProps, ReactNode } from "react"
import type * as I18nNavigationModule from "@/i18n/navigation"

import { PreferencesControls } from "@/components/preferences-controls"
import commonMessages from "@/messages/en/common.json"
import { usePreferences } from "@/lib/stores/preferences"

type MockLinkProps = ComponentProps<typeof I18nNavigationModule.Link>

vi.mock<typeof I18nNavigationModule>(import("@/i18n/navigation"), () => ({
  Link: (({ href, className, children, onClick }: MockLinkProps) => (
    <a href={String(href)} className={className} onClick={onClick}>
      {children}
    </a>
  )) as unknown as typeof I18nNavigationModule.Link,
  usePathname: (() => "/") as typeof I18nNavigationModule.usePathname,
}))

function renderWithIntl(node: ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{ common: commonMessages }}>
      {node}
    </NextIntlClientProvider>
  )
}

function renderControls() {
  localStorage.clear()
  usePreferences.setState({
    nationality: null,
    travelType: null,
  })

  return renderWithIntl(<PreferencesControls />)
}

describe("preferences controls", () => {
  it("renders language, nationality, and purpose controls", () => {
    renderControls()

    expect(document.body.textContent).toMatch(
      /Language[\s\S]*Nationality \(optional\)[\s\S]*Purpose/
    )
    expect(
      screen.getAllByRole("link").map((link) => link.textContent)
    ).toStrictEqual(["EN", "KO"])
    expect(
      screen.getAllByRole("radio").map((control) => control.textContent)
    ).toStrictEqual(["Trip", "Study", "Live"])
    expect(screen.getByRole("button", { name: /Search country/i })).toBeTruthy()
  })
})
