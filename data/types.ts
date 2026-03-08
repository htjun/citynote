export type RatingLevel = "low" | "medium" | "high" | "very_high" | "excellent"
export type RiskLevel = "low" | "medium" | "high"
export type RainLevel = "low" | "medium" | "high"

export interface MonthlyClimate {
  month: string
  highC: number
  lowC: number
  rainLevel: RainLevel
}

export interface PriceItem {
  item: string
  price: string
  note?: string
}

export interface Neighborhood {
  name: string
  vibe: string
  bestFor: string[]
}

export interface Phrase {
  local: string
  romanization: string
  english: string
}

export interface LinkApp {
  name: string
  purpose: string
}

export interface RuleTrap {
  rule: string
  riskLevel: RiskLevel
  triggerScenario: string
  penaltyOrLoss: string
  howToAvoid: string
  sourceUrl: string
  lastVerified: string
}

export interface LiveSignal {
  name: "transport" | "uv" | "aqi" | "advisory"
  status: string
  updatedAt: string
  sourceUrl: string
  staleAfterMinutes: number
}

export interface NeighborhoodFit {
  archetype: "first_timer" | "family" | "night_owl" | "remote_worker"
  bestAreas: string[]
  cautionAreas?: string[]
  notes: string
  timeFit: {
    day: string[]
    lateNight: string[]
  }
}

export interface AccessibilitySnapshot {
  wheelchairTransitCoverage?: string
  stepFreeConfidence: Extract<RatingLevel, "low" | "medium" | "high">
  unknownDataRatio?: string
  notes: string[]
}

export interface City {
  slug: string
  name: string
  country: string
  countryCode: string
  tagline: string
  atAGlance: {
    continent: string
    population: string
    languages: string
    currency: string
    timezone: string
    emergency: string
    dialingCode: string
  }
  climate: {
    bestMonths: string
    rainySeason: string
    seasonNotes: string[]
    monthly: MonthlyClimate[]
  }
  costOfLiving: {
    budgetTiers: PriceItem[]
    dailyEssentials: PriceItem[]
    monthlyNomad: PriceItem[]
    comparisonAnchor: string
  }
  gettingAround: {
    airports: PriceItem[]
    visaSnapshot: string
    localTransport: PriceItem[]
    rideHailingApps: string[]
    walkability: RatingLevel
    bikeability: RatingLevel
  }
  connectivity: {
    averageSpeedMbps: string
    simOptions: PriceItem[]
    wifiAvailability: RatingLevel
    coworkingDayPass: string
    coworkingExamples: string[]
  }
  neighborhoods: Neighborhood[]
  foodDrink: {
    mustTry: PriceItem[]
    cultureNotes: string[]
    dietary: PriceItem[]
    tapWaterSafe: string
    tippingNorm: string
  }
  languageCulture: {
    englishLevel: RatingLevel
    phrases: Phrase[]
    dos: string[]
    donts: string[]
  }
  safetyHealth: {
    overallSafety: RatingLevel
    commonScams: string[]
    healthcareLevel: RatingLevel
    recommendedVaccinations: string[]
    emergencyContacts: PriceItem[]
  }
  practicalInfo: {
    plugType: string
    voltage: string
    paymentCulture: string
    usefulApps: LinkApp[]
    businessHours: string
  }
  ruleTraps?: RuleTrap[]
  livePulse?: LiveSignal[]
  neighborhoodFit?: NeighborhoodFit[]
  accessibility?: AccessibilitySnapshot
}
