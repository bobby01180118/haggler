import type {
  TradeRequest,
  AgentStep,
  StepCallback,
  ComparisonResult,
  VenueQuote,
  VenueName,
  LiveVenueName,
} from './types.js'
import { parseTradeInput } from './parser.js'
import { generateQuote, ALL_VENUES, LIVE_VENUES, HAGGLER_FEE_RATE } from './venues.js'
import { simulateNegotiation } from './negotiator.js'
import { TIMING, randomInRange, sleep } from './delays.js'
import { formatCurrency, formatTokenAmount } from './formatters.js'
import { fetchLiveQuote } from './api/index.js'

let stepCounter = 0
function nextId(): string {
  return `step-${++stepCounter}`
}

export interface HagglerEngineOptions {
  demoMode?: boolean
}

export interface HagglerEngine {
  comparePrices(input: string, onStep: StepCallback): Promise<ComparisonResult | null>
  negotiate(input: string, onStep: StepCallback): Promise<void>
  executeTrade(quote: VenueQuote, onStep: StepCallback): Promise<void>
}

export function createHaggler(options: HagglerEngineOptions = {}): HagglerEngine {
  const demoMode = options.demoMode ?? true

  return {
    comparePrices: (input, onStep) => comparePrices(input, onStep, demoMode),
    negotiate,
    executeTrade,
  }
}

const TIMING_KEYS: Record<VenueName, string> = {
  binance: 'binanceCheck',
  coinbase: 'coinbaseCheck',
  okx: 'okxCheck',
  bybit: 'bybitCheck',
  kraken: 'krakenCheck',
  uniswap: 'uniswapCheck',
  jupiter: 'jupiterCheck',
  pancakeswap: 'pancakeswapCheck',
  curve: 'curveCheck',
  '1inch': 'inchCheck',
  robinhood: 'robinhoodCheck',
}

const VENUE_DISPLAY: Record<VenueName, string> = {
  binance: 'Binance',
  coinbase: 'Coinbase',
  okx: 'OKX',
  bybit: 'Bybit',
  kraken: 'Kraken',
  uniswap: 'Uniswap',
  jupiter: 'Jupiter',
  pancakeswap: 'PancakeSwap',
  curve: 'Curve',
  '1inch': '1inch',
  robinhood: 'Robinhood',
}

async function comparePrices(
  input: string,
  onStep: StepCallback,
  demoMode: boolean = true
): Promise<ComparisonResult | null> {
  onStep({
    id: nextId(),
    type: 'user',
    status: 'done',
    message: input,
    timestamp: Date.now(),
  })

  await sleep(TIMING.parseDelay)

  const trade = parseTradeInput(input)
  if (!trade) {
    onStep({
      id: nextId(),
      type: 'system',
      status: 'error',
      message: "I didn't catch that. Try something like: Buy 1 ETH",
      timestamp: Date.now(),
    })
    return null
  }

  // In live mode, only scan live venues; in demo mode, scan all
  const venuesToScan = demoMode ? ALL_VENUES : (LIVE_VENUES as VenueName[])

  await sleep(TIMING.systemMessageDelay)
  onStep({
    id: nextId(),
    type: 'system',
    status: 'done',
    message: demoMode
      ? `Scanning ${ALL_VENUES.length} venues for ${formatTokenAmount(trade.amount, trade.token)}...`
      : `Scanning ${venuesToScan.length} live venues for ${formatTokenAmount(trade.amount, trade.token)}...`,
    timestamp: Date.now(),
  })

  const quotes: VenueQuote[] = []
  const quoteExpiry = Date.now() + 30_000 // 30s expiry

  for (const venue of venuesToScan) {
    await sleep(TIMING.venueGap)

    const stepId = nextId()

    onStep({
      id: stepId,
      type: 'venue-check',
      status: 'checking',
      venue,
      message: `Checking ${VENUE_DISPLAY[venue]}...`,
      timestamp: Date.now(),
    })

    let quote: VenueQuote
    if (demoMode) {
      // Simulated quote
      const timingKey = TIMING_KEYS[venue]
      const checkTime = randomInRange(TIMING[timingKey as keyof typeof TIMING] as [number, number])
      await sleep(checkTime)
      quote = generateQuote(venue, trade.token, trade.amount)
      quote.latencyMs = Math.round(checkTime)
    } else {
      // Real API quote for live venues
      try {
        quote = await fetchLiveQuote(venue as LiveVenueName, {
          base: trade.token,
          quote: 'USDT',
          amount: trade.amount,
          side: trade.action ?? 'buy',
        })
      } catch {
        // API failed — fall back to simulated quote
        const timingKey = TIMING_KEYS[venue]
        const checkTime = randomInRange(TIMING[timingKey as keyof typeof TIMING] as [number, number])
        await sleep(checkTime)
        quote = generateQuote(venue, trade.token, trade.amount)
        quote.latencyMs = Math.round(checkTime)
      }
    }

    // Add Haggler fee and expiry to every quote
    const hagglerFee = parseFloat((quote.price * trade.amount * HAGGLER_FEE_RATE).toFixed(2))
    quote.fees = {
      exchange: quote.fee,
      haggler: hagglerFee,
      total: parseFloat((quote.fee + hagglerFee).toFixed(2)),
    }
    quote.expiresAt = quoteExpiry
    quotes.push(quote)

    onStep({
      id: stepId,
      type: 'venue-check',
      status: 'done',
      venue,
      message: `${VENUE_DISPLAY[venue]}: ${formatCurrency(quote.price)} per ${trade.token}`,
      data: quote,
      timestamp: Date.now(),
    })
  }

  await sleep(TIMING.analysisDelay)

  const sorted = [...quotes].sort((a, b) => a.total - b.total)
  const best = sorted[0]
  const worst = sorted[sorted.length - 1]
  const savings = worst.total - best.total
  const savingsPercent = savings / worst.total

  const comparison: ComparisonResult = {
    quotes: sorted,
    best,
    savings: parseFloat(savings.toFixed(2)),
    savingsPercent,
  }

  onStep({
    id: nextId(),
    type: 'comparison',
    status: 'done',
    data: comparison,
    message: `Best deal: ${best.venueName} at ${formatCurrency(best.price)}. Save ${formatCurrency(savings)} vs ${worst.venueName}.`,
    timestamp: Date.now(),
  })

  await sleep(TIMING.confirmDelay)
  onStep({
    id: nextId(),
    type: 'confirm',
    status: 'done',
    data: comparison,
    message: 'Execute this trade?',
    timestamp: Date.now(),
  })

  return comparison
}

async function negotiate(input: string, onStep: StepCallback): Promise<void> {
  const trade = parseTradeInput(input)
  if (!trade) return

  onStep({
    id: nextId(),
    type: 'system',
    status: 'done',
    message: `Negotiating with exchanges for ${formatTokenAmount(trade.amount, trade.token)}...`,
    timestamp: Date.now(),
  })

  const transcript = simulateNegotiation(trade.token, trade.amount)

  for (const step of transcript.steps) {
    await sleep(randomInRange(TIMING.negotiationStepDelay))
    onStep({
      id: nextId(),
      type: 'negotiation',
      status: 'done',
      venue: 'okx',
      message: step.message,
      timestamp: Date.now(),
    })
  }

  await sleep(TIMING.analysisDelay)
  onStep({
    id: nextId(),
    type: 'system',
    status: 'done',
    message: `Negotiation complete. Saved ${formatCurrency(transcript.saved)} vs initial offer.`,
    data: transcript,
    timestamp: Date.now(),
  })
}

async function executeTrade(quote: VenueQuote, onStep: StepCallback): Promise<void> {
  onStep({
    id: nextId(),
    type: 'system',
    status: 'checking',
    message: `Executing trade on ${quote.venueName}...`,
    timestamp: Date.now(),
  })

  await sleep(TIMING.executeDelay)

  const txId = 'tx_' + Math.random().toString(36).substring(2, 10)

  onStep({
    id: nextId(),
    type: 'result',
    status: 'done',
    venue: quote.venue,
    message: `Trade executed on ${quote.venueName}`,
    data: `Order filled at ${formatCurrency(quote.price)}. Fee: ${formatCurrency(quote.fee)}. Total: ${formatCurrency(quote.total)}. TX: ${txId}`,
    timestamp: Date.now(),
  })
}
