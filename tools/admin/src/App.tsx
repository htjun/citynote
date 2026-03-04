import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import { Layout } from "./Layout"
import { CitiesPage } from "./pages/cities"
import { AgentsPage } from "./pages/agents"
import { SchedulesPage } from "./pages/schedules"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/cities" replace />} />
          <Route path="cities" element={<CitiesPage />} />
          <Route path="agents" element={<AgentsPage />} />
          <Route path="schedules" element={<SchedulesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
