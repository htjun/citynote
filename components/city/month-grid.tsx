import { useTranslations } from "next-intl"

import type { MonthlyClimate } from "@/data/types"

interface MonthGridProps {
  months: MonthlyClimate[]
}

export function MonthGrid({ months }: MonthGridProps) {
  const t = useTranslations("city.labels")

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {months.map((month) => (
        <div
          key={month.month}
          className="border-subtlest bg-base rounded-[20px] border p-3 shadow-[var(--shadow-subtle)]"
        >
          <p className="text-xs font-medium">{month.month}</p>
          <p className="font-geist-mono mt-2 text-xs">
            {month.highC}C / {month.lowC}C
          </p>
          <p className="text-quiet mt-2 text-[11px]">
            {t(`rain.${month.rainLevel}`)} {t("rain.suffix")}
          </p>
        </div>
      ))}
    </div>
  )
}
