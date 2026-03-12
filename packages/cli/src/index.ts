#!/usr/bin/env node
import * as readline from 'node:readline'
import { createHaggler, parseTradeInput, SUPPORTED_TOKENS, formatCurrency, type AgentStep } from '@haggler/core'

const engine = createHaggler()

const RESET = '\x1b[0m'
const BOLD = '\x1b[1m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const BLUE = '\x1b[34m'
const GRAY = '\x1b[90m'
const CYAN = '\x1b[36m'
const RED = '\x1b[31m'

const VENUE_COLORS: Record<string, string> = {
  okx: BOLD,
  binance: YELLOW,
  '1inch': BLUE,
}

function printStep(step: AgentStep) {
  switch (step.type) {
    case 'user':
      console.log(`\n${GREEN}>${RESET} ${step.message}`)
      break
    case 'system':
      if (step.status === 'error') {
        console.log(`  ${RED}${step.message}${RESET}`)
      } else {
        console.log(`  ${GRAY}${step.message}${RESET}`)
      }
      break
    case 'venue-check': {
      const color = VENUE_COLORS[step.venue ?? ''] ?? ''
      if (step.status === 'checking') {
        process.stdout.write(`  ${GRAY}Checking ${color}${step.venue}${RESET}${GRAY}...${RESET}`)
      } else {
        const quote = step.data as any
        if (quote) {
          process.stdout.write(`\r  ${GREEN}\u2713${RESET} ${color}${quote.venueName}${RESET}: ${BOLD}${formatCurrency(quote.price)}${RESET} ${GRAY}| Fee: ${formatCurrency(quote.fee)} | Total: ${formatCurrency(quote.total)}${RESET}\n`)
        }
      }
      break
    }
    case 'comparison': {
      const comp = step.data as any
      if (comp) {
        console.log(`\n  ${CYAN}${BOLD}Best deal: ${comp.best.venueName}${RESET}`)
        console.log(`  ${GREEN}Save ${formatCurrency(comp.savings)} vs ${comp.quotes[comp.quotes.length - 1]?.venueName}${RESET}`)
      }
      break
    }
    case 'confirm':
      console.log(`\n  ${YELLOW}Execute this trade? (y/n)${RESET}`)
      break
    case 'result':
      console.log(`\n  ${GREEN}${BOLD}\u2713 ${step.message}${RESET}`)
      if (typeof step.data === 'string') {
        console.log(`  ${GRAY}${step.data}${RESET}`)
      }
      break
    case 'negotiation': {
      const prefix = step.message?.startsWith('OKX') ? YELLOW : CYAN
      console.log(`  ${prefix}${step.message}${RESET}`)
      break
    }
  }
}

async function main() {
  console.log(`\n${GREEN}${BOLD}  Haggler${RESET} — Your AI that negotiates crypto trades`)
  console.log(`${GRAY}  Supported tokens: ${SUPPORTED_TOKENS.join(', ')}`)
  console.log(`  Type "buy 1 ETH" or "quit" to exit${RESET}\n`)

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${GREEN}haggler>${RESET} `,
  })

  rl.prompt()

  rl.on('line', async (line) => {
    const input = line.trim()
    if (!input) {
      rl.prompt()
      return
    }

    if (input === 'quit' || input === 'exit') {
      console.log(`\n${GRAY}Goodbye.${RESET}\n`)
      process.exit(0)
    }

    const result = await engine.comparePrices(input, printStep)

    if (result) {
      // Auto-execute in demo mode
      const rlConfirm = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      rlConfirm.question('', async (answer) => {
        rlConfirm.close()
        if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
          await engine.executeTrade(result.best, printStep)
        } else {
          console.log(`  ${GRAY}Trade cancelled.${RESET}`)
        }
        console.log()
        rl.prompt()
      })
    } else {
      console.log()
      rl.prompt()
    }
  })

  rl.on('close', () => {
    process.exit(0)
  })
}

main().catch(console.error)
