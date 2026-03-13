import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { AgentStep, ComparisonResult } from '@haggler/core'
import { formatCurrency } from '@haggler/core'
import { useTradeStore } from '../../store/useTradeStore'
import { useSettingsStore, getOKXCredentials } from '../../store/useSettingsStore'
import { CheckCircle, X, Clock, Info, AlertTriangle, Settings } from 'lucide-react'

interface Props {
  step: AgentStep
}

export default function ExecuteConfirm({ step }: Props) {
  const comparison = step.data as ComparisonResult
  const { executeTrade, isRunning } = useTradeStore()
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null)

  const demoMode = useSettingsStore((s) => s.demoMode)
  const best = comparison?.best
  const savings = comparison?.savings ?? 0
  const fees = best?.fees
  const expiresAt = best?.expiresAt

  // Check if credentials are needed but missing
  const needsOKXCreds = !demoMode && best?.venue === 'okx' && !getOKXCredentials()
  const needsBinanceCreds = !demoMode && best?.venue === 'binance' // Binance auth not implemented yet

  // Countdown timer
  useEffect(() => {
    if (!expiresAt) return

    const update = () => {
      const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000))
      setSecondsLeft(remaining)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [expiresAt])

  if (!comparison || !best) return null

  const expired = secondsLeft !== null && secondsLeft <= 0

  const handleExecute = () => {
    if (isRunning || expired) return
    executeTrade(best)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2"
    >
      <div className="w-7 h-7" />

      <div className="bg-white border border-indigo-200 rounded-2xl px-4 py-3 max-w-[85%]">
        <p className="text-sm text-slate-800 mb-3">
          Best deal: <span className="text-indigo-600 font-semibold">{best.venueName}</span> at{' '}
          <span className="font-mono font-semibold">{formatCurrency(best.price)}</span>.
          {savings > 0 && (
            <span className="text-emerald-600"> Save {formatCurrency(savings)}.</span>
          )}
        </p>

        {/* Fee breakdown */}
        {fees && (
          <div className="mb-3 bg-slate-50 rounded-lg px-3 py-2 text-xs text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>Exchange fee</span>
              <span className="font-mono">{formatCurrency(fees.exchange)}</span>
            </div>
            <div className="flex justify-between">
              <span>Haggler fee (0.05%)</span>
              <span className="font-mono">{formatCurrency(fees.haggler)}</span>
            </div>
            {fees.gas !== undefined && (
              <div className="flex justify-between">
                <span>Gas (DEX)</span>
                <span className="font-mono">{formatCurrency(fees.gas)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-200 pt-1 font-medium text-slate-800">
              <span>Total fees</span>
              <span className="font-mono">{formatCurrency(fees.total)}</span>
            </div>
          </div>
        )}

        {/* Quote expiry countdown */}
        {secondsLeft !== null && (
          <div className={`flex items-center gap-1.5 text-xs mb-3 ${
            expired ? 'text-red-500' : secondsLeft <= 10 ? 'text-amber-600' : 'text-slate-400'
          }`}>
            <Clock className="w-3 h-3" />
            {expired ? (
              <span>Quote expired — request a new one</span>
            ) : (
              <span>Quote expires in {secondsLeft}s</span>
            )}
          </div>
        )}

        {/* Credential warning */}
        {needsOKXCreds && (
          <div className="flex items-start gap-1.5 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>
              OKX API keys required to execute.{' '}
              <a href="/settings" className="underline font-medium hover:text-amber-700">
                <Settings className="w-3 h-3 inline" /> Configure in Settings
              </a>
            </span>
          </div>
        )}
        {needsBinanceCreds && (
          <div className="flex items-start gap-1.5 text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span>Binance execution coming soon. Trade will be simulated.</span>
          </div>
        )}

        {/* Info text */}
        <div className="flex items-start gap-1.5 text-xs text-slate-400 mb-3">
          <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <span>Looking is free. You only pay when you execute.</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExecute}
            disabled={isRunning || expired || needsOKXCreds}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            {expired ? 'Quote Expired' : needsOKXCreds ? 'API Keys Required' : 'Execute Trade'}
          </button>
          <button
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="w-3.5 h-3.5" />
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  )
}
