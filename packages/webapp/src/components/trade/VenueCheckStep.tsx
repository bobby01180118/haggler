import { motion } from 'framer-motion'
import type { AgentStep, VenueQuote } from '@arbiter/core'
import { formatCurrency } from '@arbiter/core'
import { Loader2, CheckCircle2 } from 'lucide-react'

const VENUE_COLORS: Record<string, string> = {
  binance: 'text-yellow-600',
  coinbase: 'text-blue-600',
  okx: 'text-slate-900',
  bybit: 'text-amber-600',
  kraken: 'text-violet-600',
  uniswap: 'text-pink-600',
  jupiter: 'text-emerald-600',
  pancakeswap: 'text-orange-600',
  curve: 'text-red-600',
  '1inch': 'text-slate-700',
  robinhood: 'text-green-600',
}

const VENUE_BG: Record<string, string> = {
  binance: 'bg-yellow-50',
  coinbase: 'bg-blue-50',
  okx: 'bg-slate-100',
  bybit: 'bg-amber-50',
  kraken: 'bg-violet-50',
  uniswap: 'bg-pink-50',
  jupiter: 'bg-emerald-50',
  pancakeswap: 'bg-orange-50',
  curve: 'bg-red-50',
  '1inch': 'bg-slate-50',
  robinhood: 'bg-green-50',
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
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${VENUE_BG[venue] ?? 'bg-slate-100'}`}>
        {isChecking ? (
          <Loader2 className={`w-3.5 h-3.5 animate-spin ${VENUE_COLORS[venue] ?? 'text-slate-400'}`} />
        ) : (
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        )}
      </div>

      <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm max-w-[80%]">
        {isChecking ? (
          <span className="text-slate-500">{step.message}</span>
        ) : (
          <div className="space-y-1">
            <div className="text-slate-900">
              <span className={VENUE_COLORS[venue] ?? 'text-slate-700'}>{quote?.venueName}</span>
              {' — '}
              <span className="font-mono font-semibold">{quote ? formatCurrency(quote.price) : ''}</span>
              {quote?.negotiated && (
                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-medium">
                  NEGOTIATED
                </span>
              )}
            </div>
            {quote && (
              <div className="text-xs text-slate-400 font-mono">
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
