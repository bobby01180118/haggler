import type { VenueName, VenueQuote, VenueTier, VenueType, LiveVenueName } from './types.js'
import { BASE_PRICES } from './tokens.js'

export interface VenueConfig {
  name: string
  tier: VenueTier
  type: VenueType
  description: string
  spreadRange: [number, number]
  feeRate: number
  flatFee: number
  negotiated: boolean
}

export const VENUE_CONFIGS: Record<VenueName, VenueConfig> = {
  // Live CEX venues
  okx: {
    name: 'OKX',
    tier: 'live',
    type: 'cex',
    description: 'Smart trading negotiation + orderbook',
    spreadRange: [-0.0015, -0.0005],
    feeRate: 0.001,
    flatFee: 0,
    negotiated: true,
  },
  binance: {
    name: 'Binance',
    tier: 'live',
    type: 'cex',
    description: 'Orderbook pricing + execution',
    spreadRange: [0.001, 0.003],
    feeRate: 0.001,
    flatFee: 0,
    negotiated: false,
  },

  // Live DEX
  '1inch': {
    name: '1inch',
    tier: 'live',
    type: 'dex',
    description: 'DEX aggregator quotes + swap execution',
    spreadRange: [0.0005, 0.0025],
    feeRate: 0.003,
    flatFee: 5,
    negotiated: false,
  },

  // Coming soon — CEX
  coinbase: {
    name: 'Coinbase',
    tier: 'coming-soon',
    type: 'cex',
    description: 'Coming soon',
    spreadRange: [0.002, 0.005],
    feeRate: 0.006,
    flatFee: 0,
    negotiated: false,
  },
  bybit: {
    name: 'Bybit',
    tier: 'coming-soon',
    type: 'cex',
    description: 'Coming soon',
    spreadRange: [0.0008, 0.0025],
    feeRate: 0.001,
    flatFee: 0,
    negotiated: false,
  },
  kraken: {
    name: 'Kraken',
    tier: 'coming-soon',
    type: 'cex',
    description: 'Coming soon',
    spreadRange: [0.001, 0.004],
    feeRate: 0.0026,
    flatFee: 0,
    negotiated: false,
  },

  // Coming soon — DEX
  uniswap: {
    name: 'Uniswap',
    tier: 'coming-soon',
    type: 'dex',
    description: 'Coming soon',
    spreadRange: [0.0005, 0.002],
    feeRate: 0.003,
    flatFee: 8,
    negotiated: false,
  },
  jupiter: {
    name: 'Jupiter',
    tier: 'coming-soon',
    type: 'dex',
    description: 'Coming soon',
    spreadRange: [0.0003, 0.0015],
    feeRate: 0.0025,
    flatFee: 0.5,
    negotiated: false,
  },
  pancakeswap: {
    name: 'PancakeSwap',
    tier: 'coming-soon',
    type: 'dex',
    description: 'Coming soon',
    spreadRange: [0.0008, 0.0022],
    feeRate: 0.0025,
    flatFee: 3,
    negotiated: false,
  },
  curve: {
    name: 'Curve',
    tier: 'coming-soon',
    type: 'dex',
    description: 'Coming soon',
    spreadRange: [0.0002, 0.001],
    feeRate: 0.0004,
    flatFee: 12,
    negotiated: false,
  },

  // Coming soon — Broker
  robinhood: {
    name: 'Robinhood',
    tier: 'coming-soon',
    type: 'broker',
    description: 'Coming soon',
    spreadRange: [0.004, 0.008],
    feeRate: 0,
    flatFee: 0,
    negotiated: false,
  },
}

export const HAGGLER_FEE_RATE = 0.0005 // 0.05%

export const ALL_VENUES: VenueName[] = [
  'okx', 'binance', '1inch',
  'coinbase', 'bybit', 'kraken',
  'uniswap', 'jupiter', 'pancakeswap', 'curve',
  'robinhood',
]

export const LIVE_VENUES: LiveVenueName[] = ['okx', 'binance', '1inch']

export const COMING_SOON_VENUES: VenueName[] = [
  'coinbase', 'bybit', 'kraken',
  'uniswap', 'jupiter', 'pancakeswap', 'curve',
  'robinhood',
]

export function isLiveVenue(venue: VenueName): venue is LiveVenueName {
  return (LIVE_VENUES as string[]).includes(venue)
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
  venues: VenueName[] = ALL_VENUES
): VenueQuote[] {
  return venues.map(v => generateQuote(v, token, amount))
}
