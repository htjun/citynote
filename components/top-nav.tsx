import Link from "next/link"

import { cityList } from "@/data/cities"

export function TopNav() {
  return (
    <nav className="border-border/80 bg-background border-b">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-4 md:px-6">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight transition-opacity hover:opacity-80"
        >
          CityNote
        </Link>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          {cityList.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="text-muted-foreground hover:text-foreground font-medium transition-colors"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
