export const TRAVEL_TYPES = ["trip", "study", "live"] as const

export type TravelType = (typeof TRAVEL_TYPES)[number]

export const PERSONALIZATION_COOKIE_KEYS = {
  purpose: "citynote-purpose",
  nationality: "citynote-nationality",
} as const

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365
const COUNTRY_CODE_PATTERN = /^[A-Za-z]{2}$/

interface CookieStoreLike {
  set: (input: {
    name: string
    value: string
    path: string
    maxAge: number
    sameSite: "lax"
  }) => Promise<void>
}

export interface PersonalizationInput {
  purpose: TravelType | null
  nationality: string | null
}

export function normalizeTravelType(
  value: string | null | undefined
): TravelType | null {
  if (!value) {
    return null
  }

  const normalized = value.trim().toLowerCase()

  if (TRAVEL_TYPES.includes(normalized as TravelType)) {
    return normalized as TravelType
  }

  return null
}

export function normalizeNationality(
  value: string | null | undefined
): string | null {
  if (!value) {
    return null
  }

  const normalized = value.trim().toUpperCase()
  if (!COUNTRY_CODE_PATTERN.test(normalized)) {
    return null
  }

  return normalized
}

export function parsePersonalizationInput(input: {
  purpose?: string | null
  nationality?: string | null
}): PersonalizationInput {
  return {
    purpose: normalizeTravelType(input.purpose),
    nationality: normalizeNationality(input.nationality),
  }
}

function cookieMaxAge(value: string | null): number {
  return value ? ONE_YEAR_SECONDS : 0
}

function getCookieStore(): CookieStoreLike | null {
  if (typeof window === "undefined") {
    return null
  }

  const cookieStoreCandidate = (
    window as typeof window & {
      cookieStore?: CookieStoreLike
    }
  ).cookieStore

  return cookieStoreCandidate ?? null
}

export function writePreferenceCookie(
  key: keyof typeof PERSONALIZATION_COOKIE_KEYS,
  value: string | null
): void {
  const cookieStore = getCookieStore()

  if (!cookieStore) {
    return
  }

  const cookieName = PERSONALIZATION_COOKIE_KEYS[key]
  const encodedValue = value ? encodeURIComponent(value) : ""

  cookieStore.set({
    name: cookieName,
    value: encodedValue,
    path: "/",
    maxAge: cookieMaxAge(value),
    sameSite: "lax",
  })
}

export function persistPersonalizationInput(
  input: Partial<PersonalizationInput>
): void {
  if (input.purpose !== undefined) {
    writePreferenceCookie("purpose", input.purpose)
  }

  if (input.nationality !== undefined) {
    writePreferenceCookie("nationality", input.nationality)
  }
}
