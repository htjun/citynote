import { useTranslations } from "next-intl"

import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface NeighborhoodFitProps {
  city: City
}

export function NeighborhoodFit({ city }: NeighborhoodFitProps) {
  const t = useTranslations("city.sections.neighborhoodFit")
  const { neighborhoodFit } = city

  if (!neighborhoodFit || neighborhoodFit.length === 0) {
    return null
  }

  return (
    <section className="space-y-3">
      <SectionHeader
        id="neighborhood-fit"
        title={t("title")}
        description={t("description")}
      />
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {neighborhoodFit.map((fit) => (
          <article
            key={fit.archetype}
            className="border-border/80 bg-card space-y-2 border p-3"
          >
            <h3 className="text-sm font-semibold">
              {t(`archetypes.${fit.archetype}`)}
            </h3>
            <p className="text-sm">
              <span className="text-muted-foreground">{t("bestAreas")}</span>{" "}
              {fit.bestAreas.join(", ")}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">{t("dayFit")}</span>{" "}
              {fit.timeFit.day.join(", ")}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">{t("lateNightFit")}</span>{" "}
              {fit.timeFit.lateNight.join(", ")}
            </p>
            {fit.cautionAreas?.length ? (
              <p className="text-sm">
                <span className="text-muted-foreground">{t("useCaution")}</span>{" "}
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
