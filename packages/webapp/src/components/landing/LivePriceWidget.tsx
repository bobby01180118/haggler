import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, TrendingDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  compareAllPaths,
  SUPPORTED_TOKENS,
  TOKEN_NAMES,
  formatCurrency,
  type MultiPathResult,
  type PathWithVenue,
} from '@haggler/core'

const QUICK_TOKENS = ['ETH', 'BTC', 'SOL', 'DOGE', 'LINK']

function methodLabel(method: string): string {
  switch (method) {
    case 'spot_taker': return 'Spot'
    case 'spot_maker': return 'Limit'
    case 'convert': return 'Convert'
    case 'dex_swap': return 'DEX'
    case 'dex_fusion': return 'Fusion'
    case 'rfq': return 'RFQ'
    default: return method
  }
}

function confidenceBadge(confidence: string) {
  if (confidence === 'firm') return <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-medium">Firm</span>
  return <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 font-medium">Indicative</span>
}

export default function LivePriceWidget() {
  const [token, setToken] = useState('ETH')
  const [amount, setAmount] = useState(1)
  const [result, setResult] = useState<MultiPathResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchPrices = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await compareAllPaths({
        base: token,
        quote: 'USDT',
        amount,
        side: 'buy',
      })
      setResult(res)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch prices')
    } finally {
      setLoading(false)
    }
  }, [token, amount])

  useEffect(() => {
    fetchPrices()
  }, [fetchPrices])

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            See the difference instantly
          </h2>
          <p className="text-slate-500 text-lg">
            Real prices, right now. No signup, no API keys.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 p-5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Buy</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0.01, parseFloat(e.target.value) || 1))}
                className="w-20 px-2.5 py-1.5 border border-slate-200 rounded-lg text-sm font-mono text-slate-900 focus:outline-none focus:border-indigo-400"
                min={0.01}
                step={0.1}
              />
            </div>

            <div className="flex items-center gap-1.5">
              {QUICK_TOKENS.map((t) => (
                <button
                  key={t}
                  onClick={() => setToken(t)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    token === t
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={fetchPrices}
              disabled={loading}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {/* Results */}
          <div className="p-5">
            {error && (
              <div className="text-sm text-red-500 text-center py-8">{error}</div>
            )}

            {!error && result && result.allPaths.length > 0 && (
              <>
                {/* Path list */}
                <div className="space-y-2">
                  {result.allPaths.map((path: PathWithVenue, i: number) => (
                    <div
                      key={i}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                        i === 0
                          ? 'bg-indigo-50/60 border border-indigo-200/50'
                          : 'bg-slate-50 border border-transparent'
                      }`}
                    >
                      {/* Rank */}
                      <span className={`text-xs font-bold w-5 text-center ${i === 0 ? 'text-indigo-600' : 'text-slate-300'}`}>
                        {i === 0 ? '★' : i + 1}
                      </span>

                      {/* Venue + method */}
                      <div className="min-w-[140px]">
                        <span className="text-sm font-semibold text-slate-900">{path.venueName}</span>
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                          {methodLabel(path.method)}
                        </span>
                      </div>

                      {/* Confidence */}
                      <div className="hidden sm:block">
                        {confidenceBadge(path.confidence)}
                      </div>

                      {/* Price */}
                      <div className="text-right flex-1">
                        <span className="text-sm font-mono text-slate-500">
                          {formatCurrency(path.price)}<span className="text-slate-300">/{token}</span>
                        </span>
                      </div>

                      {/* Fee */}
                      <div className="text-right min-w-[80px] hidden sm:block">
                        <span className="text-xs text-slate-400">
                          fee {formatCurrency(path.fees.total)}
                        </span>
                      </div>

                      {/* Total */}
                      <div className="text-right min-w-[100px]">
                        <span className={`text-sm font-semibold font-mono ${i === 0 ? 'text-indigo-600' : 'text-slate-700'}`}>
                          {formatCurrency(path.total)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                {result.summary.potentialSavings > 1 && (
                  <div className="mt-5 flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100">
                    <div className="flex items-center gap-2 text-sm text-emerald-700">
                      <TrendingDown className="w-4 h-4" />
                      <span>
                        Haggler found <strong>${result.summary.potentialSavings.toFixed(2)}</strong> in savings across {result.summary.pathCount} pricing paths
                      </span>
                    </div>
                    <Link
                      to="/app"
                      className="flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800"
                    >
                      Try it
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}

                {/* Timestamp */}
                {lastUpdated && (
                  <div className="mt-3 text-center text-[10px] text-slate-300">
                    Live prices as of {lastUpdated.toLocaleTimeString()} &middot; {result.summary.venueCount} venues &middot; {result.summary.pathCount} paths
                  </div>
                )}
              </>
            )}

            {!error && loading && !result && (
              <div className="flex items-center justify-center py-12 text-sm text-slate-400">
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                Fetching live prices from 3 exchanges...
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
