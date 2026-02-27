import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { MonthGrid } from "@/components/city/month-grid"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface ClimateProps {
  city: City
}

export function Climate({ city }: ClimateProps) {
  return (
    <section className="space-y-3">
      <SectionHeader
        id="climate"
        title="Climate & Weather"
        description="Monthly highs/lows plus seasonality notes."
      />
      <DataGrid className="xl:grid-cols-2">
        <KeyValue label="Best Months" value={city.climate.bestMonths} />
        <KeyValue label="Rainy Season" value={city.climate.rainySeason} />
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
