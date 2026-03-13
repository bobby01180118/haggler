#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import {
  createHaggler,
  fetchAllLiveQuotes,
  simulateNegotiation,
  okxGetBalance,
  SUPPORTED_TOKENS,
  TOKEN_NAMES,
  BINANCE_SYMBOLS,
  OKX_SYMBOLS,
  ONEINCH_TOKENS,
  HAGGLER_FEE_RATE,
  formatCurrency,
  type HagglerEngine,
  type OKXCredentials,
  type VenueQuote,
} from '@haggler/core'

// ── State ────────────────────────────────────────────────────────────────────

let credentials: OKXCredentials | null = null
let engine: HagglerEngine = createHaggler({ demoMode: true })

function json(data: unknown): { content: Array<{ type: 'text'; text: string }> } {
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] }
}

function errorResult(message: string) {
  return json({ error: true, message })
}

// ── Server ───────────────────────────────────────────────────────────────────

const server = new Server(
  { name: 'haggler', version: '0.2.0' },
  { capabilities: { tools: {} } }
)

// ── Tools ────────────────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'configure',
      description:
        'Set OKX API credentials to enable trading and balance checks. Without this, compare_prices and get_supported_tokens still work (public data). Credentials are stored in memory only, never persisted.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          okx_api_key: { type: 'string', description: 'OKX API key' },
          okx_secret_key: { type: 'string', description: 'OKX secret key' },
          okx_passphrase: { type: 'string', description: 'OKX passphrase' },
        },
        required: ['okx_api_key', 'okx_secret_key', 'okx_passphrase'],
      },
    },
    {
      name: 'compare_prices',
      description:
        'Compare live crypto prices across OKX, Binance, and 1inch. Returns ranked quotes with fees and total cost. No credentials needed.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          token: {
            type: 'string',
            description: `Token symbol. Supported: ${SUPPORTED_TOKENS.join(', ')}`,
          },
          amount: { type: 'number', description: 'Amount of tokens to trade' },
          side: {
            type: 'string',
            enum: ['buy', 'sell'],
            description: 'Trade direction (default: buy)',
          },
        },
        required: ['token', 'amount'],
      },
    },
    {
      name: 'negotiate_okx',
      description:
        'Negotiate with OKX for a better price via limit-order strategy. If credentials are configured, runs a real negotiation (places limit order, monitors, falls back to market). Otherwise returns a simulated negotiation transcript.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          token: { type: 'string', description: 'Token to negotiate for' },
          amount: { type: 'number', description: 'Amount of tokens' },
          side: {
            type: 'string',
            enum: ['buy', 'sell'],
            description: 'Trade direction (default: buy)',
          },
        },
        required: ['token', 'amount'],
      },
    },
    {
      name: 'execute_trade',
      description:
        'Execute a trade on OKX. Requires credentials via configure tool first. Currently only OKX supports authenticated trading.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          venue: {
            type: 'string',
            enum: ['okx'],
            description: 'Exchange to execute on (currently only okx)',
          },
          token: { type: 'string', description: 'Token to trade' },
          amount: { type: 'number', description: 'Amount of tokens' },
          side: {
            type: 'string',
            enum: ['buy', 'sell'],
            description: 'Trade direction (default: buy)',
          },
        },
        required: ['venue', 'token', 'amount'],
      },
    },
    {
      name: 'get_balance',
      description:
        'Check OKX account balance. Requires credentials via configure tool first.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          currency: {
            type: 'string',
            description: 'Specific currency to check (e.g. USDT, ETH). Omit for all non-zero balances.',
          },
        },
      },
    },
    {
      name: 'get_supported_tokens',
      description: 'List all supported tokens and which exchanges support them.',
      inputSchema: {
        type: 'object' as const,
        properties: {},
      },
    },
  ],
}))

// ── Handlers ─────────────────────────────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  switch (name) {
    case 'configure': {
      const { okx_api_key, okx_secret_key, okx_passphrase } = args as {
        okx_api_key: string
        okx_secret_key: string
        okx_passphrase: string
      }

      const creds: OKXCredentials = {
        apiKey: okx_api_key,
        secretKey: okx_secret_key,
        passphrase: okx_passphrase,
      }

      // Validate by attempting a balance check
      try {
        await okxGetBalance(creds)
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        return errorResult(`Invalid credentials: ${msg}`)
      }

      credentials = creds
      engine = createHaggler({ demoMode: false, okxCredentials: credentials })

      return json({
        configured: true,
        venue: 'okx',
        capabilities: ['quotes', 'trading', 'balance', 'negotiation'],
      })
    }

    case 'compare_prices': {
      const { token, amount, side } = args as {
        token: string
        amount: number
        side?: 'buy' | 'sell'
      }

      const upperToken = token.toUpperCase()
      if (!SUPPORTED_TOKENS.includes(upperToken as any)) {
        return errorResult(`Unsupported token: ${token}. Supported: ${SUPPORTED_TOKENS.join(', ')}`)
      }

      const start = Date.now()
      const { quotes, errors } = await fetchAllLiveQuotes({
        base: upperToken,
        quote: 'USDT',
        amount,
        side: side ?? 'buy',
      })

      // Add Haggler fee + source tag to each quote
      for (const q of quotes) {
        const hagglerFee = parseFloat((q.price * amount * HAGGLER_FEE_RATE).toFixed(2))
        q.fees = {
          exchange: q.fee,
          haggler: hagglerFee,
          total: parseFloat((q.fee + hagglerFee).toFixed(2)),
        }
        q.source = 'live'
        q.token = upperToken
        q.amount = amount
        q.side = side ?? 'buy'
      }

      const sorted = [...quotes].sort((a, b) => a.total - b.total)
      const best = sorted[0]
      const worst = sorted[sorted.length - 1]
      const savings = best && worst ? parseFloat((worst.total - best.total).toFixed(2)) : 0

      return json({
        token: upperToken,
        amount,
        side: side ?? 'buy',
        quotes: sorted.map(q => ({
          venue: q.venue,
          venueName: q.venueName,
          price: q.price,
          fee: q.fee,
          hagglerFee: q.fees?.haggler ?? 0,
          total: q.total,
          latencyMs: q.latencyMs,
          source: q.source,
        })),
        best: best ? { venue: best.venue, total: best.total } : null,
        savings,
        errors: errors.map(e => ({ venue: e.venue, code: e.code, message: e.message })),
        durationMs: Date.now() - start,
      })
    }

    case 'negotiate_okx': {
      const { token, amount, side } = args as {
        token: string
        amount: number
        side?: 'buy' | 'sell'
      }

      const upperToken = token.toUpperCase()
      const messages: string[] = []

      if (credentials) {
        // Real negotiation
        await engine.negotiate(`${side ?? 'buy'} ${amount} ${upperToken}`, (step) => {
          if (step.message) messages.push(step.message)
        })
        return json({ token: upperToken, amount, side: side ?? 'buy', mode: 'live', transcript: messages })
      } else {
        // Simulated
        const transcript = simulateNegotiation(upperToken, amount)
        return json({
          token: upperToken,
          amount,
          side: side ?? 'buy',
          mode: 'simulated',
          finalPrice: transcript.finalPrice,
          originalPrice: transcript.originalPrice,
          saved: transcript.saved,
          transcript: transcript.steps.map(s => `[${s.role}] ${s.message}`),
        })
      }
    }

    case 'execute_trade': {
      const { venue, token, amount, side } = args as {
        venue: string
        token: string
        amount: number
        side?: 'buy' | 'sell'
      }

      if (!credentials) {
        return errorResult('Credentials required. Call the configure tool with your OKX API keys first.')
      }

      if (venue !== 'okx') {
        return errorResult(`Only OKX supports authenticated trading currently. Got: ${venue}`)
      }

      const upperToken = token.toUpperCase()
      const messages: string[] = []

      // Build a quote-like object for the engine
      const quote: VenueQuote = {
        venue: 'okx',
        venueName: 'OKX',
        price: 0,
        fee: 0,
        total: 0,
        latencyMs: 0,
        negotiated: false,
        token: upperToken,
        amount,
        side: side ?? 'buy',
      }

      try {
        await engine.executeTrade(quote, (step) => {
          if (step.message) messages.push(step.message)
          if (typeof step.data === 'string') messages.push(step.data)
        })
        return json({
          token: upperToken,
          amount,
          side: side ?? 'buy',
          venue: 'okx',
          status: 'executed',
          details: messages,
        })
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        return errorResult(`Trade failed: ${msg}`)
      }
    }

    case 'get_balance': {
      if (!credentials) {
        return errorResult('Credentials required. Call the configure tool with your OKX API keys first.')
      }

      const { currency } = args as { currency?: string }

      try {
        const balances = await okxGetBalance(credentials, currency?.toUpperCase())
        // Filter to non-zero balances unless specific currency requested
        const filtered = currency
          ? balances
          : balances.filter(b => parseFloat(b.availBal) > 0 || parseFloat(b.frozenBal) > 0)

        return json({
          venue: 'okx',
          balances: filtered.map(b => ({
            currency: b.ccy,
            available: b.availBal,
            frozen: b.frozenBal,
            total: (parseFloat(b.availBal) + parseFloat(b.frozenBal)).toString(),
          })),
        })
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        return errorResult(`Failed to fetch balance: ${msg}`)
      }
    }

    case 'get_supported_tokens': {
      const tokens = SUPPORTED_TOKENS.map(t => ({
        token: t,
        name: TOKEN_NAMES[t] ?? t,
        exchanges: {
          okx: t in OKX_SYMBOLS,
          binance: t in BINANCE_SYMBOLS,
          '1inch': t in ONEINCH_TOKENS,
        },
      }))
      return json({ tokens, tradingSupported: credentials ? ['okx'] : [] })
    }

    default:
      throw new Error(`Unknown tool: ${name}`)
  }
})

// ── Start ────────────────────────────────────────────────────────────────────

async function main() {
  // Check for env var credentials at startup
  const envKey = process.env.OKX_API_KEY
  const envSecret = process.env.OKX_SECRET_KEY
  const envPass = process.env.OKX_PASSPHRASE
  if (envKey && envSecret && envPass) {
    const creds: OKXCredentials = { apiKey: envKey, secretKey: envSecret, passphrase: envPass }
    try {
      await okxGetBalance(creds)
      credentials = creds
      engine = createHaggler({ demoMode: false, okxCredentials: credentials })
      console.error('Haggler MCP: OKX credentials loaded from environment')
    } catch {
      console.error('Haggler MCP: OKX env credentials invalid, starting without trading')
    }
  }

  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Haggler MCP server v0.2.0 running on stdio')
}

main().catch(console.error)
