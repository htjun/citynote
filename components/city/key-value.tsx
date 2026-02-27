import { cn } from "@/lib/utils"

interface KeyValueProps {
  label: string
  value: string
  className?: string
}

export function KeyValue({ label, value, className }: KeyValueProps) {
  return (
    <div
      className={cn(
        "border-border/80 bg-card rounded-none border p-3",
        className
      )}
    >
      <p className="text-muted-foreground text-[11px] uppercase tracking-wide">
        {label}
      </p>
      <p className="mt-1 text-sm leading-snug">{value}</p>
    </div>
  )
}
