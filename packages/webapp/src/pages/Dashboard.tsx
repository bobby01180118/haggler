import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Settings, Shield } from 'lucide-react'

const cards = [
  {
    title: 'Accounts and credentials',
    description: 'Connect venues, set slippage preferences, and manage the broker permissions your agent uses.',
    icon: Settings,
    href: '/settings',
    cta: 'Open settings',
  },
  {
    title: 'Trade history and audit trail',
    description: 'Review fills, fee breakdowns, and the execution receipts your agent can reference later.',
    icon: Clock,
    href: '/history',
    cta: 'Open history',
  },
  {
    title: 'Standing orders',
    description: 'Track recurring instructions, monitors, and long-lived agent jobs once the broker layer expands.',
    icon: Shield,
    href: '/developers',
    cta: 'See roadmap',
  },
]

export default function Dashboard() {
  return (
    <section className="marketing-page">
      <div className="marketing-section pt-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="marketing-eyebrow mb-5"
        >
          Dashboard
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="marketing-display max-w-4xl text-[clamp(3rem,7vw,4.8rem)] text-[var(--marketing-text)] mb-6"
        >
          The operator view after your agent is connected.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl text-lg text-[var(--marketing-muted)] leading-relaxed mb-12"
        >
          Haggler&apos;s public site explains the broker layer. The dashboard is where you configure access, inspect
          execution history, and monitor the jobs your agent has delegated.
        </motion.p>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + index * 0.08 }}
              className="marketing-surface rounded-3xl p-6"
            >
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5">
                <card.icon className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="marketing-title text-2xl text-[var(--marketing-text)] mb-3">{card.title}</h2>
              <p className="text-sm text-[var(--marketing-muted)] leading-relaxed mb-6">{card.description}</p>
              <Link
                to={card.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--marketing-text)] hover:opacity-70 transition-opacity"
              >
                {card.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
