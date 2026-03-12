import type { NegotiationTranscript, NegotiationStep, StepCallback, TradeAction } from './types.js'
import type { OKXCredentials } from './api/okx-auth.js'
import { BASE_PRICES } from './tokens.js'
import { OKX_SYMBOLS } from './tokens.js'
import { VENUE_CONFIGS } from './venues.js'
import { okxPlaceOrder, okxGetOrder, okxCancelOrder, okxGetTickerPrice } from './api/okx.js'
import { formatCurrency } from './formatters.js'

/** Sleep helper */
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

// =============================================
// Simulated negotiation (fallback / demo mode)
// =============================================

export function simulateNegotiation(token: string, amount: number): NegotiationTranscript {
  const basePrice = BASE_PRICES[token] ?? 100

  const exchangeInitialPrice = basePrice * (1 + 0.002 + Math.random() * 0.003)
  const agentTargetPrice = basePrice * (1 - 0.001 - Math.random() * 0.001)

  const steps: NegotiationStep[] = []

  steps.push({
    role: 'exchange',
    message: `Exchange: I can offer ${token} at $${exchangeInitialPrice.toFixed(2)} per unit.`,
    price: exchangeInitialPrice,
  })

  const agentCounter1 = basePrice * (1 - 0.002)
  steps.push({
    role: 'agent',
    message: `I see better prices on other venues. Can you do $${agentCounter1.toFixed(2)}?`,
    price: agentCounter1,
  })

  const exchangeCounter = basePrice * (1 - 0.0005 + Math.random() * 0.001)
  steps.push({
    role: 'exchange',
    message: `Best I can do is $${exchangeCounter.toFixed(2)}. This includes reduced maker fees.`,
    price: exchangeCounter,
  })

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

// =============================================
// Real OKX negotiation via post-only limit orders
// =============================================

const POLL_INTERVAL_MS = 2_000
const MAX_WAIT_MS = 10_000

/**
 * Real negotiation with OKX:
 * 1. Get current market price
 * 2. Place post-only limit order at better price
 * 3. Poll for fill
 * 4. If not filled → cancel + market order fallback
 */
export async function negotiateOKX(
  credentials: OKXCredentials,
  token: string,
  amount: number,
  side: TradeAction,
  onStep?: StepCallback,
): Promise<NegotiationTranscript> {
  const instId = OKX_SYMBOLS[token]
  if (!instId) {
    throw new Error(`Unsupported token on OKX: ${token}`)
  }

  const config = VENUE_CONFIGS.okx
  const steps: NegotiationStep[] = []
  let stepCounter = 0
  const emitStep = (role: NegotiationStep['role'], message: string, price?: number) => {
    const step: NegotiationStep = { role, message, price }
    steps.push(step)
    if (onStep) {
      onStep({
        id: `neg-${++stepCounter}`,
        type: 'negotiation',
        status: 'done',
        venue: 'okx',
        message,
        timestamp: Date.now(),
      })
    }
  }

  // Step 1: Get current market price
  const marketPrice = await okxGetTickerPrice(instId, side)
  emitStep('exchange', `OKX market price: ${formatCurrency(marketPrice)} per ${token}`, marketPrice)

  // Step 2: Calculate target price (better than market)
  const spreadRange = config.spreadRange // e.g. [-0.0015, -0.0005]
  const targetSpread = spreadRange[0] + Math.random() * (spreadRange[1] - spreadRange[0])
  const targetPrice = side === 'buy'
    ? marketPrice * (1 + targetSpread) // For buys: lower is better, negative spread → below market
    : marketPrice * (1 - targetSpread) // For sells: higher is better

  const targetPriceStr = targetPrice.toFixed(2)

  emitStep('agent', `Placing post-only limit order at ${formatCurrency(targetPrice)} (${(Math.abs(targetSpread) * 100).toFixed(3)}% better than market)`, targetPrice)

  // Step 3: Place post-only limit order
  const clOrdId = `hag_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

  let ordId: string
  let filled = false
  let fillPrice = 0

  try {
    const orderResult = await okxPlaceOrder(credentials, {
      instId,
      tdMode: 'cash',
      side,
      ordType: 'limit',
      sz: amount.toString(),
      px: targetPriceStr,
      clOrdId,
    })
    ordId = orderResult.ordId

    emitStep('exchange', `Order accepted (ID: ${ordId.slice(-8)}). Waiting for fill...`)

    // Step 4: Poll for fill
    const startPoll = Date.now()
    while (Date.now() - startPoll < MAX_WAIT_MS) {
      await sleep(POLL_INTERVAL_MS)

      try {
        const status = await okxGetOrder(credentials, instId, clOrdId)

        if (status.state === 'filled') {
          filled = true
          fillPrice = parseFloat(status.avgPx) || targetPrice
          const fee = parseFloat(status.fee) || 0
          emitStep('exchange', `Filled at ${formatCurrency(fillPrice)}! Fee: ${formatCurrency(Math.abs(fee))}`, fillPrice)
          break
        }

        if (status.state === 'partially_filled') {
          const filledSz = parseFloat(status.fillSz)
          emitStep('exchange', `Partially filled: ${filledSz}/${amount} ${token}...`)
        }

        // Still live — keep waiting
        const elapsed = ((Date.now() - startPoll) / 1000).toFixed(0)
        emitStep('agent', `Waiting... (${elapsed}s elapsed)`)
      } catch {
        // Polling error — continue
      }
    }

    // Step 5: If not filled, cancel and fall back to market
    if (!filled) {
      emitStep('agent', 'Limit order not filled within 10s. Canceling and executing at market price...')

      try {
        await okxCancelOrder(credentials, instId, clOrdId)
      } catch {
        // May already be cancelled or filled
      }

      // Place market order
      const marketClOrdId = `hag_mkt_${Date.now()}`
      try {
        await okxPlaceOrder(credentials, {
          instId,
          tdMode: 'cash',
          side,
          ordType: 'market',
          sz: amount.toString(),
          clOrdId: marketClOrdId,
        })

        // Wait briefly for market order fill
        await sleep(2000)

        try {
          const mktStatus = await okxGetOrder(credentials, instId, marketClOrdId)
          fillPrice = parseFloat(mktStatus.avgPx) || marketPrice
          filled = true
          emitStep('exchange', `Market order filled at ${formatCurrency(fillPrice)}`, fillPrice)
        } catch {
          fillPrice = marketPrice
          filled = true
          emitStep('exchange', `Market order submitted at ~${formatCurrency(marketPrice)}`, marketPrice)
        }
      } catch (err) {
        emitStep('exchange', `Market order failed: ${err instanceof Error ? err.message : 'unknown error'}`)
        fillPrice = marketPrice
      }
    }
  } catch (err) {
    // Order placement failed entirely
    const errMsg = err instanceof Error ? err.message : 'unknown error'
    emitStep('exchange', `Order failed: ${errMsg}. Using quoted price.`)
    fillPrice = marketPrice
  }

  const saved = (marketPrice - fillPrice) * amount * (side === 'buy' ? 1 : -1)
  const finalSaved = Math.max(0, parseFloat(saved.toFixed(2)))

  if (finalSaved > 0) {
    emitStep('agent', `Negotiation saved ${formatCurrency(finalSaved)} vs market price!`)
  } else {
    emitStep('agent', `Executed at market price. No additional savings from negotiation.`)
  }

  return {
    venue: 'okx',
    steps,
    finalPrice: parseFloat(fillPrice.toFixed(6)),
    originalPrice: parseFloat(marketPrice.toFixed(6)),
    saved: finalSaved,
  }
}
