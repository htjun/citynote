import { render, screen, within } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import type { ReactNode } from "react"

import { AtAGlance } from "@/components/city/sections/at-a-glance"
import { seoul } from "@/data/cities/en/seoul"
import type { City } from "@/data/types"
import cityMessages from "@/messages/en/city.json"

function renderWithIntl(node: ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={{ city: cityMessages }}>
      {node}
    </NextIntlClientProvider>
  )
}

function getCardLabels(section: HTMLElement): string[] {
  return [...section.querySelectorAll('p[class*="text-[11px]"]')].map(
    (label) => label.textContent?.trim() ?? ""
  )
}

function getCardValue(section: HTMLElement, label: string): string {
  const labelNode = within(section).getByText(label)
  const card = labelNode.closest("div")

  if (!card) {
    throw new Error(`Card not found for label: ${label}`)
  }

  const value = card.querySelectorAll("p")[1]?.textContent?.trim()

  return value ?? ""
}

function getAtAGlanceSection(): HTMLElement {
  const section = screen
    .getByRole("heading", { name: "At a Glance" })
    .closest("section")

  if (!section) {
    throw new Error("At a Glance section is not rendered")
  }

  return section
}

function createCityWithMissingAtAGlanceSources(): City {
  const city = structuredClone(seoul)

  return {
    ...city,
    country: " ",
    atAGlance: {
      ...city.atAGlance,
      currency: " ",
      timezone: " ",
      emergency: " ",
      dialingCode: " ",
    },
    climate: {
      ...city.climate,
      bestMonths: " ",
    },
    costOfLiving: {
      ...city.costOfLiving,
      budgetTiers: [],
    },
    gettingAround: {
      ...city.gettingAround,
      visaSnapshot: " ",
      airports: [],
      localTransport: [],
    },
    practicalInfo: {
      ...city.practicalInfo,
      paymentCulture: " ",
      plugType: " ",
      voltage: " ",
    },
    foodDrink: {
      ...city.foodDrink,
      tapWaterSafe: " ",
    },
    connectivity: {
      ...city.connectivity,
      averageSpeedMbps: " ",
    },
  }
}

describe("at a glance section", () => {
  it("renders the compact 10-card set in the planned order", () => {
    renderWithIntl(<AtAGlance city={seoul} />)
    const section = getAtAGlanceSection()

    expect(getCardLabels(section)).toStrictEqual([
      "Country",
      "Visa / Entry",
      "Best Months",
      "Daily Budget Range",
      "Airport to City",
      "Currency",
      "Payment Culture",
      "Timezone",
      "Safety Level",
      "English Usability",
    ])
  })

  it("uses Not available fallback for missing source values", () => {
    const city = createCityWithMissingAtAGlanceSources()
    const expectedFallbacks: [string, string][] = [
      ["Country", "Not available"],
      ["Daily Budget Range", "Not available"],
      ["Airport to City", "Not available"],
      ["Transit Quality", "Not available"],
      ["Plug + Voltage", "Not available"],
      [
        "Emergency Contacts",
        "Emergency: Not available | Dialing Code: Not available",
      ],
    ]

    renderWithIntl(<AtAGlance city={city} maxItems={15} />)

    const section = getAtAGlanceSection()

    for (const [label, value] of expectedFallbacks) {
      expect(getCardValue(section, label)).toBe(value)
    }
  })
})
