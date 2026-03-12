import { motion } from 'framer-motion'
import type { AgentStep, VenueQuote } from '@haggler/core'
import { formatCurrency } from '@haggler/core'
import { Loader2, CheckCircle2 } from 'lucide-react'

const VENUE_COLORS: Record<string, string> = {
  binance: 'text-yellow-400',
  coinbase: 'text-blue-400',
  okx: 'text-white',
  bybit: 'text-amber-400',
  kraken: 'text-violet-400',
  uniswap: 'text-pink-400',
  jupiter: 'text-[#00D4AA]',
  pancakeswap: 'text-orange-400',
  curve: 'text-red-400',
  '1inch': 'text-[#A3B8CC]',
  robinhood: 'text-green-400',
}

const VENUE_BG: Record<string, string> = {
  binance: 'bg-yellow-500/10',
  coinbase: 'bg-blue-500/10',
  okx: 'bg-white/8',
  bybit: 'bg-amber-500/10',
  kraken: 'bg-violet-500/10',
  uniswap: 'bg-pink-500/10',
  jupiter: 'bg-[#00D4AA]/10',
  pancakeswap: 'bg-orange-500/10',
  curve: 'bg-red-500/10',
  '1inch': 'bg-[#112E4E]',
  robinhood: 'bg-green-500/10',
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
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${VENUE_BG[venue] ?? 'bg-white/8'}`}>
        {isChecking ? (
          <Loader2 className={`w-3.5 h-3.5 animate-spin ${VENUE_COLORS[venue] ?? 'text-[#6B8299]'}`} />
        ) : (
          <CheckCircle2 className="w-3.5 h-3.5 text-[#00D4AA]" />
        )}
      </div>

      <div className="bg-[#112E4E] border border-white/10 px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm max-w-[80%]">
        {isChecking ? (
          <span className="text-[#A3B8CC]">{step.message}</span>
        ) : (
          <div className="space-y-1">
            <div className="text-white">
              <span className={VENUE_COLORS[venue] ?? 'text-[#A3B8CC]'}>{quote?.venueName}</span>
              {' — '}
              <span className="font-mono font-semibold">{quote ? formatCurrency(quote.price) : ''}</span>
              {quote?.negotiated && (
                <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 font-medium">
                  NEGOTIATED
                </span>
              )}
            </div>
            {quote && (
              <div className="text-xs text-[#6B8299] font-mono">
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
