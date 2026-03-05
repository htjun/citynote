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
        "bg-subtle border-subtlest relative inline-flex items-center gap-0.5 rounded-xl border p-0.5",
        className
      )}
    >
      {indicator && (
        <span
          aria-hidden
          className="bg-raised border-subtlest absolute top-0.5 bottom-0.5 rounded-lg border shadow-[var(--shadow-subtle)] transition-all duration-normal ease-fluid"
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
              "relative z-10 cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors duration-normal ease-fluid",
              active ? "text-foreground" : "text-quiet hover:text-foreground"
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
              "inline-flex cursor-pointer items-center justify-center rounded-lg border px-3 py-1.5 text-xs font-medium transition-[background-color,border-color,color] duration-normal ease-fluid",
              active
                ? "border-super/30 bg-super/12 text-super"
                : "border-subtle bg-raised text-quiet hover:bg-subtle hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
