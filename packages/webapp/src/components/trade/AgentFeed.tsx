import { useRef, useEffect } from 'react'
import { useTradeStore } from '../../store/useTradeStore'
import AgentMessage from './AgentMessage'
import { Bot } from 'lucide-react'

const QUICK_SUGGESTIONS = ['Buy 1 ETH', 'Buy 0.5 BTC', 'Buy 100 SOL']

export default function AgentFeed() {
  const steps = useTradeStore((s) => s.steps)
  const { startTrade, isRunning, reset } = useTradeStore()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [steps.length])

  const handleSuggestion = async (text: string) => {
    if (isRunning) return
    reset()
    await startTrade(text)
  }

  if (steps.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
          <Bot className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Try the agent
        </h2>
        <p className="text-sm text-slate-500 max-w-md mb-6">
          Type a trade and watch the MCP tools work in real-time
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {QUICK_SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              className="px-4 py-2 text-sm rounded-full border border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
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
