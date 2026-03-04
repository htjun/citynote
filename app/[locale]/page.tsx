import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/locales"
import { getCityList } from "@/data/cities"
import { cityCoordinates } from "@/data/cities/coordinates"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Globe } from "@/components/globe/globe"
import type { GlobeCityPoint } from "@/components/globe/globe"

interface HomePageProps {
  params: Promise<{ locale: Locale }>
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

  const globeCities: GlobeCityPoint[] = cityList
    .filter((city) => city.slug in cityCoordinates)
    .map((city) => {
      const coords = cityCoordinates[city.slug]
      return {
        slug: city.slug,
        name: city.name,
        country: city.country,
        lat: coords.lat,
        lng: coords.lng,
      }
    })

  return (
    <main>
      <section className="relative min-h-screen">
        <div className="absolute inset-0">
          <Globe cities={globeCities} locale={locale} />
        </div>

        <div className="pointer-events-none relative z-10 flex min-h-screen flex-col items-center justify-between px-4 pt-24 pb-16">
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="text-muted-foreground mt-3 max-w-lg text-sm leading-relaxed md:text-base">
              {t("hero.description")}
            </p>
          </div>

          <div className="pointer-events-auto grid w-full max-w-2xl grid-cols-1 gap-3 md:grid-cols-2">
            {cityList.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="bg-background/80 border-border/80 hover:bg-accent/40 block border p-4 backdrop-blur-sm transition-colors"
              >
                <p className="text-muted-foreground text-xs uppercase tracking-wide">
                  {city.country}
                </p>
                <h2 className="mt-1 text-xl font-medium">{city.name}</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  {city.tagline}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
