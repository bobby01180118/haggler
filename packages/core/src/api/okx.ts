import type { VenueQuote } from '../types.js'
import type { QuoteRequest, VenueAPI } from './types.js'
import { OKX_SYMBOLS } from '../tokens.js'
import { VENUE_CONFIGS } from '../venues.js'

const BASE_URL = 'https://www.okx.com'
const TIMEOUT_MS = 5_000

interface OKXTickerResponse {
  code: string
  data: Array<{
    instId: string
    last: string
    askPx: string
    bidPx: string
  }>
}

interface OKXOrderbookResponse {
  code: string
  data: Array<{
    asks: [string, string, string, string][]  // [price, qty, deprecatedField, numOrders]
    bids: [string, string, string, string][]
  }>
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
 * Get ticker price (best bid/ask) from OKX
 */
async function getTickerPrice(instId: string, side: 'buy' | 'sell'): Promise<number> {
  const res = await fetchWithTimeout(`${BASE_URL}/api/v5/market/ticker?instId=${instId}`)
  if (!res.ok) throw new Error(`OKX ticker error: ${res.status}`)
  const data: OKXTickerResponse = await res.json()
  if (data.code !== '0' || !data.data.length) {
    throw new Error(`OKX ticker error: code=${data.code}`)
  }
  const ticker = data.data[0]
  // For buys, use ask price; for sells, use bid price
  return parseFloat(side === 'buy' ? ticker.askPx : ticker.bidPx)
}

/**
 * Get effective fill price from OKX orderbook
 */
async function getOrderbookPrice(
  instId: string,
  amount: number,
  side: 'buy' | 'sell'
): Promise<number> {
  const res = await fetchWithTimeout(`${BASE_URL}/api/v5/market/books?instId=${instId}&sz=20`)
  if (!res.ok) throw new Error(`OKX orderbook error: ${res.status}`)
  const data: OKXOrderbookResponse = await res.json()
  if (data.code !== '0' || !data.data.length) {
    throw new Error(`OKX orderbook error: code=${data.code}`)
  }

  const levels = side === 'buy' ? data.data[0].asks : data.data[0].bids
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
    const fallback = await getTickerPrice(instId, side)
    totalCost += remaining * fallback
  }

  return totalCost / amount
}

export const okxAPI: VenueAPI = {
  venue: 'okx',

  async getQuote(request: QuoteRequest): Promise<VenueQuote> {
    const instId = OKX_SYMBOLS[request.base]
    if (!instId) {
      throw new Error(`Unsupported token on OKX: ${request.base}`)
    }

    const config = VENUE_CONFIGS.okx
    const start = Date.now()

    let price: number
    try {
      price = await getOrderbookPrice(instId, request.amount, request.side)
    } catch {
      price = await getTickerPrice(instId, request.side)
    }

    const latencyMs = Date.now() - start
    const subtotal = price * request.amount
    const fee = subtotal * config.feeRate + config.flatFee
    const total = subtotal + fee

    return {
      venue: 'okx',
      venueName: config.name,
      price: parseFloat(price.toFixed(6)),
      fee: parseFloat(fee.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      latencyMs,
      negotiated: config.negotiated,
    }
  },
}
