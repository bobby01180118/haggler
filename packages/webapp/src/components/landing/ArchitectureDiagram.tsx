import { FileCheck, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const agents = [
  { name: 'Claude Code', logo: '/brands/agents/anthropic.png', x: '10%', y: '11%' },
  { name: 'Claude', logo: '/brands/agents/anthropic.png', x: '25%', y: '8%' },
  { name: 'ChatGPT', logo: '/brands/agents/openai.png', x: '40%', y: '11%' },
  { name: 'Codex', logo: '/brands/agents/openai.png', x: '55%', y: '8%' },
  { name: 'Cursor', logo: '/brands/agents/cursor.png', x: '70%', y: '11%' },
  { name: 'OpenClaw', logo: '/brands/agents/openclaw.png', x: '18%', y: '23%' },
  { name: 'Manus', logo: '/brands/agents/manus.png', x: '35%', y: '23%' },
  { name: 'NanoClaw', logo: '/brands/agents/nvidia.png', x: '52%', y: '23%' },
  { name: 'QClaw', logo: '/brands/agents/tencent.png', x: '69%', y: '23%' },
]

const venues = [
  { name: 'OKX', logo: '/brands/venues/okx.png', x: '11%', y: '70%', active: false },
  { name: 'Binance', logo: '/brands/venues/binance.png', x: '28%', y: '62%', active: true },
  { name: 'Coinbase', logo: '/brands/venues/coinbase.png', x: '42%', y: '71%', active: false },
  { name: 'Hyperliquid', logo: '/brands/venues/hyperliquid.png', x: '52%', y: '58%', active: true },
  { name: 'Deribit', logo: '/brands/venues/deribit.png', x: '68%', y: '62%', active: true },
  { name: '1inch', logo: '/brands/venues/1inch.png', x: '18%', y: '84%', active: false },
  { name: 'Jupiter', logo: '/brands/venues/jupiter.png', x: '41%', y: '86%', active: false },
  { name: 'CoW Swap', logo: '/brands/venues/cow.png', x: '64%', y: '84%', active: false },
]

export default function ArchitectureDiagram() {
  return (
    <section className="marketing-section">
      <div className="marketing-shell">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="marketing-title text-4xl sm:text-5xl text-[var(--marketing-text)] mb-4"
          >
            How Haggler fits
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--marketing-muted)] text-lg max-w-3xl mx-auto"
          >
            Your agent says the job. Haggler routes it and returns the receipt.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden xl:block"
        >
          <div className="marketing-surface relative min-h-[620px] rounded-[28px] overflow-hidden px-6 py-8">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_12%,rgba(99,91,255,0.1),transparent_30%),radial-gradient(circle_at_86%_76%,rgba(34,211,238,0.1),transparent_24%)]" />

            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {agents.map((agent) => (
                <line
                  key={`agent-${agent.name}`}
                  x1={agent.x.replace('%', '')}
                  y1={agent.y.replace('%', '')}
                  x2="50"
                  y2="40"
                  stroke="rgba(148,163,184,0.34)"
                  strokeWidth="0.3"
                  strokeDasharray="1.1 1.5"
                />
              ))}
              {venues.map((venue) => (
                <line
                  key={`venue-${venue.name}`}
                  x1="50"
                  y1="46"
                  x2={venue.x.replace('%', '')}
                  y2={venue.y.replace('%', '')}
                  stroke={venue.active ? 'rgba(99,91,255,0.7)' : 'rgba(148,163,184,0.28)'}
                  strokeWidth={venue.active ? '0.58' : '0.28'}
                  strokeDasharray={venue.active ? undefined : '1.1 1.5'}
                />
              ))}
              <line x1="58" y1="40" x2="88" y2="34" stroke="rgba(99,91,255,0.66)" strokeWidth="0.58" />
              <line x1="68" y1="62" x2="88" y2="34" stroke="rgba(99,91,255,0.32)" strokeWidth="0.3" strokeDasharray="1 1.2" />
            </svg>

            {agents.map((agent) => (
              <LogoNode key={agent.name} label={agent.name} logo={agent.logo} x={agent.x} y={agent.y} />
            ))}

            {venues.map((venue) => (
              <LogoNode key={venue.name} label={venue.name} logo={venue.logo} x={venue.x} y={venue.y} active={venue.active} />
            ))}

            <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
              <div className="rounded-[26px] border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white px-9 py-7 shadow-md min-w-[260px] text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <p className="marketing-title text-3xl text-[var(--marketing-text)]">Haggler</p>
                <p className="mt-2 text-sm text-[var(--marketing-muted)]">routes the job</p>
              </div>
            </div>

            <div className="absolute right-[4%] top-[34%] -translate-y-1/2">
              <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-md min-w-[188px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">Receipt out</p>
                    <p className="text-sm font-medium text-[var(--marketing-text)]">route, fees, evidence</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-slate-500">
                  <div className="rounded-xl bg-slate-50 px-3 py-2">Winning route selected</div>
                  <div className="rounded-xl bg-slate-50 px-3 py-2">Fee provenance attached</div>
                  <div className="rounded-xl bg-slate-50 px-3 py-2">Signed receipt bundle</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="xl:hidden"
        >
          <div className="marketing-surface rounded-[28px] p-5 space-y-5">
            <div className="flex flex-wrap gap-2.5">
              {agents.map((agent) => (
                <LogoNode key={agent.name} label={agent.name} logo={agent.logo} compact />
              ))}
            </div>

            <div className="rounded-3xl border border-indigo-100 bg-indigo-50 px-5 py-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                <Zap className="w-5 h-5" />
              </div>
              <p className="marketing-title text-3xl text-[var(--marketing-text)]">Haggler</p>
              <p className="mt-2 text-sm text-[var(--marketing-muted)]">routes the job</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {venues.map((venue) => (
                <LogoNode key={venue.name} label={venue.name} logo={venue.logo} compact active={venue.active} />
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400 mb-2">Receipt out</p>
              <p className="text-sm text-[var(--marketing-text)]">Route, fees, and evidence returned to your agent.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function LogoNode({
  label,
  logo,
  x,
  y,
  compact = false,
  active = false,
}: {
  label: string
  logo: string
  x?: string
  y?: string
  compact?: boolean
  active?: boolean
}) {
  const content = (
    <div
      className={`inline-flex items-center gap-3 rounded-full px-3.5 py-2.5 shadow-sm ${
        active ? 'border border-indigo-100 bg-indigo-50 shadow-[0_10px_24px_rgba(99,91,255,0.12)]' : 'border border-slate-200 bg-white'
      }`}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-100 bg-white p-1.5 overflow-hidden">
        <img src={logo} alt={label} className="h-full w-full object-contain" />
      </span>
      <span className={`${compact ? 'text-xs' : 'text-sm'} whitespace-nowrap font-medium ${active ? 'text-indigo-700' : 'text-slate-600'}`}>
        {label}
      </span>
    </div>
  )

  if (compact || !x || !y) {
    return content
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
      {content}
    </div>
  )
}
