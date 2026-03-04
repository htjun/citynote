import { create } from "zustand"
import { persist } from "zustand/middleware"

export const TRAVEL_TYPES = [
  "tourist",
  "nomad",
  "student",
  "immigrant",
  "expat",
] as const

export type TravelType = (typeof TRAVEL_TYPES)[number]

interface PreferencesState {
  nationality: string | null
  travelType: TravelType | null
  setNationality: (code: string | null) => void
  setTravelType: (type: TravelType | null) => void
}

export const usePreferences = create<PreferencesState>()(
  persist(
    (set) => ({
      nationality: null,
      travelType: null,
      setNationality: (code) => set({ nationality: code }),
      setTravelType: (type) => set({ travelType: type }),
    }),
    { name: "citynote-preferences" }
  )
)
