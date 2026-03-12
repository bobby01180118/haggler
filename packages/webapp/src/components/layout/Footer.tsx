import { Zap, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-sm font-medium text-zinc-400">Arbiter</span>
          </div>

          <p className="text-sm text-zinc-600">
            Open source. Your keys stay local. Never custodial.
          </p>

          <a
            href="https://github.com/lasgg/arbiter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
