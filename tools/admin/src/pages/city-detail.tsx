import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

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
    if (!slug) {
      return
    }

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
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false))
  }, [slug])

  async function handleValidate(section: string) {
    if (!slug) {
      return
    }

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
    } catch (requestError) {
      setValidationError(
        requestError instanceof Error
          ? requestError.message
          : "Validation request failed"
      )
    } finally {
      setValidatingSection(null)
    }
  }

  async function handleSearchNews() {
    if (!slug) {
      return
    }

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
    } catch (requestError) {
      setNewsError(
        requestError instanceof Error
          ? requestError.message
          : "News search request failed"
      )
    } finally {
      setSearchingNews(false)
    }
  }

  if (loading) {
    return (
      <div className="text-muted-foreground px-1 py-6 text-sm">
        Loading city data...
      </div>
    )
  }

  if (error || !city) {
    return (
      <div className="space-y-3">
        <Link
          to="/cities"
          className="text-muted-foreground hover:text-foreground inline-flex items-center text-xs transition-colors"
        >
          &larr; Cities
        </Link>
        <div className="border-destructive/30 bg-destructive/10 text-destructive rounded-none border px-3 py-2 text-xs">
          {error ?? "City not found"}
        </div>
      </div>
    )
  }

  const visibleSections = SECTIONS.filter(
    (s) => city[s.key] !== null && city[s.key] !== undefined
  )

  return (
    <div className="space-y-6">
      <Link
        to="/cities"
        className="text-muted-foreground hover:text-foreground inline-flex items-center text-xs transition-colors"
      >
        &larr; Cities
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            {city.name}, {city.country}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">{city.tagline}</p>
        </div>
        <StatusBadge configured={apiConfigured} checked={statusChecked} />
      </div>

      {!apiConfigured && statusChecked && (
        <div className="rounded-none border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          PERPLEXITY_API_KEY is not set. Export it in your shell before running
          the admin tool.
        </div>
      )}

      {validationError ? (
        <div className="border-destructive/30 bg-destructive/10 text-destructive rounded-none border px-3 py-2 text-xs">
          {validationError}
        </div>
      ) : null}

      <div className="space-y-3">
        {visibleSections.map((section) => (
          <SectionCard
            key={section.key}
            sectionKey={section.key}
            label={section.label}
            data={city[section.key]}
            result={validationResults[section.key]}
            isValidating={validatingSection === section.key}
            anyValidating={validatingSection !== null}
            apiConfigured={apiConfigured}
            onValidate={() => handleValidate(section.key)}
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
  if (!checked) {
    return null
  }

  if (configured) {
    return (
      <Badge
        variant="secondary"
        className="border-emerald-600/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      >
        Perplexity API connected
      </Badge>
    )
  }

  return (
    <Badge
      variant="destructive"
      className="border-destructive/20 bg-destructive/10"
    >
      API key missing
    </Badge>
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
  const isDisabled = isValidating || anyValidating || !apiConfigured

  return (
    <Card className="gap-0 overflow-hidden py-0" data-section={sectionKey}>
      <CardHeader className="border-b px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle>{label}</CardTitle>
          <Button
            onClick={onValidate}
            disabled={isDisabled}
            size="xs"
            variant="outline"
          >
            {isValidating ? "Validating..." : "Validate"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="px-0 pb-0">
        <details>
          <summary className="text-muted-foreground hover:bg-muted/40 cursor-pointer px-4 py-2 text-[11px] transition-colors">
            Current data
          </summary>
          <pre className="bg-muted/30 border-border/60 max-h-72 overflow-auto border-t px-4 py-3 font-mono text-[11px] leading-relaxed">
            {JSON.stringify(data, null, 2)}
          </pre>
        </details>

        {result ? <ValidationResultView result={result} /> : null}
      </CardContent>
    </Card>
  )
}

function ValidationResultView({ result }: { result: ValidationResult }) {
  return (
    <div className="border-border/60 bg-primary/5 border-t px-4 py-4">
      <div className="text-muted-foreground mb-3 flex flex-col gap-1 text-[11px] sm:flex-row sm:items-center sm:justify-between">
        <span>Validated {new Date(result.validatedAt).toLocaleString()}</span>
        <span className="font-mono">
          {result.model} - {result.usage.total_tokens} tokens
        </span>
      </div>

      <div className="space-y-1 text-xs leading-relaxed">
        {result.sonarFindings.split("\n").map((line, index) => {
          if (line.startsWith("## ")) {
            return (
              <h4 key={index} className="pt-2 text-xs font-semibold">
                {line.replace("## ", "")}
              </h4>
            )
          }

          if (
            line.startsWith("- **OUTDATED") ||
            line.startsWith("- OUTDATED")
          ) {
            return (
              <p key={index} className="text-destructive font-medium">
                {line}
              </p>
            )
          }

          if (line.startsWith("- **CURRENT") || line.startsWith("- CURRENT")) {
            return (
              <p
                key={index}
                className="font-medium text-emerald-700 dark:text-emerald-300"
              >
                {line}
              </p>
            )
          }

          if (line.trim() === "") {
            return <div key={index} className="h-2" />
          }

          return <p key={index}>{line}</p>
        })}
      </div>

      {result.citations.length > 0 ? (
        <div className="border-border/60 mt-3 border-t pt-3">
          <p className="text-muted-foreground text-[11px] font-medium">
            Sources:
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-4 text-xs">
            {result.citations.map((url, index) => (
              <li key={index}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary break-all hover:underline"
                >
                  {truncateUrl(url)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
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
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <CardTitle>News Preview</CardTitle>
            <CardDescription className="mt-1">
              Preview city news from Perplexity Search API. This will replace
              the current RSS-based news provider.
            </CardDescription>
          </div>
          <Button
            onClick={onSearch}
            disabled={isSearching || !apiConfigured}
            size="xs"
            variant="outline"
          >
            {isSearching ? "Searching..." : "Search News"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {error ? (
          <div className="border-destructive/30 bg-destructive/10 text-destructive rounded-none border px-3 py-2 text-xs">
            {error}
          </div>
        ) : null}

        {results ? (
          <div className="space-y-3">
            <div className="text-muted-foreground text-xs italic">
              Query: "{results.query}" - {results.results.length} results -{" "}
              {new Date(results.searchedAt).toLocaleString()}
            </div>

            {results.results.map((item, index) => (
              <article
                key={index}
                className="border-border/60 space-y-1 border-t pt-3 first:border-t-0 first:pt-0"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary block text-sm font-medium hover:underline"
                >
                  {item.title}
                </a>
                {item.date ? (
                  <p className="text-muted-foreground text-[11px]">
                    {item.date}
                  </p>
                ) : null}
                {item.snippet ? (
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {item.snippet.length > 300
                      ? `${item.snippet.slice(0, 300)}...`
                      : item.snippet}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

function truncateUrl(url: string): string {
  try {
    const parsedUrl = new URL(url)
    const path =
      parsedUrl.pathname.length > 40
        ? `${parsedUrl.pathname.slice(0, 40)}...`
        : parsedUrl.pathname
    return `${parsedUrl.hostname}${path}`
  } catch {
    return url.length > 60 ? `${url.slice(0, 60)}...` : url
  }
}
