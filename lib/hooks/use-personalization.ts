"use client"

import { useLocale } from "next-intl"
import { usePreferences } from "@/lib/stores/preferences"
import type { TravelType } from "@/lib/stores/preferences"
import type { Locale } from "@/i18n/locales"

export interface Personalization {
  locale: Locale
  nationality: string | null
  travelType: TravelType | null
}

export function usePersonalization(): Personalization {
  const locale = useLocale() as Locale
  const { nationality, travelType } = usePreferences()
  return { locale, nationality, travelType }
}
