import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { RatingBadge } from "@/components/city/rating-badge"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface ConnectivityProps {
  city: City
}

export function Connectivity({ city }: ConnectivityProps) {
  return (
    <section className="space-y-3">
      <SectionHeader
        id="connectivity"
        title="Connectivity"
        description="Internet, SIM options, and remote-work readiness."
      />
      <DataGrid>
        <KeyValue
          label="Average Internet"
          value={city.connectivity.averageSpeedMbps}
        />
        <KeyValue
          label="Coworking Day Pass"
          value={city.connectivity.coworkingDayPass}
        />
      </DataGrid>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">WiFi Availability</span>
        <RatingBadge level={city.connectivity.wifiAvailability} />
      </div>
      <DataGrid>
        {city.connectivity.simOptions.map((sim) => (
          <KeyValue
            key={sim.item}
            label={sim.item}
            value={`${sim.price}${sim.note ? ` - ${sim.note}` : ""}`}
          />
        ))}
      </DataGrid>
      <div className="text-sm">
        <span className="text-muted-foreground">Coworking examples:</span>{" "}
        {city.connectivity.coworkingExamples.join(", ")}
      </div>
    </section>
  )
}
