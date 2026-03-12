export const SUPPORTED_TOKENS = [
  'ETH', 'BTC', 'SOL', 'DOGE', 'AVAX', 'MATIC', 'LINK', 'UNI',
  'XRP', 'ADA', 'DOT', 'SHIB', 'LTC', 'ATOM', 'NEAR', 'ARB',
  'OP', 'APT', 'SUI', 'PEPE',
] as const

export type SupportedToken = typeof SUPPORTED_TOKENS[number]

// Fallback base prices for demo mode
export const BASE_PRICES: Record<string, number> = {
  ETH: 3425,
  BTC: 97500,
  SOL: 178,
  DOGE: 0.42,
  AVAX: 38.5,
  MATIC: 0.58,
  LINK: 18.2,
  UNI: 12.8,
  XRP: 2.35,
  ADA: 0.72,
  DOT: 7.80,
  SHIB: 0.000024,
  LTC: 98.5,
  ATOM: 9.20,
  NEAR: 5.40,
  ARB: 1.15,
  OP: 1.85,
  APT: 8.90,
  SUI: 3.20,
  PEPE: 0.0000125,
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
  XRP: 'XRP',
  ADA: 'Cardano',
  DOT: 'Polkadot',
  SHIB: 'Shiba Inu',
  LTC: 'Litecoin',
  ATOM: 'Cosmos',
  NEAR: 'NEAR Protocol',
  ARB: 'Arbitrum',
  OP: 'Optimism',
  APT: 'Aptos',
  SUI: 'Sui',
  PEPE: 'Pepe',
}

// Binance symbol format: ETHUSDT
export const BINANCE_SYMBOLS: Record<string, string> = {
  ETH: 'ETHUSDT', BTC: 'BTCUSDT', SOL: 'SOLUSDT', DOGE: 'DOGEUSDT',
  AVAX: 'AVAXUSDT', MATIC: 'MATICUSDT', LINK: 'LINKUSDT', UNI: 'UNIUSDT',
  XRP: 'XRPUSDT', ADA: 'ADAUSDT', DOT: 'DOTUSDT', SHIB: 'SHIBUSDT',
  LTC: 'LTCUSDT', ATOM: 'ATOMUSDT', NEAR: 'NEARUSDT', ARB: 'ARBUSDT',
  OP: 'OPUSDT', APT: 'APTUSDT', SUI: 'SUIUSDT', PEPE: 'PEPEUSDT',
}

// OKX instId format: ETH-USDT
export const OKX_SYMBOLS: Record<string, string> = {
  ETH: 'ETH-USDT', BTC: 'BTC-USDT', SOL: 'SOL-USDT', DOGE: 'DOGE-USDT',
  AVAX: 'AVAX-USDT', MATIC: 'MATIC-USDT', LINK: 'LINK-USDT', UNI: 'UNI-USDT',
  XRP: 'XRP-USDT', ADA: 'ADA-USDT', DOT: 'DOT-USDT', SHIB: 'SHIB-USDT',
  LTC: 'LTC-USDT', ATOM: 'ATOM-USDT', NEAR: 'NEAR-USDT', ARB: 'ARB-USDT',
  OP: 'OP-USDT', APT: 'APT-USDT', SUI: 'SUI-USDT', PEPE: 'PEPE-USDT',
}

// 1inch ERC-20 token addresses (Ethereum mainnet)
export const ONEINCH_TOKENS: Record<string, string> = {
  ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  BTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // WBTC
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  UNI: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
  SHIB: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
  MATIC: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
  DOGE: '', // Not on Ethereum mainnet
  SOL: '',  // Not on Ethereum mainnet
  AVAX: '', // Bridged only
  PEPE: '0x6982508145454Ce325dDbE47a25d4ec3d2311933',
  ARB: '0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1',
  OP: '',   // On Optimism only
}

export const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7'
