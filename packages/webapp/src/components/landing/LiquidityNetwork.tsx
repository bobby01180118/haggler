import { motion } from 'framer-motion'

const venues = [
  { name: 'OKX', logo: '/brands/venues/okx.png' },
  { name: 'Binance', logo: '/brands/venues/binance.png' },
  { name: 'Coinbase', logo: '/brands/venues/coinbase.png' },
  { name: 'Kraken', logo: '/brands/venues/kraken.png' },
  { name: 'Bybit', logo: '/brands/venues/bybit.png' },
  { name: 'Hyperliquid', logo: '/brands/venues/hyperliquid.png' },
  { name: 'Deribit', logo: '/brands/venues/deribit.png' },
  { name: '1inch', logo: '/brands/venues/1inch.png' },
  { name: 'Jupiter', logo: '/brands/venues/jupiter.png' },
  { name: 'CoW Swap', logo: '/brands/venues/cow.png' },
  { name: 'ParaSwap', logo: '/brands/venues/paraswap.png' },
  { name: '0x', logo: '/brands/venues/0x.png' },
]

export default function LiquidityNetwork() {
  return (
    <section className="marketing-section">
      <div className="marketing-shell">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="marketing-title text-4xl sm:text-5xl text-[var(--marketing-text)] mb-4"
          >
            Liquidity network
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--marketing-muted)] text-lg max-w-3xl mx-auto"
          >
            Direct execution venues and aggregators.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="marketing-surface rounded-[28px] p-5"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {venues.map((venue) => (
              <div
                key={venue.name}
                className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white px-3 py-4 text-center shadow-sm"
              >
                <div className="mb-2.5 flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-slate-100 bg-white p-2">
                  <img src={venue.logo} alt={venue.name} className="h-full w-full object-contain" />
                </div>
                <span className="text-sm font-medium text-[var(--marketing-text)]">{venue.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
