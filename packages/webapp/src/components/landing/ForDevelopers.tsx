import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { Copy, Check, ArrowRight } from 'lucide-react'

const tabs = [
  {
    label: 'MCP',
    eyebrow: 'Best default for MCP-capable agents',
    code: `{
  "mcpServers": {
    "haggler": {
      "command": "npx",
      "args": ["-y", "@haggler/mcp-server"]
    }
  }
}`,
  },
  {
    label: 'SDK',
    eyebrow: 'Embed Haggler in your own runtime',
    code: `import { createHaggler } from '@haggler/core'

const haggler = createHaggler({ demoMode: true })

const result = await haggler.comparePrices(
  "Buy $10000 of ETH",
  console.log
)`,
  },
  {
    label: 'API',
    eyebrow: 'Wrap Haggler behind your own bridge when needed',
    code: `POST /haggler/execute
Content-Type: application/json

{
  "intent": "Buy $10000 of ETH",
  "mode": "quote",
  "returnAuditTrail": true
}`,
  },
]

export default function ForDevelopers({ showHeader = true }: { showHeader?: boolean }) {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const location = useLocation()
  const connectHref = location.pathname === '/developers' ? '#connect' : '/developers#connect'

  const copyCode = () => {
    navigator.clipboard.writeText(tabs[activeTab].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return
    window.localStorage.setItem('haggler-waitlist-email', trimmed)
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section id="developers" className="marketing-section">
      <div className="marketing-shell">
        {showHeader && (
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="marketing-title text-4xl sm:text-5xl text-[var(--marketing-text)] mb-4"
            >
              Connect Haggler to your agent
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[var(--marketing-muted)] text-lg max-w-3xl mx-auto"
            >
              Start with MCP. Drop to the SDK or API only when you need more control.
            </motion.p>
          </div>
        )}

        <motion.div
          id="connect"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="marketing-surface overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--marketing-line)] bg-white">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[var(--marketing-accent)]" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-[var(--marketing-text)]">Integration quickstart</span>
                  <span className="text-[11px] text-[var(--marketing-muted)]">{tabs[activeTab].eyebrow}</span>
                </div>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 text-xs text-[var(--marketing-muted)] hover:text-[var(--marketing-text)] transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="px-5 pt-3 bg-white">
              <div className="flex gap-1 flex-wrap">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                      activeTab === i
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-[var(--marketing-muted)] hover:text-[var(--marketing-text)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <pre className="marketing-terminal m-5 mt-0 p-5 text-sm text-slate-300 font-mono overflow-x-auto leading-relaxed">
              {tabs[activeTab].code}
            </pre>
          </div>

          <div className="mt-4 rounded-3xl border border-slate-100 bg-white/88 px-5 py-4 shadow-sm">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={connectHref}
                  className="marketing-primary-button inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold transition-colors"
                >
                  Connect your agent
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/bobby01180118/haggler"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="marketing-secondary-button inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full transition-colors"
                >
                  View docs
                </a>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row xl:min-w-[460px]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email for integration updates"
                  className="flex-1 rounded-full border border-[var(--marketing-line)] bg-white px-5 py-3 text-sm text-[var(--marketing-text)] placeholder-[var(--marketing-muted)] outline-none focus:border-[var(--marketing-line-strong)] shadow-sm"
                />
                <button
                  type="submit"
                  className="marketing-primary-button px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Get updates
                </button>
              </form>
            </div>

            {submitted && (
              <p className="mt-3 text-sm text-[var(--marketing-muted)]">
                Saved locally for now.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
