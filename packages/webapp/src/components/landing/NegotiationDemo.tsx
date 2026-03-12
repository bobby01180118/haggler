import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Building2 } from 'lucide-react'

interface ChatMsg {
  role: 'agent' | 'okx'
  text: string
  price?: string
  delay: number
}

const CHAT_SCRIPT: ChatMsg[] = [
  {
    role: 'agent',
    text: 'Requesting quote for 1 ETH via OKX API...',
    delay: 0,
  },
  {
    role: 'okx',
    text: 'Market price: $3,441.80. Standard fee: 0.1%',
    price: '$3,445.24',
    delay: 1200,
  },
  {
    role: 'agent',
    text: 'Checking Smart Trade routes. I see a better path via USDT pair with lower slippage.',
    delay: 2400,
  },
  {
    role: 'okx',
    text: 'Smart Trade route found: ETH/USDT with maker rebate. Adjusted price available.',
    price: '$3,432.60',
    delay: 3800,
  },
  {
    role: 'agent',
    text: 'Applying VIP tier fee discount + limit order strategy for price improvement.',
    delay: 5200,
  },
  {
    role: 'okx',
    text: 'Final execution price confirmed with Smart Trade optimization.',
    price: '$3,421.50',
    delay: 6600,
  },
  {
    role: 'agent',
    text: 'Negotiation complete. Saved $23.74 vs market price (0.69%).',
    delay: 8000,
  },
]

const LOOP_DELAY = 16000

export default function NegotiationDemo() {
  const [visibleCount, setVisibleCount] = useState(0)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  const runChat = () => {
    setVisibleCount(0)
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    for (let i = 0; i < CHAT_SCRIPT.length; i++) {
      const t = setTimeout(() => {
        setVisibleCount(i + 1)
      }, CHAT_SCRIPT[i].delay)
      timeoutsRef.current.push(t)
    }

    const loop = setTimeout(runChat, LOOP_DELAY)
    timeoutsRef.current.push(loop)
  }

  useEffect(() => {
    runChat()
    return () => timeoutsRef.current.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleCount])

  const visible = CHAT_SCRIPT.slice(0, visibleCount)

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: explanation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium mb-6">
              <Bot className="w-3.5 h-3.5" />
              Agent Negotiation
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Your agent negotiates
              <br />
              with exchanges directly
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Arbiter connects to exchange APIs like OKX to find Smart Trade routes,
              apply fee optimizations, and secure better pricing — all programmatically,
              in milliseconds.
            </p>
            <div className="space-y-4">
              <Feature
                title="Smart Trade routing"
                desc="Finds optimal trading pairs and routes for lower slippage"
              />
              <Feature
                title="Fee optimization"
                desc="Applies maker rebates, VIP tiers, and limit order strategies"
              />
              <Feature
                title="Multi-venue arbitrage"
                desc="Compares negotiated prices across 11 venues simultaneously"
              />
            </div>
          </motion.div>

          {/* Right: animated chat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Arbiter Agent</div>
                    <div className="text-xs text-slate-400">Negotiating with OKX</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-slate-400">Live</span>
                </div>
              </div>

              {/* Chat area */}
              <div ref={scrollRef} className="p-4 space-y-3 min-h-[380px] max-h-[380px] overflow-y-auto">
                <AnimatePresence>
                  {visible.map((msg, i) => (
                    <motion.div
                      key={`${msg.text}-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${msg.role === 'okx' ? 'justify-end' : ''}`}
                    >
                      {msg.role === 'agent' && (
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Bot className="w-3.5 h-3.5 text-indigo-600" />
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-2.5 max-w-[80%] text-sm leading-relaxed ${
                          msg.role === 'agent'
                            ? 'bg-slate-50 text-slate-700 border border-slate-100'
                            : 'bg-slate-900 text-white'
                        }`}
                      >
                        <div>{msg.text}</div>
                        {msg.price && (
                          <div className={`mt-1.5 text-lg font-bold tabular-nums ${
                            msg.role === 'okx' ? 'text-emerald-400' : 'text-indigo-600'
                          }`}>
                            {msg.price}
                          </div>
                        )}
                      </div>
                      {msg.role === 'okx' && (
                        <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Building2 className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {visibleCount > 0 && visibleCount < CHAT_SCRIPT.length && (
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="text-sm text-slate-500">{desc}</div>
      </div>
    </div>
  )
}
