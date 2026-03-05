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
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen flex-col md:flex-row">
        <nav className="border-border/80 bg-card border-b px-3 py-4 md:w-60 md:shrink-0 md:border-r md:border-b-0">
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
                      "text-muted-foreground hover:text-foreground hover:bg-muted block rounded-none border border-transparent px-3 py-2 text-sm font-medium transition-colors",
                      isActive && "text-foreground border-border/80 bg-muted"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="border-border/70 mt-4 border-t pt-3">
            <Badge variant="secondary" className="font-mono text-[11px]">
              DEV ONLY
            </Badge>
          </div>
        </nav>

        <main className="flex-1 bg-background">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
