import { MessageSquare, Search, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const steps = [
  {
    icon: MessageSquare,
    title: 'Tell it what you want',
    description: 'Type in plain English. "Buy 1 ETH", "Sell half my SOL if it hits $200", or anything in between.',
    accent: '#635bff',
    example: '"Buy ETH if it drops below 3000"',
  },
  {
    icon: Search,
    title: 'See the plan',
    description: 'Haggler queries every venue, negotiates where possible, and shows you the best deal with full cost breakdown.',
    accent: '#00d4aa',
    example: 'OKX: $3,418 · Binance: $3,431 · Savings: $13',
  },
  {
    icon: CheckCircle,
    title: 'Confirm and done',
    description: 'One click to execute. Haggler handles everything through its own institutional accounts. Full audit trail.',
    accent: '#0073e6',
    example: 'Filled at $3,418.20 · Fee: $1.71 · Saved: $12.80',
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
            From intent to execution in seconds.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-6 h-full border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300">
                <div className="text-6xl font-bold text-slate-100 absolute top-4 right-4">
                  {i + 1}
                </div>

                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${item.accent}12` }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.accent }} />
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{item.description}</p>

                  <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-100 text-xs font-mono text-slate-400">
                    {item.example}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
