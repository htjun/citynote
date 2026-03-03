export const providerCadenceSeconds = {
  weather: 3 * 60 * 60,
  currency: 24 * 60 * 60,
  news: 12 * 60 * 60,
} as const

export const providerMaxStaleSeconds = {
  weather: 24 * 60 * 60,
  currency: 7 * 24 * 60 * 60,
  news: 3 * 24 * 60 * 60,
} as const

export const providerTimeoutMs = 4000

const defaultCurrencyBases = ["USD", "EUR"] as const

export type DefaultCurrencyBase = (typeof defaultCurrencyBases)[number]

export function getCurrencyBases(): string[] {
  const configured = process.env.CURRENCY_BASES

  if (!configured) {
    return [...defaultCurrencyBases]
  }

  const bases = configured
    .split(",")
    .map((value) => value.trim().toUpperCase())
    .filter(Boolean)

  return bases.length > 0 ? bases : [...defaultCurrencyBases]
}
