import { useTranslations } from "next-intl"

import { NeighborhoodCard } from "@/components/city/neighborhood-card"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface NeighborhoodsProps {
  city: City
}

export function Neighborhoods({ city }: NeighborhoodsProps) {
  const t = useTranslations("city.sections.neighborhoods")

  return (
    <section className="space-y-3">
      <SectionHeader
        id="neighborhoods"
        title={t("title")}
        description={t("description")}
      />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {city.neighborhoods.map((neighborhood) => (
          <NeighborhoodCard key={neighborhood.name} {...neighborhood} />
        ))}
      </div>
    </section>
  )
}
