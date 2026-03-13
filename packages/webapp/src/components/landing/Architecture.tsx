import { motion } from 'framer-motion'
import { Bot, ArrowRight, Server } from 'lucide-react'

const TOOLS = [
  { name: 'configure', desc: 'Set up credentials' },
  { name: 'compare_prices', desc: 'Scan all venues' },
  { name: 'negotiate_okx', desc: 'Haggle for better rates' },
  { name: 'execute_trade', desc: 'Place the order' },
  { name: 'get_balance', desc: 'Check balances' },
  { name: 'get_supported_tokens', desc: 'List available pairs' },
]

const AGENTS = [
  { name: 'Claude', color: '#D97706' },
  { name: 'GPT', color: '#10B981' },
  { name: 'Your Agent', color: '#635bff' },
]

const EXCHANGES = [
  { name: 'OKX', live: true, color: '#000000' },
  { name: 'Binance', live: true, color: '#F0B90B' },
  { name: '1inch', live: true, color: '#1B314F' },
  { name: 'Coinbase', live: false, color: '#0052FF' },
  { name: 'Bybit', live: false, color: '#F7A600' },
]

export default function Architecture() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
          >
            Your agent's crypto toolkit
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Haggler handles the ugly parts — authentication, rate limiting, data normalization — so your agent just calls tools.
          </motion.p>
        </div>

        {/* Three-column architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1.5fr_auto_1fr] gap-4 lg:gap-2 items-center">

          {/* Left: Your Agent */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <Bot className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Your Agent</span>
            </div>
            <div className="space-y-2">
              {AGENTS.map((agent) => (
                <div key={agent.name} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: agent.color }}
                  >
                    {agent.name[0]}
                  </div>
                  <span className="text-sm font-medium text-slate-700">{agent.name}</span>
                </div>
              ))}
              <p className="text-[11px] text-slate-400 text-center pt-2">Any agent that speaks MCP</p>
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex items-center justify-center text-slate-300"
          >
            <ArrowRight className="w-6 h-6" />
          </motion.div>

          {/* Center: MCP Server */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl border-2 border-indigo-200 shadow-md p-5"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <Server className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-medium text-indigo-500 uppercase tracking-wider">Haggler MCP Server</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className="px-3 py-2.5 rounded-xl bg-indigo-50 border border-indigo-100"
                >
                  <code className="text-xs font-mono font-semibold text-indigo-700 block">{tool.name}</code>
                  <span className="text-[11px] text-indigo-500/70">{tool.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden lg:flex items-center justify-center text-slate-300"
          >
            <ArrowRight className="w-6 h-6" />
          </motion.div>

          {/* Right: Exchanges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Exchanges</span>
            </div>
            <div className="space-y-2">
              {EXCHANGES.map((ex) => (
                <div
                  key={ex.name}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${
                    ex.live ? 'bg-slate-50' : 'bg-slate-50/50 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold"
                      style={{ background: `${ex.color}15`, color: ex.color }}
                    >
                      {ex.name[0]}
                    </div>
                    <span className="text-sm font-medium text-slate-700">{ex.name}</span>
                  </div>
                  {ex.live ? (
                    <span className="text-[10px] font-semibold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Live</span>
                  ) : (
                    <span className="text-[10px] font-medium uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Soon</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
