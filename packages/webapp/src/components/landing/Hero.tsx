import { Link } from 'react-router-dom'
import { ArrowRight, Bot, Globe, Shield, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const allocations = [
  { venue: 'OKX Earn', apy: '4.6%', amount: '$400K', share: '40%' },
  { venue: 'Binance Earn', apy: '4.2%', amount: '$350K', share: '35%' },
  { venue: 'Aave V3', apy: '3.8%', amount: '$250K', share: '25%' },
]

const proofPoints = [
  {
    icon: Zap,
    label: 'Constraint aware',
    description: 'Respects concentration caps and rebalance rules.',
  },
  {
    icon: Globe,
    label: 'Cross-provider',
    description: 'Searches across the liquidity graph, not one venue.',
  },
  {
    icon: Shield,
    label: 'Verifiable',
    description: 'Returns route, fees, and an execution receipt.',
  },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden marketing-section stripe-mesh">
      <div className="marketing-shell pt-10">
        <div className="grid gap-12 items-center lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-6 shadow-sm"
            >
              Fits into the agent stack you already use
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="marketing-display text-[clamp(4rem,9vw,6.6rem)] text-[var(--marketing-text)] mb-8"
            >
              The broker that
              <br />
              <span className="gradient-text">understands you</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-lg sm:text-xl text-[var(--marketing-muted)] max-w-2xl mb-8 leading-relaxed"
            >
              Your agent says what should happen. Haggler finds the best executable route across liquidity providers
              and returns the route, fees, and execution trail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-col sm:flex-row gap-3 mb-6"
            >
              <a
                href="#developers"
                className="marketing-primary-button inline-flex items-center justify-center gap-2 px-8 py-3.5 font-semibold rounded-full transition-colors text-base"
              >
                Connect your agent
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/demo"
                className="marketing-secondary-button inline-flex items-center justify-center gap-2 px-8 py-3.5 font-medium rounded-full transition-colors text-base"
              >
                Try demo
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[13px] font-medium text-[var(--marketing-muted)]"
            >
              Private strategy in. Route and receipt back out.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18 }}
          >
            <div className="marketing-surface rounded-[28px] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--marketing-line)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--marketing-text)]">Agent request</p>
                    <p className="text-xs text-[var(--marketing-muted)]">A broker job, described once.</p>
                  </div>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--marketing-muted)]">3-second proof</span>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                <div className="marketing-terminal p-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500 mb-2">Your agent</p>
                  <p className="text-sm sm:text-base font-mono leading-relaxed text-slate-100">
                    Find the best yield for 1M USDC. Keep each venue under 40%. Rebalance monthly.
                  </p>
                </div>

                <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-indigo-600 mb-2">
                    Haggler understood
                  </p>
                  <p className="text-sm text-[var(--marketing-text)] leading-relaxed">
                    Cross-platform yield optimization with a concentration cap, venue allocation limits, and a recurring
                    rebalance rule.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/90 p-4 space-y-3">
                  {allocations.map((allocation) => (
                    <div key={allocation.venue} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 border border-slate-100">
                      <div>
                        <p className="text-sm font-medium text-[var(--marketing-text)]">{allocation.venue}</p>
                        <p className="text-xs text-emerald-600 font-mono">{allocation.apy} APY</p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-sm font-mono text-[var(--marketing-text)]">{allocation.amount}</p>
                        <p className="text-xs text-slate-500">{allocation.share}</p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between rounded-2xl bg-emerald-50 border border-emerald-100 px-4 py-3">
                    <span className="text-sm text-slate-500">Projected annual yield</span>
                    <span className="text-sm font-semibold text-emerald-600 font-mono">$42,600</span>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {proofPoints.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-100 bg-white px-4 py-3">
                      <item.icon className="w-4 h-4 text-[var(--marketing-text)] mb-2" />
                      <p className="text-sm font-medium text-[var(--marketing-text)] mb-1">{item.label}</p>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
