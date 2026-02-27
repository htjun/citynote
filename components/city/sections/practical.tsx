import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface PracticalProps {
  city: City
}

export function Practical({ city }: PracticalProps) {
  return (
    <section className="space-y-3">
      <SectionHeader
        id="practical"
        title="Practical Info"
        description="Power, payments, useful apps, and daily operating rhythm."
      />
      <DataGrid>
        <KeyValue label="Plug Type" value={city.practicalInfo.plugType} />
        <KeyValue label="Voltage" value={city.practicalInfo.voltage} />
        <KeyValue
          label="Payment Culture"
          value={city.practicalInfo.paymentCulture}
        />
        <KeyValue
          label="Business Hours"
          value={city.practicalInfo.businessHours}
        />
      </DataGrid>
      <div className="space-y-1">
        <h3 className="text-sm font-medium">Useful Apps</h3>
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
