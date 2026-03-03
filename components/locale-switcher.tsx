"use client"

import { Link, usePathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { useLocale, useTranslations } from "next-intl"

export function LocaleSwitcher() {
  const t = useTranslations("common.nav")
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <div
      aria-label={t("languageSwitcherLabel")}
      className="flex items-center gap-1 rounded-md border border-transparent"
    >
      {routing.locales.map((nextLocale) => {
        const active = nextLocale === locale

        return (
          <Link
            key={nextLocale}
            href={pathname}
            locale={nextLocale}
            aria-current={active ? "true" : undefined}
            className={
              active
                ? "bg-muted text-foreground rounded px-2 py-1 text-xs font-semibold"
                : "text-muted-foreground hover:text-foreground rounded px-2 py-1 text-xs font-medium"
            }
          >
            {t(`locales.${nextLocale}`)}
          </Link>
        )
      })}
    </div>
  )
}
