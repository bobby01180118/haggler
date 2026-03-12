# Arbiter — Project Context for Claude Code

## What We're Building

An AI agent that negotiates crypto trades on behalf of the user across multiple venues.

## Why This Exists

- Crypto exchanges have always been take-it-or-leave-it — you see a price, you hit buy
- OKX just launched "smart trading": an AI on their OTC desk that any user can haggle with
- This creates a new role: an AI on the USER's side that negotiates back
- Our agent negotiates with OKX's agent, checks Binance's orderbook, queries DEX prices, and picks the best deal

## How It Works (Target Flow)

1. User says: "Buy 10K USDT worth of ETH, get me the best price"
2. Agent simultaneously:
   - Negotiates with OKX's smart trading agent (haggling on OTC)
   - Checks Binance orderbook price
   - Checks DEX prices (e.g. 1inch, Uniswap)
3. Compares all options
4. Executes on the best venue (with user confirmation)

## Near-Term Reality

- Some exchanges will deploy negotiation agents (OKX first), some won't
- Agent negotiates with the ones that do, checks prices on the ones that don't
- Picks best outcome across all of them

## Long-Term Vision

- Exchanges are making more things negotiable beyond price: settlement speed, collateral type, partial fills, fee structures
- When you negotiate 5 dimensions across 4 venues, no orderbook can express that
- This becomes a new kind of exchange

## Technical Decisions

- **Language**: TypeScript (npm package)
- **Format**: MCP server + OpenClaw Skill (dual distribution)
- **Auth**: API keys stored locally via env vars, never transmitted
- **Safety**: Write ops require user confirmation, network validation, balance checks
- **Open source** from day one

## Exchanges to Support (MVP)

- **OKX**: smart trading (negotiation agent) + orderbook + OTC
- **Binance**: orderbook + API
- **DEX**: 1inch or Uniswap aggregator for on-chain pricing

## MVP Workflows

1. **Cross-venue price discovery** — query prices across all venues in one call
2. **OTC negotiation** — negotiate with OKX's smart trading agent
3. **Best execution** — compare all venues, recommend best option
4. **Execute trade** — execute on best venue with user confirmation

## Key Constraints

- OKX smart trading is brand new — API access/documentation may be limited
- 2FA/withdrawal blockers for cross-venue settlement
- Different auth flows per exchange
- CeFi vs DEX are completely different execution paradigms

## Revenue Model

- Percentage of savings on each trade
- Free for price comparison (read-only)
- Only make money when we get user a better price

## Team

- **Sam**: YC S16 alum, ex-Circle Director of Growth, ex-OKX Sr Director of Product (built OKX Pay, OKX Card, Unified USD Orderbook)
- **Han**: Senior engineer at Circle (USDC infrastructure, CCTP)
- Met as co-workers at Circle

## Related Product (Phase 2)

**Agent Treasurer**: same cross-venue infra but for yield optimization. AI agent finds best stablecoin yield across CeFi + DeFi, moves money there. Build after Agent Broker launches.

## Priority

Ship fast. First-mover advantage is the thesis. Most of crypto hasn't noticed OKX's smart trading feature yet. Our demo should be the reveal.
