import { PriceTable } from "@/components/city/price-table"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface FoodDrinkProps {
  city: City
}

export function FoodDrink({ city }: FoodDrinkProps) {
  return (
    <section className="space-y-3">
      <SectionHeader
        id="food-drink"
        title="Food & Drink"
        description="Must-try food, dietary support, and local dining norms."
      />
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Must-try</h3>
        <PriceTable rows={city.foodDrink.mustTry} />
      </div>
      <ul className="list-disc space-y-1 pl-5 text-sm">
        {city.foodDrink.cultureNotes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Dietary Friendliness</h3>
        <PriceTable rows={city.foodDrink.dietary} />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <p className="text-sm">
          <span className="text-muted-foreground">Tap water:</span>{" "}
          {city.foodDrink.tapWaterSafe}
        </p>
        <p className="text-sm">
          <span className="text-muted-foreground">Tipping:</span>{" "}
          {city.foodDrink.tippingNorm}
        </p>
      </div>
    </section>
  )
}
