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
      <div className="w-7 h-7 rounded-full bg-[#00D4AA]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Bot className="w-3.5 h-3.5 text-[#00D4AA]" />
      </div>

      <div className="bg-[#0D2D4D] border border-white/10 rounded-2xl rounded-tl-sm overflow-hidden max-w-full sm:max-w-[85%] ">
        {/* Header */}
        <div className="px-4 py-2.5 border-b border-white/8 flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-[#00D4AA]" />
          <span className="text-sm font-medium text-white">Price Comparison</span>
          {comparison.savings > 0 && (
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-[#00D4AA]/10 text-[#00D4AA] font-medium border border-[#00D4AA]/20">
              Save {formatCurrency(comparison.savings)}
            </span>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-[#6B8299] border-b border-white/8">
                <th className="text-left px-4 py-2 font-medium">Venue</th>
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
                    className={`border-b border-white/5 last:border-0 ${
                      isBest ? 'bg-[#00D4AA]/10/50' : ''
                    }`}
                  >
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        {isBest && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]/100" />
                        )}
                        <span className={isBest ? 'text-[#00D4AA] font-medium' : 'text-[#A3B8CC]'}>
                          {quote.venueName}
                        </span>
                        {quote.negotiated && (
                          <span className="text-[9px] px-1 py-0.5 rounded bg-amber-500/15 text-amber-400">
                            API
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-[#A3B8CC]">
                      {formatCurrency(quote.price)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-[#6B8299] text-xs">
                      {formatCurrency(quote.fee)}
                    </td>
                    <td className={`px-4 py-2.5 text-right font-mono font-medium ${
                      isBest ? 'text-[#00D4AA]' : 'text-[#A3B8CC]'
                    }`}>
                      {formatCurrency(quote.total)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-xs">
                      {isBest ? (
                        <span className="text-[#00D4AA] font-medium">Best</span>
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
