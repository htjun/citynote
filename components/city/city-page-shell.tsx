"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import {
  RiAddLine,
  RiArrowRightLine,
  RiCloseLine,
  RiMenuLine,
  RiSparklingLine,
} from "@remixicon/react"
import { useTranslations } from "next-intl"

import { RuntimeRail } from "@/components/city/runtime-rail"
import { SectionNav } from "@/components/city/section-nav"
import type {
  SectionNavGroup,
  SectionNavItem,
} from "@/components/city/section-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="border-subtlest bg-base hover:bg-subtle inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-[background-color,border-color,color] duration-normal ease-fluid"
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

  return (
    <main className="min-h-dvh">
      <div className="mx-auto flex w-full max-w-[1600px]">
        <aside className="border-subtlest bg-base/92 hidden h-dvh w-[272px] shrink-0 border-r backdrop-blur-sm lg:flex lg:flex-col">
          <div className="border-subtlest border-b p-4">
            <div className="border-subtlest bg-raised rounded-[28px] border p-4 shadow-[var(--shadow-subtle)]">
              <p className="text-quieter text-[11px] uppercase tracking-[0.18em]">
                {tShell("headerPrefix")}
              </p>
              <h1 className="font-editorial mt-3 text-4xl leading-none tracking-[-0.04em]">
                {city.name}
              </h1>
              <p className="text-quiet mt-3 text-sm leading-relaxed">
                {city.tagline}
              </p>
            </div>
          </div>

          {forYouItems.length > 0 ? (
            <div className="p-4 pb-0">
              <section className="border-subtlest bg-raised rounded-[28px] border p-4 shadow-[var(--shadow-subtle)]">
                <div className="flex items-center gap-2">
                  <RiSparklingLine aria-hidden="true" className="size-4" />
                  <h2 className="text-sm font-semibold">{tForYou("title")}</h2>
                </div>
                <p className="text-quiet mt-2 text-xs leading-relaxed">
                  {tForYou("description")}
                </p>
                <div className="mt-4 space-y-2">
                  {forYouItems.map((item, index) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="text-quiet hover:text-foreground hover:bg-subtle flex items-center gap-3 rounded-[20px] px-3 py-2.5 text-sm transition-[background-color,color] duration-normal ease-fluid"
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
            </div>
          ) : null}

          <div className="flex-1 overflow-y-auto p-4">
            <SectionNav groups={navGroups} mode="sidebar" />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="border-subtlest bg-base/88 sticky top-0 z-20 border-b backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-[1280px] items-center gap-3 px-4 py-4 md:px-6">
              <button
                aria-label={tShell("openMenu")}
                className="border-subtlest bg-raised hover:bg-subtle inline-flex size-10 items-center justify-center rounded-full border lg:hidden"
                onClick={() => setIsMenuOpen(true)}
                type="button"
              >
                <RiMenuLine aria-hidden="true" className="size-5" />
              </button>

              <div className="min-w-0">
                <p className="text-quieter text-[11px] uppercase tracking-[0.18em]">
                  {city.country}
                </p>
                <p className="truncate text-sm font-semibold md:text-base">
                  {city.name}
                </p>
              </div>

              <div className="hidden min-w-0 flex-1 lg:block">
                <Input
                  aria-label={tShell("searchLabel")}
                  className="h-11 rounded-full bg-base px-4 text-sm"
                  placeholder={tShell("searchPlaceholder", { city: city.name })}
                  type="search"
                />
              </div>

              <div className="ml-auto hidden items-center gap-2 md:flex">
                <Button size="sm" variant="ghost" type="button">
                  {tShell("saveAction")}
                </Button>
                <Button size="sm" variant="outline" type="button">
                  {tShell("shareAction")}
                </Button>
              </div>
            </div>
          </header>

          <div className="mx-auto w-full max-w-[1280px] px-4 py-6 md:px-6">
            <section className="border-subtlest bg-raised rounded-[32px] border p-6 shadow-[var(--shadow-raised)] md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-quieter rounded-full border border-current/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em]">
                  {city.country}
                </span>
                <span className="text-quieter text-xs">
                  {tShell("headerPrefix")}
                </span>
              </div>

              <h1 className="font-editorial mt-5 max-w-4xl text-[clamp(3rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.05em] text-balance">
                {city.name}
              </h1>
              <p className="text-quiet mt-5 max-w-3xl text-base leading-relaxed md:text-lg">
                {city.tagline}
              </p>

              {heroFacts.length > 0 ? (
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {heroFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="border-subtlest bg-base rounded-[24px] border p-4"
                    >
                      <p className="text-quieter text-[11px] uppercase tracking-[0.16em]">
                        {fact.label}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed">
                        {fact.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {forYouItems.length > 0 ? (
                <div className="mt-6">
                  <div className="mb-3">
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

            <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_310px]">
              <div className="flex min-w-0 flex-col gap-5">{children}</div>
              <RuntimeRail
                className="hidden xl:sticky xl:top-[96px] xl:block xl:self-start"
                locale={locale}
                runtimeInsights={runtimeInsights}
              />
            </div>

            <section className="border-subtlest bg-raised mt-6 rounded-[30px] border p-4 shadow-[var(--shadow-subtle)]">
              <p className="text-sm font-semibold">{tShell("followUpTitle")}</p>
              <div className="border-subtlest bg-base mt-3 flex items-center gap-3 rounded-[26px] border p-4 shadow-[var(--shadow-subtle)]">
                <span className="bg-subtle inline-flex size-11 shrink-0 items-center justify-center rounded-full">
                  <RiAddLine aria-hidden="true" className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-quieter truncate text-base">
                    {tShell("followUpPlaceholder", { city: city.name })}
                  </p>
                </div>
                <span className="bg-subtle inline-flex size-11 shrink-0 items-center justify-center rounded-full">
                  <RiArrowRightLine aria-hidden="true" className="size-4" />
                </span>
              </div>
              <p className="text-quiet mt-3 text-sm leading-relaxed">
                {tShell("followUpHint")}
              </p>
            </section>
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
            <div className="border-subtlest flex items-center justify-between border-b px-4 py-4">
              <div>
                <p className="text-quieter text-[11px] uppercase tracking-[0.18em]">
                  {city.country}
                </p>
                <p className="font-editorial mt-2 text-3xl leading-none tracking-[-0.03em]">
                  {city.name}
                </p>
              </div>
              <button
                aria-label={tShell("closeMenu")}
                className="border-subtlest bg-raised hover:bg-subtle inline-flex size-9 items-center justify-center rounded-full border"
                onClick={() => setIsMenuOpen(false)}
                type="button"
              >
                <RiCloseLine aria-hidden="true" className="size-4" />
              </button>
            </div>
            <div className="h-[calc(100%-81px)] overflow-y-auto p-4">
              {forYouItems.length > 0 ? (
                <section className="border-subtlest bg-raised mb-4 rounded-[24px] border p-4">
                  <h2 className="text-sm font-semibold">{tForYou("title")}</h2>
                  <div className="mt-3 space-y-2">
                    {forYouItems.map((item, index) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-quiet hover:text-foreground hover:bg-subtle flex items-center gap-3 rounded-[18px] px-3 py-2 text-sm transition-[background-color,color] duration-normal ease-fluid"
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
