import { Link } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cityRuntimeConfigBySlug } from "@/data/city-runtime-config"

const configs = Object.values(cityRuntimeConfigBySlug)

export function CitiesPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="text-xl font-semibold tracking-tight">Cities</h1>
        <Badge variant="outline" className="font-mono text-[11px]">
          {configs.length} configured
        </Badge>
      </header>

      <Card className="gap-0 overflow-hidden py-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-subtle/70">
              <tr>
                <th className="text-quieter border-subtlest border-b px-3 py-2 text-left text-[11px] font-medium uppercase tracking-wide whitespace-nowrap">
                  Slug
                </th>
                <th className="text-quieter border-subtlest border-b px-3 py-2 text-left text-[11px] font-medium uppercase tracking-wide whitespace-nowrap">
                  Currency
                </th>
                <th className="text-quieter border-subtlest border-b px-3 py-2 text-left text-[11px] font-medium uppercase tracking-wide whitespace-nowrap">
                  Weather Query
                </th>
                <th className="text-quieter border-subtlest border-b px-3 py-2 text-left text-[11px] font-medium uppercase tracking-wide whitespace-nowrap">
                  News Aliases
                </th>
                <th className="text-quieter border-subtlest border-b px-3 py-2 text-left text-[11px] font-medium uppercase tracking-wide whitespace-nowrap">
                  Fallback Links
                </th>
              </tr>
            </thead>
            <tbody>
              {configs.map((config) => (
                <tr
                  key={config.slug}
                  className="border-subtlest border-b last:border-b-0"
                >
                  <td className="px-3 py-2 align-top text-xs">
                    <Link
                      to={`/cities/${config.slug}`}
                      className="text-super font-mono text-xs font-medium hover:underline"
                    >
                      {config.slug}
                    </Link>
                  </td>
                  <td className="px-3 py-2 align-top text-xs">
                    {config.localCurrency}
                  </td>
                  <td className="px-3 py-2 align-top text-xs">
                    <code className="bg-subtle rounded-md px-1.5 py-0.5 font-mono text-[11px]">
                      {config.weatherQuery}
                    </code>
                  </td>
                  <td className="px-3 py-2 align-top text-xs">
                    {config.newsProfile.cityAliases.join(", ")}
                  </td>
                  <td className="px-3 py-2 align-top text-xs">
                    {config.newsFallbackLinks.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="space-y-3">
        {configs.map((config) => (
          <Card key={config.slug} className="gap-0 overflow-hidden py-0">
            <details className="group">
              <summary className="hover:bg-subtle/70 cursor-pointer px-4 py-3 text-sm font-medium transition-colors duration-normal ease-fluid">
                <span className="font-mono text-xs">{config.slug}</span>
                <span className="text-quiet"> - full runtime config</span>
              </summary>
              <div className="border-subtlest border-t">
                <pre className="bg-subtle/50 max-h-96 overflow-auto px-4 py-4 font-mono text-[11px] leading-relaxed">
                  {JSON.stringify(config, null, 2)}
                </pre>
              </div>
            </details>
          </Card>
        ))}
      </div>
    </div>
  )
}
