import { useTranslations } from "next-intl"

import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface AtAGlanceProps {
  city: City
}

export function AtAGlance({ city }: AtAGlanceProps) {
  const t = useTranslations("city.sections.atAGlance")
  const { atAGlance } = city

  return (
    <section className="space-y-3">
      <SectionHeader
        id="at-a-glance"
        title={t("title")}
        description={t("description")}
      />
      <DataGrid>
        <KeyValue label={t("labels.country")} value={city.country} />
        <KeyValue label={t("labels.continent")} value={atAGlance.continent} />
        <KeyValue label={t("labels.population")} value={atAGlance.population} />
        <KeyValue label={t("labels.languages")} value={atAGlance.languages} />
        <KeyValue label={t("labels.currency")} value={atAGlance.currency} />
        <KeyValue label={t("labels.timezone")} value={atAGlance.timezone} />
        <KeyValue label={t("labels.emergency")} value={atAGlance.emergency} />
        <KeyValue
          label={t("labels.dialingCode")}
          value={atAGlance.dialingCode}
        />
      </DataGrid>
    </section>
  )
}
