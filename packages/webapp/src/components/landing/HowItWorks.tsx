import { MessageSquare, Search, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    title: 'You say what you want',
    description: 'Type a simple command like "Buy 1 ETH at the best price"',
    example: 'Buy 1 ETH best price',
  },
  {
    icon: Search,
    title: 'Arbiter checks every venue',
    description: 'Simultaneously queries OKX Smart Trading, Binance, and 1inch for the best deal',
    example: 'Checking 3 venues...',
  },
  {
    icon: CheckCircle,
    title: 'You get the best deal',
    description: 'See a transparent comparison and execute on the cheapest venue with one click',
    example: 'Save $14 vs Binance',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-50 mb-4">
          How it works
        </h2>
        <p className="text-center text-zinc-500 mb-12">Three steps. Under 10 seconds.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors"
            >
              {/* Step number */}
              <div className="absolute -top-3 -left-1 text-5xl font-bold text-zinc-800/60">
                {i + 1}
              </div>

              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-emerald-500" />
                </div>

                <h3 className="text-lg font-semibold text-zinc-50 mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 mb-4">{step.description}</p>

                {/* Code-style example */}
                <div className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2">
                  <code className="text-xs font-mono text-emerald-400">{step.example}</code>
                </div>
              </div>

              {/* Connecting arrow (hidden on mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 text-zinc-700 z-10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
