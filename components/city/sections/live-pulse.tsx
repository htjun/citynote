import { useTranslations } from "next-intl"

import { SectionHeader } from "@/components/city/section-header"
import { Badge } from "@/components/ui/badge"
import type { City } from "@/data/types"
import type { Locale } from "@/i18n/locales"
import { formatSignalTimestamp, isSignalStale } from "@/lib/city-insights"

interface LivePulseProps {
  city: City
  locale: Locale
}

export function LivePulse({ city, locale }: LivePulseProps) {
  const t = useTranslations("city.sections.livePulse")
  const { livePulse } = city

  if (!livePulse || livePulse.length === 0) {
    return null
  }

  const now = new Date()

  return (
    <section className="space-y-3">
      <SectionHeader
        id="live-pulse"
        title={t("title")}
        description={t("description")}
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {livePulse.map((signal) => {
          const stale = isSignalStale(signal, now)
          const formattedTimestamp = formatSignalTimestamp(
            signal.updatedAt,
            locale
          )

          return (
            <article
              key={`${signal.name}-${signal.updatedAt}`}
              className="border-border/80 bg-card space-y-2 border p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">
                  {t(`signalLabels.${signal.name}`)}
                </h3>
                <Badge
                  variant={stale ? "secondary" : "outline"}
                  className="rounded-none text-[11px]"
                >
                  {stale ? t("stale") : t("fresh")}
                </Badge>
              </div>
              <p className="text-sm">{signal.status}</p>
              {stale ? (
                <p className="text-muted-foreground text-xs">
                  {t("staleWarning")}
                </p>
              ) : null}
              <p className="text-muted-foreground text-xs">
                {t("updatedAt", {
                  value: formattedTimestamp ?? t("unknownUpdateTime"),
                })}
              </p>
              <a
                href={signal.sourceUrl}
                className="text-xs underline decoration-dotted underline-offset-2"
                target="_blank"
                rel="noreferrer"
              >
                {t("viewSource")}
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}
