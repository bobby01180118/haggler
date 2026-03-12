import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  apiKeys: { okx: string; binance: string; '1inch': string }
  enabledVenues: string[]
  demoMode: boolean
  setApiKey: (venue: string, key: string) => void
  toggleVenue: (venue: string) => void
  setDemoMode: (enabled: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      apiKeys: { okx: '', binance: '', '1inch': '' },
      enabledVenues: ['okx', 'binance', '1inch'],
      demoMode: true,

      setApiKey: (venue, key) =>
        set((state) => ({
          apiKeys: { ...state.apiKeys, [venue]: key },
        })),

      toggleVenue: (venue) =>
        set((state) => ({
          enabledVenues: state.enabledVenues.includes(venue)
            ? state.enabledVenues.filter((v) => v !== venue)
            : [...state.enabledVenues, venue],
        })),

      setDemoMode: (enabled) => set({ demoMode: enabled }),
    }),
    { name: 'arbiter-settings' }
  )
)
