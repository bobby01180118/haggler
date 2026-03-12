import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { useTradeStore } from '../../store/useTradeStore'

const SUGGESTIONS = [
  'Buy 1 ETH',
  'Buy 0.5 BTC',
  'Buy 100 SOL',
  'Buy $5000 of ETH',
]

export default function TradeInput() {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const { startTrade, isRunning, reset } = useTradeStore()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async () => {
    const text = input.trim()
    if (!text || isRunning) return
    reset()
    setInput('')
    await startTrade(text)
  }

  const handleSuggestion = async (text: string) => {
    if (isRunning) return
    reset()
    setInput(text)
    await startTrade(text)
  }

  return (
    <div className="border-t border-zinc-800 bg-zinc-950 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Suggestion chips */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              disabled={isRunning}
              className="px-3 py-1 text-xs rounded-full border border-zinc-700 text-zinc-400 hover:text-zinc-50 hover:border-zinc-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Buy 1 ETH at the best price"
            disabled={isRunning}
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-50 placeholder-zinc-500 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isRunning || !input.trim()}
            className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
