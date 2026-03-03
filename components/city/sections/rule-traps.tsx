import { useTranslations } from "next-intl"

import { SectionHeader } from "@/components/city/section-header"
import { Badge } from "@/components/ui/badge"
import type { City } from "@/data/types"
import { riskVariant } from "@/lib/city-insights"

interface RuleTrapsProps {
  city: City
}

export function RuleTraps({ city }: RuleTrapsProps) {
  const t = useTranslations("city.sections.ruleTraps")
  const traps = city.ruleTraps

  if (!traps || traps.length === 0) {
    return null
  }

  return (
    <section className="space-y-3">
      <SectionHeader
        id="rule-traps"
        title={t("title")}
        description={t("description")}
      />
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {traps.map((trap) => (
          <article
            key={`${trap.rule}-${trap.lastVerified}`}
            className="border-border/80 bg-card space-y-2 border p-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold">{trap.rule}</h3>
              <Badge
                variant={riskVariant[trap.riskLevel]}
                className="rounded-none"
              >
                {t("riskBadge", { level: t(`riskLevels.${trap.riskLevel}`) })}
              </Badge>
            </div>
            <p className="text-sm">
              <span className="text-muted-foreground">{t("trigger")}</span>{" "}
              {trap.triggerScenario}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">{t("loss")}</span>{" "}
              {trap.penaltyOrLoss}
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">{t("howToAvoid")}</span>{" "}
              {trap.howToAvoid}
            </p>
            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
              <a
                href={trap.sourceUrl}
                className="text-foreground underline decoration-dotted underline-offset-2"
                target="_blank"
                rel="noreferrer"
              >
                {t("officialSource")}
              </a>
              <span>{t("lastVerified", { date: trap.lastVerified })}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
