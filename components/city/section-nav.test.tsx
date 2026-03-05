import { render, screen } from "@testing-library/react"

import { SectionNav } from "@/components/city/section-nav"
import type { SectionNavGroup } from "@/components/city/section-nav"

describe("section nav", () => {
  it("renders grouped links with matching anchors", () => {
    const groups: SectionNavGroup[] = [
      {
        id: "essentials",
        label: "Essentials",
        items: [
          { id: "at-a-glance", label: "At a Glance" },
          { id: "safety", label: "Safety" },
        ],
      },
      {
        id: "local-context",
        label: "Local Context",
        items: [{ id: "climate", label: "Climate" }],
      },
    ]

    render(<SectionNav groups={groups} />)

    const links = screen.getAllByRole("link")
    const headingTexts = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent)
    expect(links).toHaveLength(3)
    expect(headingTexts).toStrictEqual(["Essentials", "Local Context"])

    expect(links[0]?.getAttribute("href")).toBe("#at-a-glance")
    expect(links[1]?.getAttribute("href")).toBe("#safety")
    expect(links[2]?.getAttribute("href")).toBe("#climate")
  })

  it("renders exactly one decorative icon for each sidebar link", () => {
    const groups: SectionNavGroup[] = [
      {
        id: "plan-your-stay",
        label: "Plan Your Stay",
        items: [
          { id: "cost-of-living", label: "Cost" },
          { id: "getting-around", label: "Transport" },
          { id: "language-culture", label: "Language" },
        ],
      },
    ]

    render(<SectionNav groups={groups} />)

    const links = screen.getAllByRole("link")

    for (const link of links) {
      const icons = link.querySelectorAll("svg[aria-hidden='true']")
      expect(icons).toHaveLength(1)
    }
  })

  it("uses provided group and item order", () => {
    const groups: SectionNavGroup[] = [
      {
        id: "essentials",
        label: "Essentials",
        items: [{ id: "safety", label: "Safety" }],
      },
      {
        id: "right-now",
        label: "Right Now",
        items: [{ id: "live-pulse", label: "Live Pulse" }],
      },
      {
        id: "plan-your-stay",
        label: "Plan Your Stay",
        items: [{ id: "practical", label: "Practical" }],
      },
    ]

    render(<SectionNav groups={groups} />)

    const hrefs = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"))

    expect(hrefs).toStrictEqual(["#safety", "#live-pulse", "#practical"])
  })
})
