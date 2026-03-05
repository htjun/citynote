import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"

import { Layout } from "./Layout"

describe("admin layout shell", () => {
  it("applies raised navigation and active state token classes", () => {
    render(
      <MemoryRouter initialEntries={["/cities"]}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="cities" element={<div>Cities content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    const nav = screen.getByRole("navigation")
    expect(nav.className).toContain("bg-raised")
    expect(nav.className).toContain("border-subtlest")

    const activeLink = screen.getByRole("link", { name: "Cities" })
    expect(activeLink.className).toContain("bg-subtle")
    expect(activeLink.className).toContain("border-subtlest")
  })
})
