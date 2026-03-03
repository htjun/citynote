import { useTranslations } from "next-intl"

import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface AtAGlanceProps {
  city: City
}

interface AtAGlanceCard {
  label: string
  value: string
  priority: "P0" | "P1" | "P2"
}

function toFallbackValue(value: string, fallback: string): string {
  return value.trim() || fallback
}

function toLabeledValues(rows: { item: string; price: string }[]): string[] {
  return rows.flatMap((row) => {
    const item = row.item.trim()
    const price = row.price.trim()

    return item && price ? [`${item}: ${price}`] : []
  })
}

function toDailyBudgetRange(
  budgetTiers: City["costOfLiving"]["budgetTiers"],
  fallback: string
): string {
  const values = toLabeledValues(budgetTiers)

  if (!values.length) {
    return fallback
  }

  const [firstValue = fallback] = values
  const lastValue = values.at(-1) ?? fallback

  return values.length === 1 ? firstValue : `${firstValue} | ${lastValue}`
}

function toTopTwoSummary(
  rows: { item: string; price: string }[],
  fallback: string
): string {
  const values = toLabeledValues(rows).slice(0, 2)

  return values.length ? values.join(" | ") : fallback
}

function toPlugVoltage(
  plugType: string,
  voltage: string,
  fallback: string
): string {
  const values = [plugType.trim(), voltage.trim()].filter(Boolean)

  return values.length ? values.join(" | ") : fallback
}

function toEmergencyContacts(
  emergency: string,
  dialingCode: string,
  fallback: string,
  emergencyLabel: string,
  dialingCodeLabel: string
): string {
  const emergencyValue = toFallbackValue(emergency, fallback)
  const dialingCodeValue = toFallbackValue(dialingCode, fallback)

  return `${emergencyLabel}: ${emergencyValue} | ${dialingCodeLabel}: ${dialingCodeValue}`
}

export function AtAGlance({ city }: AtAGlanceProps) {
  const t = useTranslations("city.sections.atAGlance")
  const rating = useTranslations("city.labels.rating")
  const fallback = t("valueUnavailable")

  const cards: AtAGlanceCard[] = [
    {
      label: t("labels.country"),
      value: toFallbackValue(city.country, fallback),
      priority: "P0",
    },
    {
      label: t("labels.visaEntry"),
      value: toFallbackValue(city.gettingAround.visaSnapshot, fallback),
      priority: "P0",
    },
    {
      label: t("labels.bestMonths"),
      value: toFallbackValue(city.climate.bestMonths, fallback),
      priority: "P0",
    },
    {
      label: t("labels.dailyBudgetRange"),
      value: toDailyBudgetRange(city.costOfLiving.budgetTiers, fallback),
      priority: "P0",
    },
    {
      label: t("labels.airportToCity"),
      value: toTopTwoSummary(city.gettingAround.airports, fallback),
      priority: "P0",
    },
    {
      label: t("labels.currency"),
      value: toFallbackValue(city.atAGlance.currency, fallback),
      priority: "P0",
    },
    {
      label: t("labels.paymentCulture"),
      value: toFallbackValue(city.practicalInfo.paymentCulture, fallback),
      priority: "P0",
    },
    {
      label: t("labels.timezone"),
      value: toFallbackValue(city.atAGlance.timezone, fallback),
      priority: "P0",
    },
    {
      label: t("labels.safetyLevel"),
      value: rating(city.safetyHealth.overallSafety),
      priority: "P0",
    },
    {
      label: t("labels.englishUsability"),
      value: rating(city.languageCulture.englishLevel),
      priority: "P0",
    },
    {
      label: t("labels.transitQuality"),
      value: toTopTwoSummary(city.gettingAround.localTransport, fallback),
      priority: "P0",
    },
    {
      label: t("labels.tapWaterSafety"),
      value: toFallbackValue(city.foodDrink.tapWaterSafe, fallback),
      priority: "P1",
    },
    {
      label: t("labels.plugVoltage"),
      value: toPlugVoltage(
        city.practicalInfo.plugType,
        city.practicalInfo.voltage,
        fallback
      ),
      priority: "P1",
    },
    {
      label: t("labels.internetSpeed"),
      value: toFallbackValue(city.connectivity.averageSpeedMbps, fallback),
      priority: "P1",
    },
    {
      label: t("labels.emergencyContacts"),
      value: toEmergencyContacts(
        city.atAGlance.emergency,
        city.atAGlance.dialingCode,
        fallback,
        t("labels.emergency"),
        t("labels.dialingCode")
      ),
      priority: "P1",
    },
  ]

  return (
    <section className="space-y-3">
      <SectionHeader
        id="at-a-glance"
        title={t("title")}
        description={t("description")}
      />
      <DataGrid>
        {cards.map((card) => (
          <KeyValue key={card.label} label={card.label} value={card.value} />
        ))}
      </DataGrid>
    </section>
  )
}
