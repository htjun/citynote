import type * as NextIntlServerModule from "next-intl/server"
import type { ReactNode } from "react"
import { renderToStaticMarkup } from "react-dom/server"

import LocaleLayout from "@/app/[locale]/layout"

function hasLocale<LocaleType extends string>(
  locales: readonly LocaleType[],
  candidate: unknown
): candidate is LocaleType {
  return locales.includes(candidate as LocaleType)
}

function createTranslator(
  valueByKey: Record<string, string>
): Awaited<ReturnType<typeof NextIntlServerModule.getTranslations>> {
  return ((key: string) => valueByKey[key] ?? key) as unknown as Awaited<
    ReturnType<typeof NextIntlServerModule.getTranslations>
  >
}

async function resolveMessages() {
  return await Promise.resolve({})
}

async function resolveTranslations() {
  return await Promise.resolve(
    createTranslator({
      description: "mock-description",
      title: "mock-title",
    })
  )
}

vi.mock(import("next-intl"), async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    NextIntlClientProvider: (({ children }: { children: ReactNode }) => (
      <>{children}</>
    )) as unknown as typeof actual.NextIntlClientProvider,
    hasLocale: hasLocale as typeof actual.hasLocale,
  }
})

vi.mock(import("next-intl/server"), async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    getMessages: resolveMessages as typeof actual.getMessages,
    getTranslations: resolveTranslations as typeof actual.getTranslations,
    setRequestLocale: vi.fn() as unknown as typeof actual.setRequestLocale,
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
