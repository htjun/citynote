import type { MonthlyClimate } from "@/data/types"

interface MonthGridProps {
  months: MonthlyClimate[]
}

export function MonthGrid({ months }: MonthGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      {months.map((month) => (
        <div key={month.month} className="border-border/80 bg-card border p-2">
          <p className="text-xs font-medium">{month.month}</p>
          <p className="font-geist-mono mt-1 text-xs">
            {month.highC}C / {month.lowC}C
          </p>
          <p className="text-muted-foreground mt-1 text-[11px]">
            {month.rainLevel} rain
          </p>
        </div>
      ))}
    </div>
  )
}
