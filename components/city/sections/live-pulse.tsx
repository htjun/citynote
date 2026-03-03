import { SectionHeader } from "@/components/city/section-header"
import { Badge } from "@/components/ui/badge"
import type { City } from "@/data/types"
import {
  formatSignalTimestamp,
  isSignalStale,
  signalLabels,
} from "@/lib/city-insights"

interface LivePulseProps {
  city: City
}

export function LivePulse({ city }: LivePulseProps) {
  const { livePulse } = city

  if (!livePulse || livePulse.length === 0) {
    return null
  }

  const now = new Date()

  return (
    <section className="space-y-3">
      <SectionHeader
        id="live-pulse"
        title="Live City Pulse"
        description="Signals that can impact mobility and health decisions today."
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {livePulse.map((signal) => {
          const stale = isSignalStale(signal, now)

          return (
            <article
              key={`${signal.name}-${signal.updatedAt}`}
              className="border-border/80 bg-card space-y-2 border p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">
                  {signalLabels[signal.name]}
                </h3>
                <Badge
                  variant={stale ? "secondary" : "outline"}
                  className="rounded-none text-[11px]"
                >
                  {stale ? "Stale" : "Fresh"}
                </Badge>
              </div>
              <p className="text-sm">{signal.status}</p>
              {stale ? (
                <p className="text-muted-foreground text-xs">
                  Status may be outdated. Verify with the source before acting.
                </p>
              ) : null}
              <p className="text-muted-foreground text-xs">
                Updated: {formatSignalTimestamp(signal.updatedAt)}
              </p>
              <a
                href={signal.sourceUrl}
                className="text-xs underline decoration-dotted underline-offset-2"
                target="_blank"
                rel="noreferrer"
              >
                View source
              </a>
            </article>
          )
        })}
      </div>
    </section>
  )
}
