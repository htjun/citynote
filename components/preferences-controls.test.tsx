import { render, screen } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import type * as I18nNavigationModule from "@/i18n/navigation"
import type { ReactNode } from "react"

import { PreferencesControls } from "@/components/preferences-controls"
import commonMessages from "@/messages/en/common.json"
import { usePreferences } from "@/lib/stores/preferences"

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
  usePathname: () => "/",
}))

function renderWithIntl(node: ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{ common: commonMessages }}>
      {node}
    </NextIntlClientProvider>
  )
}

describe("preferences controls", () => {
  beforeEach(() => {
    localStorage.clear()
    usePreferences.setState({
      nationality: null,
      travelType: null,
    })
  })

  it("renders language, nationality, and purpose controls", () => {
    renderWithIntl(<PreferencesControls />)

    expect(screen.getByText("Language")).toBeTruthy()
    expect(screen.getByText("Nationality (optional)")).toBeTruthy()
    expect(screen.getByText("Purpose")).toBeTruthy()
    expect(screen.getByRole("link", { name: "EN" })).toBeTruthy()
    expect(screen.getByRole("link", { name: "KO" })).toBeTruthy()
    expect(screen.getByRole("radio", { name: "Trip" })).toBeTruthy()
    expect(screen.getByRole("radio", { name: "Study" })).toBeTruthy()
    expect(screen.getByRole("radio", { name: "Live" })).toBeTruthy()
    expect(screen.getByRole("button", { name: /Search country/i })).toBeTruthy()
  })
})
