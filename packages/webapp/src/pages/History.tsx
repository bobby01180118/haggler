import { useHistoryStore } from '../store/useHistoryStore'
import { Download, Trash2, ChevronDown, ChevronUp, Inbox } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Trade } from '@haggler/core'

const STATUS_STYLES: Record<string, string> = {
  filled: 'bg-emerald-50 text-emerald-700',
  pending: 'bg-amber-50 text-amber-700',
  submitted: 'bg-blue-50 text-blue-700',
  failed: 'bg-red-50 text-red-700',
  cancelled: 'bg-slate-100 text-slate-500',
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatCurrency(n: number) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD' })
}

function exportCsv(trades: Trade[]) {
  const header = 'Date,Token,Action,Venue,Price,Exchange Fee,Haggler Fee,Gas Fee,Total Fee,Total,Status\n'
  const rows = trades.map((t) => {
    const d = new Date(t.timestamp).toISOString()
    const fees = t.fees
    return [
      d,
      t.request.token,
      t.request.action,
      t.venue,
      t.fillPrice,
      fees.exchange,
      fees.haggler,
      fees.gas ?? 0,
      fees.total,
      t.fillPrice * t.request.amount + fees.total,
      t.status,
    ].join(',')
  })
  const blob = new Blob([header + rows.join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `haggler-trades-${Date.now()}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function History() {
  const { trades, clearHistory } = useHistoryStore()
  const [expanded, setExpanded] = useState<string | null>(null)

  if (trades.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        <Inbox className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Trade History</h1>
        <p className="text-slate-500">No trades yet. Start comparing prices to find the best deals.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Trade History</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportCsv(trades)}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={clearHistory}
            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_0.8fr_0.8fr_0.8fr_0.6fr_0.6fr_auto] gap-3 px-5 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider border-b border-slate-100">
          <span>Date</span>
          <span>Token</span>
          <span>Venue</span>
          <span className="text-right">Price</span>
          <span className="text-right">Fee</span>
          <span className="text-right">Total</span>
          <span className="w-6" />
        </div>

        {/* Rows */}
        {trades.map((trade) => {
          const isOpen = expanded === trade.id
          const total = trade.fillPrice * trade.request.amount + trade.fees.total
          return (
            <div key={trade.id} className="border-b border-slate-50 last:border-b-0">
              <button
                onClick={() => setExpanded(isOpen ? null : trade.id)}
                className="w-full grid grid-cols-[1fr_0.8fr_0.8fr_0.8fr_0.6fr_0.6fr_auto] gap-3 px-5 py-3.5 text-sm text-slate-700 hover:bg-slate-50/50 transition-colors items-center text-left"
              >
                <span className="text-slate-500 tabular-nums">{formatDate(trade.timestamp)}</span>
                <span className="font-medium">
                  {trade.request.amount} {trade.request.token}
                  <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded ${STATUS_STYLES[trade.status] ?? STATUS_STYLES.pending}`}>
                    {trade.status}
                  </span>
                </span>
                <span className="capitalize">{trade.venue}</span>
                <span className="text-right tabular-nums">{formatCurrency(trade.fillPrice)}</span>
                <span className="text-right tabular-nums">{formatCurrency(trade.fees.total)}</span>
                <span className="text-right font-medium tabular-nums">{formatCurrency(total)}</span>
                <span className="w-6 flex justify-center text-slate-400">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 pt-1">
                      <div className="bg-slate-50 rounded-xl p-4 text-sm space-y-2">
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Fee Breakdown</p>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Exchange fee</span>
                          <span className="tabular-nums">{formatCurrency(trade.fees.exchange)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Haggler fee</span>
                          <span className="tabular-nums">{formatCurrency(trade.fees.haggler)}</span>
                        </div>
                        {trade.fees.gas !== undefined && trade.fees.gas > 0 && (
                          <div className="flex justify-between">
                            <span className="text-slate-500">Gas fee</span>
                            <span className="tabular-nums">{formatCurrency(trade.fees.gas)}</span>
                          </div>
                        )}
                        <div className="flex justify-between pt-2 border-t border-slate-200 font-medium">
                          <span className="text-slate-700">Total fees</span>
                          <span className="tabular-nums">{formatCurrency(trade.fees.total)}</span>
                        </div>
                        {trade.txHash && (
                          <div className="flex justify-between pt-2">
                            <span className="text-slate-500">Tx Hash</span>
                            <span className="font-mono text-xs text-indigo-600">{trade.txHash}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
