import type { City } from "@/data/types"
import { defaultLocale } from "@/i18n/locales"
import type { Locale } from "@/i18n/locales"

import {
  citiesBySlug as enCitiesBySlug,
  cityList as enCityList,
} from "@/data/cities/en"
import {
  citiesBySlug as koCitiesBySlug,
  cityList as koCityList,
} from "@/data/cities/ko"

const citiesByLocale: Record<Locale, Record<string, City>> = {
  en: enCitiesBySlug,
  ko: koCitiesBySlug,
}

const cityListsByLocale: Record<Locale, City[]> = {
  en: enCityList,
  ko: koCityList,
}

export function getCityList(locale: Locale): City[] {
  return cityListsByLocale[locale] ?? cityListsByLocale[defaultLocale]
}

export function getCity(locale: Locale, slug: string): City | undefined {
  const localeCities = citiesByLocale[locale] ?? citiesByLocale[defaultLocale]

  return localeCities[slug]
}

export function getCitySlugs(): string[] {
  return cityListsByLocale[defaultLocale].map((city) => city.slug)
}
