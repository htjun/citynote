import { Badge } from "@/components/ui/badge"

interface RatingBadgeProps {
  level: string
}

const variantByLevel: Record<string, "default" | "secondary" | "outline"> = {
  Excellent: "default",
  "Very High": "secondary",
  High: "secondary",
  Medium: "outline",
  Low: "outline",
}

export function RatingBadge({ level }: RatingBadgeProps) {
  return (
    <Badge
      variant={variantByLevel[level] ?? "outline"}
      className="rounded-none"
    >
      {level}
    </Badge>
  )
}
