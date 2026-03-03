import { DataGrid } from "@/components/city/data-grid"
import { KeyValue } from "@/components/city/key-value"
import { RatingBadge } from "@/components/city/rating-badge"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface AccessibilityProps {
  city: City
}

export function Accessibility({ city }: AccessibilityProps) {
  const { accessibility } = city

  if (!accessibility) {
    return null
  }

  return (
    <section className="space-y-3">
      <SectionHeader
        id="accessibility"
        title="Accessibility Reality Check"
        description="Confidence-oriented view for wheelchair, stroller, and luggage-heavy travel."
      />
      <DataGrid className="xl:grid-cols-2">
        <KeyValue
          label="Wheelchair transit coverage"
          value={accessibility.wheelchairTransitCoverage ?? "Not published"}
        />
        <KeyValue
          label="Unknown data ratio"
          value={accessibility.unknownDataRatio ?? "Low/unknown not reported"}
        />
      </DataGrid>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Step-free confidence</span>
        <RatingBadge level={accessibility.stepFreeConfidence} />
      </div>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        {accessibility.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  )
}
