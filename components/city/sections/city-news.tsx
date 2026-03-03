import { useTranslations } from "next-intl"

import { SectionHeader } from "@/components/city/section-header"
import { Badge } from "@/components/ui/badge"
import type { Locale } from "@/i18n/locales"
import { formatSignalTimestamp } from "@/lib/city-insights"
import type { CityNewsData } from "@/lib/insights/types"

interface CityNewsProps {
  cityNews: CityNewsData
  locale: Locale
}

function freshnessVariant(freshness: CityNewsData["meta"]["freshness"]) {
  if (freshness === "fresh") {
    return "secondary" as const
  }

  if (freshness === "unavailable") {
    return "destructive" as const
  }

  return "outline" as const
}

export function CityNews({ cityNews, locale }: CityNewsProps) {
  const t = useTranslations("city.sections.cityNews")
  const updatedAt = formatSignalTimestamp(cityNews.updatedAt, locale)

  return (
    <section className="space-y-3">
      <SectionHeader
        id="city-news"
        title={t("title")}
        description={t("description")}
      />

      <article className="border-border/80 bg-card space-y-3 border p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">{t("labels.headlines")}</h3>
          <Badge
            variant={freshnessVariant(cityNews.meta.freshness)}
            className="rounded-none"
          >
            {t(`freshness.${cityNews.meta.freshness}`)}
          </Badge>
        </div>

        {cityNews.headlines.length === 0 ? (
          <p className="text-sm">{t("noHeadlines")}</p>
        ) : (
          <ul className="space-y-2">
            {cityNews.headlines.map((headline) => (
              <li key={headline.id} className="space-y-1 text-sm">
                <a
                  href={headline.url}
                  className="font-medium underline decoration-dotted underline-offset-2"
                  target="_blank"
                  rel="noreferrer"
                >
                  {headline.title}
                </a>
                <p className="text-muted-foreground text-xs">
                  {t("headlineMeta", {
                    source: headline.source,
                    publishedAt:
                      formatSignalTimestamp(headline.publishedAt, locale) ??
                      t("unknownUpdateTime"),
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}

        {cityNews.meta.freshness === "fresh" ? null : (
          <p className="text-muted-foreground text-xs">{t("nonFreshNote")}</p>
        )}

        <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
          <span>
            {t("updatedAt", {
              value: updatedAt ?? t("unknownUpdateTime"),
            })}
          </span>
          <a
            href={cityNews.meta.sourceUrl}
            className="text-foreground underline decoration-dotted underline-offset-2"
            target="_blank"
            rel="noreferrer"
          >
            {t("viewSource")}
          </a>
        </div>
      </article>
    </section>
  )
}
