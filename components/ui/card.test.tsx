import { render } from "@testing-library/react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

describe("card visual contract", () => {
  it("uses raised surface and modern geometry classes", () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>Body</CardContent>
      </Card>
    )

    const card = container.querySelector('[data-slot="card"]')
    expect(card).toBeTruthy()
    const { className } = card as HTMLElement

    expect(className).toContain("bg-raised")
    expect(className).toContain("border-subtlest")
    expect(className).toContain("rounded-xl")
    expect(className).toContain("shadow-subtle")
  })
})
