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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Locale } from "@/i18n/locales"
import type { CityRuntimeInsights } from "@/lib/insights/types"

interface CityPageShellProps {
  city: {
    name: string
    country: string
    tagline: string
  }
  locale: Locale
  navGroups: SectionNavGroup[]
  forYouItems: SectionNavItem[]
  runtimeInsights: CityRuntimeInsights
  children: ReactNode
}

export function CityPageShell({
  city,
  locale,
  navGroups,
  forYouItems,
  runtimeInsights,
  children,
}: CityPageShellProps) {
  const tShell = useTranslations("city.shell")
  const tForYou = useTranslations("city.forYou")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <main className="border-subtlest bg-base min-h-dvh border-y">
      <div className="mx-auto flex w-full max-w-[1500px]">
        <aside className="border-subtlest bg-base hidden h-dvh w-[232px] shrink-0 border-r md:flex md:flex-col">
          <div className="border-subtlest border-b px-4 py-4">
            <p className="text-quieter text-[11px] uppercase tracking-[0.14em]">
              {city.country}
            </p>
            <h1 className="mt-2 text-lg font-semibold tracking-tight">
              {city.name}
            </h1>
            <p className="text-quiet mt-1 text-xs leading-snug">
              {city.tagline}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <SectionNav groups={navGroups} mode="sidebar" />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="border-subtlest bg-base/95 sticky top-0 z-20 border-b backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-[1240px] items-center gap-3 px-4 py-3 md:px-6">
              <button
                aria-label={tShell("openMenu")}
                className="border-subtlest bg-raised hover:bg-subtle inline-flex size-9 items-center justify-center rounded-lg border md:hidden"
                onClick={() => setIsMenuOpen(true)}
                type="button"
              >
                <RiMenuLine aria-hidden="true" className="size-5" />
              </button>

              <div className="min-w-0 flex-1">
                <p className="text-quieter text-[11px] uppercase tracking-[0.14em]">
                  {tShell("headerPrefix")}
                </p>
                <p className="truncate text-sm font-semibold md:text-base">
                  {city.name}
                </p>
              </div>

              <div className="hidden w-full max-w-sm items-center gap-2 lg:flex">
                <Input
                  aria-label={tShell("searchLabel")}
                  placeholder={tShell("searchPlaceholder", { city: city.name })}
                  type="search"
                />
                <Button size="sm" variant="outline" type="button">
                  {tShell("searchAction")}
                </Button>
              </div>

              <div className="hidden items-center gap-2 md:flex">
                <Button size="sm" variant="ghost" type="button">
                  {tShell("saveAction")}
                </Button>
                <Button size="sm" variant="outline" type="button">
                  {tShell("shareAction")}
                </Button>
              </div>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-4 py-6 md:px-6">
            {forYouItems.length > 0 ? (
              <section className="border-subtlest bg-raised rounded-2xl border p-4">
                <div className="space-y-1">
                  <h2 className="text-sm font-semibold md:text-base">
                    {tForYou("title")}
                  </h2>
                  <p className="text-quiet text-xs md:text-sm">
                    {tForYou("description")}
                  </p>
                </div>
                <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                  {forYouItems.map((item, index) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="border-subtlest bg-base hover:bg-subtle inline-flex w-full items-center rounded-xl border px-3 py-2 text-sm transition-[background-color,color,border-color] duration-normal ease-fluid"
                      >
                        <span className="text-quieter mr-2 text-xs">
                          {index + 1}.
                        </span>
                        <span className="min-w-0 flex-1 truncate">
                          {item.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_296px]">
              <div className="flex min-w-0 flex-col gap-6">{children}</div>
              <RuntimeRail
                className="hidden xl:sticky xl:top-[88px] xl:block xl:self-start"
                locale={locale}
                runtimeInsights={runtimeInsights}
              />
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            aria-label={tShell("closeMenu")}
            className="bg-foreground/35 absolute inset-0"
            onClick={() => setIsMenuOpen(false)}
            type="button"
          />
          <div className="border-subtlest bg-base relative h-full w-[86%] max-w-xs border-r">
            <div className="border-subtlest flex items-center justify-between border-b px-4 py-3">
              <div>
                <p className="text-quieter text-[11px] uppercase tracking-[0.14em]">
                  {city.country}
                </p>
                <p className="text-sm font-semibold">{city.name}</p>
              </div>
              <button
                aria-label={tShell("closeMenu")}
                className="border-subtlest bg-raised hover:bg-subtle inline-flex size-8 items-center justify-center rounded-lg border"
                onClick={() => setIsMenuOpen(false)}
                type="button"
              >
                <RiCloseLine aria-hidden="true" className="size-4" />
              </button>
            </div>
            <div className="h-[calc(100%-64px)] overflow-y-auto px-3 py-4">
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
