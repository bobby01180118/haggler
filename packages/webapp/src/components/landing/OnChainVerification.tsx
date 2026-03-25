import { motion } from 'framer-motion'
import { Eye, FileCheck, KeyRound } from 'lucide-react'

const receiptRows = [
  ['Intent stays private', 'Strategy details stay private while the job runs.'],
  ['Signed receipt bundle', 'Intent, route IDs, timestamps, and execution references in one artifact.'],
  ['Route and fee provenance', 'Winning route, venue, and costs shown side by side.'],
  ['Linked evidence', 'Order IDs and on-chain links attached when the route touches a chain.'],
]

const mechanismRows = [
  {
    icon: KeyRound,
    label: 'Private execution context',
  },
  {
    icon: FileCheck,
    label: 'Signed receipt with route and fees',
  },
  {
    icon: Eye,
    label: 'Linked evidence when applicable',
  },
]

export default function OnChainVerification() {
  return (
    <section className="marketing-section">
      <div className="marketing-shell">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="marketing-eyebrow mb-4 text-center"
        >
          Private strategy in. Inspectable receipt out.
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="marketing-title text-4xl sm:text-5xl text-[var(--marketing-text)] mb-4 text-center"
        >
          Every execution returns a verifiable audit trail
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[var(--marketing-muted)] text-lg mb-10 text-center max-w-3xl mx-auto"
        >
          Private instructions stay private. Returned receipts stay inspectable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="marketing-surface rounded-3xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--marketing-line)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <FileCheck className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--marketing-text)]">Execution receipt</p>
                  <p className="text-xs text-[var(--marketing-muted)]">Private job in. Inspectable receipt out.</p>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[var(--marketing-muted)]">receipt bundle</span>
            </div>

            <div className="p-5 space-y-4 text-sm">
              {receiptRows.map(([label, value]) => (
                <div key={label} className="marketing-terminal px-4 py-3">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500 mb-1">{label}</p>
                  <p className="text-sm text-slate-200 leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="marketing-surface rounded-3xl p-5">
            <div className="space-y-3">
              {mechanismRows.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-[var(--marketing-text)]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-[var(--marketing-line)]">
                    <item.icon className="w-4 h-4 text-[var(--marketing-text)]" />
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm text-[var(--marketing-muted)]">
              Strategy details stay private while the receipt remains independently inspectable.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
