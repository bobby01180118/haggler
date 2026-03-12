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
  { type: 'system', text: 'Scanning 11 venues for 1 ETH...', delay: 800 },
  { type: 'venue', text: 'OKX', venue: 'okx', price: '$3,421.50', delay: 1600 },
  { type: 'venue', text: 'Binance', venue: 'binance', price: '$3,435.20', delay: 2200 },
  { type: 'venue', text: 'Coinbase', venue: 'coinbase', price: '$3,441.80', delay: 2800 },
  { type: 'venue', text: 'Uniswap', venue: 'uniswap', price: '$3,429.00', delay: 3400 },
  { type: 'venue', text: 'Jupiter', venue: 'jupiter', price: '$3,426.10', delay: 4000 },
  { type: 'venue', text: 'Robinhood', venue: 'robinhood', price: '$3,452.30', delay: 4600 },
  { type: 'system', text: '+5 more venues checked', delay: 5200 },
  { type: 'result', text: 'Best: OKX at $3,421.50 — Save $30.80 vs Robinhood', delay: 6000 },
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
          {/* Terminal window with glow */}
          <div className="relative">
            {/* Glow effect behind terminal */}
            <div className="absolute -inset-4 bg-emerald-500/5 rounded-3xl blur-2xl" />

            <div className="relative rounded-2xl border border-zinc-700/50 bg-zinc-900 overflow-hidden shadow-2xl">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/80 border-b border-zinc-700/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-600 hover:bg-red-500/70 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-zinc-600 hover:bg-yellow-500/70 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-zinc-600 hover:bg-green-500/70 transition-colors" />
                </div>
                <span className="text-xs text-zinc-500 ml-2 font-mono">arbiter</span>
              </div>

              {/* Terminal content */}
              <div className="p-5 font-mono text-sm min-h-[320px] space-y-2">
                {/* User input line */}
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 select-none">{'>'}</span>
                  <span className="text-zinc-50">{typingText}</span>
                  {isTyping && (
                    <span className="w-2 h-5 bg-emerald-500 animate-pulse" />
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
                        <span className="text-zinc-500">{line.text}</span>
                      )}
                      {line.type === 'venue' && (
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="text-emerald-500">✓</span>
                            <span className={venueColor[line.venue ?? ''] ?? 'text-zinc-300'}>
                              {line.text}
                            </span>
                          </span>
                          <span className="text-zinc-50 font-semibold tabular-nums">{line.price}</span>
                        </div>
                      )}
                      {line.type === 'result' && (
                        <div className="mt-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <span className="text-emerald-400 font-medium">{line.text}</span>
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
