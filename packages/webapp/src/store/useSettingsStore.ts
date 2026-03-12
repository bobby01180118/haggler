import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { OKXCredentials } from '@haggler/core'

interface SettingsState {
  apiKeys: Record<string, string>
  apiSecrets: Record<string, string>
  apiPassphrases: Record<string, string>
  enabledVenues: string[]
  demoMode: boolean
  slippageTolerance: number
  walletAddress: string | null
  setApiKey: (venue: string, key: string) => void
  setApiSecret: (venue: string, secret: string) => void
  setApiPassphrase: (venue: string, passphrase: string) => void
  toggleVenue: (venue: string) => void
  setDemoMode: (enabled: boolean) => void
  setSlippageTolerance: (v: number) => void
  setWalletAddress: (addr: string | null) => void
}

/** Get OKX credentials if all 3 fields are filled */
export function getOKXCredentials(): OKXCredentials | null {
  const state = useSettingsStore.getState()
  const key = state.apiKeys.okx?.trim()
  const secret = state.apiSecrets.okx?.trim()
  const passphrase = state.apiPassphrases.okx?.trim()
  if (key && secret && passphrase) {
    return { apiKey: key, secretKey: secret, passphrase }
  }
  return null
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      apiKeys: {
        binance: '', coinbase: '', okx: '', bybit: '', kraken: '',
        uniswap: '', jupiter: '', pancakeswap: '', curve: '', '1inch': '',
        robinhood: '',
      },
      apiSecrets: { okx: '', binance: '' },
      apiPassphrases: { okx: '' },
      enabledVenues: [
        'binance', 'coinbase', 'okx', 'bybit', 'kraken',
        'uniswap', 'jupiter', 'pancakeswap', 'curve', '1inch',
        'robinhood',
      ],
      demoMode: true,
      slippageTolerance: 0.005,
      walletAddress: null,

      setApiKey: (venue, key) =>
        set((state) => ({
          apiKeys: { ...state.apiKeys, [venue]: key },
        })),

      setApiSecret: (venue, secret) =>
        set((state) => ({
          apiSecrets: { ...state.apiSecrets, [venue]: secret },
        })),

      setApiPassphrase: (venue, passphrase) =>
        set((state) => ({
          apiPassphrases: { ...state.apiPassphrases, [venue]: passphrase },
        })),

      toggleVenue: (venue) =>
        set((state) => ({
          enabledVenues: state.enabledVenues.includes(venue)
            ? state.enabledVenues.filter((v) => v !== venue)
            : [...state.enabledVenues, venue],
        })),

      setDemoMode: (enabled) => set({ demoMode: enabled }),
      setSlippageTolerance: (v) => set({ slippageTolerance: v }),
      setWalletAddress: (addr) => set({ walletAddress: addr }),
    }),
    { name: 'haggler-settings' }
  )
)
