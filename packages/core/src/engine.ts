import type {
  TradeRequest,
  AgentStep,
  StepCallback,
  ComparisonResult,
  VenueQuote,
  VenueName,
} from './types.js'
import { parseTradeInput } from './parser.js'
import { generateQuote } from './venues.js'
import { simulateNegotiation } from './negotiator.js'
import { TIMING, randomInRange, sleep } from './delays.js'
import { formatCurrency, formatTokenAmount } from './formatters.js'

let stepCounter = 0
function nextId(): string {
  return `step-${++stepCounter}`
}

export interface ArbiterEngine {
  comparePrices(input: string, onStep: StepCallback): Promise<ComparisonResult | null>
  negotiate(input: string, onStep: StepCallback): Promise<void>
  executeTrade(quote: VenueQuote, onStep: StepCallback): Promise<void>
}

export function createArbiter(): ArbiterEngine {
  return { comparePrices, negotiate, executeTrade }
}

async function comparePrices(
  input: string,
  onStep: StepCallback
): Promise<ComparisonResult | null> {
  // Echo user input
  onStep({
    id: nextId(),
    type: 'user',
    status: 'done',
    message: input,
    timestamp: Date.now(),
  })

  await sleep(TIMING.parseDelay)

  // Parse
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

  // System message
  await sleep(TIMING.systemMessageDelay)
  onStep({
    id: nextId(),
    type: 'system',
    status: 'done',
    message: `Got it. Finding the best price for ${formatTokenAmount(trade.amount, trade.token)}...`,
    timestamp: Date.now(),
  })

  // Check each venue sequentially for drama
  const venues: VenueName[] = ['okx', 'binance', '1inch']
  const quotes: VenueQuote[] = []

  for (const venue of venues) {
    await sleep(TIMING.venueGap)

    const stepId = nextId()

    // Show "checking" state
    onStep({
      id: stepId,
      type: 'venue-check',
      status: 'checking',
      venue,
      message: `Checking ${venueDisplayName(venue)}...`,
      timestamp: Date.now(),
    })

    // Simulate latency
    const checkTime = randomInRange(TIMING[`${venue === '1inch' ? 'inch' : venue}Check`])
    await sleep(checkTime)

    // Generate quote
    const quote = generateQuote(venue, trade.token, trade.amount)
    quote.latencyMs = Math.round(checkTime)
    quotes.push(quote)

    // Show result
    onStep({
      id: stepId,
      type: 'venue-check',
      status: 'done',
      venue,
      message: `${venueDisplayName(venue)}: ${formatCurrency(quote.price)} per ${trade.token}`,
      data: quote,
      timestamp: Date.now(),
    })
  }

  // Analysis pause
  await sleep(TIMING.analysisDelay)

  // Compare and find best
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

  // Show comparison
  onStep({
    id: nextId(),
    type: 'comparison',
    status: 'done',
    data: comparison,
    message: `Best deal: ${best.venueName} at ${formatCurrency(best.price)}. Save ${formatCurrency(savings)} vs ${worst.venueName}.`,
    timestamp: Date.now(),
  })

  // Show confirm prompt
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
    message: `Negotiating with OKX Smart Trading for ${formatTokenAmount(trade.amount, trade.token)}...`,
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

function venueDisplayName(venue: VenueName): string {
  const names: Record<VenueName, string> = {
    okx: 'OKX Smart Trading',
    binance: 'Binance',
    '1inch': '1inch (DEX)',
  }
  return names[venue]
}
