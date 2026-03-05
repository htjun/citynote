import { NavLink, Outlet } from "react-router"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const navItems = [
  { to: "/cities", label: "Cities" },
  { to: "/agents", label: "Agents" },
  { to: "/schedules", label: "Schedules" },
]

export function Layout() {
  return (
    <div className="bg-base min-h-screen text-foreground">
      <div className="flex min-h-screen flex-col md:flex-row">
        <nav className="border-subtlest bg-raised border-b px-3 py-4 md:w-64 md:shrink-0 md:border-r md:border-b-0">
          <div className="px-2 pb-4">
            <p className="text-sm font-semibold tracking-tight">
              Citynote Admin
            </p>
          </div>

          <ul className="grid gap-1 md:block md:space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "text-quiet hover:text-foreground hover:bg-subtle block rounded-lg border border-transparent px-3 py-2 text-sm font-medium transition-[background-color,border-color,color] duration-normal ease-fluid",
                      isActive && "text-foreground border-subtlest bg-subtle"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="border-subtlest mt-4 border-t pt-3">
            <Badge variant="outline" className="font-mono text-[11px]">
              DEV ONLY
            </Badge>
          </div>
        </nav>

        <main className="bg-base flex-1">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
