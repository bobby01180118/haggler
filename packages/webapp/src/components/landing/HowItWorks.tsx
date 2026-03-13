import { Shield, Zap, Puzzle } from 'lucide-react'
import { motion } from 'framer-motion'

const values = [
  {
    icon: Shield,
    title: 'Exchange API hell, solved',
    description: 'Every exchange has different auth, rate limits, and data formats. Haggler normalizes it all into 6 clean MCP tools.',
    accent: '#635bff',
  },
  {
    icon: Zap,
    title: 'Negotiation as a feature',
    description: 'Most aggregators show prices. Haggler actually negotiates — using competing quotes as leverage to beat the market.',
    accent: '#00d4aa',
  },
  {
    icon: Puzzle,
    title: 'Composable, not monolithic',
    description: 'Use the whole toolkit or just one tool. Compare without executing. Negotiate without comparing. Each tool works standalone.',
    accent: '#0073e6',
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
            Why Haggler exists
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            The hard problems, already solved.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((item, i) => (
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
                    style={{ background: `${item.accent}12` }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.accent }} />
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
