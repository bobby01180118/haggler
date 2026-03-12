import { MessageSquare, Search, CheckCircle, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: MessageSquare,
    title: 'Tell Arbiter what you want',
    description: 'Natural language input — "Buy 1 ETH at the best price"',
    accent: '#10b981',
  },
  {
    icon: Search,
    title: 'Scans 11 venues instantly',
    description: 'CEXs, DEXs, and brokers checked in parallel for the best deal',
    accent: '#06b6d4',
  },
  {
    icon: Zap,
    title: 'Negotiates on your behalf',
    description: 'Leverages OKX smart trading to haggle for a better price',
    accent: '#8b5cf6',
  },
  {
    icon: CheckCircle,
    title: 'Execute with one click',
    description: 'Transparent comparison, then trade on the cheapest venue',
    accent: '#10b981',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 text-lg"
          >
            Four steps. Under 10 seconds.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="glass-card rounded-2xl p-6 h-full hover:border-zinc-600/60 transition-all duration-300">
                {/* Step number */}
                <div className="text-6xl font-bold text-zinc-800/40 absolute top-4 right-4">
                  {i + 1}
                </div>

                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${step.accent}15` }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: step.accent }} />
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Connector line (hidden on mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 text-zinc-700 z-10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
