import type { NegotiationTranscript, NegotiationStep } from './types.js'
import { BASE_PRICES } from './tokens.js'

export function simulateNegotiation(token: string, amount: number): NegotiationTranscript {
  const basePrice = BASE_PRICES[token] ?? 100

  // Start with a slightly above-market offer from OKX
  const exchangeInitialPrice = basePrice * (1 + 0.002 + Math.random() * 0.003)
  // Our target is slightly below market
  const agentTargetPrice = basePrice * (1 - 0.001 - Math.random() * 0.001)

  const steps: NegotiationStep[] = []

  // Round 1: Exchange offers
  steps.push({
    role: 'exchange',
    message: `OKX: I can offer ${token} at $${exchangeInitialPrice.toFixed(2)} per unit.`,
    price: exchangeInitialPrice,
  })

  // Round 2: Agent counters
  const agentCounter1 = basePrice * (1 - 0.002)
  steps.push({
    role: 'agent',
    message: `I see better prices on other venues. Can you do $${agentCounter1.toFixed(2)}?`,
    price: agentCounter1,
  })

  // Round 3: Exchange comes down
  const exchangeCounter = basePrice * (1 - 0.0005 + Math.random() * 0.001)
  steps.push({
    role: 'exchange',
    message: `Best I can do is $${exchangeCounter.toFixed(2)}. This includes reduced maker fees.`,
    price: exchangeCounter,
  })

  // Round 4: Agent accepts or pushes once more
  const finalPrice = exchangeCounter * (1 - Math.random() * 0.0005)
  steps.push({
    role: 'agent',
    message: `Deal at $${finalPrice.toFixed(2)}. Locking in the price.`,
    price: finalPrice,
  })

  const saved = (exchangeInitialPrice - finalPrice) * amount

  return {
    venue: 'okx',
    steps,
    finalPrice: parseFloat(finalPrice.toFixed(6)),
    originalPrice: parseFloat(exchangeInitialPrice.toFixed(6)),
    saved: parseFloat(saved.toFixed(2)),
  }
}
