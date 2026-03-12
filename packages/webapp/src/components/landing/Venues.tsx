import { motion } from 'framer-motion'

const venues = [
  // Top 5 CEX
  { name: 'Binance', tag: 'CEX', color: '#F0B90B', icon: 'B' },
  { name: 'OKX', tag: 'CEX', color: '#000000', icon: 'O' },
  { name: 'Coinbase', tag: 'CEX', color: '#0052FF', icon: 'C' },
  { name: 'Bybit', tag: 'CEX', color: '#F7A600', icon: 'By' },
  { name: 'Kraken', tag: 'CEX', color: '#7B61FF', icon: 'K' },
  // Top 5 DEX
  { name: 'Uniswap', tag: 'DEX', color: '#FF007A', icon: 'U' },
  { name: 'Jupiter', tag: 'DEX', color: '#00D18C', icon: 'J' },
  { name: 'PancakeSwap', tag: 'DEX', color: '#D1884F', icon: 'P' },
  { name: 'Curve', tag: 'DEX', color: '#FF0000', icon: 'Cv' },
  { name: '1inch', tag: 'DEX', color: '#1B314F', icon: '1"' },
  // Broker
  { name: 'Robinhood', tag: 'Broker', color: '#00C805', icon: 'R' },
]

export default function Venues() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-slate-400 uppercase tracking-widest font-medium mb-12"
        >
          Connected Venues
        </motion.p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {venues.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-transform group-hover:scale-110"
                style={{
                  background: `${v.color}12`,
                  color: v.color,
                }}
              >
                {v.icon}
              </div>
              <div className="text-center">
                <span className="text-xs font-medium text-slate-700 block">{v.name}</span>
                <span className="text-[10px] text-slate-400">{v.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
