import { SectionHeader } from "@/components/city/section-header"
import type { City, NeighborhoodFit as NeighborhoodFitType } from "@/data/types"

interface NeighborhoodFitProps {
  city: City
}

const archetypeLabel: Record<NeighborhoodFitType["archetype"], string> = {
  first_timer: "First Timer",
  family: "Family",
  night_owl: "Night Owl",
  remote_worker: "Remote Worker",
}

export function NeighborhoodFit({ city }: NeighborhoodFitProps) {
  const { neighborhoodFit } = city

  if (!neighborhoodFit || neighborhoodFit.length === 0) {
    return null
  }

  return (
    <section className="space-y-3">
      <SectionHeader
        id="neighborhood-fit"
        title="Neighborhood Fit Matrix"
        description="Area fit by traveler profile and time of day."
      />
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {neighborhoodFit.map((fit) => (
          <article
            key={fit.archetype}
            className="border-border/80 bg-card space-y-2 border p-3"
          >
            <h3 className="text-sm font-semibold">
              {archetypeLabel[fit.archetype]}
            </h3>
            <p className="text-sm">
              <span className="text-muted-foreground">Best areas:</span>{" "}
              {fit.bestAreas.join(", ")}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Day fit:</span>{" "}
              {fit.timeFit.day.join(", ")}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Late-night fit:</span>{" "}
              {fit.timeFit.lateNight.join(", ")}
            </p>
            {fit.cautionAreas?.length ? (
              <p className="text-sm">
                <span className="text-muted-foreground">Use caution:</span>{" "}
                {fit.cautionAreas.join(", ")}
              </p>
            ) : null}
            <p className="text-muted-foreground text-sm">{fit.notes}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
