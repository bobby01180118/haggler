import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center stripe-mesh">
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-20 text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[#A3B8CC] text-xs font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
          AI-powered negotiation across 11 venues
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
        >
          Your AI trades harder
          <br />
          <span className="gradient-text">so you don't have to</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-[#A3B8CC] max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Haggler negotiates with exchanges, scans every venue,
          and locks the best price — in seconds.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/trade"
            className="group flex items-center gap-2 px-8 py-3.5 bg-[#635BFF] hover:bg-[#5851ea] text-white font-semibold rounded-full transition-all duration-200 text-base shadow-lg shadow-[#635BFF]/25 hover:shadow-[#635BFF]/40"
          >
            Start Trading
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="#demo"
            className="flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full transition-all duration-200 text-base border border-white/15 hover:border-white/25"
          >
            See How It Works
            <ChevronDown className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-8 sm:gap-16 mt-16 pt-8 border-t border-white/8"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">0.5–1.5%</div>
            <div className="text-xs sm:text-sm text-[#6B8299] mt-1">Negotiated savings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">11</div>
            <div className="text-xs sm:text-sm text-[#6B8299] mt-1">Venues scanned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">&lt;10s</div>
            <div className="text-xs sm:text-sm text-[#6B8299] mt-1">Per negotiation</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
