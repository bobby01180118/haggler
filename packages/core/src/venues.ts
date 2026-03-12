import type { VenueName, VenueQuote } from './types.js'
import { BASE_PRICES } from './tokens.js'

interface VenueConfig {
  name: string
  spreadRange: [number, number]
  feeRate: number
  flatFee: number
  negotiated: boolean
}

const VENUE_CONFIGS: Record<VenueName, VenueConfig> = {
  okx: {
    name: 'OKX Smart Trading',
    spreadRange: [-0.0015, -0.0005], // Usually cheaper (negotiation advantage)
    feeRate: 0.0006,
    flatFee: 0,
    negotiated: true,
  },
  binance: {
    name: 'Binance',
    spreadRange: [0.001, 0.003],
    feeRate: 0.001,
    flatFee: 0,
    negotiated: false,
  },
  '1inch': {
    name: '1inch (DEX)',
    spreadRange: [0.0005, 0.0025],
    feeRate: 0.003,
    flatFee: 5, // Simulated gas fee
    negotiated: false,
  },
}

export function generateQuote(
  venue: VenueName,
  token: string,
  amount: number
): VenueQuote {
  const config = VENUE_CONFIGS[venue]
  const basePrice = BASE_PRICES[token] ?? 100

  const [minSpread, maxSpread] = config.spreadRange
  const spread = minSpread + Math.random() * (maxSpread - minSpread)
  const jitter = (Math.random() - 0.5) * 0.0005

  const price = basePrice * (1 + spread + jitter)
  const subtotal = price * amount
  const fee = subtotal * config.feeRate + config.flatFee
  const total = subtotal + fee

  return {
    venue,
    venueName: config.name,
    price: parseFloat(price.toFixed(6)),
    fee: parseFloat(fee.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    latencyMs: 0,
    negotiated: config.negotiated,
  }
}

export function generateAllQuotes(
  token: string,
  amount: number,
  venues: VenueName[] = ['okx', 'binance', '1inch']
): VenueQuote[] {
  return venues.map(v => generateQuote(v, token, amount))
}
