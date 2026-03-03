import { useTranslations } from "next-intl"

import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { SectionHeader } from "@/components/city/section-header"
import { Badge } from "@/components/ui/badge"
import type { Locale } from "@/i18n/locales"
import { formatSignalTimestamp } from "@/lib/city-insights"
import type { WeatherNowData } from "@/lib/insights/types"

interface WeatherNowProps {
  weather: WeatherNowData
  locale: Locale
}

function formatTemperature(value: number | null): string | null {
  if (value === null) {
    return null
  }

  return `${value.toFixed(1)}°C`
}

function formatIndex(value: number | null): string | null {
  if (value === null) {
    return null
  }

  return value.toFixed(1)
}

function freshnessVariant(freshness: WeatherNowData["meta"]["freshness"]) {
  if (freshness === "fresh") {
    return "secondary" as const
  }

  if (freshness === "unavailable") {
    return "destructive" as const
  }

  return "outline" as const
}

export function WeatherNow({ weather, locale }: WeatherNowProps) {
  const t = useTranslations("city.sections.weatherNow")
  const updatedAt = formatSignalTimestamp(weather.updatedAt, locale)

  return (
    <section className="space-y-3">
      <SectionHeader
        id="weather-now"
        title={t("title")}
        description={t("description")}
      />

      <article className="border-border/80 bg-card space-y-3 border p-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold">{weather.condition}</h3>
          <Badge
            variant={freshnessVariant(weather.meta.freshness)}
            className="rounded-none"
          >
            {t(`freshness.${weather.meta.freshness}`)}
          </Badge>
        </div>

        <DataGrid className="xl:grid-cols-4">
          <KeyValue
            label={t("labels.temperature")}
            value={
              formatTemperature(weather.temperatureC) ?? t("valueUnavailable")
            }
          />
          <KeyValue
            label={t("labels.feelsLike")}
            value={
              formatTemperature(weather.feelsLikeC) ?? t("valueUnavailable")
            }
          />
          <KeyValue
            label={t("labels.uvIndex")}
            value={formatIndex(weather.uvIndex) ?? t("valueUnavailable")}
          />
          <KeyValue
            label={t("labels.aqi")}
            value={formatIndex(weather.aqiIndex) ?? t("valueUnavailable")}
          />
        </DataGrid>

        {weather.meta.freshness === "fresh" ? null : (
          <p className="text-muted-foreground text-xs">{t("nonFreshNote")}</p>
        )}

        <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
          <span>
            {t("updatedAt", {
              value: updatedAt ?? t("unknownUpdateTime"),
            })}
          </span>
          <a
            href={weather.meta.sourceUrl}
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
