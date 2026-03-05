import { useTranslations } from "next-intl"

import { PriceTable } from "@/components/city/price-table"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface FoodDrinkProps {
  city: City
  mustTryLimit?: number
  cultureNoteLimit?: number
}

export function FoodDrink({
  city,
  mustTryLimit = 6,
  cultureNoteLimit = 3,
}: FoodDrinkProps) {
  const t = useTranslations("city.sections.foodDrink")
  const mustTryRows = city.foodDrink.mustTry.slice(0, mustTryLimit)
  const cultureNotes = city.foodDrink.cultureNotes.slice(0, cultureNoteLimit)

  return (
    <section className="space-y-3">
      <SectionHeader
        id="food-drink"
        title={t("title")}
        description={t("description")}
      />
      <div className="space-y-2">
        <h3 className="text-sm font-medium">{t("mustTry")}</h3>
        <PriceTable rows={mustTryRows} />
      </div>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        {cultureNotes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">{t("dietaryFriendliness")}</h3>
        <PriceTable rows={city.foodDrink.dietary} />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <p className="text-sm">
          <span className="text-muted-foreground">{t("tapWater")}</span>{" "}
          {city.foodDrink.tapWaterSafe}
        </p>
        <p className="text-sm">
          <span className="text-muted-foreground">{t("tipping")}</span>{" "}
          {city.foodDrink.tippingNorm}
        </p>
      </div>
    </section>
  )
}
