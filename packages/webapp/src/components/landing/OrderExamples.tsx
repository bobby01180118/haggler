import { motion } from 'framer-motion'
import { Zap, Clock, GitBranch } from 'lucide-react'

const examples = [
  {
    icon: Zap,
    accent: '#635bff',
    label: 'Available now',
    labelColor: 'bg-indigo-50 text-indigo-600',
    input: 'Buy 1 ETH at the best price',
    interpretation: 'Buy 1 ETH → scan OKX, Binance, 1inch → negotiate OKX → execute at best venue',
    detail: 'Instant comparison across 6 pricing paths. Best execution in seconds.',
  },
  {
    icon: Clock,
    accent: '#00d4aa',
    label: 'Coming soon',
    labelColor: 'bg-emerald-50 text-emerald-600',
    input: 'Buy ETH every Monday $200, skip if up >5%',
    interpretation: 'DCA $200/week into ETH → skip weeks with >5% rally → execute every Monday at best price',
    detail: 'Conditional recurring orders. No other broker supports this in natural language.',
  },
  {
    icon: GitBranch,
    accent: '#0073e6',
    label: 'Coming soon',
    labelColor: 'bg-blue-50 text-blue-600',
    input: 'If ETH drops below 3000 but BTC holding, buy 10K in 5 batches over 1 hour',
    interpretation: 'Monitor ETH < $3000 + BTC stable → split $10K into 5 × $2K → execute over 60 min',
    detail: 'Multi-condition strategies with execution planning. Tell it like you\'d tell a human broker.',
  },
]

export default function OrderExamples() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
          >
            Orders no other broker understands
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            From simple buys to multi-condition strategies — just say what you want.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {examples.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="bg-white rounded-2xl p-6 h-full border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300">
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${ex.accent}12` }}
                  >
                    <ex.icon className="w-5 h-5" style={{ color: ex.accent }} />
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${ex.labelColor}`}>
                    {ex.label}
                  </span>
                </div>

                {/* Natural language input */}
                <div className="px-4 py-3 rounded-xl bg-slate-900 mb-4">
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-400 font-mono text-sm shrink-0 mt-0.5">&gt;</span>
                    <span className="text-sm text-white font-mono leading-relaxed">{ex.input}</span>
                  </div>
                </div>

                {/* Interpretation */}
                <div className="px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-100 mb-4">
                  <p className="text-[11px] text-slate-400 mb-1 font-medium">Haggler understands:</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{ex.interpretation}</p>
                </div>

                {/* Detail */}
                <p className="text-xs text-slate-400 leading-relaxed">{ex.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
