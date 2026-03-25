import { motion } from 'framer-motion'

const longLegs = [
  { venue: 'Binance spot', reason: 'lowest total cost', amount: '$120K' },
  { venue: 'Coinbase spot', reason: 'added spot depth', amount: '$90K' },
  { venue: 'OKX spot', reason: 'venue-cap fit', amount: '$90K' },
]

const shortLegs = [
  { venue: 'Hyperliquid perp', reason: 'best carry', amount: '$120K' },
  { venue: 'Bybit perp', reason: 'hedge depth', amount: '$90K' },
  { venue: 'Deribit perp', reason: 'extra short capacity', amount: '$90K' },
]

export default function ProofPoint() {
  return (
    <section className="marketing-section">
      <div className="marketing-shell">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="marketing-title text-4xl sm:text-5xl text-[var(--marketing-text)] mb-4"
          >
            A cross-platform hedge, built in software
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[var(--marketing-muted)] max-w-3xl mx-auto"
          >
            A custom cross-platform trade, without custom plumbing.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="rounded-3xl bg-slate-950 border border-slate-900/10 shadow-xl shadow-slate-200/60 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/[0.03]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-600" />
              </div>
              <span className="text-[11px] text-slate-500 ml-2 font-mono">haggler / hedged execution</span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Your agent</span>
                <p className="mt-2 text-base sm:text-lg text-slate-100 font-mono leading-relaxed">
                  Put on a delta-neutral ETH carry trade using $300K of capital. Keep any venue under 40%. Re-hedge if
                  net delta drifts above $7.5K.
                </p>
              </div>

              <div className="border-l-2 border-indigo-300 pl-5">
                <span className="text-[10px] text-indigo-200 uppercase tracking-wider font-medium">Haggler</span>
                <p className="mt-2 text-sm text-slate-400 mb-4">
                  Built a six-leg route across spot and perp venues. Spot won on total cost. Shorts won on carry,
                  depth, and venue-cap fit.
                </p>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.25em] mb-3 font-medium">Long spot legs</p>
                    <div className="space-y-2">
                      {longLegs.map((leg) => (
                        <div key={leg.venue} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-slate-950/40 px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-slate-100">{leg.venue}</p>
                            <p className="text-xs text-slate-500">{leg.reason}</p>
                          </div>
                          <span className="ml-auto text-sm font-mono text-slate-200">{leg.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.25em] mb-3 font-medium">Short hedge legs</p>
                    <div className="space-y-2">
                      {shortLegs.map((leg) => (
                        <div key={leg.venue} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-slate-950/40 px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-slate-100">{leg.venue}</p>
                            <p className="text-xs text-slate-500">{leg.reason}</p>
                          </div>
                          <span className="ml-auto text-sm font-mono text-slate-200">{leg.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-emerald-500/10 border border-emerald-400/15 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-1">Expected carry</p>
                    <p className="text-sm font-semibold text-emerald-300 font-mono">11.4% annualized</p>
                  </div>
                  <div className="rounded-2xl bg-white/[0.03] border border-white/8 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-1">Net delta</p>
                    <p className="text-sm text-slate-200 font-mono">+0.02 ETH after fees</p>
                  </div>
                  <div className="rounded-2xl bg-white/[0.03] border border-white/8 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-1">Protection rules</p>
                    <p className="text-sm text-slate-200">Re-hedge above $7.5K drift. Exit if funding is negative for 12h.</p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  All six legs reserved and sequenced. Signed receipt bundle ready on fill.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
