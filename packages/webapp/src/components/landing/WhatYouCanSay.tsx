import { motion } from 'framer-motion'
import { Shield, Clock3, Sigma, Layers3 } from 'lucide-react'

const examples = [
  {
    icon: Shield,
    accent: '#635bff',
    input: 'Buy $10000 of ETH at the best total cost across venues.',
    does: 'Compares connected venues, accounts for fees and slippage, and returns the winning route before execution.',
  },
  {
    icon: Clock3,
    accent: '#00d4aa',
    input: 'Buy ETH every Monday $200, but skip weeks where it is up more than 5%.',
    does: 'Checks the weekly move, applies the rule, and only routes the order when the condition passes.',
  },
  {
    icon: Sigma,
    accent: '#0073e6',
    input: 'Put on a delta-neutral ETH carry trade with a 40% venue cap and re-hedge if drift exceeds $7.5K.',
    does: 'Builds the long and short legs across venues, sizes them to constraints, and returns the hedge rules in the receipt.',
  },
  {
    icon: Layers3,
    accent: '#0ea5e9',
    input: 'Find the best yield for 1M USDC across all platforms. Max 40% in any one place. Rebalance monthly.',
    does: 'Scans available venues, sizes the allocation within caps, and packages the rebalance rule into the job.',
  },
]

export default function WhatYouCanSay() {
  return (
    <section className="marketing-section">
      <div className="marketing-shell">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="marketing-title text-4xl sm:text-5xl text-[var(--marketing-text)] mb-4"
          >
            What you can do with Haggler
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--marketing-muted)] text-lg max-w-3xl mx-auto"
          >
            Not one more button. More jobs your agent can actually delegate.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {examples.map((example, index) => (
            <motion.div
              key={example.input}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="marketing-surface rounded-2xl p-5 h-full transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${example.accent}12` }}
                  >
                    <example.icon className="w-4 h-4" style={{ color: example.accent }} />
                  </div>
                </div>

                <div className="px-4 py-3 rounded-xl bg-slate-950 mb-4 border border-white/8">
                  <div className="flex items-start gap-2">
                    <span className="text-[var(--marketing-accent)] font-mono text-sm shrink-0 mt-0.5">&gt;</span>
                    <span className="text-sm text-white font-mono leading-relaxed">{example.input}</span>
                  </div>
                </div>

                <div className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] text-[var(--marketing-muted)] mb-1 font-medium uppercase tracking-wider">Haggler would do</p>
                  <p className="text-xs text-[var(--marketing-muted)] leading-relaxed">{example.does}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
