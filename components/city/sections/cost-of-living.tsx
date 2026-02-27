import { PriceTable } from "@/components/city/price-table"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface CostOfLivingProps {
  city: City
}

export function CostOfLiving({ city }: CostOfLivingProps) {
  return (
    <section className="space-y-3">
      <SectionHeader
        id="cost-of-living"
        title="Cost of Living"
        description="Budget tiers, daily spend, and monthly baseline."
      />

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Daily Budget Tiers</h3>
        <PriceTable rows={city.costOfLiving.budgetTiers} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Daily Essentials</h3>
        <PriceTable rows={city.costOfLiving.dailyEssentials} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Monthly Nomad Baseline</h3>
        <PriceTable rows={city.costOfLiving.monthlyNomad} />
      </div>

      <p className="text-muted-foreground text-sm">
        {city.costOfLiving.comparisonAnchor}
      </p>
    </section>
  )
}
