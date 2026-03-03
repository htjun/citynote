import type { LiveSignal, RiskLevel } from "@/data/types"
import type { Locale } from "@/i18n/locales"

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

export function formatSignalTimestamp(
  updatedAt: string,
  locale: Locale
): string | null {
  const parsed = new Date(updatedAt)

  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(parsed)
}

export const riskVariant: Record<RiskLevel, "outline" | "secondary"> = {
  low: "outline",
  medium: "outline",
  high: "secondary",
}
