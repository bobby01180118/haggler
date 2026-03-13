import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Pricing() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Simple pricing
          </h2>
          <p className="text-slate-500 text-lg mb-2">
            Free to compare. <span className="font-semibold text-slate-700">0.05%</span> when you execute.
          </p>
          <p className="text-slate-400 text-sm mb-10">
            That's $5 on a $10K trade. No hidden fees, no subscriptions.
          </p>

          <Link
            to="/trade"
            className="inline-flex items-center gap-2 px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-all duration-200 text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            Start Trading
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
