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
        <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mb-4">
          <Bot className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-xl font-semibold text-zinc-50 mb-2">
          Ready to find you the best price
        </h2>
        <p className="text-sm text-zinc-500 max-w-md">
          Tell me what you want to trade. I'll check OKX Smart Trading, Binance, and 1inch
          simultaneously — then pick the best deal.
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
