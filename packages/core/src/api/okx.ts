import type { VenueQuote } from '../types.js'
import type { QuoteRequest, VenueAPI, OrderParams, OrderResult, BalanceDetail } from './types.js'
import type { OKXCredentials } from './okx-auth.js'
import { okxAuthFetch } from './okx-auth.js'
import { OKX_SYMBOLS } from '../tokens.js'
import { VENUE_CONFIGS } from '../venues.js'

// Use proxy in browser (Vite dev server), direct URL in Node.js
const BASE_URL = typeof window !== 'undefined' ? '/api/okx' : 'https://www.okx.com'
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

// =============================================
// Authenticated OKX Trading API
// =============================================

/** Get the current best ask/bid price for a symbol (public, no auth needed) */
export { getTickerPrice as okxGetTickerPrice }

/** Get OKX symbol for a token */
export function getOKXInstId(token: string): string | undefined {
  return OKX_SYMBOLS[token]
}

/** Check account balance */
export async function okxGetBalance(
  credentials: OKXCredentials,
  ccy?: string
): Promise<BalanceDetail[]> {
  const path = ccy
    ? `/api/v5/account/balance?ccy=${ccy}`
    : '/api/v5/account/balance'

  const res = await okxAuthFetch(credentials, 'GET', path) as {
    data: Array<{ details: BalanceDetail[] }>
  }

  return res.data?.[0]?.details ?? []
}

/** Place an order on OKX */
export async function okxPlaceOrder(
  credentials: OKXCredentials,
  params: OrderParams
): Promise<{ ordId: string; clOrdId: string }> {
  const res = await okxAuthFetch(credentials, 'POST', '/api/v5/trade/order', params as unknown as Record<string, unknown>) as {
    data: Array<{ ordId: string; clOrdId: string; sCode: string; sMsg: string }>
  }

  const order = res.data?.[0]
  if (!order || order.sCode !== '0') {
    throw new Error(`OKX order failed: ${order?.sMsg || 'unknown error'}`)
  }

  return { ordId: order.ordId, clOrdId: order.clOrdId }
}

/** Get order status */
export async function okxGetOrder(
  credentials: OKXCredentials,
  instId: string,
  clOrdId: string
): Promise<OrderResult> {
  const path = `/api/v5/trade/order?instId=${instId}&clOrdId=${clOrdId}`
  const res = await okxAuthFetch(credentials, 'GET', path) as {
    data: OrderResult[]
  }

  if (!res.data?.[0]) {
    throw new Error('OKX order not found')
  }

  return res.data[0]
}

/** Cancel an order */
export async function okxCancelOrder(
  credentials: OKXCredentials,
  instId: string,
  clOrdId: string
): Promise<void> {
  await okxAuthFetch(credentials, 'POST', '/api/v5/trade/cancel-order', {
    instId,
    clOrdId,
  })
}
