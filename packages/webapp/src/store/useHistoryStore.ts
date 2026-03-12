import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Trade } from '@haggler/core'

interface HistoryState {
  trades: Trade[]
  addTrade: (trade: Trade) => void
  clearHistory: () => void
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      trades: [],

      addTrade: (trade) =>
        set((state) => ({
          trades: [trade, ...state.trades],
        })),

      clearHistory: () => set({ trades: [] }),
    }),
    { name: 'haggler-history' }
  )
)
