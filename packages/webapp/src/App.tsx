import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

const MARKETING_ROUTES = new Set(['/', '/developers', '/dashboard'])

export default function App() {
  const location = useLocation()
  const isMarketingRoute = MARKETING_ROUTES.has(location.pathname)

  return (
    <div className="min-h-screen flex flex-col bg-[var(--marketing-bg)] text-[var(--marketing-text)]">
      <Navbar />
      <main className={`flex-1 pt-16 ${isMarketingRoute ? 'bg-transparent' : 'bg-white text-slate-900'}`}>
        <Outlet />
      </main>
      {isMarketingRoute && <Footer />}
    </div>
  )
}
