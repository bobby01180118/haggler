import { AlertTriangle } from 'lucide-react'
import AgentFeed from '../components/trade/AgentFeed'
import TradeInput from '../components/trade/TradeInput'
import { useSettingsStore } from '../store/useSettingsStore'

export default function Trade() {
  const demoMode = useSettingsStore((s) => s.demoMode)

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      {demoMode && (
        <div className="sticky top-0 z-20 flex items-center justify-center gap-2 bg-amber-50 border-b border-amber-200 px-4 py-2 text-sm text-amber-800">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span className="font-medium">DEMO MODE</span>
          <span className="hidden sm:inline">— prices are simulated, no real trades</span>
        </div>
      )}
      <AgentFeed />
      <TradeInput />
    </div>
  )
}
