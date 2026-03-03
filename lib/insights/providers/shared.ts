import { providerTimeoutMs } from "@/lib/insights/cadence"
import type { RuntimeErrorCode } from "@/lib/insights/types"

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

export async function fetchWithTimeout(
  input: URL | RequestInfo,
  init: RequestInit,
  timeoutMs: number = providerTimeoutMs
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timeoutId)
  }
}

export function normalizeErrorCode(
  status: number | null,
  error: unknown
): RuntimeErrorCode {
  if (status === 429) {
    return "quota"
  }

  if (status === 401 || status === 403) {
    return "missing_key"
  }

  if (error instanceof DOMException && error.name === "AbortError") {
    return "timeout"
  }

  if (status !== null && status >= 500) {
    return "upstream"
  }

  return "upstream"
}
