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
  { type: 'system', text: 'Finding best price for 1 ETH...', delay: 800 },
  { type: 'venue', text: 'OKX Smart Trading', venue: 'okx', price: '$3,421.50', delay: 1800 },
  { type: 'venue', text: 'Binance', venue: 'binance', price: '$3,435.20', delay: 3000 },
  { type: 'venue', text: '1inch (DEX)', venue: '1inch', price: '$3,429.00', delay: 4200 },
  { type: 'result', text: 'Best: OKX at $3,421.50 — Save $13.70 vs Binance', delay: 5500 },
]

const LOOP_DELAY = 12000

const venueColor: Record<string, string> = {
  okx: 'text-white',
  binance: 'text-yellow-400',
  '1inch': 'text-blue-400',
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

    // Clear old timeouts
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    // Typewriter effect for user input
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

    // Show subsequent lines
    for (let i = 1; i < DEMO_SCRIPT.length; i++) {
      const t = setTimeout(() => {
        setVisibleLines(i + 1)
      }, DEMO_SCRIPT[i].delay)
      timeoutsRef.current.push(t)
    }

    // Loop
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
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Terminal window */}
        <div className="rounded-2xl border border-zinc-700 bg-zinc-900 overflow-hidden shadow-2xl shadow-emerald-500/5">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800 border-b border-zinc-700">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs text-zinc-500 ml-2 font-mono">arbiter — demo</span>
          </div>

          {/* Terminal content */}
          <div className="p-4 font-mono text-sm min-h-[280px] space-y-2">
            {/* User input line */}
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">{'>'}</span>
              <span className="text-zinc-50">{typingText}</span>
              {isTyping && (
                <span className="w-2 h-4 bg-emerald-500 animate-pulse" />
              )}
            </div>

            {/* Animated lines */}
            <AnimatePresence>
              {DEMO_SCRIPT.slice(1, visibleLines).map((line, i) => (
                <motion.div
                  key={`${line.text}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pl-4"
                >
                  {line.type === 'system' && (
                    <span className="text-zinc-400">{line.text}</span>
                  )}
                  {line.type === 'venue' && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="text-emerald-500">✓</span>
                        <span className={venueColor[line.venue ?? ''] ?? 'text-zinc-300'}>
                          {line.text}
                        </span>
                      </span>
                      <span className="text-zinc-50 font-semibold">{line.price}</span>
                    </div>
                  )}
                  {line.type === 'result' && (
                    <div className="mt-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-emerald-400 font-medium">{line.text}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
