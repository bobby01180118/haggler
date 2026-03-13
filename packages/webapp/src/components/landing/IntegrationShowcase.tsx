import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'

const TABS = [
  {
    label: 'MCP Config',
    lang: 'json',
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
    label: 'Agent Prompt',
    lang: 'text',
    code: `Compare prices for 1 ETH across all exchanges.
If OKX is within 0.5% of best, negotiate for a better rate.
Execute on the best venue.`,
  },
]

export default function IntegrationShowcase() {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(TABS[activeTab].code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-16 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Add to any agent in 30 seconds
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Shadow glow */}
            <div className="absolute -inset-4 bg-indigo-500/5 rounded-3xl blur-2xl" />

            <div className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl">
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-slate-200 hover:bg-red-400 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-slate-200 hover:bg-yellow-400 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-slate-200 hover:bg-green-400 transition-colors" />
                  </div>
                  <span className="text-xs text-slate-400 ml-2 font-mono">haggler</span>
                </div>

                {/* Tabs */}
                <div className="flex gap-1">
                  {TABS.map((tab, i) => (
                    <button
                      key={tab.label}
                      onClick={() => { setActiveTab(i); setCopied(false) }}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                        activeTab === i
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>

              {/* Code content */}
              <div className="p-5 font-mono text-sm min-h-[200px]">
                <pre className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {TABS[activeTab].code}
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
