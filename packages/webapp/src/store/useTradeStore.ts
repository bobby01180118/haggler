import { create } from 'zustand'
import type { AgentStep, ComparisonResult, VenueQuote } from '@haggler/core'
import { createHaggler } from '@haggler/core'
import { useSettingsStore, getOKXCredentials } from './useSettingsStore'

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

function getEngine() {
  const demoMode = useSettingsStore.getState().demoMode
  const okxCredentials = getOKXCredentials()
  return createHaggler({ demoMode, okxCredentials })
}

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
    try {
      const engine = getEngine()
      const result = await engine.comparePrices(input, (step) => {
        get().addStep(step)
      })
      set({ isRunning: false, comparison: result })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      get().addStep({
        id: `error-${Date.now()}`,
        type: 'system',
        status: 'error',
        message: `Error: ${message}`,
        timestamp: Date.now(),
      })
      set({ isRunning: false })
    }
  },

  executeTrade: async (quote) => {
    set({ isRunning: true })
    try {
      const engine = getEngine()
      await engine.executeTrade(quote, (step) => {
        get().addStep(step)
      })
      set({ isRunning: false })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Trade execution failed'
      get().addStep({
        id: `error-${Date.now()}`,
        type: 'result',
        status: 'error',
        message: `Error: ${message}`,
        timestamp: Date.now(),
      })
      set({ isRunning: false })
    }
  },

  reset: () => {
    set({ steps: [], isRunning: false, comparison: null })
  },
}))
