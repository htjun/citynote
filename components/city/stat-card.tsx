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
        "border-subtlest bg-base rounded-[22px] border p-4 shadow-[var(--shadow-subtle)]",
        className
      )}
    >
      <p className="text-quieter text-[11px] uppercase tracking-[0.16em]">
        {label}
      </p>
      <p className="font-geist-mono mt-2 text-lg font-medium">{value}</p>
      {helper ? (
        <p className="text-quiet mt-2 text-xs leading-relaxed">{helper}</p>
      ) : null}
    </div>
  )
}
