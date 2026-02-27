import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string
  helper?: string
  className?: string
}

export function StatCard({ label, value, helper, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-card border-border/80 rounded-none border p-3",
        className
      )}
    >
      <p className="text-muted-foreground text-[11px] uppercase tracking-wide">
        {label}
      </p>
      <p className="font-geist-mono mt-1 text-lg font-medium">{value}</p>
      {helper ? (
        <p className="text-muted-foreground mt-1 text-xs">{helper}</p>
      ) : null}
    </div>
  )
}
