import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { TravelType } from "@/lib/personalization/schema"

import {
  normalizeNationality,
  normalizeTravelType,
  persistPersonalizationInput,
  TRAVEL_TYPES,
} from "@/lib/personalization/schema"

const LEGACY_TRAVEL_TYPE_MAP: Record<string, TravelType | null> = {
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
      setNationality: (code) => {
        const normalized = normalizeNationality(code)
        set({ nationality: normalized })
        persistPersonalizationInput({ nationality: normalized })
      },
      setTravelType: (type) => {
        const normalized = normalizeTravelType(type)
        set({ travelType: normalized })
        persistPersonalizationInput({ purpose: normalized })
      },
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
          state.travelType === null || state.travelType === undefined
            ? null
            : (LEGACY_TRAVEL_TYPE_MAP[state.travelType] ?? null)
        const mappedNationality = normalizeNationality(state.nationality)

        return {
          ...state,
          nationality: mappedNationality,
          travelType: mappedTravelType,
        } as PreferencesState
      },
    }
  )
)

export type { TravelType }
export { TRAVEL_TYPES }
