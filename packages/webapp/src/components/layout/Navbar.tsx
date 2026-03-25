import { Link, useLocation } from 'react-router-dom'
import { Zap, Settings, Clock, Github, Code2, LayoutDashboard } from 'lucide-react'

const PRODUCT_ROUTES = new Set(['/demo', '/app', '/trade', '/settings', '/history'])

export default function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  const isProductRoute = PRODUCT_ROUTES.has(pathname)
  const connectHref = pathname === '/' ? '#developers' : '/developers#connect'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className={`${isProductRoute ? 'max-w-6xl px-6' : 'marketing-page pt-4'} mx-auto`}>
        <div
          className={`h-16 flex items-center justify-between gap-4 ${
            isProductRoute
              ? ''
              : 'px-5 border border-[var(--marketing-line)] rounded-[1.35rem] bg-white/80 backdrop-blur-xl shadow-[var(--marketing-shadow)]'
          }`}
        >
          <Link to="/" className="flex items-center gap-2.5 text-lg font-semibold">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className={`${isProductRoute ? 'text-slate-100' : 'text-slate-900'} font-semibold`}>Haggler</span>
          </Link>

          {isProductRoute ? (
            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                to="/"
                className="px-3 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-colors"
              >
                Site
              </Link>
              <Link
                to="/developers"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-white/5 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                Developers
              </Link>
              <Link
                to="/history"
                className={`p-2.5 rounded-full transition-all duration-200 ${
                  pathname === '/history'
                    ? 'text-indigo-300 bg-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                <Clock className="w-4 h-4" />
              </Link>
              <Link
                to="/settings"
                className={`p-2.5 rounded-full transition-all duration-200 ${
                  pathname === '/settings'
                    ? 'text-indigo-300 bg-indigo-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                <Settings className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1">
                <Link
                  to="/demo"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    pathname === '/demo'
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Demo
                </Link>
                <Link
                  to="/developers"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    pathname === '/developers'
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Developers
                </Link>
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    pathname === '/dashboard'
                      ? 'bg-slate-100 text-slate-900'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              </div>
              <a
                href="https://github.com/bobby01180118/haggler"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full transition-all duration-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={connectHref}
                className="marketing-primary-button inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              >
                Connect your agent
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
