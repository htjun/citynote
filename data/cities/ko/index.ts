import type { City } from "@/data/types"

import { melbourne } from "@/data/cities/ko/melbourne"
import { seoul } from "@/data/cities/ko/seoul"

export const citiesBySlug = {
  melbourne,
  seoul,
} as const

export const cityList = [seoul, melbourne] satisfies City[]
