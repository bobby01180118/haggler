import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ForDevelopers from '../components/landing/ForDevelopers'

export default function Developers() {
  return (
    <div className="marketing-page">
      <section className="marketing-section">
        <div className="marketing-shell pt-8 pb-2">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="marketing-eyebrow mb-5"
          >
            Developers
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="marketing-display max-w-4xl text-[clamp(3rem,7vw,4.8rem)] text-[var(--marketing-text)] mb-6"
          >
            Connect Haggler to the agent you already ship.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl text-lg text-[var(--marketing-muted)] leading-relaxed mb-8"
          >
            Start with MCP if your agent already speaks tool calling. Use the SDK in a custom runtime. Or wrap
            Haggler behind your own bridge if you need a different interface.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#connect"
              className="marketing-primary-button inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors"
            >
              Jump to quickstart
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/demo"
              className="marketing-secondary-button inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-colors"
            >
              Try demo
            </Link>
          </motion.div>
        </div>
      </section>

      <ForDevelopers showHeader={false} />
    </div>
  )
}
