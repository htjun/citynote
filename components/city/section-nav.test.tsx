import { render, screen } from "@testing-library/react"

import { SectionNav } from "@/components/city/section-nav"
import type { SectionNavItem } from "@/components/city/section-nav"

describe("section nav", () => {
  it("renders one link per item with matching anchors", () => {
    const items: SectionNavItem[] = [
      { id: "at-a-glance", label: "At a Glance" },
      { id: "climate", label: "Climate" },
      { id: "safety", label: "Safety" },
    ]

    render(<SectionNav items={items} />)

    const links = screen.getAllByRole("link")
    expect(links).toHaveLength(items.length)

    for (const [index, item] of items.entries()) {
      expect(links[index]?.getAttribute("href")).toBe(`#${item.id}`)
      expect(links[index]?.textContent).toContain(item.label)
    }
  })

  it("renders exactly one decorative icon for each sidebar link", () => {
    const items: SectionNavItem[] = [
      { id: "cost-of-living", label: "Cost" },
      { id: "getting-around", label: "Transport" },
      { id: "language-culture", label: "Language" },
    ]

    render(<SectionNav items={items} />)

    const links = screen.getAllByRole("link")

    for (const link of links) {
      const icons = link.querySelectorAll("svg[aria-hidden='true']")
      expect(icons).toHaveLength(1)
    }
  })

  it("uses provided item ids and order, including optional sections", () => {
    const items: SectionNavItem[] = [
      { id: "safety", label: "Safety" },
      { id: "live-pulse", label: "Live Pulse" },
      { id: "practical", label: "Practical" },
    ]

    render(<SectionNav items={items} />)

    const hrefs = screen
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"))

    expect(hrefs).toStrictEqual(items.map((item) => `#${item.id}`))
  })
})
