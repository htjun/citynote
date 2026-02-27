import { PriceTable } from "@/components/city/price-table"
import { RatingBadge } from "@/components/city/rating-badge"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface SafetyProps {
  city: City
}

export function Safety({ city }: SafetyProps) {
  return (
    <section className="space-y-3">
      <SectionHeader
        id="safety"
        title="Safety & Health"
        description="Risk overview, scam awareness, and emergency references."
      />
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">Overall safety</span>
        <RatingBadge level={city.safetyHealth.overallSafety} />
        <span className="text-muted-foreground">Healthcare</span>
        <RatingBadge level={city.safetyHealth.healthcareLevel} />
      </div>
      <div>
        <h3 className="text-sm font-medium">Common scams</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {city.safetyHealth.commonScams.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-sm font-medium">Recommended vaccinations</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {city.safetyHealth.recommendedVaccinations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Emergency contacts</h3>
        <PriceTable rows={city.safetyHealth.emergencyContacts} />
      </div>
    </section>
  )
}
