"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ControlOption<T extends string> {
  value: T
  label: string
}

interface SegmentedControlProps<T extends string> {
  options: ControlOption<T>[]
  value: T | null
  onValueChange: (value: T) => void
  className?: string
  "aria-label"?: string
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
  className,
  "aria-label": ariaLabel,
}: SegmentedControlProps<T>) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = React.useState<{
    left: number
    width: number
  } | null>(null)

  const activeIndex = value ? options.findIndex((o) => o.value === value) : -1

  React.useEffect(() => {
    if (activeIndex < 0 || !containerRef.current) {
      setIndicator(null)
      return
    }

    const container = containerRef.current
    const buttons =
      container.querySelectorAll<HTMLButtonElement>('[role="radio"]')
    const active = buttons[activeIndex]
    if (!active) {
      return
    }

    setIndicator({
      left: active.offsetLeft,
      width: active.offsetWidth,
    })
  }, [activeIndex])

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        "bg-muted relative inline-flex items-center gap-0.5 rounded-md p-0.5",
        className
      )}
    >
      {indicator && (
        <span
          aria-hidden
          className="bg-background absolute top-0.5 bottom-0.5 rounded-sm shadow-sm transition-all duration-200 ease-out"
          style={{ left: indicator.left, width: indicator.width }}
        />
      )}

      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onValueChange(option.value)}
            className={cn(
              "relative z-10 cursor-pointer rounded-sm px-2.5 py-1 text-xs font-medium whitespace-nowrap transition-colors",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

interface ChipGroupProps<T extends string> {
  options: ControlOption<T>[]
  value: T | null
  onValueChange: (value: T) => void
  className?: string
  "aria-label"?: string
}

export function ChipGroup<T extends string>({
  options,
  value,
  onValueChange,
  className,
  "aria-label": ariaLabel,
}: ChipGroupProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn("flex flex-wrap gap-1.5", className)}
    >
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onValueChange(option.value)}
            className={cn(
              "inline-flex cursor-pointer items-center justify-center rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
              active
                ? "bg-foreground border-foreground text-background"
                : "border-input bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
