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
  // CEX venues
  binance: {
    name: 'Binance',
    spreadRange: [0.001, 0.003],
    feeRate: 0.001,
    flatFee: 0,
    negotiated: false,
  },
  coinbase: {
    name: 'Coinbase',
    spreadRange: [0.002, 0.005],
    feeRate: 0.006,
    flatFee: 0,
    negotiated: false,
  },
  okx: {
    name: 'OKX',
    spreadRange: [-0.0015, -0.0005],
    feeRate: 0.0006,
    flatFee: 0,
    negotiated: true,
  },
  bybit: {
    name: 'Bybit',
    spreadRange: [0.0008, 0.0025],
    feeRate: 0.001,
    flatFee: 0,
    negotiated: false,
  },
  kraken: {
    name: 'Kraken',
    spreadRange: [0.001, 0.004],
    feeRate: 0.0026,
    flatFee: 0,
    negotiated: false,
  },

  // DEX venues
  uniswap: {
    name: 'Uniswap',
    spreadRange: [0.0005, 0.002],
    feeRate: 0.003,
    flatFee: 8,
    negotiated: false,
  },
  jupiter: {
    name: 'Jupiter',
    spreadRange: [0.0003, 0.0015],
    feeRate: 0.0025,
    flatFee: 0.5,
    negotiated: false,
  },
  pancakeswap: {
    name: 'PancakeSwap',
    spreadRange: [0.0008, 0.0022],
    feeRate: 0.0025,
    flatFee: 3,
    negotiated: false,
  },
  curve: {
    name: 'Curve',
    spreadRange: [0.0002, 0.001],
    feeRate: 0.0004,
    flatFee: 12,
    negotiated: false,
  },
  '1inch': {
    name: '1inch',
    spreadRange: [0.0005, 0.0025],
    feeRate: 0.003,
    flatFee: 5,
    negotiated: false,
  },

  // Broker
  robinhood: {
    name: 'Robinhood',
    spreadRange: [0.004, 0.008],
    feeRate: 0,
    flatFee: 0,
    negotiated: false,
  },
}

export const ALL_VENUES: VenueName[] = [
  'binance', 'coinbase', 'okx', 'bybit', 'kraken',
  'uniswap', 'jupiter', 'pancakeswap', 'curve', '1inch',
  'robinhood',
]

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
  venues: VenueName[] = ALL_VENUES
): VenueQuote[] {
  return venues.map(v => generateQuote(v, token, amount))
}
