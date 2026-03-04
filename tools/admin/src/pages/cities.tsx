import { cityRuntimeConfigBySlug } from "@citynote/data/city-runtime-config"
import type { CityRuntimeConfig } from "@citynote/data/city-runtime-config"

const configs = Object.values(
  cityRuntimeConfigBySlug as Record<string, CityRuntimeConfig>
)

export function CitiesPage() {
  return (
    <div>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Cities</h1>
        <span style={countStyle}>{configs.length} configured</span>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Slug</th>
            <th style={thStyle}>Currency</th>
            <th style={thStyle}>Weather Query</th>
            <th style={thStyle}>News Aliases</th>
            <th style={thStyle}>Fallback Links</th>
          </tr>
        </thead>
        <tbody>
          {configs.map((config) => (
            <tr key={config.slug} style={trStyle}>
              <td style={tdStyle}>
                <code style={codeStyle}>{config.slug}</code>
              </td>
              <td style={tdStyle}>{config.localCurrency}</td>
              <td style={tdStyle}>
                <code style={codeStyle}>{config.weatherQuery}</code>
              </td>
              <td style={tdStyle}>
                {config.newsProfile.cityAliases.join(", ")}
              </td>
              <td style={tdStyle}>{config.newsFallbackLinks.length}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {configs.map((config) => (
        <details key={config.slug} style={detailsStyle}>
          <summary style={summaryStyle}>
            {config.slug} &mdash; full runtime config
          </summary>
          <pre style={preStyle}>{JSON.stringify(config, null, 2)}</pre>
        </details>
      ))}
    </div>
  )
}

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "baseline",
  gap: 12,
  marginBottom: 24,
}

const titleStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  margin: 0,
}

const countStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#888",
}

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
  marginBottom: 32,
}

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "8px 12px",
  borderBottom: "2px solid #e0e0e0",
  fontSize: 12,
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "#666",
}

const trStyle: React.CSSProperties = {
  borderBottom: "1px solid #eee",
}

const tdStyle: React.CSSProperties = {
  padding: "8px 12px",
  verticalAlign: "top",
}

const codeStyle: React.CSSProperties = {
  backgroundColor: "#f0f0f0",
  padding: "2px 6px",
  borderRadius: 3,
  fontSize: 13,
}

const detailsStyle: React.CSSProperties = {
  marginBottom: 12,
  border: "1px solid #e0e0e0",
  borderRadius: 6,
  overflow: "hidden",
}

const summaryStyle: React.CSSProperties = {
  padding: "10px 14px",
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500,
  backgroundColor: "#fff",
}

const preStyle: React.CSSProperties = {
  margin: 0,
  padding: 16,
  backgroundColor: "#f8f8f8",
  fontSize: 12,
  lineHeight: 1.5,
  overflow: "auto",
}
