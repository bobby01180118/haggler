import { useSettingsStore } from '../store/useSettingsStore'
import { Eye, EyeOff, Shield, Wallet, Lock } from 'lucide-react'
import { useState } from 'react'

const LIVE_EXCHANGES = [
  { id: 'okx', name: 'OKX', color: 'text-slate-900' },
  { id: 'binance', name: 'Binance', color: 'text-yellow-600' },
]

const LIVE_DEX = [
  { id: '1inch', name: '1inch', color: 'text-slate-600' },
]

const COMING_SOON = [
  { id: 'coinbase', name: 'Coinbase', color: 'text-blue-600' },
  { id: 'bybit', name: 'Bybit', color: 'text-amber-600' },
  { id: 'kraken', name: 'Kraken', color: 'text-violet-600' },
  { id: 'uniswap', name: 'Uniswap', color: 'text-pink-600' },
  { id: 'jupiter', name: 'Jupiter', color: 'text-emerald-600' },
  { id: 'pancakeswap', name: 'PancakeSwap', color: 'text-orange-600' },
  { id: 'curve', name: 'Curve', color: 'text-red-600' },
  { id: 'robinhood', name: 'Robinhood', color: 'text-green-600' },
]

export default function Settings() {
  const {
    apiKeys, demoMode, slippageTolerance,
    setApiKey, setDemoMode, setSlippageTolerance,
  } = useSettingsStore()
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  const slipPercent = (slippageTolerance * 100).toFixed(1)

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Settings</h1>

      {/* Demo Mode */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 mb-1">Demo Mode</h2>
            <p className="text-sm text-slate-500">
              {demoMode
                ? 'Prices are simulated. No API keys required.'
                : 'Live mode — real prices from connected exchanges.'}
            </p>
          </div>
          <button
            onClick={() => setDemoMode(!demoMode)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              demoMode ? 'bg-indigo-600' : 'bg-slate-200'
            }`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
              demoMode ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>

      {/* Slippage Tolerance */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900 mb-1">Slippage Tolerance</h2>
            <p className="text-sm text-slate-500">Max price deviation you're willing to accept.</p>
          </div>
          <span className="text-lg font-semibold text-indigo-600 tabular-nums">{slipPercent}%</span>
        </div>
        <input
          type="range"
          min={0.001}
          max={0.05}
          step={0.001}
          value={slippageTolerance}
          onChange={(e) => setSlippageTolerance(parseFloat(e.target.value))}
          className="w-full h-2 rounded-full appearance-none bg-slate-200 accent-indigo-600 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1.5">
          <span>0.1%</span>
          <span>5.0%</span>
        </div>
      </div>

      {/* Live Exchanges */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900 mb-1">Live Exchanges</h2>
        <div className="flex items-center gap-1.5 mb-6">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <p className="text-xs text-slate-500">Keys stored locally. Never sent to any server.</p>
        </div>

        <div className="space-y-5">
          {LIVE_EXCHANGES.map((v) => {
            const hasKey = Boolean(apiKeys[v.id]?.trim())
            return (
              <div key={v.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={`text-sm font-medium ${v.color}`}>{v.name}</label>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    hasKey
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {hasKey ? '✅ Connected' : '⭕ Not configured'}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showKeys[v.id] ? 'text' : 'password'}
                    value={apiKeys[v.id] ?? ''}
                    onChange={(e) => setApiKey(v.id, e.target.value)}
                    placeholder={`${v.name} API key`}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-400 font-mono transition-colors"
                  />
                  <button
                    onClick={() => setShowKeys((s) => ({ ...s, [v.id]: !s[v.id] }))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showKeys[v.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Live DEX */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900 mb-1">Live DEX</h2>
        <p className="text-xs text-slate-500 mb-6">Connect your wallet to trade on decentralized exchanges.</p>

        {LIVE_DEX.map((v) => (
          <div key={v.id}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-medium ${v.color}`}>{v.name}</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">
                ⭕ Not connected
              </span>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          </div>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm opacity-60">
        <h2 className="text-base font-semibold text-slate-900 mb-1">Coming Soon</h2>
        <p className="text-xs text-slate-500 mb-5">These venues are on the roadmap.</p>

        <div className="space-y-3">
          {COMING_SOON.map((v) => (
            <div key={v.id} className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-sm text-slate-400 font-medium">{v.name}</span>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">
                Coming Soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
