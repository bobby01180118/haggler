import { Link, useLocation } from 'react-router-dom'
import { Zap, Settings } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#0A2540]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 text-lg font-semibold">
          <div className="w-8 h-8 rounded-lg bg-[#635BFF] flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-white">Haggler</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/trade"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              location.pathname === '/trade'
                ? 'bg-[#635BFF]/15 text-[#635BFF]'
                : 'text-[#A3B8CC] hover:text-white hover:bg-white/5'
            }`}
          >
            Trade
          </Link>
          <Link
            to="/settings"
            className={`p-2.5 rounded-full transition-all duration-200 ${
              location.pathname === '/settings'
                ? 'text-[#635BFF] bg-[#635BFF]/15'
                : 'text-[#6B8299] hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
