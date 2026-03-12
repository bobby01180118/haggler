import type { VenueQuote } from '../types.js'
import type { QuoteRequest, VenueAPI } from './types.js'
import { BINANCE_SYMBOLS } from '../tokens.js'
import { VENUE_CONFIGS } from '../venues.js'

const BASE_URL = 'https://api.binance.com'
const TIMEOUT_MS = 5_000

interface BinanceTickerResponse {
  symbol: string
  price: string
}

interface BinanceOrderbookResponse {
  bids: [string, string][]  // [price, qty]
  asks: [string, string][]
}

async function fetchWithTimeout(url: string, timeoutMs: number = TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: controller.signal })
    return res
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Get mid-market price from Binance ticker
 */
async function getTickerPrice(symbol: string): Promise<number> {
  const res = await fetchWithTimeout(`${BASE_URL}/api/v3/ticker/price?symbol=${symbol}`)
  if (!res.ok) throw new Error(`Binance ticker error: ${res.status}`)
  const data: BinanceTickerResponse = await res.json()
  return parseFloat(data.price)
}

/**
 * Get effective fill price from orderbook depth
 * For buys, walk the asks; for sells, walk the bids
 */
async function getOrderbookPrice(
  symbol: string,
  amount: number,
  side: 'buy' | 'sell'
): Promise<number> {
  const res = await fetchWithTimeout(`${BASE_URL}/api/v3/depth?symbol=${symbol}&limit=20`)
  if (!res.ok) throw new Error(`Binance orderbook error: ${res.status}`)
  const data: BinanceOrderbookResponse = await res.json()

  const levels = side === 'buy' ? data.asks : data.bids
  let remaining = amount
  let totalCost = 0

  for (const [priceStr, qtyStr] of levels) {
    const price = parseFloat(priceStr)
    const qty = parseFloat(qtyStr)
    const fill = Math.min(remaining, qty)
    totalCost += fill * price
    remaining -= fill
    if (remaining <= 0) break
  }

  if (remaining > 0) {
    // Not enough liquidity — fall back to ticker price for remainder
    const ticker = await getTickerPrice(symbol)
    totalCost += remaining * ticker
  }

  return totalCost / amount
}

export const binanceAPI: VenueAPI = {
  venue: 'binance',

  async getQuote(request: QuoteRequest): Promise<VenueQuote> {
    const symbol = BINANCE_SYMBOLS[request.base]
    if (!symbol) {
      throw new Error(`Unsupported token on Binance: ${request.base}`)
    }

    const config = VENUE_CONFIGS.binance
    const start = Date.now()

    // Try orderbook first for better fill price, fall back to ticker
    let price: number
    try {
      price = await getOrderbookPrice(symbol, request.amount, request.side)
    } catch {
      price = await getTickerPrice(symbol)
    }

    const latencyMs = Date.now() - start
    const subtotal = price * request.amount
    const fee = subtotal * config.feeRate + config.flatFee
    const total = subtotal + fee

    return {
      venue: 'binance',
      venueName: config.name,
      price: parseFloat(price.toFixed(6)),
      fee: parseFloat(fee.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      latencyMs,
      negotiated: false,
    }
  },
}
