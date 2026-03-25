import { Link } from 'react-router-dom'
import { Zap, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="marketing-page pt-0">
      <div className="marketing-section py-8 bg-white/70">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-[var(--marketing-text)]">Haggler</span>
            </div>
            <p className="text-sm text-[var(--marketing-muted)] max-w-md">
              The broker layer your agent calls when the job is bigger than a button.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link to="/demo" className="text-[var(--marketing-muted)] hover:text-[var(--marketing-text)] transition-colors">
              Demo
            </Link>
            <Link to="/developers" className="text-[var(--marketing-muted)] hover:text-[var(--marketing-text)] transition-colors">
              Developers
            </Link>
            <Link to="/dashboard" className="text-[var(--marketing-muted)] hover:text-[var(--marketing-text)] transition-colors">
              Dashboard
            </Link>
            <a
              href="https://github.com/bobby01180118/haggler"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[var(--marketing-muted)] hover:text-[var(--marketing-text)] transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>

          <div className="flex items-center gap-3 text-sm text-[var(--marketing-muted)]">
            <Github className="w-4 h-4" />
            <span>&copy; 2026 Haggler</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
