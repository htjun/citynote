import { NeighborhoodCard } from "@/components/city/neighborhood-card"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface NeighborhoodsProps {
  city: City
}

export function Neighborhoods({ city }: NeighborhoodsProps) {
  return (
    <section className="space-y-3">
      <SectionHeader
        id="neighborhoods"
        title="Neighborhoods"
        description="A fast orientation by district vibe and fit."
      />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {city.neighborhoods.map((neighborhood) => (
          <NeighborhoodCard key={neighborhood.name} {...neighborhood} />
        ))}
      </div>
    </section>
  )
}
