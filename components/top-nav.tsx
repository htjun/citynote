import { getCityList } from "@/data/cities"
import type { Locale } from "@/i18n/locales"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"

import { LocaleSwitcher } from "@/components/locale-switcher"

interface TopNavProps {
  locale: Locale
}

export async function TopNav({ locale }: TopNavProps) {
  const t = await getTranslations("common.nav")
  const cityList = getCityList(locale)

  return (
    <nav className="border-border/80 bg-background border-b">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4 md:px-6">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          {t("brand")}
        </Link>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          {cityList.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              {city.name}
            </Link>
          ))}
        </div>

        <div className="ml-auto">
          <LocaleSwitcher />
        </div>
      </div>
    </nav>
  )
}
