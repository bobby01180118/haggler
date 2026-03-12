import { motion } from 'framer-motion'
import { Eye, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Pricing() {
  return (
    <section className="py-24 bg-[#081C30]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-[#A3B8CC] text-lg">
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
            className="surface-card p-8"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0073E6]/15 flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-[#0073E6]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Compare</h3>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold text-white">Free</span>
            </div>
            <p className="text-[#A3B8CC] text-sm mb-6 leading-relaxed">
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
              className="block w-full text-center px-6 py-3 rounded-full border border-white/15 text-white font-medium hover:bg-white/5 transition-colors"
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
            className="surface-card p-8 border-[#635BFF]/30 relative overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#635BFF]/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-[#635BFF]/15 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-[#635BFF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Execute</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-white">0.05%</span>
                <span className="text-[#6B8299] text-sm">per trade</span>
              </div>
              <p className="text-[#A3B8CC] text-sm mb-6 leading-relaxed">
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
                className="block w-full text-center px-6 py-3 rounded-full bg-[#635BFF] hover:bg-[#5851ea] text-white font-semibold transition-colors shadow-lg shadow-[#635BFF]/20"
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
    <li className="flex items-center gap-2.5 text-sm text-[#A3B8CC]">
      <svg className="w-4 h-4 text-[#00D4AA] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      {text}
    </li>
  )
}
