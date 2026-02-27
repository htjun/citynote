import type { Neighborhood } from "@/data/types"

export function NeighborhoodCard({ name, vibe, bestFor }: Neighborhood) {
  return (
    <article className="border-border/80 bg-card border p-3">
      <h3 className="text-sm font-medium">{name}</h3>
      <p className="text-muted-foreground mt-1 text-sm">{vibe}</p>
      <ul className="mt-2 flex flex-wrap gap-1">
        {bestFor.map((tag) => (
          <li key={tag} className="bg-muted px-2 py-0.5 text-[11px]">
            {tag}
          </li>
        ))}
      </ul>
    </article>
  )
}
