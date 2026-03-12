# Haggler — MVP PRD

## One-liner

Your AI agent that negotiates crypto trades across venues.

---

## Two Deliverables

### 1. The Product (Haggler Agent)

A TypeScript agent that negotiates/compares crypto prices across multiple venues and picks the best deal.

#### MVP Scope

**Input**: User says "Buy X amount of [token] at the best price"

**What the agent does**:
- Queries OKX smart trading (negotiation/OTC)
- Queries Binance orderbook (spot price)
- Queries a DEX aggregator (1inch or Uniswap)
- Compares results across all venues
- Presents the best option with a clear breakdown
- Executes on user confirmation

**Output**: A structured result showing:
- Price from each venue
- Fees from each venue
- Net cost comparison
- Recommended venue + why
- Execution status (after confirmation)

#### Workflows (prioritized)

1. **Price comparison** (read-only) — query all venues, return ranked results. Ship this first.
2. **OKX negotiation** — talk to OKX smart trading agent, attempt to haggle a better OTC price.
3. **Execute trade** — after user confirms, execute on the best venue.

#### Tech Stack

- TypeScript / Node.js
- MCP server (so any AI agent can call it)
- Exchange SDKs: OKX API, Binance API, 1inch API
- Auth: API keys via local env vars (`.env`)
- Open source (GitHub public repo)

#### Safety Rules

- All trades require explicit user confirmation before execution
- Display full cost breakdown before asking for confirmation
- Never store or transmit API keys beyond local env
- Demo/paper trading mode for safe testing

---

### 2. The Website (arbiter.xyz or similar)

A clean webapp that lets users try Haggler in the browser.

#### Pages

**Landing page**
- Headline: "Your AI that negotiates crypto trades"
- Subhead: One sentence explaining the OKX smart trading angle
- Live demo embed or "Try it" CTA
- How it works (3 steps, visual)
- Supported venues (OKX, Binance, DEX)
- Open source badge + GitHub link

**App page** (the actual product)
- Simple chat/command interface
- User types: "Buy 1 ETH best price"
- Agent shows real-time progress:
  - "Checking OKX smart trading... $3,421"
  - "Checking Binance orderbook... $3,435"  
  - "Checking 1inch... $3,429"
  - "Best deal: OKX at $3,421. Save $14 vs Binance. Execute?"
- User confirms → trade executes
- Result card: what happened, where, fees, savings

**Settings page**
- Connect exchange API keys (stored locally in browser, never sent to server)
- Select which venues to compare
- Demo mode toggle

#### Tech Stack

- Next.js or plain React
- Tailwind CSS
- No backend needed for MVP — all API calls happen client-side or via local MCP server
- Deploy on Vercel

#### Design Principles

- Dead simple. One input, one result.
- Show the work — every venue queried, every price, transparent
- Mobile-friendly
- Dark mode (crypto audience expects it)

---

## What We're NOT Building (Yet)

- Persistent monitoring / alerts
- Portfolio management
- Multi-step workflows (transfer + trade)
- User accounts / auth system
- Mobile app
- Smart order routing / order splitting

---

## Ship Order

1. **Week 1**: Price comparison across OKX + Binance + 1inch (read-only). Landing page live.
2. **Week 2**: OKX smart trading negotiation integration. App page with live demo.
3. **Week 3**: Trade execution with user confirmation. Settings page.
4. **Week 4**: Polish, dog-food, invite 10 friends, collect feedback.

---

## Success = 

- Working demo you can show in 60 seconds
- 10 real users trading through it
- At least one instance where the agent got a measurably better price than any single venue
- A tweet-worthy moment: "my AI just haggled OKX and saved me $X"

---

## Team

- **Sam**: Product + vibe coding + OKX/exchange domain knowledge
- **Han**: Core engineering + exchange API integrations
