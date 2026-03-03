import { useTranslations } from "next-intl"

import { PriceTable } from "@/components/city/price-table"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface CostOfLivingProps {
  city: City
}

export function CostOfLiving({ city }: CostOfLivingProps) {
  const t = useTranslations("city.sections.costOfLiving")

  return (
    <section className="space-y-3">
      <SectionHeader
        id="cost-of-living"
        title={t("title")}
        description={t("description")}
      />

      <div className="space-y-2">
        <h3 className="text-sm font-medium">{t("dailyBudgetTiers")}</h3>
        <PriceTable rows={city.costOfLiving.budgetTiers} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">{t("dailyEssentials")}</h3>
        <PriceTable rows={city.costOfLiving.dailyEssentials} />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">{t("monthlyNomadBaseline")}</h3>
        <PriceTable rows={city.costOfLiving.monthlyNomad} />
      </div>

      <p className="text-muted-foreground text-sm">
        {city.costOfLiving.comparisonAnchor}
      </p>
    </section>
  )
}
