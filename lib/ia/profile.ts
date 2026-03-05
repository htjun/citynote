import type { PersonalizationProfile } from "@/lib/ia/types"
import type { PersonalizationInput } from "@/lib/personalization/schema"
import {
  normalizeNationality,
  normalizeTravelType,
} from "@/lib/personalization/schema"

export function deriveNationalityRelation(
  nationality: string | null,
  cityCountryCode: string
): PersonalizationProfile["nationalityRelation"] {
  const normalizedNationality = normalizeNationality(nationality)
  const normalizedCityCode = cityCountryCode.trim().toUpperCase()

  if (!normalizedNationality || !normalizedCityCode) {
    return "unknown"
  }

  return normalizedNationality === normalizedCityCode
    ? "domestic"
    : "international"
}

export function buildPersonalizationProfile(input: {
  personalization: PersonalizationInput
  cityCountryCode: string
}): PersonalizationProfile {
  const purpose = normalizeTravelType(input.personalization.purpose)
  const nationality = normalizeNationality(input.personalization.nationality)

  return {
    purpose,
    nationality,
    nationalityRelation: deriveNationalityRelation(
      nationality,
      input.cityCountryCode
    ),
  }
}
