const venues = [
  // CEX
  { name: 'Binance', tag: 'CEX', color: '#F0B90B' },
  { name: 'Coinbase', tag: 'CEX', color: '#0052FF' },
  { name: 'OKX', tag: 'CEX', color: '#FFFFFF' },
  { name: 'Bybit', tag: 'CEX', color: '#F7A600' },
  { name: 'Kraken', tag: 'CEX', color: '#7B61FF' },
  // DEX
  { name: 'Uniswap', tag: 'DEX', color: '#FF007A' },
  { name: 'Jupiter', tag: 'DEX', color: '#00D18C' },
  { name: 'PancakeSwap', tag: 'DEX', color: '#D1884F' },
  { name: 'Curve', tag: 'DEX', color: '#FF0000' },
  { name: '1inch', tag: 'DEX', color: '#1B314F' },
  // Broker
  { name: 'Robinhood', tag: 'Broker', color: '#00C805' },
]

export default function Venues() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-sm text-zinc-500 uppercase tracking-widest font-medium mb-12">
          Connected Venues
        </p>

        {/* Venue grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {venues.map((v) => (
            <div
              key={v.name}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold transition-transform group-hover:scale-110"
                style={{
                  background: `${v.color}15`,
                  color: v.color,
                }}
              >
                {v.name.charAt(0)}
              </div>
              <div className="text-center">
                <span className="text-xs font-medium text-zinc-300 block">{v.name}</span>
                <span className="text-[10px] text-zinc-600">{v.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
