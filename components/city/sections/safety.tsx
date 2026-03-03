import { useTranslations } from "next-intl"

import { PriceTable } from "@/components/city/price-table"
import { RatingBadge } from "@/components/city/rating-badge"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface SafetyProps {
  city: City
}

export function Safety({ city }: SafetyProps) {
  const t = useTranslations("city.sections.safety")

  return (
    <section className="space-y-3">
      <SectionHeader
        id="safety"
        title={t("title")}
        description={t("description")}
      />
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">{t("overallSafety")}</span>
        <RatingBadge level={city.safetyHealth.overallSafety} />
        <span className="text-muted-foreground">{t("healthcare")}</span>
        <RatingBadge level={city.safetyHealth.healthcareLevel} />
      </div>
      <div>
        <h3 className="text-sm font-medium">{t("commonScams")}</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {city.safetyHealth.commonScams.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-medium">{t("recommendedVaccinations")}</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {city.safetyHealth.recommendedVaccinations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">{t("emergencyContacts")}</h3>
        <PriceTable rows={city.safetyHealth.emergencyContacts} />
      </div>
    </section>
  )
}
