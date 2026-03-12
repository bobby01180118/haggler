import { motion } from 'framer-motion'
import type { AgentStep, VenueQuote } from '@arbiter/core'
import { formatCurrency } from '@arbiter/core'
import { Loader2, CheckCircle2 } from 'lucide-react'

const VENUE_COLORS: Record<string, string> = {
  binance: 'text-yellow-400',
  coinbase: 'text-blue-400',
  okx: 'text-white',
  bybit: 'text-amber-400',
  kraken: 'text-violet-400',
  uniswap: 'text-pink-400',
  jupiter: 'text-emerald-400',
  pancakeswap: 'text-orange-400',
  curve: 'text-red-400',
  '1inch': 'text-slate-300',
  robinhood: 'text-green-400',
}

const VENUE_BG: Record<string, string> = {
  binance: 'bg-yellow-400/10',
  coinbase: 'bg-blue-400/10',
  okx: 'bg-white/10',
  bybit: 'bg-amber-400/10',
  kraken: 'bg-violet-400/10',
  uniswap: 'bg-pink-400/10',
  jupiter: 'bg-emerald-400/10',
  pancakeswap: 'bg-orange-400/10',
  curve: 'bg-red-400/10',
  '1inch': 'bg-slate-400/10',
  robinhood: 'bg-green-400/10',
}

interface Props {
  step: AgentStep
}

export default function VenueCheckStep({ step }: Props) {
  const venue = step.venue ?? 'okx'
  const isChecking = step.status === 'checking'
  const quote = step.data as VenueQuote | undefined

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2"
    >
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${VENUE_BG[venue] ?? 'bg-zinc-700/50'}`}>
        {isChecking ? (
          <Loader2 className={`w-3.5 h-3.5 animate-spin ${VENUE_COLORS[venue] ?? 'text-zinc-400'}`} />
        ) : (
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
        )}
      </div>

      <div className="bg-zinc-800/50 border border-zinc-700 px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm max-w-[80%]">
        {isChecking ? (
          <span className="text-zinc-400">{step.message}</span>
        ) : (
          <div className="space-y-1">
            <div className="text-zinc-50">
              <span className={VENUE_COLORS[venue] ?? 'text-zinc-300'}>{quote?.venueName}</span>
              {' — '}
              <span className="font-mono font-semibold">{quote ? formatCurrency(quote.price) : ''}</span>
              {quote?.negotiated && (
                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-medium">
                  NEGOTIATED
                </span>
              )}
            </div>
            {quote && (
              <div className="text-xs text-zinc-500 font-mono">
                Fee: {formatCurrency(quote.fee)} ({(quote.fee / (quote.total - quote.fee) * 100).toFixed(2)}%)
                {' · '}
                Total: {formatCurrency(quote.total)}
                {' · '}
                {quote.latencyMs}ms
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
