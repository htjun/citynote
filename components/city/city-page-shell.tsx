"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { RiCloseLine, RiMenuLine } from "@remixicon/react"
import { useTranslations } from "next-intl"

import { RuntimeRail } from "@/components/city/runtime-rail"
import { SectionNav } from "@/components/city/section-nav"
import type {
  SectionNavGroup,
  SectionNavItem,
} from "@/components/city/section-nav"
import { PreferencesPopover } from "@/components/preferences-popover"
import type { Locale } from "@/i18n/locales"
import type { CityRuntimeInsights } from "@/lib/insights/types"

interface HeroFact {
  label: string
  value: string
}

interface CityPageShellProps {
  city: {
    name: string
    country: string
    tagline: string
  }
  locale: Locale
  navGroups: SectionNavGroup[]
  forYouItems: SectionNavItem[]
  heroFacts: HeroFact[]
  runtimeInsights: CityRuntimeInsights
  children: ReactNode
}

function renderForYouItems(items: SectionNavItem[]) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item, index) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="border-subtlest bg-base hover:bg-subtle inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-medium transition-[background-color,border-color,color] duration-normal ease-fluid"
        >
          <span className="text-quieter">{index + 1}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </div>
  )
}

export function CityPageShell({
  city,
  locale,
  navGroups,
  forYouItems,
  heroFacts,
  runtimeInsights,
  children,
}: CityPageShellProps) {
  const tShell = useTranslations("city.shell")
  const tForYou = useTranslations("city.forYou")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const brandName = "Citynote"

  return (
    <main className="flex h-dvh flex-col overflow-hidden">
      <header className="border-subtlest bg-base/88 shrink-0 border-b backdrop-blur-sm">
        <div className="flex w-full items-center gap-3 px-4 py-3 md:px-5">
          <div className="flex min-w-0 items-center gap-2.5">
            <button
              aria-label={tShell("openMenu")}
              className="border-subtlest bg-raised hover:bg-subtle inline-flex size-9 items-center justify-center rounded-xl border lg:hidden"
              onClick={() => setIsMenuOpen(true)}
              type="button"
            >
              <RiMenuLine aria-hidden="true" className="size-4.5" />
            </button>

            <p className="truncate text-[13px] font-semibold tracking-[0.16em] uppercase">
              {brandName}
            </p>
          </div>

          <div className="ml-auto shrink-0">
            <PreferencesPopover />
          </div>
        </div>
      </header>

      <div className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 overflow-hidden">
        <aside className="border-subtlest bg-base/92 hidden h-full w-[272px] shrink-0 border-r backdrop-blur-sm lg:flex lg:flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-2.5 py-3.5">
            <SectionNav groups={navGroups} mode="sidebar" />
          </div>
        </aside>

        <div className="min-w-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1280px] px-4 py-4 md:px-5 md:py-5">
            <section className="border-subtlest bg-raised rounded-[22px] border p-5 shadow-[var(--shadow-raised)] md:p-6">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-quieter rounded-xl border border-current/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em]">
                  {city.country}
                </span>
                <span className="text-quieter text-xs">
                  {tShell("headerPrefix")}
                </span>
              </div>

              <h1 className="font-editorial mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.94] tracking-[-0.05em] text-balance">
                {city.name}
              </h1>
              <p className="text-quiet mt-3 max-w-2xl text-sm leading-relaxed md:text-base">
                {city.tagline}
              </p>

              {heroFacts.length > 0 ? (
                <div className="mt-5 grid gap-2.5 md:grid-cols-3">
                  {heroFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="border-subtlest bg-base rounded-[16px] border p-3.5"
                    >
                      <p className="text-quieter text-[10px] uppercase tracking-[0.16em]">
                        {fact.label}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {forYouItems.length > 0 ? (
                <div className="mt-5">
                  <div className="mb-2.5">
                    <h2 className="text-sm font-semibold">
                      {tForYou("title")}
                    </h2>
                    <p className="text-quiet mt-1 text-sm leading-relaxed">
                      {tForYou("description")}
                    </p>
                  </div>
                  {renderForYouItems(forYouItems)}
                </div>
              ) : null}
            </section>

            <div className="mt-4 grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1fr)_290px]">
              <div className="flex min-w-0 flex-col gap-4">{children}</div>
              <RuntimeRail
                className="hidden xl:sticky xl:top-4 xl:block xl:self-start"
                locale={locale}
                runtimeInsights={runtimeInsights}
              />
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label={tShell("closeMenu")}
            className="bg-foreground/28 absolute inset-0"
            onClick={() => setIsMenuOpen(false)}
            type="button"
          />
          <div className="border-subtlest bg-base relative h-full w-[88%] max-w-sm border-r">
            <div className="border-subtlest flex items-center justify-between border-b px-4 py-3">
              <p className="text-[13px] font-semibold tracking-[0.16em] uppercase">
                {brandName}
              </p>
              <button
                aria-label={tShell("closeMenu")}
                className="border-subtlest bg-raised hover:bg-subtle inline-flex size-8 items-center justify-center rounded-xl border"
                onClick={() => setIsMenuOpen(false)}
                type="button"
              >
                <RiCloseLine aria-hidden="true" className="size-4" />
              </button>
            </div>
            <div className="h-[calc(100%-73px)] overflow-y-auto p-3.5">
              {forYouItems.length > 0 ? (
                <section className="border-subtlest bg-raised mb-3.5 rounded-[18px] border p-3.5">
                  <h2 className="text-sm font-semibold">{tForYou("title")}</h2>
                  <div className="mt-2.5 space-y-1.5">
                    {forYouItems.map((item, index) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-quiet hover:text-foreground hover:bg-subtle flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm transition-[background-color,color] duration-normal ease-fluid"
                      >
                        <span className="text-quieter text-xs font-medium">
                          {index + 1}
                        </span>
                        <span className="min-w-0 flex-1 truncate">
                          {item.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </section>
              ) : null}

              <SectionNav
                groups={navGroups}
                mode="sidebar"
                onNavigate={() => setIsMenuOpen(false)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
