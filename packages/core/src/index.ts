// Haggler Core — Agent Engine
// Public API

export {
  type TradeAction,
  type TradeRequest,
  type VenueName,
  type LiveVenueName,
  type VenueTier,
  type VenueType,
  type VenueQuote,
  type FeeBreakdown,
  type Trade,
  type TradeStatus,
  type AgentStep,
  type AgentStepType,
  type AgentStepStatus,
  type StepCallback,
  type ComparisonResult,
  type NegotiationTranscript,
  type NegotiationStep,
} from './types.js'

export { parseTradeInput } from './parser.js'

export {
  type VenueConfig,
  VENUE_CONFIGS,
  HAGGLER_FEE_RATE,
  ALL_VENUES,
  LIVE_VENUES,
  COMING_SOON_VENUES,
  isLiveVenue,
  generateQuote,
  generateAllQuotes,
} from './venues.js'

export { createHaggler, type HagglerEngine, type HagglerEngineOptions } from './engine.js'
export { TIMING } from './delays.js'

export {
  SUPPORTED_TOKENS,
  type SupportedToken,
  BASE_PRICES,
  TOKEN_NAMES,
  BINANCE_SYMBOLS,
  OKX_SYMBOLS,
  ONEINCH_TOKENS,
  USDT_ADDRESS,
} from './tokens.js'

export { formatCurrency, formatPercent, formatSavings } from './formatters.js'

// API adapters
export {
  fetchLiveQuote,
  fetchAllLiveQuotes,
  type QuoteRequest,
  type LiveQuoteResult,
} from './api/index.js'
