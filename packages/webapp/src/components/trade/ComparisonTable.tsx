import { motion } from 'framer-motion'
import type { AgentStep, ComparisonResult } from '@haggler/core'
import { formatCurrency } from '@haggler/core'
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
      <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Bot className="w-3.5 h-3.5 text-emerald-600" />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm overflow-hidden max-w-full sm:max-w-[85%] ">
        {/* Header */}
        <div className="px-4 py-2.5 border-b border-slate-100 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium text-slate-900">Price Comparison</span>
          {comparison.savings > 0 && (
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium border border-emerald-200">
              Save {formatCurrency(comparison.savings)}
            </span>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 border-b border-slate-100">
                <th className="text-left px-4 py-2 font-medium">Exchange</th>
                <th className="text-right px-4 py-2 font-medium">Price</th>
                <th className="text-right px-4 py-2 font-medium">Fee</th>
                <th className="text-right px-4 py-2 font-medium">Total</th>
                <th className="text-right px-4 py-2 font-medium">vs Best</th>
              </tr>
            </thead>
            <tbody>
              {comparison.quotes.map((quote) => {
                const isBest = quote.venue === comparison.best.venue
                const diff = quote.total - comparison.best.total
                return (
                  <tr
                    key={quote.venue}
                    className={`border-b border-slate-50 last:border-0 ${
                      isBest ? 'bg-emerald-50/50' : ''
                    }`}
                  >
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        {isBest && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        )}
                        <span className={isBest ? 'text-emerald-600 font-medium' : 'text-slate-700'}>
                          {quote.venueName}
                        </span>
                        {quote.negotiated && (
                          <span className="text-[9px] px-1 py-0.5 rounded bg-indigo-100 text-indigo-700 font-semibold tracking-wide">
                            NEGOTIATED
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-slate-700">
                      {formatCurrency(quote.price)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-xs">
                      <span className="font-mono text-slate-400">{formatCurrency(quote.fee)}</span>
                      {quote.fees?.haggler !== undefined && quote.fees.haggler > 0 && (
                        <div className="font-mono text-slate-300 text-[10px]">
                          +{formatCurrency(quote.fees.haggler)} haggler
                        </div>
                      )}
                    </td>
                    <td className={`px-4 py-2.5 text-right font-mono font-medium ${
                      isBest ? 'text-emerald-600' : 'text-slate-700'
                    }`}>
                      {formatCurrency(quote.total)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-xs">
                      {isBest ? (
                        <span className="text-emerald-600 font-medium">Best</span>
                      ) : (
                        <span className="text-red-500">+{formatCurrency(diff)}</span>
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
