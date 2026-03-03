import { Link } from "@/i18n/navigation"
import type { Locale } from "@/i18n/locales"
import { getCityList } from "@/data/cities"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

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
        en: "/en",
        ko: "/ko",
        "x-default": "/en",
      },
    },
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const t = await getTranslations("home")
  const cityList = getCityList(locale)

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 md:px-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t("hero.title")}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
          {t("hero.description")}
        </p>
      </header>

      <section className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {cityList.map((city) => (
          <Link
            key={city.slug}
            href={`/${city.slug}`}
            className="border-border/80 bg-card hover:bg-accent/40 block border p-4 transition-colors"
          >
            <p className="text-muted-foreground text-xs uppercase tracking-wide">
              {city.country}
            </p>
            <h2 className="mt-1 text-xl font-medium">{city.name}</h2>
            <p className="text-muted-foreground mt-2 text-sm">{city.tagline}</p>
          </Link>
        ))}
      </section>
    </main>
  )
}
