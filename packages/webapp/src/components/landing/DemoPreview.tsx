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
  { type: 'system', text: 'Negotiating across 3 live venues...', delay: 800 },
  { type: 'venue', text: 'OKX — negotiated via API', venue: 'okx', price: '$3,421.50', delay: 1600 },
  { type: 'venue', text: 'Binance — maker rebate applied', venue: 'binance', price: '$3,435.20', delay: 2200 },
  { type: 'venue', text: '1inch — optimal route found', venue: '1inch', price: '$3,430.50', delay: 2800 },
  { type: 'result', text: 'Negotiated: OKX at $3,421.50 — Saved $23.74 (0.69%)', delay: 3800 },
]

const LOOP_DELAY = 10000

const venueColor: Record<string, string> = {
  okx: 'text-slate-900',
  binance: 'text-yellow-600',
  '1inch': 'text-slate-700',
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
            <div className="absolute -inset-4 bg-indigo-500/5 rounded-3xl blur-2xl" />

            <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-200 hover:bg-red-400 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-slate-200 hover:bg-yellow-400 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-slate-200 hover:bg-green-400 transition-colors" />
                </div>
                <span className="text-xs text-slate-400 ml-2 font-mono">haggler</span>
              </div>

              {/* Terminal content */}
              <div className="p-5 font-mono text-sm min-h-[320px] space-y-2">
                {/* User input line */}
                <div className="flex items-center gap-2">
                  <span className="text-indigo-500 select-none">{'>'}</span>
                  <span className="text-slate-800">{typingText}</span>
                  {isTyping && (
                    <span className="w-2 h-5 bg-indigo-500 animate-pulse" />
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
                        <span className="text-slate-400">{line.text}</span>
                      )}
                      {line.type === 'venue' && (
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="text-emerald-500">✓</span>
                            <span className={venueColor[line.venue ?? ''] ?? 'text-slate-600'}>
                              {line.text}
                            </span>
                          </span>
                          <span className="text-slate-800 font-semibold tabular-nums">{line.price}</span>
                        </div>
                      )}
                      {line.type === 'result' && (
                        <div className="mt-3 px-4 py-3 rounded-xl bg-indigo-50 border border-indigo-100">
                          <span className="text-indigo-700 font-medium">{line.text}</span>
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
