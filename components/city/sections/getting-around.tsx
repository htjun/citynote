import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { RatingBadge } from "@/components/city/rating-badge"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface GettingAroundProps {
  city: City
}

export function GettingAround({ city }: GettingAroundProps) {
  return (
    <section className="space-y-3">
      <SectionHeader
        id="getting-around"
        title="Getting There & Around"
        description="Airports, visa snapshot, transport quality, and local mobility."
      />
      <DataGrid>
        {city.gettingAround.airports.map((airport) => (
          <KeyValue
            key={airport.item}
            label={airport.item}
            value={`${airport.price}${airport.note ? ` - ${airport.note}` : ""}`}
          />
        ))}
      </DataGrid>
      <p className="text-sm">{city.gettingAround.visaSnapshot}</p>
      <DataGrid>
        {city.gettingAround.localTransport.map((transport) => (
          <KeyValue
            key={transport.item}
            label={transport.item}
            value={`${transport.price}${transport.note ? ` - ${transport.note}` : ""}`}
          />
        ))}
      </DataGrid>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">Ride-hailing:</span>
        {city.gettingAround.rideHailingApps.join(", ")}
      </div>
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">Walkability</span>
        <RatingBadge level={city.gettingAround.walkability} />
        <span className="text-muted-foreground">Bikeability</span>
        <RatingBadge level={city.gettingAround.bikeability} />
      </div>
    </section>
  )
}
