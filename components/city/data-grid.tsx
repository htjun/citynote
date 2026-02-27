import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface DataGridProps {
  children: ReactNode
  className?: string
}

export function DataGrid({ children, className }: DataGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  )
}
