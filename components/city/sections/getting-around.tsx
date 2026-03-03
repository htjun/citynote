import { useTranslations } from "next-intl"

import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { RatingBadge } from "@/components/city/rating-badge"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface GettingAroundProps {
  city: City
}

export function GettingAround({ city }: GettingAroundProps) {
  const t = useTranslations("city.sections.gettingAround")
  const common = useTranslations("city.sections.common")

  return (
    <section className="space-y-3">
      <SectionHeader
        id="getting-around"
        title={t("title")}
        description={t("description")}
      />
      <DataGrid>
        {city.gettingAround.airports.map((airport) => (
          <KeyValue
            key={airport.item}
            label={airport.item}
            value={
              airport.note
                ? common("valueWithNote", {
                    value: airport.price,
                    note: airport.note,
                  })
                : airport.price
            }
          />
        ))}
      </DataGrid>
      <p className="text-sm">{city.gettingAround.visaSnapshot}</p>
      <DataGrid>
        {city.gettingAround.localTransport.map((transport) => (
          <KeyValue
            key={transport.item}
            label={transport.item}
            value={
              transport.note
                ? common("valueWithNote", {
                    value: transport.price,
                    note: transport.note,
                  })
                : transport.price
            }
          />
        ))}
      </DataGrid>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">{t("rideHailing")}</span>
        {city.gettingAround.rideHailingApps.join(", ")}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">{t("walkability")}</span>
        <RatingBadge level={city.gettingAround.walkability} />
        <span className="text-muted-foreground">{t("bikeability")}</span>
        <RatingBadge level={city.gettingAround.bikeability} />
      </div>
    </section>
  )
}
