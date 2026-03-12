import type { VenueQuote } from '../types.js'
import type { QuoteRequest, VenueAPI } from './types.js'
import { ONEINCH_TOKENS, USDT_ADDRESS } from '../tokens.js'
import { VENUE_CONFIGS } from '../venues.js'
import { BASE_PRICES } from '../tokens.js'

const TIMEOUT_MS = 8_000

// 1inch Fusion API (no auth needed for quotes)
// Use proxy in browser (Vite dev server), direct URL in Node.js
const ONEINCH_QUOTE_URL = typeof window !== 'undefined'
  ? '/api/1inch/swap/v6.0/1/quote'
  : 'https://api.1inch.dev/swap/v6.0/1/quote'

// Token decimals for common tokens
const TOKEN_DECIMALS: Record<string, number> = {
  ETH: 18,
  BTC: 8,   // WBTC
  LINK: 18,
  UNI: 18,
  SHIB: 18,
  MATIC: 18,
  PEPE: 18,
  ARB: 18,
  USDT: 6,
}

function toWei(amount: number, decimals: number): string {
  // Convert to smallest unit, handling floating point carefully
  const factor = BigInt(10) ** BigInt(decimals)
  const intPart = BigInt(Math.floor(amount))
  const fracStr = (amount % 1).toFixed(decimals).slice(2)
  const fracBig = BigInt(fracStr.slice(0, decimals).padEnd(decimals, '0'))
  return (intPart * factor + fracBig).toString()
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
 * Try to get a real quote from 1inch API.
 * Falls back to simulated pricing if the API is unavailable (CORS, rate limit, etc.)
 */
async function get1inchQuote(
  srcToken: string,
  dstToken: string,
  amount: string
): Promise<{ dstAmount: string } | null> {
  try {
    const params = new URLSearchParams({
      src: srcToken,
      dst: dstToken,
      amount,
    })
    const res = await fetchWithTimeout(`${ONEINCH_QUOTE_URL}?${params}`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export const oneinchAPI: VenueAPI = {
  venue: '1inch',

  async getQuote(request: QuoteRequest): Promise<VenueQuote> {
    const tokenAddress = ONEINCH_TOKENS[request.base]
    if (!tokenAddress) {
      throw new Error(`Unsupported token on 1inch: ${request.base}`)
    }

    const config = VENUE_CONFIGS['1inch']
    const start = Date.now()

    let price: number
    const decimals = TOKEN_DECIMALS[request.base] ?? 18
    const usdtDecimals = TOKEN_DECIMALS.USDT ?? 6

    // Try real API first
    const amountWei = toWei(request.amount, decimals)
    const quoteResult = await get1inchQuote(tokenAddress, USDT_ADDRESS, amountWei)

    if (quoteResult?.dstAmount) {
      // Convert USDT amount back from smallest unit
      const dstAmount = Number(quoteResult.dstAmount) / (10 ** usdtDecimals)
      price = dstAmount / request.amount
    } else {
      // Fallback: try to get live price from Binance public data API, then add DEX spread
      let basePrice = BASE_PRICES[request.base] ?? 100
      try {
        const symbol = `${request.base}USDT`
        const res = await fetchWithTimeout(`https://data-api.binance.vision/api/v3/ticker/price?symbol=${symbol}`, 3000)
        if (res.ok) {
          const data = await res.json()
          basePrice = parseFloat(data.price)
        }
      } catch {
        // Use static fallback price
      }
      const spread = config.spreadRange[0] + Math.random() * (config.spreadRange[1] - config.spreadRange[0])
      price = basePrice * (1 + spread)
    }

    const latencyMs = Date.now() - start
    const subtotal = price * request.amount
    const fee = subtotal * config.feeRate + config.flatFee
    const total = subtotal + fee

    return {
      venue: '1inch',
      venueName: config.name,
      price: parseFloat(price.toFixed(6)),
      fee: parseFloat(fee.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      latencyMs,
      negotiated: false,
    }
  },
}
