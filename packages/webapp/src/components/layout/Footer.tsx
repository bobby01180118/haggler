import { Zap, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-600">Arbiter</span>
          </div>

          <p className="text-sm text-slate-400">
            Open source. Your keys stay local. Never custodial.
          </p>

          <a
            href="https://github.com/lasgg/arbiter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
