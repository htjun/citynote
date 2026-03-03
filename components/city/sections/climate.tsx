import { useTranslations } from "next-intl"

import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { MonthGrid } from "@/components/city/month-grid"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface ClimateProps {
  city: City
}

export function Climate({ city }: ClimateProps) {
  const t = useTranslations("city.sections.climate")

  return (
    <section className="space-y-3">
      <SectionHeader
        id="climate"
        title={t("title")}
        description={t("description")}
      />
      <DataGrid className="xl:grid-cols-2">
        <KeyValue label={t("bestMonths")} value={city.climate.bestMonths} />
        <KeyValue label={t("rainySeason")} value={city.climate.rainySeason} />
      </DataGrid>
      <MonthGrid months={city.climate.monthly} />
      <ul className="list-disc space-y-1 pl-5 text-sm">
        {city.climate.seasonNotes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  )
}
