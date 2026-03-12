import { useSettingsStore } from '../store/useSettingsStore'
import { Eye, EyeOff, Shield } from 'lucide-react'
import { useState } from 'react'

const VENUES = [
  { id: 'okx', name: 'OKX Smart Trading', color: 'text-white' },
  { id: 'binance', name: 'Binance', color: 'text-yellow-400' },
  { id: '1inch', name: '1inch (DEX)', color: 'text-blue-400' },
] as const

export default function Settings() {
  const { apiKeys, enabledVenues, demoMode, setApiKey, toggleVenue, setDemoMode } = useSettingsStore()
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-zinc-50 mb-8">Settings</h1>

      {/* Demo Mode */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-zinc-50 mb-1">Demo Mode</h2>
            <p className="text-sm text-zinc-500">Uses simulated data. No API keys required.</p>
          </div>
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              demoMode ? 'bg-emerald-600' : 'bg-zinc-700'
            }`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
              demoMode ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>

      {/* API Keys */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
        <h2 className="text-base font-semibold text-zinc-50 mb-1">API Keys</h2>
        <div className="flex items-center gap-1.5 mb-4">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <p className="text-xs text-zinc-500">Stored locally in your browser. Never sent to any server.</p>
        </div>

        <div className="space-y-4">
          {VENUES.map((v) => (
            <div key={v.id}>
              <label className={`text-sm font-medium ${v.color} mb-1.5 block`}>
                {v.name}
              </label>
              <div className="relative">
                <input
                  type={showKeys[v.id] ? 'text' : 'password'}
                  value={apiKeys[v.id as keyof typeof apiKeys]}
                  onChange={(e) => setApiKey(v.id, e.target.value)}
                  placeholder={`${v.name} API key`}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-50 placeholder-zinc-600 outline-none focus:border-emerald-500/50 font-mono"
                />
                <button
                  onClick={() => setShowKeys((s) => ({ ...s, [v.id]: !s[v.id] }))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showKeys[v.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Venue Selection */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-base font-semibold text-zinc-50 mb-4">Enabled Venues</h2>
        <div className="space-y-3">
          {VENUES.map((v) => (
            <label key={v.id} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={enabledVenues.includes(v.id)}
                onChange={() => toggleVenue(v.id)}
                className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-emerald-500/20"
              />
              <span className={`text-sm ${v.color}`}>{v.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
