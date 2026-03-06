import { Accessibility } from "@/components/city/sections/accessibility"
import { AtAGlance } from "@/components/city/sections/at-a-glance"
import { Climate } from "@/components/city/sections/climate"
import { Connectivity } from "@/components/city/sections/connectivity"
import { CostOfLiving } from "@/components/city/sections/cost-of-living"
import { CityNews } from "@/components/city/sections/city-news"
import { CurrencyWatch } from "@/components/city/sections/currency-watch"
import { FoodDrink } from "@/components/city/sections/food-drink"
import { GettingAround } from "@/components/city/sections/getting-around"
import { LanguageCulture } from "@/components/city/sections/language-culture"
import { LivePulse } from "@/components/city/sections/live-pulse"
import { NeighborhoodFit } from "@/components/city/sections/neighborhood-fit"
import { Neighborhoods } from "@/components/city/sections/neighborhoods"
import { Practical } from "@/components/city/sections/practical"
import { RuleTraps } from "@/components/city/sections/rule-traps"
import { Safety } from "@/components/city/sections/safety"
import { WeatherNow } from "@/components/city/sections/weather-now"
import { CityPageShell } from "@/components/city/city-page-shell"
import type {
  SectionNavGroup,
  SectionNavItem,
} from "@/components/city/section-nav"
import { getCity, getCitySlugs } from "@/data/cities"
import type { City } from "@/data/types"
import type { Locale } from "@/i18n/locales"
import { routing } from "@/i18n/routing"
import { buildPersonalizationProfile } from "@/lib/ia/profile"
import { rankSections } from "@/lib/ia/rank-sections"
import {
  getVisibleSectionCandidates,
  getRuntimeFreshnessMap,
} from "@/lib/ia/section-registry"
import { selectContent } from "@/lib/ia/select-content"
import { SECTION_GROUP_ORDER } from "@/lib/ia/types"
import type {
  CitySectionId,
  RankedSection,
  SectionGroupId,
} from "@/lib/ia/types"
import { getCityRuntimeInsights } from "@/lib/insights/get-city-runtime-insights"
import {
  parsePersonalizationInput,
  PERSONALIZATION_COOKIE_KEYS,
} from "@/lib/personalization/schema"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { cookies } from "next/headers"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

interface CityPageProps {
  params: Promise<{ locale: Locale; citySlug: string }>
}

export const dynamic = "force-dynamic"

interface RenderContext {
  city: City
  locale: Locale
  runtimeInsights: Awaited<ReturnType<typeof getCityRuntimeInsights>>
  contentSelection: ReturnType<typeof selectContent>
}

type GroupLabelMap = Record<SectionGroupId, string>

const groupLabelKeyById: Record<SectionGroupId, string> = {
  essentials: "essentials",
  "right-now": "rightNow",
  "plan-your-stay": "planYourStay",
  "local-context": "localContext",
}

// oxlint-disable-next-line max-statements
function renderSection(sectionId: CitySectionId, context: RenderContext) {
  switch (sectionId) {
    case "at-a-glance": {
      return (
        <AtAGlance
          city={context.city}
          maxItems={context.contentSelection.atAGlance.maxItems}
        />
      )
    }
    case "getting-around": {
      return <GettingAround city={context.city} />
    }
    case "safety": {
      return <Safety city={context.city} />
    }
    case "rule-traps": {
      return <RuleTraps city={context.city} />
    }
    case "live-pulse": {
      return <LivePulse city={context.city} locale={context.locale} />
    }
    case "weather-now": {
      return (
        <WeatherNow
          weather={context.runtimeInsights.weatherNow}
          locale={context.locale}
        />
      )
    }
    case "currency-watch": {
      return (
        <CurrencyWatch
          currencyWatch={context.runtimeInsights.currencyWatch}
          locale={context.locale}
          compact={context.contentSelection.currencyWatch.compact}
        />
      )
    }
    case "city-news": {
      return (
        <CityNews
          cityNews={context.runtimeInsights.cityNews}
          locale={context.locale}
        />
      )
    }
    case "cost-of-living": {
      return (
        <CostOfLiving
          city={context.city}
          emphasize={context.contentSelection.costOfLiving.emphasize}
          dailyEssentialsLimit={
            context.contentSelection.costOfLiving.dailyEssentialsLimit
          }
        />
      )
    }
    case "neighborhoods": {
      return <Neighborhoods city={context.city} />
    }
    case "neighborhood-fit": {
      return <NeighborhoodFit city={context.city} />
    }
    case "connectivity": {
      return <Connectivity city={context.city} />
    }
    case "practical": {
      return <Practical city={context.city} />
    }
    case "accessibility": {
      return <Accessibility city={context.city} />
    }
    case "language-culture": {
      return (
        <LanguageCulture
          city={context.city}
          phraseLimit={context.contentSelection.languageCulture.phraseLimit}
          etiquetteLimit={
            context.contentSelection.languageCulture.etiquetteLimit
          }
        />
      )
    }
    case "food-drink": {
      return (
        <FoodDrink
          city={context.city}
          mustTryLimit={context.contentSelection.foodDrink.mustTryLimit}
          cultureNoteLimit={context.contentSelection.foodDrink.cultureNoteLimit}
        />
      )
    }
    case "climate": {
      return <Climate city={context.city} />
    }
    default: {
      return null
    }
  }
}

function toNavGroups(
  orderedSections: RankedSection[],
  navLabels: Record<string, string>,
  groupLabels: GroupLabelMap
): SectionNavGroup[] {
  return SECTION_GROUP_ORDER.map((groupId) => {
    const items: SectionNavItem[] = orderedSections
      .filter((section) => section.group === groupId)
      .map((section) => ({
        id: section.id,
        label: navLabels[section.id],
      }))

    return {
      id: groupId,
      label: groupLabels[groupId],
      items,
    }
  }).filter((group) => group.items.length > 0)
}

function toForYouItems(
  orderedSections: RankedSection[],
  navLabels: Record<string, string>
): SectionNavItem[] {
  return orderedSections.slice(0, 3).map((section) => ({
    id: section.id,
    label: navLabels[section.id],
  }))
}

function toHeroFacts(city: City, tNav: (key: string) => string) {
  const neighborhoods = city.neighborhoods
    .slice(0, 2)
    .map((neighborhood) => neighborhood.name.trim())
    .filter(Boolean)
    .join(" · ")

  return [
    {
      label: tNav("climate"),
      value: city.climate.bestMonths,
    },
    {
      label: tNav("cost"),
      value:
        city.costOfLiving.budgetTiers[1]?.price ??
        city.costOfLiving.budgetTiers[0]?.price ??
        city.costOfLiving.comparisonAnchor,
    },
    {
      label: tNav("neighborhoods"),
      value: neighborhoods || city.country,
    },
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

// oxlint-disable-next-line max-statements
export default async function CityPage({ params }: CityPageProps) {
  const { locale, citySlug } = await params
  const city = getCity(locale, citySlug)

  if (!city) {
    notFound()
  }

  const runtimeInsights = await getCityRuntimeInsights({ city, locale })

  const cookieStore = await cookies()
  const personalizationInput = parsePersonalizationInput({
    purpose:
      cookieStore.get(PERSONALIZATION_COOKIE_KEYS.purpose)?.value ?? null,
    nationality:
      cookieStore.get(PERSONALIZATION_COOKIE_KEYS.nationality)?.value ?? null,
  })
  const profile = buildPersonalizationProfile({
    personalization: personalizationInput,
    cityCountryCode: city.countryCode,
  })
  const contentSelection = selectContent(profile)

  const sectionCandidates = getVisibleSectionCandidates({
    city,
    runtimeInsights,
  })
  const runtimeFreshness = getRuntimeFreshnessMap({ city, runtimeInsights })
  const orderedSections = rankSections({
    sections: sectionCandidates,
    profile,
    runtimeFreshness,
    citySlug: city.slug,
  })

  const tNav = await getTranslations({ locale, namespace: "city.nav" })
  const tNavGroups = await getTranslations({
    locale,
    namespace: "city.navGroups",
  })
  const navLabels = Object.fromEntries(
    orderedSections.map((section) => [section.id, tNav(section.navLabelKey)])
  ) as Record<string, string>
  const groupLabels = Object.fromEntries(
    SECTION_GROUP_ORDER.map((groupId) => [
      groupId,
      tNavGroups(groupLabelKeyById[groupId]),
    ])
  ) as GroupLabelMap

  const navGroups = toNavGroups(orderedSections, navLabels, groupLabels)
  const forYouItems = toForYouItems(orderedSections, navLabels)
  const heroFacts = toHeroFacts(city, tNav)

  return (
    <CityPageShell
      city={{
        country: city.country,
        name: city.name,
        tagline: city.tagline,
      }}
      forYouItems={forYouItems}
      heroFacts={heroFacts}
      locale={locale}
      navGroups={navGroups}
      runtimeInsights={runtimeInsights}
    >
      {orderedSections.map((section, index) => (
        <article
          key={section.id}
          className={cn(
            "border-subtlest bg-raised overflow-hidden rounded-[30px] border p-5 shadow-[var(--shadow-subtle)] md:p-6",
            index === 0 &&
              "bg-[linear-gradient(180deg,oklch(var(--surface-raised)),oklch(var(--surface-base)))]"
          )}
        >
          {renderSection(section.id, {
            city,
            locale,
            runtimeInsights,
            contentSelection,
          })}
        </article>
      ))}
    </CityPageShell>
  )
}
