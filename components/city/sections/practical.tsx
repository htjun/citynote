import { useTranslations } from "next-intl"

import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface PracticalProps {
  city: City
}

export function Practical({ city }: PracticalProps) {
  const t = useTranslations("city.sections.practical")

  return (
    <section className="space-y-3">
      <SectionHeader
        id="practical"
        title={t("title")}
        description={t("description")}
      />
      <DataGrid>
        <KeyValue label={t("plugType")} value={city.practicalInfo.plugType} />
        <KeyValue label={t("voltage")} value={city.practicalInfo.voltage} />
        <KeyValue
          label={t("paymentCulture")}
          value={city.practicalInfo.paymentCulture}
        />
        <KeyValue
          label={t("businessHours")}
          value={city.practicalInfo.businessHours}
        />
      </DataGrid>
      <div className="space-y-1">
        <h3 className="text-sm font-medium">{t("usefulApps")}</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm">
          {city.practicalInfo.usefulApps.map((app) => (
            <li key={app.name}>
              <span className="font-medium">{app.name}</span>: {app.purpose}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
