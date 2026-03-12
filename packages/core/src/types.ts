export type TradeAction = 'buy' | 'sell'

export type VenueName =
  | 'binance'
  | 'coinbase'
  | 'okx'
  | 'bybit'
  | 'kraken'
  | 'uniswap'
  | 'jupiter'
  | 'pancakeswap'
  | 'curve'
  | '1inch'
  | 'robinhood'

export interface TradeRequest {
  action: TradeAction
  amount: number
  token: string
  quoteToken: string
}

export interface VenueQuote {
  venue: VenueName
  venueName: string
  price: number
  fee: number
  total: number
  latencyMs: number
  negotiated: boolean
}

export type AgentStepType =
  | 'system'
  | 'user'
  | 'venue-check'
  | 'negotiation'
  | 'comparison'
  | 'confirm'
  | 'result'

export type AgentStepStatus = 'pending' | 'checking' | 'done' | 'error'

export interface AgentStep {
  id: string
  type: AgentStepType
  status: AgentStepStatus
  venue?: VenueName
  message?: string
  data?: VenueQuote | ComparisonResult | NegotiationTranscript | string
  timestamp: number
}

export interface ComparisonResult {
  quotes: VenueQuote[]
  best: VenueQuote
  savings: number
  savingsPercent: number
}

export interface NegotiationTranscript {
  venue: VenueName
  steps: NegotiationStep[]
  finalPrice: number
  originalPrice: number
  saved: number
}

export interface NegotiationStep {
  role: 'agent' | 'exchange'
  message: string
  price?: number
}

export type StepCallback = (step: AgentStep) => void
