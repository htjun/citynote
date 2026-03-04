"use client"

import { useCallback } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "@/i18n/navigation"
import type { GlobeCityPoint } from "./globe-scene"

export type { GlobeCityPoint }

const GlobeCanvas = dynamic(() => import("./globe-scene"), { ssr: false })

export function Globe({
  cities,
}: {
  cities: GlobeCityPoint[]
  locale: string
}) {
  const router = useRouter()

  const handleCityClick = useCallback(
    (slug: string) => {
      router.push(`/${slug}`)
    },
    [router]
  )

  return <GlobeCanvas cities={cities} onCityClick={handleCityClick} />
}
