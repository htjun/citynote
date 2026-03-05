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

  return (
    <nav className="border-subtlest bg-base border-b">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4 md:px-6">
        <Link
          href="/"
          className="rounded-md text-base font-semibold tracking-tight transition-opacity duration-normal ease-fluid hover:opacity-80"
        >
          {t("brand")}
        </Link>

        <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
          {cityList.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="text-quiet hover:text-foreground hover:bg-subtle rounded-md px-2 py-1 text-xs font-medium transition-[background-color,color] duration-normal ease-fluid md:text-sm"
            >
              {city.name}
            </Link>
          ))}
        </div>

        <div className="ml-auto">
          <PreferencesPopover />
        </div>
      </div>
    </nav>
  )
}
