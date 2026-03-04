import { NavLink, Outlet } from "react-router"

const navItems = [
  { to: "/cities", label: "Cities" },
  { to: "/agents", label: "Agents" },
  { to: "/schedules", label: "Schedules" },
]

export function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav style={sidebarStyle}>
        <div style={logoStyle}>Citynote Admin</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                style={({ isActive }) => ({
                  ...linkStyle,
                  backgroundColor: isActive ? "#2a2a2a" : "transparent",
                  color: isActive ? "#fff" : "#aaa",
                })}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div style={envBadgeStyle}>DEV ONLY</div>
      </nav>
      <main style={mainStyle}>
        <Outlet />
      </main>
    </div>
  )
}

const sidebarStyle: React.CSSProperties = {
  width: 220,
  backgroundColor: "#1a1a1a",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  padding: "16px 0",
  flexShrink: 0,
}

const logoStyle: React.CSSProperties = {
  padding: "8px 16px 24px",
  fontSize: 15,
  fontWeight: 700,
  letterSpacing: "-0.02em",
  color: "#fff",
}

const linkStyle: React.CSSProperties = {
  display: "block",
  padding: "8px 16px",
  textDecoration: "none",
  fontSize: 14,
  borderRadius: 0,
  transition: "background-color 0.15s",
}

const envBadgeStyle: React.CSSProperties = {
  marginTop: "auto",
  padding: "8px 16px",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  color: "#666",
}

const mainStyle: React.CSSProperties = {
  flex: 1,
  padding: 32,
  backgroundColor: "#fafafa",
}
