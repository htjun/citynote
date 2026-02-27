export type RatingLevel = "Low" | "Medium" | "High" | "Very High" | "Excellent"

export interface MonthlyClimate {
  month: string
  highC: number
  lowC: number
  rainLevel: "Low" | "Medium" | "High"
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

export interface City {
  slug: string
  name: string
  country: string
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
}
