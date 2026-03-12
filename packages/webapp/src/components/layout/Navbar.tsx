import { Link, useLocation } from 'react-router-dom'
import { Zap, Settings } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
          <Zap className="w-5 h-5 text-emerald-500" />
          <span>Arbiter</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/trade"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === '/trade'
                ? 'bg-emerald-500/10 text-emerald-500'
                : 'text-zinc-400 hover:text-zinc-50'
            }`}
          >
            Trade
          </Link>
          <Link
            to="/settings"
            className={`p-2 rounded-lg transition-colors ${
              location.pathname === '/settings'
                ? 'text-emerald-500'
                : 'text-zinc-400 hover:text-zinc-50'
            }`}
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
