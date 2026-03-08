"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { RiCloseLine, RiMenuLine } from "@remixicon/react"
import { useTranslations } from "next-intl"

import { RuntimeRail } from "@/components/city/runtime-rail"
import { SectionNav } from "@/components/city/section-nav"
import type { SectionNavGroup } from "@/components/city/section-nav"
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
  heroFacts: HeroFact[]
  runtimeInsights: CityRuntimeInsights
  children: ReactNode
}

export function CityPageShell({
  city,
  locale,
  navGroups,
  heroFacts,
  runtimeInsights,
  children,
}: CityPageShellProps) {
  const tShell = useTranslations("city.shell")
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
