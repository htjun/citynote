import { useTranslations } from "next-intl"

import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { RatingBadge } from "@/components/city/rating-badge"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface AccessibilityProps {
  city: City
}

export function Accessibility({ city }: AccessibilityProps) {
  const t = useTranslations("city.sections.accessibility")
  const { accessibility } = city

  if (!accessibility) {
    return null
  }

  return (
    <section className="space-y-3">
      <SectionHeader
        id="accessibility"
        title={t("title")}
        description={t("description")}
      />
      <DataGrid className="xl:grid-cols-2">
        <KeyValue
          label={t("wheelchairTransitCoverage")}
          value={accessibility.wheelchairTransitCoverage ?? t("notPublished")}
        />
        <KeyValue
          label={t("unknownDataRatio")}
          value={accessibility.unknownDataRatio ?? t("notReported")}
        />
      </DataGrid>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">{t("stepFreeConfidence")}</span>
        <RatingBadge level={accessibility.stepFreeConfidence} />
      </div>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        {accessibility.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  )
}
