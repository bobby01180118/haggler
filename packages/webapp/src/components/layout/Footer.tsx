import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/8 py-12 bg-[#081C30]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#635BFF] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-[#A3B8CC]">Haggler</span>
          </div>

          <p className="text-sm text-[#6B8299]">
            Your keys stay local. Never custodial.
          </p>

          <p className="text-sm text-[#6B8299]">
            &copy; 2025 Haggler
          </p>
        </div>
      </div>
    </footer>
  )
}
