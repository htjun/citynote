import type { SonarMessage, SonarResponse, SearchResponse } from "./types"
import { PerplexityError } from "./types"

const API_BASE = "https://api.perplexity.ai"
const DEFAULT_TIMEOUT_MS = 30_000

function getApiKey(): string {
  const key = process.env.PERPLEXITY_API_KEY
  if (!key) {
    throw new PerplexityError(
      "PERPLEXITY_API_KEY environment variable is not set",
      undefined,
      "missing_key"
    )
  }
  return key
}

export function isApiKeyConfigured(): boolean {
  return !!process.env.PERPLEXITY_API_KEY
}

function normalizeHttpError(status: number): string {
  if (status === 429) {
    return "quota"
  }
  if (status === 401 || status === 403) {
    return "missing_key"
  }
  return "upstream"
}

export interface SonarChatOptions {
  model?: "sonar" | "sonar-pro" | "sonar-reasoning-pro"
  timeoutMs?: number
}

export async function sonarChat(
  messages: SonarMessage[],
  options?: SonarChatOptions
): Promise<SonarResponse> {
  const apiKey = getApiKey()
  const model = options?.model ?? "sonar"
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(`${API_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model, messages }),
      signal: controller.signal,
    })

    if (!response.ok) {
      const body = await response.text().catch(() => "")
      throw new PerplexityError(
        `Sonar API ${response.status}: ${body}`,
        response.status,
        normalizeHttpError(response.status)
      )
    }

    return (await response.json()) as SonarResponse
  } catch (error) {
    if (error instanceof PerplexityError) {
      throw error
    }
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new PerplexityError("Request timed out", undefined, "timeout")
    }
    throw new PerplexityError(
      error instanceof Error ? error.message : String(error),
      undefined,
      "upstream"
    )
  } finally {
    clearTimeout(timer)
  }
}

export interface SearchWebOptions {
  maxResults?: number
  country?: string
  searchLanguageFilter?: string[]
  searchDomainFilter?: string[]
  maxTokensPerPage?: number
  timeoutMs?: number
}

export async function searchWeb(
  query: string | string[],
  options?: SearchWebOptions
): Promise<SearchResponse> {
  const apiKey = getApiKey()
  const timeoutMs = options?.timeoutMs ?? DEFAULT_TIMEOUT_MS

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const body: Record<string, unknown> = {
      query,
      max_results: options?.maxResults ?? 5,
    }
    if (options?.country) {
      body.country = options.country
    }
    if (options?.searchLanguageFilter) {
      body.search_language_filter = options.searchLanguageFilter
    }
    if (options?.searchDomainFilter) {
      body.search_domain_filter = options.searchDomainFilter
    }
    if (options?.maxTokensPerPage) {
      body.max_tokens_per_page = options.maxTokensPerPage
    }

    const response = await fetch(`${API_BASE}/search`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    if (!response.ok) {
      const responseBody = await response.text().catch(() => "")
      throw new PerplexityError(
        `Search API ${response.status}: ${responseBody}`,
        response.status,
        normalizeHttpError(response.status)
      )
    }

    return (await response.json()) as SearchResponse
  } catch (error) {
    if (error instanceof PerplexityError) {
      throw error
    }
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new PerplexityError("Request timed out", undefined, "timeout")
    }
    throw new PerplexityError(
      error instanceof Error ? error.message : String(error),
      undefined,
      "upstream"
    )
  } finally {
    clearTimeout(timer)
  }
}
