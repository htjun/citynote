import Link from "next/link"

import { cityList } from "@/data/cities"

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-4 py-8 md:px-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">
          Plan your city move or trip faster
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
          Dense city cheat sheets for travelers, nomads, and students. Start
          with Seoul and Melbourne.
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
