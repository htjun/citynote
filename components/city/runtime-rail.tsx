"use client"

import { useTranslations } from "next-intl"

import type { Locale } from "@/i18n/locales"
import { formatSignalTimestamp } from "@/lib/city-insights"
import type { CityRuntimeInsights } from "@/lib/insights/types"
import { cn } from "@/lib/utils"

interface RuntimeRailProps {
  runtimeInsights: CityRuntimeInsights
  locale: Locale
  className?: string
}

function formatTemperature(value: number | null): string {
  if (value === null) {
    return "N/A"
  }

  return `${value.toFixed(1)}°C`
}

function formatRate(rate: number | null): string {
  if (rate === null) {
    return "N/A"
  }

  return rate.toFixed(rate >= 100 ? 2 : 4)
}

function freshnessClasses(
  freshness: "fresh" | "stale" | "fallback" | "unavailable"
) {
  if (freshness === "fresh") {
    return "text-finance-positive bg-finance-positive/10"
  }

  if (freshness === "unavailable") {
    return "text-finance-negative bg-finance-negative/10"
  }

  return "text-quiet bg-subtle"
}

export function RuntimeRail({
  runtimeInsights,
  locale,
  className,
}: RuntimeRailProps) {
  const tShell = useTranslations("city.shell.runtime")
  const tWeather = useTranslations("city.sections.weatherNow")
  const tCurrency = useTranslations("city.sections.currencyWatch")
  const tNews = useTranslations("city.sections.cityNews")

  const weatherUpdated = formatSignalTimestamp(
    runtimeInsights.weatherNow.updatedAt,
    locale
  )
  const currencyUpdated = formatSignalTimestamp(
    runtimeInsights.currencyWatch.updatedAt,
    locale
  )
  const newsUpdated = formatSignalTimestamp(
    runtimeInsights.cityNews.updatedAt,
    locale
  )
  const [firstQuote] = runtimeInsights.currencyWatch.quotes
  const firstHeadlines = runtimeInsights.cityNews.headlines.slice(0, 3)

  return (
    <aside className={cn("space-y-4", className)}>
      <div className="border-subtlest bg-raised rounded-[28px] border p-5 shadow-[var(--shadow-subtle)]">
        <h2 className="text-sm font-semibold">{tShell("title")}</h2>
        <p className="text-quiet mt-2 text-sm leading-relaxed">
          {tShell("description")}
        </p>
      </div>

      <section className="border-subtlest bg-raised space-y-3 rounded-[28px] border p-5 shadow-[var(--shadow-subtle)]">
        <div className="flex items-center justify-between gap-2">
          <a
            href="#weather-now"
            className="text-sm font-medium underline-offset-2 hover:underline"
          >
            {tWeather("title")}
          </a>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-medium",
              freshnessClasses(runtimeInsights.weatherNow.meta.freshness)
            )}
          >
            {tWeather(`freshness.${runtimeInsights.weatherNow.meta.freshness}`)}
          </span>
        </div>
        <p className="font-editorial text-2xl tracking-[-0.03em]">
          {runtimeInsights.weatherNow.condition}
        </p>
        <p className="text-quiet text-sm leading-relaxed">
          {tShell("weatherValue", {
            temperature: formatTemperature(
              runtimeInsights.weatherNow.temperatureC
            ),
            feelsLike: formatTemperature(runtimeInsights.weatherNow.feelsLikeC),
          })}
        </p>
        <p className="text-quieter text-xs">
          {tShell("updatedAt", {
            value: weatherUpdated ?? tShell("unknownUpdateTime"),
          })}
        </p>
      </section>

      <section className="border-subtlest bg-raised space-y-3 rounded-[28px] border p-5 shadow-[var(--shadow-subtle)]">
        <div className="flex items-center justify-between gap-2">
          <a
            href="#currency-watch"
            className="text-sm font-medium underline-offset-2 hover:underline"
          >
            {tCurrency("title")}
          </a>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-medium",
              freshnessClasses(runtimeInsights.currencyWatch.meta.freshness)
            )}
          >
            {tCurrency(
              `freshness.${runtimeInsights.currencyWatch.meta.freshness}`
            )}
          </span>
        </div>
        {firstQuote ? (
          <p className="font-editorial text-2xl tracking-[-0.03em]">
            {tCurrency("pairValue", {
              base: firstQuote.base,
              target: firstQuote.target,
              rate: formatRate(firstQuote.rate),
            })}
          </p>
        ) : (
          <p className="font-editorial text-2xl tracking-[-0.03em]">
            {tCurrency("valueUnavailable")}
          </p>
        )}
        <p className="text-quieter text-xs">
          {tShell("updatedAt", {
            value: currencyUpdated ?? tShell("unknownUpdateTime"),
          })}
        </p>
      </section>

      <section className="border-subtlest bg-raised space-y-3 rounded-[28px] border p-5 shadow-[var(--shadow-subtle)]">
        <div className="flex items-center justify-between gap-2">
          <a
            href="#city-news"
            className="text-sm font-medium underline-offset-2 hover:underline"
          >
            {tNews("title")}
          </a>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-medium",
              freshnessClasses(runtimeInsights.cityNews.meta.freshness)
            )}
          >
            {tNews(`freshness.${runtimeInsights.cityNews.meta.freshness}`)}
          </span>
        </div>
        {firstHeadlines.length === 0 ? (
          <p className="text-sm">{tNews("noHeadlines")}</p>
        ) : (
          <ul className="space-y-2">
            {firstHeadlines.map((headline) => (
              <li key={headline.id}>
                <a
                  href={headline.url}
                  className="line-clamp-2 text-sm font-medium leading-snug underline-offset-2 hover:underline"
                  rel="noreferrer"
                  target="_blank"
                >
                  {headline.title}
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="text-quieter text-xs">
          {tShell("updatedAt", {
            value: newsUpdated ?? tShell("unknownUpdateTime"),
          })}
        </p>
      </section>
    </aside>
  )
}
