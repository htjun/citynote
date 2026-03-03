import type { RatingLevel } from "@/data/types"
import { useTranslations } from "next-intl"

import { Badge } from "@/components/ui/badge"

interface RatingBadgeProps {
  level: RatingLevel
}

const variantByLevel: Record<RatingLevel, "default" | "secondary" | "outline"> =
  {
    excellent: "default",
    very_high: "secondary",
    high: "secondary",
    medium: "outline",
    low: "outline",
  }

export function RatingBadge({ level }: RatingBadgeProps) {
  const t = useTranslations("city.labels.rating")

  return (
    <Badge
      variant={variantByLevel[level] ?? "outline"}
      className="rounded-none"
    >
      {t(level)}
    </Badge>
  )
}
