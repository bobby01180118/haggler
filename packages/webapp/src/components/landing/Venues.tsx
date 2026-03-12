const venues = [
  { name: 'OKX', tag: 'Smart Trading', color: 'text-white' },
  { name: 'Binance', tag: 'Orderbook', color: 'text-yellow-400' },
  { name: '1inch', tag: 'DEX Aggregator', color: 'text-blue-400' },
]

export default function Venues() {
  return (
    <section className="py-16 border-t border-zinc-800/50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-sm text-zinc-500 mb-8 uppercase tracking-wider font-medium">
          Supported Venues
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {venues.map((v) => (
            <div key={v.name} className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <span className={`text-xl font-bold ${v.color}`}>
                  {v.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium text-zinc-300">{v.name}</span>
              <span className="text-xs text-zinc-500">{v.tag}</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-600 mt-8">More venues coming soon — Coinbase, Kraken, Uniswap</p>
      </div>
    </section>
  )
}
