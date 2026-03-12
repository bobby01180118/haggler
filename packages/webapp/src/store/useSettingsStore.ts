import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  apiKeys: Record<string, string>
  enabledVenues: string[]
  demoMode: boolean
  setApiKey: (venue: string, key: string) => void
  toggleVenue: (venue: string) => void
  setDemoMode: (enabled: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      apiKeys: {
        binance: '', coinbase: '', okx: '', bybit: '', kraken: '',
        uniswap: '', jupiter: '', pancakeswap: '', curve: '', '1inch': '',
        robinhood: '',
      },
      enabledVenues: [
        'binance', 'coinbase', 'okx', 'bybit', 'kraken',
        'uniswap', 'jupiter', 'pancakeswap', 'curve', '1inch',
        'robinhood',
      ],
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
    { name: 'haggler-settings' }
  )
)
