import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-500" />
          <span>Arbiter</span>
        </div>
        <p>Open source. Your keys stay local.</p>
      </div>
    </footer>
  )
}
