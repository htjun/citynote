import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"

interface SonarUsage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

interface ValidationResult {
  section: string
  sectionLabel: string
  citySlug: string
  cityName: string
  currentData: unknown
  sonarFindings: string
  citations: string[]
  validatedAt: string
  model: string
  usage: SonarUsage
}

interface SearchResult {
  title: string
  url: string
  snippet: string
  date?: string
}

interface NewsSearchResult {
  results: SearchResult[]
  query: string
  searchedAt: string
}

interface CityData {
  slug: string
  name: string
  country: string
  tagline: string
  [key: string]: unknown
}

const SECTIONS = [
  { key: "atAGlance", label: "At a Glance" },
  { key: "climate", label: "Climate" },
  { key: "costOfLiving", label: "Cost of Living" },
  { key: "gettingAround", label: "Getting Around" },
  { key: "connectivity", label: "Connectivity" },
  { key: "neighborhoods", label: "Neighborhoods" },
  { key: "foodDrink", label: "Food & Drink" },
  { key: "languageCulture", label: "Language & Culture" },
  { key: "safetyHealth", label: "Safety & Health" },
  { key: "practicalInfo", label: "Practical Info" },
  { key: "ruleTraps", label: "Rule Traps" },
] as const

export function CityDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [city, setCity] = useState<CityData | null>(null)
  const [apiConfigured, setApiConfigured] = useState(false)
  const [statusChecked, setStatusChecked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [validationResults, setValidationResults] = useState<
    Record<string, ValidationResult>
  >({})
  const [validatingSection, setValidatingSection] = useState<string | null>(
    null
  )
  const [validationError, setValidationError] = useState<string | null>(null)

  const [newsResults, setNewsResults] = useState<NewsSearchResult | null>(null)
  const [searchingNews, setSearchingNews] = useState(false)
  const [newsError, setNewsError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {return}

    setLoading(true)
    setError(null)

    Promise.all([
      fetch(`/api/cities/${slug}`).then((r) => r.json()),
      fetch("/api/status").then((r) => r.json()),
    ])
      .then(([cityRes, statusRes]) => {
        if (cityRes.error) {
          setError(cityRes.error)
          return
        }
        setCity(cityRes.city)
        setApiConfigured(statusRes.perplexityConfigured)
        setStatusChecked(true)
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }, [slug])

  async function handleValidate(section: string) {
    if (!slug) {return}

    setValidatingSection(section)
    setValidationError(null)

    try {
      const res = await fetch(`/api/cities/${slug}/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section }),
      })
      const data = await res.json()

      if (data.error) {
        setValidationError(data.error)
        return
      }

      setValidationResults((prev) => ({
        ...prev,
        [section]: data.result,
      }))
    } catch (error) {
      setValidationError(
        error instanceof Error ? error.message : "Validation request failed"
      )
    } finally {
      setValidatingSection(null)
    }
  }

  async function handleSearchNews() {
    if (!slug) {return}

    setSearchingNews(true)
    setNewsError(null)

    try {
      const res = await fetch(`/api/cities/${slug}/search-news`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
      const data = await res.json()

      if (data.error) {
        setNewsError(data.error)
        return
      }

      setNewsResults(data)
    } catch (error) {
      setNewsError(
        error instanceof Error ? error.message : "News search request failed"
      )
    } finally {
      setSearchingNews(false)
    }
  }

  if (loading) {
    return <div style={messageStyle}>Loading city data...</div>
  }

  if (error || !city) {
    return (
      <div>
        <Link to="/cities" style={backLinkStyle}>
          &larr; Cities
        </Link>
        <div style={errorBannerStyle}>{error ?? "City not found"}</div>
      </div>
    )
  }

  const visibleSections = SECTIONS.filter((s) => city[s.key] != null)

  return (
    <div>
      <Link to="/cities" style={backLinkStyle}>
        &larr; Cities
      </Link>

      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>
            {city.name}, {city.country}
          </h1>
          <p style={taglineStyle}>{city.tagline}</p>
        </div>
        <div style={statusContainerStyle}>
          <StatusBadge configured={apiConfigured} checked={statusChecked} />
        </div>
      </div>

      {!apiConfigured && statusChecked && (
        <div style={warningBannerStyle}>
          PERPLEXITY_API_KEY is not set. Export it in your shell before running
          the admin tool.
        </div>
      )}

      {validationError && <div style={errorBannerStyle}>{validationError}</div>}

      <div style={sectionGridStyle}>
        {visibleSections.map((s) => (
          <SectionCard
            key={s.key}
            sectionKey={s.key}
            label={s.label}
            data={city[s.key]}
            result={validationResults[s.key]}
            isValidating={validatingSection === s.key}
            anyValidating={validatingSection !== null}
            apiConfigured={apiConfigured}
            onValidate={() => handleValidate(s.key)}
          />
        ))}
      </div>

      <NewsPanel
        results={newsResults}
        error={newsError}
        isSearching={searchingNews}
        apiConfigured={apiConfigured}
        onSearch={handleSearchNews}
      />
    </div>
  )
}

function StatusBadge({
  configured,
  checked,
}: {
  configured: boolean
  checked: boolean
}) {
  if (!checked) {return null}

  return (
    <span
      style={{
        ...badgeBaseStyle,
        backgroundColor: configured ? "#e6f4ea" : "#fce8e6",
        color: configured ? "#1e7e34" : "#c5221f",
      }}
    >
      {configured ? "Perplexity API connected" : "API key missing"}
    </span>
  )
}

function SectionCard({
  sectionKey,
  label,
  data,
  result,
  isValidating,
  anyValidating,
  apiConfigured,
  onValidate,
}: {
  sectionKey: string
  label: string
  data: unknown
  result?: ValidationResult
  isValidating: boolean
  anyValidating: boolean
  apiConfigured: boolean
  onValidate: () => void
}) {
  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle}>
        <span style={cardLabelStyle}>{label}</span>
        <button
          onClick={onValidate}
          disabled={isValidating || anyValidating || !apiConfigured}
          style={{
            ...buttonStyle,
            opacity: isValidating || anyValidating || !apiConfigured ? 0.5 : 1,
            cursor:
              isValidating || anyValidating || !apiConfigured
                ? "not-allowed"
                : "pointer",
          }}
        >
          {isValidating ? "Validating..." : "Validate"}
        </button>
      </div>

      <details style={detailsStyle}>
        <summary style={summaryStyle}>Current data</summary>
        <pre style={dataPreStyle}>{JSON.stringify(data, null, 2)}</pre>
      </details>

      {result && <ValidationResultView result={result} />}
    </div>
  )
}

function ValidationResultView({ result }: { result: ValidationResult }) {
  return (
    <div style={resultContainerStyle}>
      <div style={resultMetaStyle}>
        <span>Validated {new Date(result.validatedAt).toLocaleString()}</span>
        <span style={resultModelStyle}>
          {result.model} &middot; {result.usage.total_tokens} tokens
        </span>
      </div>

      <div style={findingsStyle}>
        {result.sonarFindings.split("\n").map((line, i) => {
          if (line.startsWith("## ")) {
            return (
              <h4 key={i} style={findingsHeadingStyle}>
                {line.replace("## ", "")}
              </h4>
            )
          }
          if (
            line.startsWith("- **OUTDATED") ||
            line.startsWith("- OUTDATED")
          ) {
            return (
              <p key={i} style={outdatedLineStyle}>
                {line}
              </p>
            )
          }
          if (line.startsWith("- **CURRENT") || line.startsWith("- CURRENT")) {
            return (
              <p key={i} style={currentLineStyle}>
                {line}
              </p>
            )
          }
          if (line.trim() === "") {return <br key={i} />}
          return (
            <p key={i} style={findingsLineStyle}>
              {line}
            </p>
          )
        })}
      </div>

      {result.citations.length > 0 && (
        <div style={citationsContainerStyle}>
          <strong style={{ fontSize: 12 }}>Sources:</strong>
          <ul style={citationsListStyle}>
            {result.citations.map((url, i) => (
              <li key={i}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={citationLinkStyle}
                >
                  {truncateUrl(url)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function NewsPanel({
  results,
  error,
  isSearching,
  apiConfigured,
  onSearch,
}: {
  results: NewsSearchResult | null
  error: string | null
  isSearching: boolean
  apiConfigured: boolean
  onSearch: () => void
}) {
  return (
    <div style={newsPanelStyle}>
      <div style={newsPanelHeaderStyle}>
        <h2 style={newsPanelTitleStyle}>News Preview</h2>
        <button
          onClick={onSearch}
          disabled={isSearching || !apiConfigured}
          style={{
            ...buttonStyle,
            opacity: isSearching || !apiConfigured ? 0.5 : 1,
            cursor: isSearching || !apiConfigured ? "not-allowed" : "pointer",
          }}
        >
          {isSearching ? "Searching..." : "Search News"}
        </button>
      </div>

      <p style={newsDescStyle}>
        Preview city news from Perplexity Search API. This will replace the
        current RSS-based news provider.
      </p>

      {error && <div style={errorBannerStyle}>{error}</div>}

      {results && (
        <div>
          <div style={newsMetaStyle}>
            Query: &ldquo;{results.query}&rdquo; &middot;{" "}
            {results.results.length} results &middot;{" "}
            {new Date(results.searchedAt).toLocaleString()}
          </div>

          {results.results.map((item, i) => (
            <div key={i} style={newsItemStyle}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={newsItemTitleStyle}
              >
                {item.title}
              </a>
              {item.date && <span style={newsItemDateStyle}>{item.date}</span>}
              {item.snippet && (
                <p style={newsItemSnippetStyle}>
                  {item.snippet.length > 300
                    ? `${item.snippet.slice(0, 300)}...`
                    : item.snippet}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function truncateUrl(url: string): string {
  try {
    const u = new URL(url)
    const path =
      u.pathname.length > 40 ? `${u.pathname.slice(0, 40)}...` : u.pathname
    return `${u.hostname}${path}`
  } catch {
    return url.length > 60 ? `${url.slice(0, 60)}...` : url
  }
}

// --- Styles ---

const backLinkStyle: React.CSSProperties = {
  display: "inline-block",
  marginBottom: 16,
  fontSize: 13,
  color: "#555",
  textDecoration: "none",
}

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: 24,
}

const titleStyle: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  margin: 0,
}

const taglineStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#666",
  margin: "4px 0 0",
}

const statusContainerStyle: React.CSSProperties = {
  flexShrink: 0,
  marginLeft: 16,
}

const badgeBaseStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: 4,
  fontSize: 12,
  fontWeight: 600,
}

const messageStyle: React.CSSProperties = {
  padding: 24,
  color: "#666",
  fontSize: 14,
}

const warningBannerStyle: React.CSSProperties = {
  padding: "10px 14px",
  marginBottom: 20,
  backgroundColor: "#fff3cd",
  border: "1px solid #ffc107",
  borderRadius: 6,
  fontSize: 13,
  color: "#856404",
}

const errorBannerStyle: React.CSSProperties = {
  padding: "10px 14px",
  marginBottom: 20,
  backgroundColor: "#fce8e6",
  border: "1px solid #f5c6cb",
  borderRadius: 6,
  fontSize: 13,
  color: "#c5221f",
}

const sectionGridStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
}

const cardStyle: React.CSSProperties = {
  border: "1px solid #e0e0e0",
  borderRadius: 6,
  backgroundColor: "#fff",
  overflow: "hidden",
}

const cardHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 14px",
  borderBottom: "1px solid #f0f0f0",
}

const cardLabelStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
}

const buttonStyle: React.CSSProperties = {
  padding: "5px 14px",
  fontSize: 12,
  fontWeight: 600,
  border: "1px solid #d0d0d0",
  borderRadius: 4,
  backgroundColor: "#fff",
  color: "#333",
  transition: "background-color 0.15s",
}

const detailsStyle: React.CSSProperties = {
  borderBottom: "1px solid #f0f0f0",
}

const summaryStyle: React.CSSProperties = {
  padding: "8px 14px",
  fontSize: 12,
  color: "#888",
  cursor: "pointer",
}

const dataPreStyle: React.CSSProperties = {
  margin: 0,
  padding: "8px 14px 12px",
  fontSize: 11,
  lineHeight: 1.5,
  overflow: "auto",
  maxHeight: 300,
  backgroundColor: "#fafafa",
}

const resultContainerStyle: React.CSSProperties = {
  padding: 14,
  backgroundColor: "#f8fbff",
  borderTop: "2px solid #4a90d9",
}

const resultMetaStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: 11,
  color: "#888",
  marginBottom: 10,
}

const resultModelStyle: React.CSSProperties = {
  fontFamily: "monospace",
}

const findingsStyle: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.7,
}

const findingsHeadingStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  margin: "12px 0 4px",
  color: "#333",
}

const findingsLineStyle: React.CSSProperties = {
  margin: "2px 0",
}

const outdatedLineStyle: React.CSSProperties = {
  margin: "2px 0",
  color: "#c5221f",
  fontWeight: 500,
}

const currentLineStyle: React.CSSProperties = {
  margin: "2px 0",
  color: "#1e7e34",
}

const citationsContainerStyle: React.CSSProperties = {
  marginTop: 12,
  paddingTop: 10,
  borderTop: "1px solid #e0e8f0",
}

const citationsListStyle: React.CSSProperties = {
  margin: "4px 0 0",
  paddingLeft: 18,
  fontSize: 12,
  lineHeight: 1.8,
}

const citationLinkStyle: React.CSSProperties = {
  color: "#4a90d9",
  textDecoration: "none",
  wordBreak: "break-all",
}

const newsPanelStyle: React.CSSProperties = {
  marginTop: 32,
  border: "1px solid #e0e0e0",
  borderRadius: 6,
  backgroundColor: "#fff",
  padding: 14,
}

const newsPanelHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
}

const newsPanelTitleStyle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 700,
  margin: 0,
}

const newsDescStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#666",
  margin: "0 0 12px",
}

const newsMetaStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#888",
  marginBottom: 10,
  fontStyle: "italic",
}

const newsItemStyle: React.CSSProperties = {
  padding: "10px 0",
  borderTop: "1px solid #f0f0f0",
}

const newsItemTitleStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  color: "#1a73e8",
  textDecoration: "none",
  display: "block",
}

const newsItemDateStyle: React.CSSProperties = {
  fontSize: 11,
  color: "#999",
  marginLeft: 8,
}

const newsItemSnippetStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#555",
  margin: "4px 0 0",
  lineHeight: 1.5,
}
