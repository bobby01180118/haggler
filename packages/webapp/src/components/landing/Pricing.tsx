import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

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
            Simple, transparent pricing
          </h2>
          <p className="text-slate-500 text-lg mb-8">
            Compare prices for free. Pay only when you execute.
          </p>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm max-w-md mx-auto text-left mb-8">
            <div className="text-center mb-6">
              <span className="text-4xl font-bold text-slate-900">0.05%</span>
              <span className="text-slate-400 ml-2">per trade</span>
            </div>
            <div className="space-y-3 mb-6">
              {[
                'Price comparison — always free',
                'Natural language orders',
                'Cross-venue best execution',
                'OKX smart trading negotiation',
                'Full audit trail',
                'No exchange accounts needed',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 text-center">
              $10K trade = $5 fee. No subscriptions, no hidden fees.
            </p>
          </div>

          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-all duration-200 text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            Try it free
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
