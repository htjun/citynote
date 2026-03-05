import type { ReactNode } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface FeaturePlaceholderProps {
  title: string
  description: string
  items: string[]
  icon?: ReactNode
}

export function FeaturePlaceholder({
  title,
  description,
  items,
  icon,
}: FeaturePlaceholderProps) {
  return (
    <Card className="max-w-3xl">
      <CardHeader className="border-b">
        {icon ? (
          <div className="text-muted-foreground text-sm">{icon}</div>
        ) : null}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
