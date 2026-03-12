import { motion } from 'framer-motion'
import type { AgentStep, ComparisonResult } from '@arbiter/core'
import { formatCurrency } from '@arbiter/core'
import { useTradeStore } from '../../store/useTradeStore'
import { CheckCircle, X } from 'lucide-react'

interface Props {
  step: AgentStep
}

export default function ExecuteConfirm({ step }: Props) {
  const comparison = step.data as ComparisonResult
  const { executeTrade, isRunning } = useTradeStore()

  if (!comparison) return null
  const { best, savings } = comparison

  const handleExecute = () => {
    if (isRunning) return
    executeTrade(best)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2"
    >
      <div className="w-7 h-7" /> {/* Spacer to align with messages */}

      <div className="bg-zinc-800/50 border border-emerald-500/30 rounded-2xl px-4 py-3 max-w-[85%]">
        <p className="text-sm text-zinc-50 mb-3">
          Best deal: <span className="text-emerald-400 font-semibold">{best.venueName}</span> at{' '}
          <span className="font-mono font-semibold">{formatCurrency(best.price)}</span>.
          {savings > 0 && (
            <span className="text-emerald-400"> Save {formatCurrency(savings)}.</span>
          )}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleExecute}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Execute Trade
          </button>
          <button
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 text-sm rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-3.5 h-3.5" />
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  )
}
