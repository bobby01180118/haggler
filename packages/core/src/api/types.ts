import type { VenueQuote, LiveVenueName, TradeAction } from '../types.js'

export interface QuoteRequest {
  base: string       // e.g. 'ETH'
  quote: string      // e.g. 'USDT'
  amount: number     // e.g. 1.5
  side: TradeAction   // 'buy' | 'sell'
}

export interface VenueAPI {
  venue: LiveVenueName
  getQuote(request: QuoteRequest): Promise<VenueQuote>
}

export interface APIError {
  venue: LiveVenueName
  code: 'TIMEOUT' | 'RATE_LIMIT' | 'INVALID_SYMBOL' | 'NETWORK' | 'UNKNOWN'
  message: string
}
