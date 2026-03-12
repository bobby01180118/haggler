import type { VenueQuote, LiveVenueName } from '../types.js'
import type { QuoteRequest, APIError } from './types.js'
import { binanceAPI } from './binance.js'
import { okxAPI } from './okx.js'
import { oneinchAPI } from './oneinch.js'

export type { QuoteRequest, VenueAPI, APIError } from './types.js'

const venueAPIs = {
  binance: binanceAPI,
  okx: okxAPI,
  '1inch': oneinchAPI,
} as const

/**
 * Fetch a live quote from a single venue.
 * Returns the quote or throws an APIError.
 */
export async function fetchLiveQuote(
  venue: LiveVenueName,
  request: QuoteRequest
): Promise<VenueQuote> {
  const api = venueAPIs[venue]
  if (!api) {
    throw { venue, code: 'UNKNOWN', message: `No API adapter for ${venue}` } satisfies APIError
  }

  try {
    return await api.getQuote(request)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)

    // Classify the error
    let code: APIError['code'] = 'UNKNOWN'
    if (message.includes('abort') || message.includes('timeout')) code = 'TIMEOUT'
    else if (message.includes('429') || message.includes('rate')) code = 'RATE_LIMIT'
    else if (message.includes('Unsupported') || message.includes('symbol')) code = 'INVALID_SYMBOL'
    else if (message.includes('fetch') || message.includes('network')) code = 'NETWORK'

    throw { venue, code, message } satisfies APIError
  }
}

export interface LiveQuoteResult {
  quotes: VenueQuote[]
  errors: APIError[]
}

/**
 * Fetch quotes from all live venues in parallel.
 * Uses Promise.allSettled so one failure doesn't block others.
 */
export async function fetchAllLiveQuotes(
  request: QuoteRequest
): Promise<LiveQuoteResult> {
  const venues: LiveVenueName[] = ['okx', 'binance', '1inch']

  const results = await Promise.allSettled(
    venues.map(venue => fetchLiveQuote(venue, request))
  )

  const quotes: VenueQuote[] = []
  const errors: APIError[] = []

  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    if (result.status === 'fulfilled') {
      quotes.push(result.value)
    } else {
      const reason = result.reason as APIError
      errors.push(reason ?? {
        venue: venues[i],
        code: 'UNKNOWN' as const,
        message: 'Unknown error',
      })
    }
  }

  return { quotes, errors }
}
