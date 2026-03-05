import { useTranslations } from "next-intl"

import { PriceTable } from "@/components/city/price-table"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface CostOfLivingProps {
  city: City
  emphasize?: "daily" | "balanced" | "monthly"
  dailyEssentialsLimit?: number
}

export function CostOfLiving({
  city,
  emphasize = "balanced",
  dailyEssentialsLimit = 5,
}: CostOfLivingProps) {
  const t = useTranslations("city.sections.costOfLiving")
  const dailyEssentialsRows = city.costOfLiving.dailyEssentials.slice(
    0,
    dailyEssentialsLimit
  )

  const blocks = [
    {
      key: "dailyBudgetTiers",
      title: t("dailyBudgetTiers"),
      rows: city.costOfLiving.budgetTiers,
    },
    {
      key: "dailyEssentials",
      title: t("dailyEssentials"),
      rows: dailyEssentialsRows,
    },
    {
      key: "monthlyNomadBaseline",
      title: t("monthlyNomadBaseline"),
      rows: city.costOfLiving.monthlyNomad,
    },
  ]

  let orderedBlocks = blocks

  if (emphasize === "monthly") {
    orderedBlocks = [blocks[2], blocks[0], blocks[1]]
  } else if (emphasize === "daily") {
    orderedBlocks = [blocks[0], blocks[1], blocks[2]]
  }

  return (
    <section className="space-y-3">
      <SectionHeader
        id="cost-of-living"
        title={t("title")}
        description={t("description")}
      />

      {orderedBlocks.map((block) => (
        <div key={block.key} className="space-y-2">
          <h3 className="text-sm font-medium">{block.title}</h3>
          <PriceTable rows={block.rows} />
        </div>
      ))}

      <p className="text-muted-foreground text-sm">
        {city.costOfLiving.comparisonAnchor}
      </p>
    </section>
  )
}
