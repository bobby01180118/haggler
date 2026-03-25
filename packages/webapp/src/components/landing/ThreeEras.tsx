import { Phone, Smartphone, Zap, Check, X } from 'lucide-react'
import { motion } from 'framer-motion'

const eras = [
  {
    era: 'Era 1',
    title: 'The Human Broker',
    icon: Phone,
    accent: '#94a3b8',
    description: 'Flexible, but expensive and human-paced.',
    points: [
      { text: 'Understands custom requests', positive: true },
      { text: 'High minimums and slow coordination', positive: false },
      { text: "Limited to one firm's inventory", positive: false },
    ],
    muted: true,
  },
  {
    era: 'Era 2',
    title: 'The App Broker',
    icon: Smartphone,
    accent: '#f59e0b',
    description: 'Cheap, always on, and still trapped inside buttons.',
    points: [
      { text: 'Cheap, fast, and always available', positive: true },
      { text: 'Conditional DCA needs custom logic', positive: false },
      { text: 'Delta-neutral needs wiring and orchestration', positive: false },
      { text: 'Cross-platform hedging means juggling venues', positive: false },
    ],
    muted: false,
  },
  {
    era: 'Era 3',
    title: 'The Agent Broker',
    icon: Zap,
    accent: '#635bff',
    description: 'Say the job once. Let the routing happen underneath.',
    points: [
      { text: 'Plain-language instructions in', positive: true },
      { text: 'Cross-platform execution out', positive: true },
      { text: 'Route, fees, and receipt returned', positive: true },
    ],
    highlighted: true,
  },
]

export default function ThreeEras() {
  return (
    <section id="three-eras" className="marketing-section">
      <div className="marketing-shell">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="marketing-title text-4xl sm:text-5xl text-[var(--marketing-text)] mb-4"
          >
            Three eras of brokerage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--marketing-muted)] text-lg max-w-2xl mx-auto"
          >
            The first broker understood you. The second broker scaled. The third finally does both.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {eras.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className={`rounded-2xl p-6 h-full transition-all duration-300 ${
                  item.highlighted
                    ? 'bg-indigo-50/92 border border-indigo-100 shadow-md'
                    : 'bg-[var(--marketing-paper-strong)] border border-[var(--marketing-line)] shadow-sm'
                } ${item.muted ? 'opacity-70' : ''}`}
              >
                <span className={`text-[10px] font-medium uppercase tracking-wider ${
                  item.highlighted ? 'text-[var(--marketing-text)]' : 'text-[var(--marketing-muted)]'
                }`}>
                  {item.era}
                </span>

                <div className="flex items-center gap-3 mt-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${item.accent}12` }}
                  >
                    <item.icon className="w-5 h-5" style={{ color: item.accent }} />
                  </div>
                  <h3 className="marketing-title text-2xl text-[var(--marketing-text)]">{item.title}</h3>
                </div>

                <p className="text-sm mb-5 text-[var(--marketing-muted)]">{item.description}</p>

                <div className="space-y-2">
                  {item.points.map((point, j) => (
                    <div key={j} className="flex items-start gap-2 text-sm">
                      {point.positive ? (
                        <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                          item.highlighted ? 'text-emerald-500' : 'text-emerald-400'
                        }`} />
                      ) : (
                        <X className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--marketing-muted)]" />
                      )}
                      <span className={point.positive ? 'text-[var(--marketing-text)]' : 'text-[var(--marketing-muted)]'}>
                        {point.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
