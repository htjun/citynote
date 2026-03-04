import type { ValidationInput, ValidationResult, SonarMessage } from "./types"
import { sonarChat } from "./client"

export const VALIDATABLE_SECTIONS = [
  "atAGlance",
  "climate",
  "costOfLiving",
  "gettingAround",
  "connectivity",
  "neighborhoods",
  "foodDrink",
  "languageCulture",
  "safetyHealth",
  "practicalInfo",
  "ruleTraps",
] as const

export type ValidatableSection = (typeof VALIDATABLE_SECTIONS)[number]

export const SECTION_LABELS: Record<ValidatableSection, string> = {
  atAGlance: "At a Glance",
  climate: "Climate",
  costOfLiving: "Cost of Living",
  gettingAround: "Getting Around",
  connectivity: "Connectivity",
  neighborhoods: "Neighborhoods",
  foodDrink: "Food & Drink",
  languageCulture: "Language & Culture",
  safetyHealth: "Safety & Health",
  practicalInfo: "Practical Info",
  ruleTraps: "Rule Traps",
}

const SYSTEM_PROMPT = `You are a data validator for a city travel guide used by travelers and digital nomads. Your job is to verify whether stored city information is still accurate by checking against current real-world data.

Guidelines:
- Be specific and factual
- Use USD for all prices unless the field explicitly uses local currency
- Flag outdated values with suggested corrections
- Note any missing information that travelers would find valuable

Format your response as:

## Accuracy Assessment
Brief overall assessment of the data's accuracy.

## Field-by-Field Review
For each field or group of related fields, state:
- CURRENT — still accurate
- OUTDATED — needs updating (provide the corrected value)
- UNCERTAIN — cannot verify confidently

## Suggested Updates
If any fields are OUTDATED, list the specific changes needed.`

const SECTION_PROMPTS: Record<
  ValidatableSection,
  (city: string, country: string) => string
> = {
  atAGlance: (city, country) =>
    `Verify the general facts for ${city}, ${country}: population, official/common languages, currency, timezone, emergency numbers, and international dialing code.`,

  climate: (city, country) =>
    `Verify the climate data for ${city}, ${country}: best months to visit, rainy season timing, seasonal notes, and monthly average high/low temperatures in Celsius.`,

  costOfLiving: (city, country) =>
    `Verify the cost of living data for ${city}, ${country}. Check daily budget tiers (backpacker, mid-range, comfort in USD/day), daily essential prices in USD (street meals, restaurant meals, coffee, beer, water), and monthly digital nomad costs in USD (central/outer studio rent, groceries, transit pass). Also verify the comparison anchor statement.`,

  gettingAround: (city, country) =>
    `Verify the transportation data for ${city}, ${country}: airports with travel times to city center, visa snapshot for common nationalities, local transport options and quality, ride-hailing apps available, and walkability/bikeability ratings.`,

  connectivity: (city, country) =>
    `Verify the connectivity data for ${city}, ${country}: average broadband speed, tourist SIM/eSIM options and prices, WiFi availability, coworking day pass costs, and notable coworking spaces.`,

  neighborhoods: (city, country) =>
    `Verify the neighborhood guide for ${city}, ${country}. Check whether the listed neighborhoods are still the most relevant for travelers, if the vibe descriptions are accurate, and if the "best for" recommendations still hold. Note any emerging neighborhoods worth adding.`,

  foodDrink: (city, country) =>
    `Verify the food and drink data for ${city}, ${country}: must-try dishes and descriptions, food culture notes, dietary accommodation levels (vegetarian, vegan, halal, gluten-free), tap water safety, and tipping norms.`,

  languageCulture: (city, country) =>
    `Verify the language and culture data for ${city}, ${country}: English proficiency level, common phrases with local script and romanization, and cultural dos and don'ts for visitors.`,

  safetyHealth: (city, country) =>
    `Verify the safety and health data for ${city}, ${country}: overall safety rating, common tourist scams, healthcare quality, recommended vaccinations, and emergency contact numbers.`,

  practicalInfo: (city, country) =>
    `Verify the practical information for ${city}, ${country}: electrical plug type and voltage, payment culture (cash vs card), useful apps for travelers, and typical business hours.`,

  ruleTraps: (city, country) =>
    `Verify the local rules and traps for ${city}, ${country}. For each rule, check if it is still current, if the risk level is accurate, if the trigger scenario is realistic, and if the avoidance advice is still valid. Note any new rules or gotchas that travelers should know about.`,
}

export function isValidatableSection(
  section: string
): section is ValidatableSection {
  return VALIDATABLE_SECTIONS.includes(section as ValidatableSection)
}

export async function validateCitySection(
  input: ValidationInput
): Promise<ValidationResult> {
  const { cityName, country, section, sectionLabel, currentData } = input

  if (!isValidatableSection(section)) {
    throw new Error(`Unknown section: ${section}`)
  }

  const currentJson = JSON.stringify(currentData, null, 2)
  const sectionPrompt = SECTION_PROMPTS[section](cityName, country)

  const messages: SonarMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: `${sectionPrompt}\n\nCurrent stored data:\n\`\`\`json\n${currentJson}\n\`\`\``,
    },
  ]

  const response = await sonarChat(messages)

  return {
    section,
    sectionLabel,
    citySlug: "",
    cityName,
    currentData,
    sonarFindings: response.choices[0]?.message.content ?? "",
    citations: response.citations ?? [],
    validatedAt: new Date().toISOString(),
    model: response.model,
    usage: response.usage,
  }
}
