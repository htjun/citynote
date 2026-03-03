import { useTranslations } from "next-intl"

import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { RatingBadge } from "@/components/city/rating-badge"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface ConnectivityProps {
  city: City
}

export function Connectivity({ city }: ConnectivityProps) {
  const t = useTranslations("city.sections.connectivity")
  const common = useTranslations("city.sections.common")

  return (
    <section className="space-y-3">
      <SectionHeader
        id="connectivity"
        title={t("title")}
        description={t("description")}
      />
      <DataGrid>
        <KeyValue
          label={t("averageInternet")}
          value={city.connectivity.averageSpeedMbps}
        />
        <KeyValue
          label={t("coworkingDayPass")}
          value={city.connectivity.coworkingDayPass}
        />
      </DataGrid>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">{t("wifiAvailability")}</span>
        <RatingBadge level={city.connectivity.wifiAvailability} />
      </div>
      <DataGrid>
        {city.connectivity.simOptions.map((sim) => (
          <KeyValue
            key={sim.item}
            label={sim.item}
            value={
              sim.note
                ? common("valueWithNote", {
                    value: sim.price,
                    note: sim.note,
                  })
                : sim.price
            }
          />
        ))}
      </DataGrid>
      <div className="text-sm">
        <span className="text-muted-foreground">{t("coworkingExamples")}</span>{" "}
        {city.connectivity.coworkingExamples.join(", ")}
      </div>
    </section>
  )
}
