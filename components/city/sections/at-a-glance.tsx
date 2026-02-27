import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface AtAGlanceProps {
  city: City
}

export function AtAGlance({ city }: AtAGlanceProps) {
  const { atAGlance } = city

  return (
    <section className="space-y-3">
      <SectionHeader
        id="at-a-glance"
        title="At a Glance"
        description="Core context for quick trip planning."
      />
      <DataGrid>
        <KeyValue label="Country" value={city.country} />
        <KeyValue label="Continent" value={atAGlance.continent} />
        <KeyValue label="Population" value={atAGlance.population} />
        <KeyValue label="Languages" value={atAGlance.languages} />
        <KeyValue label="Currency" value={atAGlance.currency} />
        <KeyValue label="Timezone" value={atAGlance.timezone} />
        <KeyValue label="Emergency" value={atAGlance.emergency} />
        <KeyValue label="Dialing Code" value={atAGlance.dialingCode} />
      </DataGrid>
    </section>
  )
}
