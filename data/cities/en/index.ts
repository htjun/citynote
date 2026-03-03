import type { City } from "@/data/types"

import { melbourne } from "@/data/cities/en/melbourne"
import { seoul } from "@/data/cities/en/seoul"

export const citiesBySlug = {
  melbourne,
  seoul,
} as const

export const cityList = [seoul, melbourne] satisfies City[]
