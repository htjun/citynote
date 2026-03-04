export interface SonarMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export interface SonarChoice {
  index: number
  message: { role: "assistant"; content: string }
  finish_reason: string
}

export interface SonarUsage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface SonarResponse {
  id: string
  model: string
  created: number
  choices: SonarChoice[]
  usage: SonarUsage
  citations?: string[]
}

export interface SearchResult {
  title: string
  url: string
  snippet: string
  date?: string
  last_updated?: string
}

export interface SearchResponse {
  results: SearchResult[]
  id: string
}

export interface ValidationInput {
  cityName: string
  country: string
  section: string
  sectionLabel: string
  currentData: unknown
}

export interface ValidationResult {
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

export class PerplexityError extends Error {
  statusCode?: number
  errorCode?: string

  constructor(message: string, statusCode?: number, errorCode?: string) {
    super(message)
    this.name = "PerplexityError"
    this.statusCode = statusCode
    this.errorCode = errorCode
  }
}
