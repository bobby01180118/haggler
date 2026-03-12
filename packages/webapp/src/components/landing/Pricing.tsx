import { motion } from 'framer-motion'
import { Eye, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Pricing() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-500 text-lg">
            Looking is free. You only pay when you execute.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Compare</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold text-slate-900">Free</span>
            </div>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Scan all 11 venues, see real-time prices, and find the best deal. No account needed.
            </p>
            <ul className="space-y-3 mb-8">
              <PricingFeature text="Price comparison across all venues" />
              <PricingFeature text="Real-time market scanning" />
              <PricingFeature text="Unlimited lookups" />
              <PricingFeature text="No account required" />
            </ul>
            <Link
              to="/trade"
              className="block w-full text-center px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              Start Comparing
            </Link>
          </motion.div>

          {/* Execute tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-indigo-200 shadow-sm p-8 relative overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-100/50 rounded-full blur-3xl" />

            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Execute</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-slate-900">0.05%</span>
                <span className="text-slate-400 text-sm">per trade</span>
              </div>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Route and execute through Haggler with full fee transparency. $5 on a $10K trade.
              </p>
              <ul className="space-y-3 mb-8">
                <PricingFeature text="Everything in Compare" />
                <PricingFeature text="AI-powered negotiation" />
                <PricingFeature text="One-click execution" />
                <PricingFeature text="Full fee breakdown before you confirm" />
              </ul>
              <Link
                to="/trade"
                className="block w-full text-center px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors shadow-lg shadow-indigo-500/20"
              >
                Start Trading
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PricingFeature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2.5 text-sm text-slate-600">
      <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {text}
    </li>
  )
}
