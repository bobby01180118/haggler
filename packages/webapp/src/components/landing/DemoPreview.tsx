import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface DemoLine {
  type: 'user' | 'system' | 'venue' | 'result'
  text: string
  delay: number
  venue?: string
  price?: string
}

const DEMO_SCRIPT: DemoLine[] = [
  { type: 'user', text: 'Buy 1 ETH best price', delay: 0 },
  { type: 'system', text: 'Negotiating across 11 venues...', delay: 800 },
  { type: 'venue', text: 'OKX — negotiated via API', venue: 'okx', price: '$3,421.50', delay: 1600 },
  { type: 'venue', text: 'Binance — maker rebate applied', venue: 'binance', price: '$3,435.20', delay: 2200 },
  { type: 'venue', text: 'Coinbase', venue: 'coinbase', price: '$3,441.80', delay: 2800 },
  { type: 'venue', text: 'Uniswap — optimal route found', venue: 'uniswap', price: '$3,429.00', delay: 3400 },
  { type: 'venue', text: 'Jupiter', venue: 'jupiter', price: '$3,426.10', delay: 4000 },
  { type: 'system', text: '+6 more venues negotiated', delay: 4600 },
  { type: 'result', text: 'Negotiated: OKX at $3,421.50 — Saved $30.80 (0.9%)', delay: 5400 },
]

const LOOP_DELAY = 14000

const venueColor: Record<string, string> = {
  okx: 'text-white',
  binance: 'text-yellow-400',
  coinbase: 'text-blue-400',
  uniswap: 'text-pink-400',
  jupiter: 'text-emerald-400',
  robinhood: 'text-green-400',
}

export default function DemoPreview() {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [typingText, setTypingText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const runDemo = () => {
    setVisibleLines(0)
    setTypingText('')
    setIsTyping(true)

    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    const userText = DEMO_SCRIPT[0].text
    for (let i = 0; i <= userText.length; i++) {
      const t = setTimeout(() => {
        setTypingText(userText.slice(0, i))
        if (i === userText.length) {
          setIsTyping(false)
          setVisibleLines(1)
        }
      }, 50 * i)
      timeoutsRef.current.push(t)
    }

    for (let i = 1; i < DEMO_SCRIPT.length; i++) {
      const t = setTimeout(() => {
        setVisibleLines(i + 1)
      }, DEMO_SCRIPT[i].delay)
      timeoutsRef.current.push(t)
    }

    const loopTimeout = setTimeout(runDemo, LOOP_DELAY)
    timeoutsRef.current.push(loopTimeout)
  }

  useEffect(() => {
    runDemo()
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <section className="py-16 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Shadow glow */}
            <div className="absolute -inset-4 bg-[#635BFF]/10 rounded-3xl blur-2xl" />

            <div className="relative rounded-2xl border border-white/10 bg-[#0D2D4D] overflow-hidden shadow-2xl shadow-black/30">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#081C30] border-b border-white/8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/10 hover:bg-red-400 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-white/10 hover:bg-yellow-400 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-white/10 hover:bg-green-400 transition-colors" />
                </div>
                <span className="text-xs text-[#6B8299] ml-2 font-mono">haggler</span>
              </div>

              {/* Terminal content */}
              <div className="p-5 font-mono text-sm min-h-[320px] space-y-2">
                {/* User input line */}
                <div className="flex items-center gap-2">
                  <span className="text-[#635BFF] select-none">{'>'}</span>
                  <span className="text-white">{typingText}</span>
                  {isTyping && (
                    <span className="w-2 h-5 bg-[#635BFF] animate-pulse" />
                  )}
                </div>

                {/* Animated lines */}
                <AnimatePresence>
                  {DEMO_SCRIPT.slice(1, visibleLines).map((line, i) => (
                    <motion.div
                      key={`${line.text}-${i}`}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25 }}
                      className="pl-4"
                    >
                      {line.type === 'system' && (
                        <span className="text-[#6B8299]">{line.text}</span>
                      )}
                      {line.type === 'venue' && (
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="text-[#00D4AA]">✓</span>
                            <span className={venueColor[line.venue ?? ''] ?? 'text-[#A3B8CC]'}>
                              {line.text}
                            </span>
                          </span>
                          <span className="text-white font-semibold tabular-nums">{line.price}</span>
                        </div>
                      )}
                      {line.type === 'result' && (
                        <div className="mt-3 px-4 py-3 rounded-xl bg-[#635BFF]/10 border border-[#635BFF]/20">
                          <span className="text-[#635BFF] font-medium">{line.text}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
