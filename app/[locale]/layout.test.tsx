import type * as FontsModule from "@/lib/fonts"
import type * as NextIntlModule from "next-intl"
import type * as NextIntlServerModule from "next-intl/server"
import type * as NextNavigationModule from "next/navigation"
import type * as RoutingModule from "@/i18n/routing"
import type { ReactNode } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import LocaleLayout from "@/app/[locale]/layout"

vi.mock<typeof FontsModule>(import("@/lib/fonts"), () => ({
  geistMono: { variable: "font-mono-mock" },
  geistSans: { variable: "font-sans-mock" },
}))

vi.mock<typeof NextIntlModule>(import("next-intl"), () => ({
  NextIntlClientProvider: ({ children }: { children: ReactNode }) => (
    <>{children}</>
  ),
  hasLocale: () => true,
}))

vi.mock<typeof NextIntlServerModule>(import("next-intl/server"), () => ({
  getMessages: async () => {
    const messages = await Promise.resolve({})
    return messages
  },
  getTranslations: async () => {
    const translator = await Promise.resolve(() => "mock-title")
    return translator
  },
  setRequestLocale: vi.fn(),
}))

vi.mock<typeof NextNavigationModule>(import("next/navigation"), () => ({
  notFound: vi.fn(),
}))

vi.mock<typeof RoutingModule>(import("@/i18n/routing"), () => ({
  routing: {
    locales: ["en", "ko"],
  },
}))

describe("locale root layout", () => {
  it("renders providers and children without top nav chrome", async () => {
    const node = await LocaleLayout({
      children: <div>city-content</div>,
      params: Promise.resolve({ locale: "en" }),
    })

    const markup = renderToStaticMarkup(node)

    expect(markup).toContain("city-content")
    expect(markup).not.toContain("mock-top-nav")
  })
})
