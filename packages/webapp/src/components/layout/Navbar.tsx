import { Link, useLocation } from 'react-router-dom'
import { Zap, Settings } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/60 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-lg font-semibold">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Zap className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-white">Arbiter</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/trade"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              location.pathname === '/trade'
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Trade
          </Link>
          <Link
            to="/settings"
            className={`p-2.5 rounded-full transition-all duration-200 ${
              location.pathname === '/settings'
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
