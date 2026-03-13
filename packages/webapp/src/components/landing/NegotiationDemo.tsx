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
  { role: 'exchange', text: 'Market rate: $1,912.40 + 0.10% fee = $1,914.31', delay: 1200 },
  { role: 'agent', text: 'Scanning Binance and 1inch for leverage...', delay: 2400 },
  { role: 'agent', text: 'I see $1,908.60 on Binance. Can you match?', delay: 4200 },
  { role: 'exchange', text: 'Adjusted: $1,906.80 with fee rebate applied', delay: 5400 },
  { role: 'agent', text: '1inch offers $1,905.20. Final offer?', delay: 6600 },
  { role: 'exchange', text: 'Best price: $1,899.50 all-in. Deal?', delay: 7800 },
  { role: 'agent', text: 'Deal locked. Saved $12.90 vs market (0.67%)', delay: 9000 },
]

const VENUE_SCAN_SCRIPT: VenueScan[] = [
  { venue: 'Binance', tag: 'CEX', price: '$1,908.60', priceNum: 1908.60, delay: 2800, color: '#F0B90B' },
  { venue: 'OKX', tag: 'CEX', price: '$1,912.40', priceNum: 1912.40, delay: 3400, color: '#000000' },
  { venue: '1inch', tag: 'DEX', price: '$1,905.20', priceNum: 1905.20, delay: 4000, color: '#1B314F' },
]

const BEST_PRICE = 1899.50
const MARKET_AVG = 1908.73
const SAVINGS = 12.90
const SAVINGS_PCT = '0.67%'

const LOOP_DELAY = 13000

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
    const resultT = setTimeout(() => setShowResult(true), 9500)
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
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Watch your agent negotiate
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Your agent haggles with OKX while simultaneously scanning every other exchange for leverage
          </p>
        </motion.div>

        {/* Three-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* LEFT: Negotiation Chat */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 min-h-[420px] flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 pulse-glow" />
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
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
                          ? 'bg-indigo-50 text-indigo-800 rounded-br-md'
                          : 'bg-slate-50 text-slate-700 rounded-bl-md'
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
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }} />
                </motion.div>
              )}
            </div>
          </div>

          {/* CENTER: Price Scanner */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 min-h-[420px] flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <div className={`w-2 h-2 rounded-full ${venues < VENUE_SCAN_SCRIPT.length ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'}`} />
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
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
                        ? 'bg-emerald-50 border border-emerald-200'
                        : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold"
                        style={{ background: `${v.color}15`, color: v.color }}
                      >
                        {v.venue[0]}
                      </div>
                      <div>
                        <span className="text-sm text-slate-800 font-medium">{v.venue}</span>
                        <span className="text-[10px] text-slate-400 ml-1.5">{v.tag}</span>
                      </div>
                    </div>
                    <span className={`text-sm font-mono font-semibold tabular-nums ${
                      v.priceNum === lowestScanPrice ? 'text-emerald-600' : 'text-slate-600'
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
                  className="flex items-center gap-2 px-3 py-2 text-slate-400"
                >
                  <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                  <span className="text-xs">Scanning...</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* RIGHT: Result */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 min-h-[420px] flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <div className={`w-2 h-2 rounded-full ${showResult ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
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
                      <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Negotiated Price</div>
                      <div className="text-3xl font-bold text-emerald-600 font-mono">${BEST_PRICE.toLocaleString()}</div>
                      <div className="text-xs text-slate-400 mt-1">via OKX</div>
                    </div>

                    <div className="w-full h-px bg-slate-100" />

                    <div>
                      <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Market Average</div>
                      <div className="text-lg text-slate-400 font-mono line-through">${MARKET_AVG.toLocaleString()}</div>
                    </div>

                    <div className="px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200">
                      <div className="text-lg font-bold text-emerald-700">
                        Saved ${SAVINGS}
                      </div>
                      <div className="text-xs text-emerald-600/70">{SAVINGS_PCT} better than market</div>
                    </div>

                    <div className="text-[11px] text-slate-400 leading-relaxed">
                      Better than all {VENUE_SCAN_SCRIPT.length} scanned exchanges
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
                    <div className="w-10 h-10 border-2 border-slate-200 border-t-indigo-500 rounded-full animate-spin mx-auto" />
                    <div className="text-sm text-slate-400">Analyzing...</div>
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
