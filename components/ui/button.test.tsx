import { render, screen } from "@testing-library/react"

import { Button } from "@/components/ui/button"

describe("button visual contract", () => {
  it("applies tokenized default styles", () => {
    render(<Button>Save</Button>)

    const button = screen.getByRole("button", { name: "Save" })
    expect(button.className).toContain("rounded-lg")
    expect(button.className).toContain("bg-super")
    expect(button.className).toContain("duration-normal")
    expect(button.className).toContain("ease-fluid")
  })

  it("keeps outline variant on raised surface tokens", () => {
    render(<Button variant="outline">Outline</Button>)

    const button = screen.getByRole("button", { name: "Outline" })
    expect(button.className).toContain("border-subtle")
    expect(button.className).toContain("bg-raised")
    expect(button.className).toContain("hover:bg-subtle")
  })
})
