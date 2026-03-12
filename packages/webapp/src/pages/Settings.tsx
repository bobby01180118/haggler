import { useSettingsStore } from '../store/useSettingsStore'
import { Eye, EyeOff, Shield } from 'lucide-react'
import { useState } from 'react'

const VENUE_GROUPS = [
  {
    label: 'Centralized Exchanges',
    venues: [
      { id: 'binance', name: 'Binance', color: 'text-yellow-400' },
      { id: 'coinbase', name: 'Coinbase', color: 'text-blue-400' },
      { id: 'okx', name: 'OKX', color: 'text-white' },
      { id: 'bybit', name: 'Bybit', color: 'text-amber-400' },
      { id: 'kraken', name: 'Kraken', color: 'text-violet-400' },
    ],
  },
  {
    label: 'DEX Aggregators',
    venues: [
      { id: 'uniswap', name: 'Uniswap', color: 'text-pink-400' },
      { id: 'jupiter', name: 'Jupiter', color: 'text-[#00D4AA]' },
      { id: 'pancakeswap', name: 'PancakeSwap', color: 'text-orange-400' },
      { id: 'curve', name: 'Curve', color: 'text-red-400' },
      { id: '1inch', name: '1inch', color: 'text-[#A3B8CC]' },
    ],
  },
  {
    label: 'Brokers',
    venues: [
      { id: 'robinhood', name: 'Robinhood', color: 'text-green-400' },
    ],
  },
]

const ALL_VENUES = VENUE_GROUPS.flatMap((g) => g.venues)

export default function Settings() {
  const { apiKeys, enabledVenues, demoMode, setApiKey, toggleVenue, setDemoMode } = useSettingsStore()
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-white mb-8">Settings</h1>

      {/* Demo Mode */}
      <div className="surface-card p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white mb-1">Demo Mode</h2>
            <p className="text-sm text-[#A3B8CC]">Uses simulated data. No API keys required.</p>
          </div>
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              demoMode ? 'bg-[#635BFF]' : 'bg-white/15'
            }`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              demoMode ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>

      {/* API Keys */}
      <div className="surface-card p-6 mb-6">
        <h2 className="text-base font-semibold text-white mb-1">API Keys</h2>
        <div className="flex items-center gap-1.5 mb-6">
          <Shield className="w-3.5 h-3.5 text-[#00D4AA]" />
          <p className="text-xs text-[#6B8299]">Stored locally in your browser. Never sent to any server.</p>
        </div>

        <div className="space-y-4">
          {ALL_VENUES.map((v) => (
            <div key={v.id}>
              <label className={`text-sm font-medium ${v.color} mb-1.5 block`}>
                {v.name}
              </label>
              <div className="relative">
                <input
                  type={showKeys[v.id] ? 'text' : 'password'}
                  value={apiKeys[v.id] ?? ''}
                  onChange={(e) => setApiKey(v.id, e.target.value)}
                  placeholder={`${v.name} API key`}
                  className="w-full bg-[#112E4E] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#6B8299] outline-none focus:border-[#635BFF]/50 font-mono transition-colors"
                />
                <button
                  onClick={() => setShowKeys((s) => ({ ...s, [v.id]: !s[v.id] }))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6B8299] hover:text-white"
                >
                  {showKeys[v.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Venue Selection */}
      <div className="surface-card p-6">
        <h2 className="text-base font-semibold text-white mb-6">Enabled Venues</h2>
        <div className="space-y-6">
          {VENUE_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="text-xs text-[#6B8299] uppercase tracking-wider font-medium mb-3">{group.label}</p>
              <div className="space-y-2.5">
                {group.venues.map((v) => (
                  <label key={v.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={enabledVenues.includes(v.id)}
                      onChange={() => toggleVenue(v.id)}
                      className="w-4 h-4 rounded border-white/20 bg-[#112E4E] text-[#635BFF] focus:ring-[#635BFF]/20"
                    />
                    <span className={`text-sm ${v.color} group-hover:opacity-80 transition-all`}>
                      {v.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
