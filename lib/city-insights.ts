import type { LiveSignal, RiskLevel } from "@/data/types"

const MS_PER_MINUTE = 60_000

export function isSignalStale(
  signal: LiveSignal,
  now: Date = new Date()
): boolean {
  const updatedAtMs = Date.parse(signal.updatedAt)

  if (Number.isNaN(updatedAtMs)) {
    return true
  }

  return now.getTime() - updatedAtMs > signal.staleAfterMinutes * MS_PER_MINUTE
}

export function formatSignalTimestamp(updatedAt: string): string {
  const parsed = new Date(updatedAt)

  if (Number.isNaN(parsed.getTime())) {
    return "Unknown update time"
  }

  return parsed.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export const signalLabels: Record<LiveSignal["name"], string> = {
  transport: "Transport",
  uv: "UV",
  aqi: "Air Quality",
  advisory: "Travel Advisory",
}

export const riskVariant: Record<RiskLevel, "outline" | "secondary"> = {
  Low: "outline",
  Medium: "outline",
  High: "secondary",
}
