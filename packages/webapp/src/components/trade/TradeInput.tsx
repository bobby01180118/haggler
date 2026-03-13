import { useState, useRef, useEffect } from 'react'
import { Send, ShieldAlert } from 'lucide-react'
import { useTradeStore } from '../../store/useTradeStore'

const SUGGESTIONS = [
  'Buy 1 ETH',
  'Buy 0.5 BTC',
  'Buy 100 SOL',
  'Buy $5000 of ETH',
]

/** Detect API-key-like strings to prevent accidental paste */
function looksLikeApiKey(text: string): boolean {
  const trimmed = text.trim()
  // "sk-" prefix (OpenAI, Stripe, etc.)
  if (/^sk-[a-zA-Z0-9]{20,}/.test(trimmed)) return true
  // Long hex strings (40+ chars)
  if (/^[0-9a-fA-F]{40,}$/.test(trimmed)) return true
  // AWS-style keys
  if (/^AKIA[0-9A-Z]{16}/.test(trimmed)) return true
  // Generic long alphanumeric secrets (64+ chars, no spaces)
  if (/^[A-Za-z0-9+/=_-]{64,}$/.test(trimmed) && !trimmed.includes(' ')) return true
  return false
}

export default function TradeInput() {
  const [input, setInput] = useState('')
  const [apiKeyWarning, setApiKeyWarning] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { startTrade, isRunning, reset } = useTradeStore()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleChange = (value: string) => {
    setInput(value)
    setApiKeyWarning(looksLikeApiKey(value))
  }

  const handleSubmit = async () => {
    const text = input.trim()
    if (!text || isRunning || apiKeyWarning) return
    reset()
    setInput('')
    setApiKeyWarning(false)
    await startTrade(text)
  }

  const handleSuggestion = async (text: string) => {
    if (isRunning) return
    reset()
    setInput(text)
    await startTrade(text)
  }

  return (
    <div className="border-t border-slate-200 bg-white p-4">
      <div className="max-w-3xl mx-auto">
        {/* API key warning */}
        {apiKeyWarning && (
          <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            <ShieldAlert className="w-4 h-4 flex-shrink-0" />
            <span>This looks like an API key or secret. Do not paste credentials here.</span>
          </div>
        )}

        {/* Suggestion chips */}
        <div className="flex gap-2 mb-3 flex-wrap">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleSuggestion(s)}
              disabled={isRunning}
              className="px-3 py-1 text-xs rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Buy 1 ETH — watch the agent work"
            disabled={isRunning}
            className={`flex-1 bg-slate-50 border rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors disabled:opacity-50 ${
              apiKeyWarning
                ? 'border-red-300 focus:border-red-400 focus:ring-1 focus:ring-red-400/20'
                : 'border-slate-200 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/20'
            }`}
          />
          <button
            type="submit"
            disabled={isRunning || !input.trim() || apiKeyWarning}
            className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
