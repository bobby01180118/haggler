import type { TradeRequest } from './types.js'
import { BASE_PRICES, SUPPORTED_TOKENS } from './tokens.js'

export function parseTradeInput(input: string): TradeRequest | null {
  const text = input.trim().toLowerCase()

  // Pattern 1: "buy/sell 1 ETH" or "buy 0.5 BTC"
  const match1 = text.match(/^(buy|sell)\s+(\d+\.?\d*)\s+(\w+)/)
  if (match1) {
    const token = match1[3].toUpperCase()
    if (!isSupported(token)) return null
    return {
      action: match1[1] as 'buy' | 'sell',
      amount: parseFloat(match1[2]),
      token,
      quoteToken: 'USDT',
    }
  }

  // Pattern 2: "buy $5000 of ETH" or "buy 5000 USDT worth of ETH"
  const match2 = text.match(/^(buy|sell)\s+\$?(\d+\.?\d*)\s*(?:usdt\s+)?(?:of|worth\s+of)\s+(\w+)/)
  if (match2) {
    const token = match2[3].toUpperCase()
    if (!isSupported(token)) return null
    const dollarAmount = parseFloat(match2[2])
    const basePrice = BASE_PRICES[token]
    if (!basePrice) return null
    return {
      action: match2[1] as 'buy' | 'sell',
      amount: parseFloat((dollarAmount / basePrice).toFixed(6)),
      token,
      quoteToken: 'USDT',
    }
  }

  // Pattern 3: just a token amount like "1 ETH" (assume buy)
  const match3 = text.match(/^(\d+\.?\d*)\s+(\w+)$/)
  if (match3) {
    const token = match3[2].toUpperCase()
    if (!isSupported(token)) return null
    return {
      action: 'buy',
      amount: parseFloat(match3[1]),
      token,
      quoteToken: 'USDT',
    }
  }

  return null
}

function isSupported(token: string): boolean {
  return (SUPPORTED_TOKENS as readonly string[]).includes(token)
}
