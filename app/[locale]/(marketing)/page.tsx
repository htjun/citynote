import {
  RiArrowRightUpLine,
  RiCompass3Line,
  RiFlashlightLine,
  RiSparklingLine,
} from "@remixicon/react"
import { getCityList } from "@/data/cities"
import type { City } from "@/data/types"
import type { Locale } from "@/i18n/locales"
import { Link } from "@/i18n/navigation"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

interface HomePageProps {
  params: Promise<{ locale: Locale }>
}

function toBudgetPreview(city: City): string {
  return (
    city.costOfLiving.budgetTiers[1]?.price ??
    city.costOfLiving.budgetTiers[0]?.price ??
    city.costOfLiving.comparisonAnchor
  )
}

function toNeighborhoodPreview(city: City): string {
  const names = city.neighborhoods.slice(0, 2).map((item) => item.name.trim())

  return names.filter(Boolean).join(" · ") || city.country
}

function toTransportPreview(city: City): string {
  return (
    city.gettingAround.localTransport[0]?.item ??
    city.gettingAround.localTransport[0]?.price ??
    city.gettingAround.visaSnapshot
  )
}

function toFeaturedSummary(city: City): string {
  const firstNeighborhood = city.neighborhoods[0]?.vibe ?? ""

  return [city.tagline, firstNeighborhood, city.costOfLiving.comparisonAnchor]
    .filter(Boolean)
    .join(" ")
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "home.metadata" })

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        en: "/",
        ko: "/ko",
        "x-default": "/",
      },
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const t = await getTranslations("home")
  const cityList = getCityList(locale)
  const [featuredCity = cityList[0]] = cityList
  const neighborhoodSignals = cityList.flatMap((city) =>
    city.neighborhoods.slice(0, 2).map((neighborhood) => ({
      cityName: city.name,
      name: neighborhood.name,
      vibe: neighborhood.vibe,
    }))
  )

  return (
    <main className="min-h-screen">
      <header className="border-subtlest bg-base/88 sticky top-0 z-20 border-b backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-[1380px] flex-wrap items-center gap-3 px-4 py-4 md:px-6">
          <div>
            <p className="text-quieter text-[11px] uppercase tracking-[0.18em]">
              {t("discover.eyebrow")}
            </p>
            <h1 className="mt-1 text-xl font-semibold tracking-tight">
              {t("discover.title")}
            </h1>
          </div>

          <div className="border-subtlest bg-raised hidden items-center rounded-full border p-1 md:ml-auto md:flex">
            <span className="bg-base rounded-full px-3 py-1.5 text-xs font-medium shadow-[var(--shadow-subtle)]">
              {t("discover.tabs.forYou")}
            </span>
            <span className="text-quiet px-3 py-1.5 text-xs font-medium">
              {t("discover.tabs.cities")}
            </span>
            <span className="text-quiet px-3 py-1.5 text-xs font-medium">
              {t("discover.tabs.signals")}
            </span>
          </div>

          {featuredCity ? (
            <Link
              href={`/${featuredCity.slug}`}
              className="border-subtlest bg-raised hover:bg-subtle inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-[background-color,border-color] duration-normal ease-fluid"
            >
              {t("discover.openGuide", { city: featuredCity.name })}
              <RiArrowRightUpLine aria-hidden="true" className="size-3.5" />
            </Link>
          ) : null}
        </div>
      </header>

      <div className="mx-auto w-full max-w-[1380px] px-4 py-6 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            {featuredCity ? (
              <section className="grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
                <Link
                  href={`/${featuredCity.slug}`}
                  className="border-subtlest bg-raised hover:bg-subtle/70 block rounded-[32px] border p-6 shadow-[var(--shadow-raised)] transition-[background-color,border-color,box-shadow] duration-normal ease-fluid md:p-8"
                >
                  <p className="text-quieter text-[11px] uppercase tracking-[0.18em]">
                    {featuredCity.country}
                  </p>
                  <h2 className="font-editorial mt-4 max-w-3xl text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] tracking-[-0.04em] text-balance">
                    {featuredCity.name}
                  </h2>
                  <p className="text-quiet mt-5 max-w-3xl text-base leading-relaxed md:text-lg">
                    {toFeaturedSummary(featuredCity)}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <FeatureMetric
                      label={t("discover.metrics.climate")}
                      value={featuredCity.climate.bestMonths}
                    />
                    <FeatureMetric
                      label={t("discover.metrics.budget")}
                      value={toBudgetPreview(featuredCity)}
                    />
                    <FeatureMetric
                      label={t("discover.metrics.neighborhoods")}
                      value={toNeighborhoodPreview(featuredCity)}
                    />
                  </div>
                </Link>

                <div className="space-y-4">
                  <section className="border-subtlest bg-raised rounded-[32px] border p-5 shadow-[var(--shadow-subtle)]">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <RiCompass3Line aria-hidden="true" className="size-4" />
                      <span>{t("discover.composerTitle")}</span>
                    </div>

                    <div className="border-subtlest bg-base mt-4 rounded-[26px] border p-4 shadow-[var(--shadow-subtle)]">
                      <p className="text-quieter text-base">
                        {t("discover.composerPlaceholder")}
                      </p>
                      <div className="mt-5 flex items-center justify-between gap-3">
                        <span className="text-quiet rounded-full border border-current/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em]">
                          {t("discover.tabs.signals")}
                        </span>
                        <span className="bg-subtle inline-flex size-9 items-center justify-center rounded-full">
                          <RiArrowRightUpLine
                            aria-hidden="true"
                            className="size-4"
                          />
                        </span>
                      </div>
                    </div>

                    <p className="text-quiet mt-3 text-sm leading-relaxed">
                      {t("discover.composerHint")}
                    </p>
                  </section>

                  <article className="border-subtlest bg-raised rounded-[28px] border p-5 shadow-[var(--shadow-subtle)]">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <RiSparklingLine aria-hidden="true" className="size-4" />
                      <span>{t("setup.title")}</span>
                    </div>
                    <p className="text-quiet mt-3 text-sm leading-relaxed">
                      {t("setup.description")}
                    </p>
                  </article>

                  <article className="border-subtlest bg-raised rounded-[28px] border p-5 shadow-[var(--shadow-subtle)]">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <RiFlashlightLine aria-hidden="true" className="size-4" />
                      <span>{t("trust.title")}</span>
                    </div>
                    <p className="text-quiet mt-3 text-sm leading-relaxed">
                      {t("trust.description")}
                    </p>
                  </article>
                </div>
              </section>
            ) : null}

            <section>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-editorial text-3xl tracking-[-0.03em]">
                    {t("discover.cardsTitle")}
                  </h2>
                  <p className="text-quiet mt-2 max-w-2xl text-sm leading-relaxed">
                    {t("discover.cardsDescription")}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {cityList.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${city.slug}`}
                    className="border-subtlest bg-raised hover:bg-subtle/75 block rounded-[28px] border p-5 shadow-[var(--shadow-subtle)] transition-[background-color,border-color,box-shadow] duration-normal ease-fluid"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-quieter text-[11px] uppercase tracking-[0.18em]">
                          {city.country}
                        </p>
                        <h3 className="font-editorial mt-2 text-3xl tracking-[-0.03em]">
                          {city.name}
                        </h3>
                      </div>
                      <span className="text-quiet rounded-full border border-current/10 px-2.5 py-1 text-[11px] font-medium">
                        {t("discover.cardBadge")}
                      </span>
                    </div>

                    <p className="text-quiet mt-3 text-sm leading-relaxed">
                      {city.tagline}
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <FeatureMetric
                        label={t("discover.metrics.climate")}
                        value={city.climate.bestMonths}
                      />
                      <FeatureMetric
                        label={t("discover.metrics.budget")}
                        value={toBudgetPreview(city)}
                      />
                      <FeatureMetric
                        label={t("discover.metrics.transport")}
                        value={toTransportPreview(city)}
                      />
                    </div>

                    <p className="text-quieter mt-4 text-sm leading-relaxed">
                      {city.costOfLiving.comparisonAnchor}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <section className="border-subtlest bg-raised rounded-[28px] border p-5 shadow-[var(--shadow-subtle)]">
              <h2 className="text-lg font-semibold tracking-tight">
                {t("discover.coverageTitle")}
              </h2>
              <p className="text-quiet mt-2 text-sm leading-relaxed">
                {t("discover.coverageDescription")}
              </p>
              <div className="mt-4 space-y-3">
                <RailStat
                  label={t("discover.coverageStats.cities")}
                  value={t("discover.coverageStatCities", {
                    count: cityList.length,
                  })}
                />
                <RailStat
                  label={t("discover.coverageStats.signals")}
                  value={t("discover.coverageStatSignals")}
                />
                <RailStat
                  label={t("discover.coverageStats.personalization")}
                  value={t("discover.coverageStatPersonalization")}
                />
              </div>
            </section>

            <section className="border-subtlest bg-raised rounded-[28px] border p-5 shadow-[var(--shadow-subtle)]">
              <h2 className="text-lg font-semibold tracking-tight">
                {t("discover.neighborhoodSignalsTitle")}
              </h2>
              <div className="mt-4 space-y-3">
                {neighborhoodSignals.map((signal) => (
                  <div
                    key={`${signal.cityName}-${signal.name}`}
                    className="border-subtlest bg-base rounded-[22px] border p-3"
                  >
                    <p className="text-sm font-medium">
                      {signal.name}
                      <span className="text-quieter ml-1 font-normal">
                        · {signal.cityName}
                      </span>
                    </p>
                    <p className="text-quiet mt-1 text-sm leading-relaxed">
                      {signal.vibe}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="border-subtlest bg-raised rounded-[28px] border p-5 shadow-[var(--shadow-subtle)]">
              <h2 className="text-lg font-semibold tracking-tight">
                {t("discover.quickLinksTitle")}
              </h2>
              <div className="mt-4 space-y-2">
                {cityList.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${city.slug}`}
                    className="text-quiet hover:text-foreground hover:bg-subtle flex items-center justify-between rounded-[20px] px-3 py-3 text-sm transition-[background-color,color] duration-normal ease-fluid"
                  >
                    <span>{city.name}</span>
                    <RiArrowRightUpLine aria-hidden="true" className="size-4" />
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  )
}

function FeatureMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-subtlest bg-base rounded-[22px] border p-3">
      <p className="text-quieter text-[11px] uppercase tracking-[0.16em]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed">{value}</p>
    </div>
  )
}

function RailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-subtlest bg-base rounded-[22px] border p-3">
      <p className="text-quieter text-[11px] uppercase tracking-[0.16em]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-relaxed">{value}</p>
    </div>
  )
}
