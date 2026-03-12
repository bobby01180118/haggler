import { create } from 'zustand'
import type { AgentStep, ComparisonResult, VenueQuote } from '@haggler/core'
import { createHaggler } from '@haggler/core'

interface TradeState {
  steps: AgentStep[]
  isRunning: boolean
  comparison: ComparisonResult | null
  addStep: (step: AgentStep) => void
  updateStep: (id: string, updates: Partial<AgentStep>) => void
  startTrade: (input: string) => Promise<void>
  executeTrade: (quote: VenueQuote) => Promise<void>
  reset: () => void
}

const engine = createHaggler()

export const useTradeStore = create<TradeState>((set, get) => ({
  steps: [],
  isRunning: false,
  comparison: null,

  addStep: (step) => {
    set((state) => {
      const existing = state.steps.findIndex((s) => s.id === step.id)
      if (existing >= 0) {
        const updated = [...state.steps]
        updated[existing] = step
        return { steps: updated }
      }
      return { steps: [...state.steps, step] }
    })
  },

  updateStep: (id, updates) => {
    set((state) => ({
      steps: state.steps.map((s) =>
        s.id === id ? { ...s, ...updates } : s
      ),
    }))
  },

  startTrade: async (input) => {
    set({ isRunning: true, comparison: null })
    const result = await engine.comparePrices(input, (step) => {
      get().addStep(step)
    })
    set({ isRunning: false, comparison: result })
  },

  executeTrade: async (quote) => {
    set({ isRunning: true })
    await engine.executeTrade(quote, (step) => {
      get().addStep(step)
    })
    set({ isRunning: false })
  },

  reset: () => {
    set({ steps: [], isRunning: false, comparison: null })
  },
}))
