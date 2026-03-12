#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'
import { createHaggler, generateAllQuotes, parseTradeInput, SUPPORTED_TOKENS, BASE_PRICES, formatCurrency } from '@haggler/core'

const server = new Server(
  { name: 'haggler', version: '0.1.0' },
  { capabilities: { tools: {} } }
)

const engine = createHaggler()

// List tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'compare_prices',
      description:
        'Compare crypto prices across OKX Smart Trading, Binance, and 1inch DEX. Returns ranked quotes with fees and total cost.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          token: {
            type: 'string',
            description: `Token to trade. Supported: ${SUPPORTED_TOKENS.join(', ')}`,
          },
          amount: {
            type: 'number',
            description: 'Amount of tokens to buy/sell',
          },
        },
        required: ['token', 'amount'],
      },
    },
    {
      name: 'negotiate_okx',
      description:
        'Negotiate with OKX Smart Trading agent to get a better OTC price. Returns the negotiation transcript and final price.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          token: { type: 'string', description: 'Token to negotiate for' },
          amount: { type: 'number', description: 'Amount of tokens' },
        },
        required: ['token', 'amount'],
      },
    },
    {
      name: 'execute_trade',
      description:
        'Execute a trade on the specified venue. Returns transaction details. Currently runs in demo mode with simulated execution.',
      inputSchema: {
        type: 'object' as const,
        properties: {
          venue: {
            type: 'string',
            enum: ['okx', 'binance', '1inch'],
            description: 'Venue to execute on',
          },
          token: { type: 'string', description: 'Token to trade' },
          amount: { type: 'number', description: 'Amount of tokens' },
        },
        required: ['venue', 'token', 'amount'],
      },
    },
    {
      name: 'get_supported_tokens',
      description: 'List all supported tokens and their current base prices.',
      inputSchema: {
        type: 'object' as const,
        properties: {},
      },
    },
  ],
}))

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  switch (name) {
    case 'compare_prices': {
      const { token, amount } = args as { token: string; amount: number }
      const quotes = generateAllQuotes(token.toUpperCase(), amount)
      const sorted = [...quotes].sort((a, b) => a.total - b.total)
      const best = sorted[0]
      const worst = sorted[sorted.length - 1]
      const savings = worst.total - best.total

      const lines = [
        `Price comparison for ${amount} ${token.toUpperCase()}:`,
        '',
        ...sorted.map((q, i) => {
          const marker = i === 0 ? ' ← BEST' : ` (+${formatCurrency(q.total - best.total)})`
          return `${q.venueName}: ${formatCurrency(q.price)} per ${token.toUpperCase()} | Fee: ${formatCurrency(q.fee)} | Total: ${formatCurrency(q.total)}${marker}`
        }),
        '',
        `Best deal: ${best.venueName} at ${formatCurrency(best.total)} total`,
        `Savings vs worst: ${formatCurrency(savings)}`,
      ]

      return { content: [{ type: 'text', text: lines.join('\n') }] }
    }

    case 'negotiate_okx': {
      const { token, amount } = args as { token: string; amount: number }
      const messages: string[] = []

      await engine.negotiate(`buy ${amount} ${token}`, (step) => {
        if (step.message) messages.push(step.message)
      })

      return { content: [{ type: 'text', text: messages.join('\n') }] }
    }

    case 'execute_trade': {
      const { venue, token, amount } = args as { venue: string; token: string; amount: number }
      const quote = generateAllQuotes(token.toUpperCase(), amount, [venue as 'okx' | 'binance' | '1inch'])[0]
      const messages: string[] = []

      await engine.executeTrade(quote, (step) => {
        if (step.message) messages.push(step.message)
        if (typeof step.data === 'string') messages.push(step.data)
      })

      return { content: [{ type: 'text', text: messages.join('\n') }] }
    }

    case 'get_supported_tokens': {
      const lines = SUPPORTED_TOKENS.map(
        (t) => `${t}: ${formatCurrency(BASE_PRICES[t])}`
      )
      return { content: [{ type: 'text', text: `Supported tokens:\n${lines.join('\n')}` }] }
    }

    default:
      throw new Error(`Unknown tool: ${name}`)
  }
})

// Start server
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Haggler MCP server running on stdio')
}

main().catch(console.error)
