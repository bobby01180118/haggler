export const SUPPORTED_TOKENS = ['ETH', 'BTC', 'SOL', 'DOGE', 'AVAX', 'MATIC', 'LINK', 'UNI'] as const

export type SupportedToken = typeof SUPPORTED_TOKENS[number]

export const BASE_PRICES: Record<string, number> = {
  ETH: 3425,
  BTC: 97500,
  SOL: 178,
  DOGE: 0.42,
  AVAX: 38.5,
  MATIC: 0.58,
  LINK: 18.2,
  UNI: 12.8,
}

export const TOKEN_NAMES: Record<string, string> = {
  ETH: 'Ethereum',
  BTC: 'Bitcoin',
  SOL: 'Solana',
  DOGE: 'Dogecoin',
  AVAX: 'Avalanche',
  MATIC: 'Polygon',
  LINK: 'Chainlink',
  UNI: 'Uniswap',
}
