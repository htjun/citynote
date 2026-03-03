import { Accessibility } from "@/components/city/sections/accessibility"
import { AtAGlance } from "@/components/city/sections/at-a-glance"
import { Climate } from "@/components/city/sections/climate"
import { Connectivity } from "@/components/city/sections/connectivity"
import { CostOfLiving } from "@/components/city/sections/cost-of-living"
import { FoodDrink } from "@/components/city/sections/food-drink"
import { GettingAround } from "@/components/city/sections/getting-around"
import { LanguageCulture } from "@/components/city/sections/language-culture"
import { LivePulse } from "@/components/city/sections/live-pulse"
import { NeighborhoodFit } from "@/components/city/sections/neighborhood-fit"
import { Neighborhoods } from "@/components/city/sections/neighborhoods"
import { Practical } from "@/components/city/sections/practical"
import { RuleTraps } from "@/components/city/sections/rule-traps"
import { Safety } from "@/components/city/sections/safety"
import { SectionNav } from "@/components/city/section-nav"
import { getCity, getCitySlugs } from "@/data/cities"
import type { City } from "@/data/types"
import type { Locale } from "@/i18n/locales"
import { routing } from "@/i18n/routing"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

interface CityPageProps {
  params: Promise<{ locale: Locale; citySlug: string }>
}

async function getNavItems(city: City, locale: Locale) {
  const t = await getTranslations({ locale, namespace: "city.nav" })

  return [
    { id: "at-a-glance", label: t("atAGlance") },
    ...(city.livePulse?.length
      ? [{ id: "live-pulse", label: t("livePulse") }]
      : []),
    ...(city.ruleTraps?.length
      ? [{ id: "rule-traps", label: t("ruleTraps") }]
      : []),
    { id: "climate", label: t("climate") },
    { id: "cost-of-living", label: t("cost") },
    { id: "getting-around", label: t("transport") },
    { id: "connectivity", label: t("connectivity") },
    { id: "neighborhoods", label: t("neighborhoods") },
    ...(city.neighborhoodFit?.length
      ? [{ id: "neighborhood-fit", label: t("fitMatrix") }]
      : []),
    ...(city.accessibility
      ? [{ id: "accessibility", label: t("accessibility") }]
      : []),
    { id: "food-drink", label: t("food") },
    { id: "language-culture", label: t("language") },
    { id: "safety", label: t("safety") },
    { id: "practical", label: t("practical") },
  ]
}

export function generateStaticParams() {
  const citySlugs = getCitySlugs()

  return routing.locales.flatMap((locale) =>
    citySlugs.map((citySlug) => ({
      locale,
      citySlug,
    }))
  )
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { locale, citySlug } = await params
  const t = await getTranslations({ locale, namespace: "city.metadata" })
  const city = getCity(locale, citySlug)

  if (!city) {
    return {
      title: t("notFoundTitle"),
    }
  }

  return {
    title: t("title", { city: city.name }),
    description: city.tagline,
    alternates: {
      languages: {
        en: `/en/${citySlug}`,
        ko: `/ko/${citySlug}`,
        "x-default": `/en/${citySlug}`,
      },
    },
  }
}

export default async function CityPage({ params }: CityPageProps) {
  const { locale, citySlug } = await params
  const city = getCity(locale, citySlug)

  if (!city) {
    notFound()
  }

  const navItems = await getNavItems(city, locale)

  return (
    <main className="pb-16">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 md:px-6">
        <p className="text-muted-foreground text-xs uppercase tracking-wide">
          {city.country}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {city.name}
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          {city.tagline}
        </p>
      </header>

      <div className="mx-auto mt-4 grid w-full max-w-6xl gap-8 px-4 md:grid-cols-[12rem_minmax(0,1fr)] md:px-6">
        <aside className="md:sticky md:top-6 md:self-start">
          <SectionNav items={navItems} />
        </aside>

        <div className="flex min-w-0 flex-col gap-8">
          <AtAGlance city={city} />
          <LivePulse city={city} locale={locale} />
          <RuleTraps city={city} />
          <Climate city={city} />
          <CostOfLiving city={city} />
          <GettingAround city={city} />
          <Connectivity city={city} />
          <Neighborhoods city={city} />
          <NeighborhoodFit city={city} />
          <Accessibility city={city} />
          <FoodDrink city={city} />
          <LanguageCulture city={city} />
          <Safety city={city} />
          <Practical city={city} />
        </div>
      </div>
    </main>
  )
}
