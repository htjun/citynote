import { FeaturePlaceholder } from "../components/feature-placeholder"

export function AgentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold tracking-tight">
        Agent Orchestration
      </h1>
      <FeaturePlaceholder
        title="Agent orchestration"
        description="Agent orchestration will be configured here."
        icon={<span className="font-mono text-xs uppercase">Agents</span>}
        items={[
          "Register and manage AI agents",
          "Define agent pipelines and workflows",
          "Monitor agent execution status",
          "View logs and output",
        ]}
      />
    </div>
  )
}
