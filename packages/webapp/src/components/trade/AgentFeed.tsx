import { useRef, useEffect } from 'react'
import { useTradeStore } from '../../store/useTradeStore'
import AgentMessage from './AgentMessage'
import { Bot } from 'lucide-react'

export default function AgentFeed() {
  const steps = useTradeStore((s) => s.steps)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [steps.length])

  if (steps.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
          <Bot className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Ready to negotiate for you
        </h2>
        <p className="text-sm text-slate-500 max-w-md">
          I'll check OKX, Binance, and 1inch to find you the best price
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      <div className="max-w-3xl mx-auto space-y-3">
        {steps.map((step) => (
          <AgentMessage key={step.id} step={step} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
