import { Link } from 'react-router-dom'
import { ArrowRight, Github } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Stripe-inspired gradient mesh background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
            animation: 'gradient-shift 15s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
            animation: 'gradient-shift 20s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[30%] w-[700px] h-[700px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
            animation: 'gradient-shift 25s ease-in-out infinite',
          }}
        />
        {/* Noise overlay for texture */}
        <div className="absolute inset-0 bg-zinc-950/40" />
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-20 pb-20 text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-700/50 bg-zinc-900/50 backdrop-blur-sm text-zinc-400 text-xs font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          11 venues. One command.
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.1]"
        >
          Your AI that negotiates
          <br />
          <span className="gradient-text">crypto trades</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Arbiter scans every major exchange and DEX simultaneously,
          negotiates the best price, and executes — all in one command.
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
            className="group flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-full transition-all duration-200 text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
          >
            Start Trading
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="https://github.com/lasgg/arbiter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 bg-white/5 hover:bg-white/10 text-zinc-300 font-medium rounded-full transition-all duration-200 text-base border border-white/10 hover:border-white/20"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-8 sm:gap-16 mt-16 pt-8 border-t border-zinc-800/50"
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">11</div>
            <div className="text-xs sm:text-sm text-zinc-500 mt-1">Venues</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">$12–50</div>
            <div className="text-xs sm:text-sm text-zinc-500 mt-1">Avg. savings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">&lt;10s</div>
            <div className="text-xs sm:text-sm text-zinc-500 mt-1">Per trade</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
