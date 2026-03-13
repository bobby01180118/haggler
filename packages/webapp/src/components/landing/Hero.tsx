import { Link } from 'react-router-dom'
import { ArrowRight, Github, ShieldCheck, Plug } from 'lucide-react'
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-500 text-xs font-medium mb-8 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          MCP Server &middot; 6 tools &middot; 3 exchanges
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]"
        >
          Crypto trading
          <br />
          <span className="gradient-text">for the agent era</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          One MCP server. Six tools. Three exchanges normalized. Give any AI agent the power to compare, negotiate, and execute crypto trades.
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
            className="group flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-all duration-200 text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
          >
            Try the demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="https://github.com/bobby01180118/haggler"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-full transition-all duration-200 text-base border border-slate-200 hover:border-slate-300 shadow-sm"
          >
            View on GitHub
            <Github className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-6 sm:gap-8 mt-10 text-xs text-slate-400"
        >
          <span className="flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5" />
            Open source
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Keys never leave your device
          </span>
          <span className="flex items-center gap-1.5">
            <Plug className="w-3.5 h-3.5" />
            MCP native
          </span>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-8 sm:gap-16 mt-12 pt-8 border-t border-slate-200/60"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">6</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">MCP tools</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">3</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Live exchanges</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900">&lt;10s</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Per negotiation</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
