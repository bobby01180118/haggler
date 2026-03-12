import { MessageSquare, Search, CheckCircle, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: MessageSquare,
    title: 'Describe your trade',
    description: '"Buy 1 ETH" — plain English, no forms or dropdowns',
    accent: '#635bff',
  },
  {
    icon: Zap,
    title: 'Agent negotiates for you',
    description: 'Connects to exchange APIs and haggles — finding optimal routes, fee rebates, and the best pairs',
    accent: '#00d4aa',
  },
  {
    icon: Search,
    title: 'Compares across 11 venues',
    description: 'Negotiated quotes from CEXs, DEXs, and brokers — side by side',
    accent: '#0073e6',
  },
  {
    icon: CheckCircle,
    title: 'Execute the best deal',
    description: 'One click to trade at the price your agent negotiated',
    accent: '#635bff',
  },
]

export default function HowItWorks() {
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
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
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
              <div className="bg-white rounded-2xl p-6 h-full border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300">
                {/* Step number */}
                <div className="text-6xl font-bold text-slate-100 absolute top-4 right-4">
                  {i + 1}
                </div>

                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${step.accent}12` }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: step.accent }} />
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 text-slate-300 z-10">
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
