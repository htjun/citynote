import type { PersonalizationProfile } from "@/lib/ia/types"

export interface AtAGlanceSelection {
  maxItems: number
}

export interface CostOfLivingSelection {
  emphasize: "daily" | "balanced" | "monthly"
  dailyEssentialsLimit: number
}

export interface LanguageCultureSelection {
  phraseLimit: number
  etiquetteLimit: number
}

export interface FoodDrinkSelection {
  mustTryLimit: number
  cultureNoteLimit: number
}

export interface CurrencyWatchSelection {
  compact: boolean
}

export interface ContentSelection {
  atAGlance: AtAGlanceSelection
  costOfLiving: CostOfLivingSelection
  languageCulture: LanguageCultureSelection
  foodDrink: FoodDrinkSelection
  currencyWatch: CurrencyWatchSelection
}

// oxlint-disable-next-line max-statements
export function selectContent(
  profile: PersonalizationProfile
): ContentSelection {
  const byPurpose = profile.purpose ?? "trip"

  const atAGlanceMax = byPurpose === "trip" ? 8 : 10
  const phraseLimit = byPurpose === "trip" ? 5 : 10
  const etiquetteLimit = byPurpose === "trip" ? 3 : 5
  const cultureNoteLimit = byPurpose === "trip" ? 2 : 3
  const mustTryLimit = byPurpose === "trip" ? 5 : 6
  const dailyEssentialsLimit = byPurpose === "trip" ? 4 : 5

  let costEmphasis: CostOfLivingSelection["emphasize"] = "daily"
  if (byPurpose === "study") {
    costEmphasis = "balanced"
  } else if (byPurpose === "live") {
    costEmphasis = "monthly"
  }

  const compactCurrency = profile.nationalityRelation === "domestic"

  return {
    atAGlance: {
      maxItems: atAGlanceMax,
    },
    costOfLiving: {
      emphasize: costEmphasis,
      dailyEssentialsLimit,
    },
    languageCulture: {
      phraseLimit,
      etiquetteLimit,
    },
    foodDrink: {
      mustTryLimit,
      cultureNoteLimit,
    },
    currencyWatch: {
      compact: compactCurrency,
    },
  }
}
