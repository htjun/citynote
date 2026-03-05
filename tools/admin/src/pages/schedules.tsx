import { FeaturePlaceholder } from "../components/feature-placeholder"

export function SchedulesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">Schedules</h1>
      <FeaturePlaceholder
        title="Task scheduling"
        description="Task scheduling will be configured here."
        icon={
          <span className="text-quiet font-mono text-xs uppercase">
            Schedules
          </span>
        }
        items={[
          "Create and manage scheduled tasks",
          "Set cron expressions and intervals",
          "View execution history",
          "Enable and disable schedules",
        ]}
      />
    </div>
  )
}
