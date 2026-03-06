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
        "border-subtlest bg-base rounded-[22px] border p-4 shadow-[var(--shadow-subtle)]",
        className
      )}
    >
      <p className="text-quieter text-[11px] uppercase tracking-[0.16em]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed">{value}</p>
    </div>
  )
}
