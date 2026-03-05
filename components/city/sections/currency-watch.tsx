import { useTranslations } from "next-intl"

import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { SectionHeader } from "@/components/city/section-header"
import { Badge } from "@/components/ui/badge"
import type { Locale } from "@/i18n/locales"
import { formatSignalTimestamp } from "@/lib/city-insights"
import type { CurrencyWatchData } from "@/lib/insights/types"

interface CurrencyWatchProps {
  currencyWatch: CurrencyWatchData
  locale: Locale
  compact?: boolean
}

function freshnessVariant(freshness: CurrencyWatchData["meta"]["freshness"]) {
  if (freshness === "fresh") {
    return "secondary" as const
  }

  if (freshness === "unavailable") {
    return "destructive" as const
  }

  return "outline" as const
}

function formatRate(rate: number | null): string | null {
  if (rate === null) {
    return null
  }

  return rate.toFixed(rate >= 100 ? 2 : 4)
}

export function CurrencyWatch({
  currencyWatch,
  locale,
  compact = false,
}: CurrencyWatchProps) {
  const t = useTranslations("city.sections.currencyWatch")
  const updatedAt = formatSignalTimestamp(currencyWatch.updatedAt, locale)
  const hasAnyRate = currencyWatch.quotes.some((quote) => quote.rate !== null)
  const visibleQuotes = compact
    ? currencyWatch.quotes.slice(0, 1)
    : currencyWatch.quotes

  return (
    <section className="space-y-3">
      <SectionHeader
        id="currency-watch"
        title={t("title")}
        description={t("description")}
      />

      <article className="border-border/80 bg-card space-y-3 border p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">{t("labels.rates")}</h3>
          <Badge
            variant={freshnessVariant(currencyWatch.meta.freshness)}
            className="rounded-none"
          >
            {t(`freshness.${currencyWatch.meta.freshness}`)}
          </Badge>
        </div>

        <DataGrid className="xl:grid-cols-2">
          {visibleQuotes.map((quote) => (
            <KeyValue
              key={`${quote.base}-${quote.target}`}
              label={`${quote.base} -> ${quote.target}`}
              value={
                formatRate(quote.rate)
                  ? t("pairValue", {
                      base: quote.base,
                      rate: formatRate(quote.rate),
                      target: quote.target,
                    })
                  : t("valueUnavailable")
              }
            />
          ))}
        </DataGrid>

        {compact && currencyWatch.quotes.length > visibleQuotes.length ? (
          <p className="text-muted-foreground text-xs">{t("compactNote")}</p>
        ) : null}

        {hasAnyRate ? null : (
          <p className="text-muted-foreground text-xs">
            {t("allRatesUnavailable")}
          </p>
        )}

        {currencyWatch.meta.freshness === "fresh" ? null : (
          <p className="text-muted-foreground text-xs">{t("nonFreshNote")}</p>
        )}

        <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
          <span>
            {t("updatedAt", {
              value: updatedAt ?? t("unknownUpdateTime"),
            })}
          </span>
          {currencyWatch.asOfDate ? (
            <span>{t("asOfDate", { value: currencyWatch.asOfDate })}</span>
          ) : null}
          <a
            href={currencyWatch.meta.sourceUrl}
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
