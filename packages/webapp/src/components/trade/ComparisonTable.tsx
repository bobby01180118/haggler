import { motion } from 'framer-motion'
import type { AgentStep, ComparisonResult } from '@arbiter/core'
import { formatCurrency } from '@arbiter/core'
import { TrendingDown, Bot } from 'lucide-react'

interface Props {
  step: AgentStep
}

export default function ComparisonTable({ step }: Props) {
  const comparison = step.data as ComparisonResult
  if (!comparison) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2"
    >
      <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Bot className="w-3.5 h-3.5 text-emerald-500" />
      </div>

      <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl rounded-tl-sm overflow-hidden max-w-full sm:max-w-[85%]">
        {/* Header */}
        <div className="px-4 py-2.5 border-b border-zinc-700 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-emerald-500" />
          <span className="text-sm font-medium text-zinc-50">Price Comparison</span>
          {comparison.savings > 0 && (
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
              Save {formatCurrency(comparison.savings)}
            </span>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-zinc-500 border-b border-zinc-700/50">
                <th className="text-left px-4 py-2 font-medium">Venue</th>
                <th className="text-right px-4 py-2 font-medium">Price</th>
                <th className="text-right px-4 py-2 font-medium">Fee</th>
                <th className="text-right px-4 py-2 font-medium">Total</th>
                <th className="text-right px-4 py-2 font-medium">vs Best</th>
              </tr>
            </thead>
            <tbody>
              {comparison.quotes.map((quote, i) => {
                const isBest = quote.venue === comparison.best.venue
                const diff = quote.total - comparison.best.total
                return (
                  <tr
                    key={quote.venue}
                    className={`border-b border-zinc-700/30 last:border-0 ${
                      isBest ? 'bg-emerald-500/5' : ''
                    }`}
                  >
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        {isBest && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        )}
                        <span className={isBest ? 'text-emerald-400 font-medium' : 'text-zinc-300'}>
                          {quote.venueName}
                        </span>
                        {quote.negotiated && (
                          <span className="text-[9px] px-1 py-0.5 rounded bg-amber-500/20 text-amber-400">
                            OTC
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-zinc-300">
                      {formatCurrency(quote.price)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-zinc-500 text-xs">
                      {formatCurrency(quote.fee)}
                    </td>
                    <td className={`px-4 py-2.5 text-right font-mono font-medium ${
                      isBest ? 'text-emerald-400' : 'text-zinc-300'
                    }`}>
                      {formatCurrency(quote.total)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-xs">
                      {isBest ? (
                        <span className="text-emerald-500 font-medium">Best</span>
                      ) : (
                        <span className="text-red-400">+{formatCurrency(diff)}</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  )
}
