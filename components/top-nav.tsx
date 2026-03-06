import {
  RiCompass3Line,
  RiMapPinLine,
  RiSearchLine,
  RiSparklingLine,
} from "@remixicon/react"
import { getCityList } from "@/data/cities"
import type { Locale } from "@/i18n/locales"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"

import { PreferencesPopover } from "@/components/preferences-popover"

interface TopNavProps {
  locale: Locale
}

export async function TopNav({ locale }: TopNavProps) {
  const t = await getTranslations("common.nav")
  const cityList = getCityList(locale)
  const [featuredCity] = cityList

  return (
    <nav className="border-subtlest bg-base supports-[backdrop-filter]:bg-base/88 border-b backdrop-blur-sm lg:sticky lg:top-0 lg:flex lg:min-h-dvh lg:flex-col lg:border-r lg:border-b-0">
      <div className="border-subtlest flex items-center gap-3 border-b px-4 py-4 lg:hidden">
        <Link
          href="/"
          className="text-foreground rounded-full border border-transparent px-3 py-1.5 text-sm font-semibold tracking-tight transition-[background-color,opacity] duration-normal ease-fluid hover:bg-subtle"
        >
          {t("brand")}
        </Link>

        <div className="ml-auto">
          <PreferencesPopover />
        </div>
      </div>

      <div className="border-subtlest overflow-x-auto border-b px-4 py-3 lg:hidden">
        <div className="flex min-w-max items-center gap-2">
          <Link
            href="/"
            className="text-foreground bg-raised border-subtlest inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium"
          >
            <RiSearchLine aria-hidden="true" className="size-3.5" />
            {t("discover")}
          </Link>
          {cityList.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="text-quiet hover:text-foreground hover:bg-subtle rounded-full px-3 py-1.5 text-xs font-medium transition-[background-color,color] duration-normal ease-fluid"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="hidden h-full lg:flex lg:flex-col">
        <div className="border-subtlest border-b p-4">
          <Link
            href="/"
            className="border-subtlest bg-raised hover:bg-subtle block rounded-[28px] border p-4 transition-[background-color,border-color,box-shadow] duration-normal ease-fluid"
          >
            <div className="flex items-start gap-3">
              <span className="bg-base inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/60 shadow-[var(--shadow-subtle)]">
                <RiCompass3Line aria-hidden="true" className="size-5" />
              </span>
              <div>
                <p className="text-quieter text-[11px] uppercase tracking-[0.18em]">
                  {t("discover")}
                </p>
                <p className="mt-1 text-lg font-semibold tracking-tight">
                  {t("brand")}
                </p>
                <p className="text-quiet mt-2 text-sm leading-relaxed">
                  {t("sidebarDescription")}
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="space-y-3 p-4">
          <div className="border-subtlest bg-raised rounded-[28px] border p-2">
            <Link
              href="/"
              className="text-foreground bg-base inline-flex w-full items-center gap-3 rounded-[20px] px-3 py-3 text-sm font-medium shadow-[var(--shadow-subtle)]"
            >
              <RiSearchLine aria-hidden="true" className="size-4" />
              <span>{t("discover")}</span>
            </Link>

            {featuredCity ? (
              <Link
                href={`/${featuredCity.slug}`}
                className="text-quiet hover:text-foreground hover:bg-subtle mt-1 inline-flex w-full items-center gap-3 rounded-[20px] px-3 py-3 text-sm font-medium transition-[background-color,color] duration-normal ease-fluid"
              >
                <RiSparklingLine aria-hidden="true" className="size-4" />
                <span>{t("featuredGuide", { city: featuredCity.name })}</span>
              </Link>
            ) : null}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="border-subtlest bg-raised rounded-[28px] border p-4">
            <p className="text-quieter text-[11px] uppercase tracking-[0.18em]">
              {t("cityGuides")}
            </p>
            <div className="mt-3 space-y-1">
              {cityList.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="text-quiet hover:text-foreground hover:bg-subtle flex items-start gap-3 rounded-[20px] px-3 py-3 text-sm transition-[background-color,color] duration-normal ease-fluid"
                >
                  <RiMapPinLine
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0"
                  />
                  <span className="min-w-0">
                    <span className="block font-medium">{city.name}</span>
                    <span className="text-quieter mt-0.5 block text-xs leading-relaxed">
                      {city.tagline}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-subtlest border-t p-4">
          <div className="border-subtlest bg-raised rounded-[28px] border p-4">
            <p className="text-quieter text-[11px] uppercase tracking-[0.18em]">
              {t("personalize")}
            </p>
            <p className="text-quiet mt-2 text-sm leading-relaxed">
              {t("personalizeDescription")}
            </p>
            <div className="mt-4 flex items-center justify-between gap-3">
              <PreferencesPopover />
              <span className="text-quieter rounded-full border border-current/10 px-2.5 py-1 text-[11px] font-medium">
                {t("languageSwitcherLabel")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
