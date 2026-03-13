import type { VenueQuote, LiveVenueName, TradeAction } from '../types.js'

export type { OKXCredentials } from './okx-auth.js'

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

// --- OKX Trading Types ---

export type OrderType = 'limit' | 'market'
export type OrderSide = 'buy' | 'sell'
export type OKXOrderState = 'live' | 'partially_filled' | 'filled' | 'canceled' | 'mmp_canceled'

export interface OrderParams {
  instId: string            // e.g. 'ETH-USDT'
  tdMode: 'cash'            // spot trading
  side: OrderSide
  ordType: OrderType
  sz: string                // size (amount)
  px?: string               // price (required for limit)
  clOrdId?: string          // client order ID
  tag?: string              // broker/affiliate tag for revenue attribution
}

export interface OrderResult {
  ordId: string
  clOrdId: string
  state: OKXOrderState
  fillPx: string            // filled price
  fillSz: string            // filled size
  avgPx: string             // average fill price
  fee: string               // fee amount
  instId: string
  side: OrderSide
  ordType: OrderType
  pnl: string
}

export interface BalanceDetail {
  ccy: string               // currency
  availBal: string          // available balance
  bal: string               // total balance
  frozenBal: string         // frozen balance
}
