import { render, screen } from "@testing-library/react"

import { Input } from "@/components/ui/input"

describe("input visual contract", () => {
  it("applies rounded, raised, and subtle border token classes", () => {
    render(<Input aria-label="query" placeholder="Search" />)

    const input = screen.getByRole("textbox", { name: "query" })
    expect(input.className).toContain("rounded-lg")
    expect(input.className).toContain("bg-raised")
    expect(input.className).toContain("border-subtle")
    expect(input.className).toContain("focus-visible:ring-super/30")
  })
})
