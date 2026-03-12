import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// === SCRIPTS ===

interface ChatMsg {
  role: 'agent' | 'exchange'
  text: string
  delay: number
}

interface VenueScan {
  venue: string
  tag: 'CEX' | 'DEX' | 'Broker'
  price: string
  priceNum: number
  delay: number
  color: string
}

const NEGOTIATION_SCRIPT: ChatMsg[] = [
  { role: 'agent', text: 'Requesting 1 ETH quote...', delay: 0 },
  { role: 'exchange', text: 'Market rate: $3,441.80 + 0.10% fee = $3,445.24', delay: 1200 },
  { role: 'agent', text: 'Scanning 10 other venues for leverage...', delay: 2400 },
  { role: 'agent', text: 'I see $3,429.00 on Uniswap. Can you match?', delay: 5000 },
  { role: 'exchange', text: 'Adjusted: $3,432.60 with fee rebate applied', delay: 6200 },
  { role: 'agent', text: 'Jupiter offers $3,426.10. Final offer?', delay: 7500 },
  { role: 'exchange', text: 'Best price: $3,421.50 all-in. Deal?', delay: 8800 },
  { role: 'agent', text: 'Deal locked. Saved $23.74 vs market (0.69%)', delay: 10000 },
]

const VENUE_SCAN_SCRIPT: VenueScan[] = [
  { venue: 'Binance', tag: 'CEX', price: '$3,435.20', priceNum: 3435.20, delay: 2800, color: '#F0B90B' },
  { venue: 'Coinbase', tag: 'CEX', price: '$3,441.80', priceNum: 3441.80, delay: 3200, color: '#0052FF' },
  { venue: 'Bybit', tag: 'CEX', price: '$3,438.50', priceNum: 3438.50, delay: 3600, color: '#F7A600' },
  { venue: 'Kraken', tag: 'CEX', price: '$3,440.10', priceNum: 3440.10, delay: 3900, color: '#7B61FF' },
  { venue: 'Uniswap', tag: 'DEX', price: '$3,429.00', priceNum: 3429.00, delay: 4200, color: '#FF007A' },
  { venue: 'Jupiter', tag: 'DEX', price: '$3,426.10', priceNum: 3426.10, delay: 4600, color: '#00D18C' },
  { venue: 'PancakeSwap', tag: 'DEX', price: '$3,433.40', priceNum: 3433.40, delay: 5000, color: '#D1884F' },
  { venue: 'Curve', tag: 'DEX', price: '$3,431.90', priceNum: 3431.90, delay: 5400, color: '#FF0000' },
  { venue: '1inch', tag: 'DEX', price: '$3,430.50', priceNum: 3430.50, delay: 5800, color: '#94A3B8' },
  { venue: 'Robinhood', tag: 'Broker', price: '$3,444.00', priceNum: 3444.00, delay: 6200, color: '#00C805' },
]

const BEST_PRICE = 3421.50
const MARKET_AVG = 3435.05
const SAVINGS = 23.74
const SAVINGS_PCT = '0.69%'

const LOOP_DELAY = 16000

export default function NegotiationDemo() {
  const [chatMsgs, setChatMsgs] = useState<number>(0)
  const [venues, setVenues] = useState<number>(0)
  const [showResult, setShowResult] = useState(false)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const chatScrollRef = useRef<HTMLDivElement>(null)

  const runDemo = () => {
    setChatMsgs(0)
    setVenues(0)
    setShowResult(false)

    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    // Schedule chat messages
    NEGOTIATION_SCRIPT.forEach((_, i) => {
      const t = setTimeout(() => setChatMsgs(i + 1), NEGOTIATION_SCRIPT[i].delay)
      timeoutsRef.current.push(t)
    })

    // Schedule venue scans
    VENUE_SCAN_SCRIPT.forEach((_, i) => {
      const t = setTimeout(() => setVenues(i + 1), VENUE_SCAN_SCRIPT[i].delay)
      timeoutsRef.current.push(t)
    })

    // Show result
    const resultT = setTimeout(() => setShowResult(true), 10500)
    timeoutsRef.current.push(resultT)

    // Loop
    const loopT = setTimeout(runDemo, LOOP_DELAY)
    timeoutsRef.current.push(loopT)
  }

  useEffect(() => {
    runDemo()
    return () => { timeoutsRef.current.forEach(clearTimeout) }
  }, [])

  // Auto-scroll chat
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight
    }
  }, [chatMsgs])

  const lowestScanPrice = VENUE_SCAN_SCRIPT.slice(0, venues).reduce(
    (min, v) => v.priceNum < min ? v.priceNum : min,
    Infinity
  )

  return (
    <section id="demo" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Watch your agent negotiate
          </h2>
          <p className="text-[#A3B8CC] text-lg max-w-2xl mx-auto">
            Your agent haggles with OKX while simultaneously scanning every other venue for leverage
          </p>
        </motion.div>

        {/* Three-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* LEFT: Negotiation Chat */}
          <div className="lg:col-span-5 surface-card p-4 min-h-[420px] flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/8">
              <div className="w-2 h-2 rounded-full bg-[#00D4AA] pulse-glow" />
              <span className="text-xs font-medium text-[#A3B8CC] uppercase tracking-wider">
                Agent ↔ OKX Negotiation
              </span>
            </div>

            <div ref={chatScrollRef} className="flex-1 space-y-3 overflow-y-auto">
              <AnimatePresence>
                {NEGOTIATION_SCRIPT.slice(0, chatMsgs).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === 'agent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'agent'
                          ? 'bg-[#635BFF]/20 text-[#B4AFFF] rounded-br-md'
                          : 'bg-white/8 text-[#A3B8CC] rounded-bl-md'
                      }`}
                    >
                      <span className="text-[10px] font-medium uppercase tracking-wider opacity-60 block mb-1">
                        {msg.role === 'agent' ? 'Your Agent' : 'OKX'}
                      </span>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {chatMsgs > 0 && chatMsgs < NEGOTIATION_SCRIPT.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1 px-3 py-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-bounce" style={{ animationDelay: '300ms' }} />
                </motion.div>
              )}
            </div>
          </div>

          {/* CENTER: Price Scanner */}
          <div className="lg:col-span-4 surface-card p-4 min-h-[420px] flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/8">
              <div className={`w-2 h-2 rounded-full ${venues < VENUE_SCAN_SCRIPT.length ? 'bg-[#0073E6] animate-pulse' : 'bg-[#00D4AA]'}`} />
              <span className="text-xs font-medium text-[#A3B8CC] uppercase tracking-wider">
                Live Price Scan {venues > 0 && `(${venues}/${VENUE_SCAN_SCRIPT.length})`}
              </span>
            </div>

            <div className="flex-1 space-y-1.5 overflow-y-auto">
              <AnimatePresence>
                {VENUE_SCAN_SCRIPT.slice(0, venues).map((v) => (
                  <motion.div
                    key={v.venue}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      v.priceNum === lowestScanPrice
                        ? 'bg-[#00D4AA]/10 border border-[#00D4AA]/20'
                        : 'bg-white/3 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold"
                        style={{ background: `${v.color}20`, color: v.color }}
                      >
                        {v.venue[0]}
                      </div>
                      <div>
                        <span className="text-sm text-white font-medium">{v.venue}</span>
                        <span className="text-[10px] text-[#6B8299] ml-1.5">{v.tag}</span>
                      </div>
                    </div>
                    <span className={`text-sm font-mono font-semibold tabular-nums ${
                      v.priceNum === lowestScanPrice ? 'text-[#00D4AA]' : 'text-[#A3B8CC]'
                    }`}>
                      {v.price}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Scanning indicator */}
              {venues < VENUE_SCAN_SCRIPT.length && venues > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 px-3 py-2 text-[#6B8299]"
                >
                  <div className="w-4 h-4 border-2 border-[#0073E6]/30 border-t-[#0073E6] rounded-full animate-spin" />
                  <span className="text-xs">Scanning...</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* RIGHT: Result */}
          <div className="lg:col-span-3 surface-card p-4 min-h-[420px] flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/8">
              <div className={`w-2 h-2 rounded-full ${showResult ? 'bg-[#00D4AA]' : 'bg-white/20'}`} />
              <span className="text-xs font-medium text-[#A3B8CC] uppercase tracking-wider">
                Best Deal
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {showResult ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="text-center space-y-5"
                  >
                    <div>
                      <div className="text-xs text-[#6B8299] uppercase tracking-wider mb-1">Negotiated Price</div>
                      <div className="text-3xl font-bold text-[#00D4AA] font-mono">${BEST_PRICE.toLocaleString()}</div>
                      <div className="text-xs text-[#6B8299] mt-1">via OKX</div>
                    </div>

                    <div className="w-full h-px bg-white/8" />

                    <div>
                      <div className="text-xs text-[#6B8299] uppercase tracking-wider mb-1">Market Average</div>
                      <div className="text-lg text-[#A3B8CC] font-mono line-through">${MARKET_AVG.toLocaleString()}</div>
                    </div>

                    <div className="px-4 py-3 rounded-xl bg-[#00D4AA]/10 border border-[#00D4AA]/20">
                      <div className="text-lg font-bold text-[#00D4AA]">
                        Saved ${SAVINGS}
                      </div>
                      <div className="text-xs text-[#00D4AA]/70">{SAVINGS_PCT} better than market</div>
                    </div>

                    <div className="text-[11px] text-[#6B8299] leading-relaxed">
                      Better than all {VENUE_SCAN_SCRIPT.length} scanned venues
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center space-y-3"
                  >
                    <div className="w-10 h-10 border-2 border-white/10 border-t-[#635BFF] rounded-full animate-spin mx-auto" />
                    <div className="text-sm text-[#6B8299]">Analyzing...</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
