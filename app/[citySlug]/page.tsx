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
import { cityList, citiesBySlug } from "@/data/cities"
import type { City } from "@/data/types"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface CityPageProps {
  params: Promise<{ citySlug: string }>
}

function getNavItems(city: City) {
  return [
    { id: "at-a-glance", label: "At a Glance" },
    ...(city.livePulse?.length
      ? [{ id: "live-pulse", label: "Live Pulse" }]
      : []),
    ...(city.ruleTraps?.length
      ? [{ id: "rule-traps", label: "Rule Traps" }]
      : []),
    { id: "climate", label: "Climate" },
    { id: "cost-of-living", label: "Cost" },
    { id: "getting-around", label: "Transport" },
    { id: "connectivity", label: "Connectivity" },
    { id: "neighborhoods", label: "Neighborhoods" },
    ...(city.neighborhoodFit?.length
      ? [{ id: "neighborhood-fit", label: "Fit Matrix" }]
      : []),
    ...(city.accessibility
      ? [{ id: "accessibility", label: "Accessibility" }]
      : []),
    { id: "food-drink", label: "Food" },
    { id: "language-culture", label: "Language" },
    { id: "safety", label: "Safety" },
    { id: "practical", label: "Practical" },
  ]
}

export function generateStaticParams() {
  return cityList.map((city) => ({ citySlug: city.slug }))
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { citySlug } = await params
  const city = citiesBySlug[citySlug as keyof typeof citiesBySlug]

  if (!city) {
    return {
      title: "City Not Found | CityNote",
    }
  }

  return {
    title: `${city.name} City Guide | CityNote`,
    description: city.tagline,
  }
}

export default async function CityPage({ params }: CityPageProps) {
  const { citySlug } = await params
  const city = citiesBySlug[citySlug as keyof typeof citiesBySlug]

  if (!city) {
    notFound()
  }

  const navItems = getNavItems(city)

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
          <LivePulse city={city} />
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
