import { create } from "zustand"
import { persist } from "zustand/middleware"

export const TRAVEL_TYPES = ["trip", "study", "live"] as const

export type TravelType = (typeof TRAVEL_TYPES)[number]

const LEGACY_TRAVEL_TYPE_MAP: Record<string, TravelType> = {
  tourist: "trip",
  student: "study",
  nomad: "live",
  immigrant: "live",
  expat: "live",
  trip: "trip",
  study: "study",
  live: "live",
}

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
    {
      name: "citynote-preferences",
      version: 2,
      migrate: (persistedState) => {
        if (!persistedState || typeof persistedState !== "object") {
          return persistedState as PreferencesState
        }

        const state = persistedState as Partial<PreferencesState> & {
          travelType?: string | null
        }
        const mappedTravelType =
          state.travelType == null
            ? null
            : LEGACY_TRAVEL_TYPE_MAP[state.travelType] ?? null

        return {
          ...state,
          travelType: mappedTravelType,
        } as PreferencesState
      },
    }
  )
)
