import { useSettingsStore, getOKXCredentials } from '../store/useSettingsStore'
import { Eye, EyeOff, Shield, Wallet, Lock, Zap, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { okxGetBalance } from '@haggler/core'

type ConnectionStatus = 'idle' | 'testing' | 'success' | 'error'

export default function Settings() {
  const {
    apiKeys, apiSecrets, apiPassphrases, demoMode, slippageTolerance,
    setApiKey, setApiSecret, setApiPassphrase, setDemoMode, setSlippageTolerance,
  } = useSettingsStore()
  const [showFields, setShowFields] = useState<Record<string, boolean>>({})
  const [okxStatus, setOkxStatus] = useState<ConnectionStatus>('idle')
  const [okxError, setOkxError] = useState('')

  const slipPercent = (slippageTolerance * 100).toFixed(1)

  const toggleShow = (key: string) =>
    setShowFields((s) => ({ ...s, [key]: !s[key] }))

  const testOKXConnection = async () => {
    const creds = getOKXCredentials()
    if (!creds) return
    setOkxStatus('testing')
    setOkxError('')
    try {
      await okxGetBalance(creds, 'USDT')
      setOkxStatus('success')
    } catch (err) {
      setOkxStatus('error')
      setOkxError(err instanceof Error ? err.message : 'Connection failed')
    }
  }

  const okxHasAllFields = Boolean(
    apiKeys.okx?.trim() && apiSecrets.okx?.trim() && apiPassphrases.okx?.trim()
  )

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

      {/* OKX — Full credentials */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-semibold text-slate-900">OKX</h2>
          <StatusBadge hasKey={okxHasAllFields} testStatus={okxStatus} />
        </div>
        <div className="flex items-center gap-1.5 mb-5">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <p className="text-xs text-slate-500">Keys stored locally. Never sent to any server.</p>
        </div>

        <div className="space-y-3">
          <CredentialInput label="API Key" value={apiKeys.okx ?? ''} onChange={(v) => setApiKey('okx', v)} show={showFields['okx-key']} onToggle={() => toggleShow('okx-key')} placeholder="Your OKX API key" />
          <CredentialInput label="Secret Key" value={apiSecrets.okx ?? ''} onChange={(v) => setApiSecret('okx', v)} show={showFields['okx-secret']} onToggle={() => toggleShow('okx-secret')} placeholder="Your OKX secret key" />
          <CredentialInput label="Passphrase" value={apiPassphrases.okx ?? ''} onChange={(v) => setApiPassphrase('okx', v)} show={showFields['okx-pass']} onToggle={() => toggleShow('okx-pass')} placeholder="Your OKX API passphrase" />
        </div>

        {okxHasAllFields && (
          <div className="mt-4">
            <button
              onClick={testOKXConnection}
              disabled={okxStatus === 'testing'}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              {okxStatus === 'testing' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
              Test Connection
            </button>
            {okxStatus === 'error' && okxError && (
              <p className="text-xs text-red-500 mt-2">{okxError}</p>
            )}
          </div>
        )}
      </div>

      {/* Binance — API Key + Secret */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-base font-semibold text-yellow-600">Binance</h2>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            apiKeys.binance?.trim() ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'
          }`}>
            {apiKeys.binance?.trim() ? '✅ Connected' : '⭕ Not configured'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 mb-5">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <p className="text-xs text-slate-500">Keys stored locally. Never sent to any server.</p>
        </div>

        <div className="space-y-3">
          <CredentialInput label="API Key" value={apiKeys.binance ?? ''} onChange={(v) => setApiKey('binance', v)} show={showFields['binance-key']} onToggle={() => toggleShow('binance-key')} placeholder="Binance API key" />
          <CredentialInput label="Secret Key" value={apiSecrets.binance ?? ''} onChange={(v) => setApiSecret('binance', v)} show={showFields['binance-secret']} onToggle={() => toggleShow('binance-secret')} placeholder="Binance secret key" />
        </div>
      </div>

      {/* Live DEX */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
        <h2 className="text-base font-semibold text-slate-900 mb-1">Live DEX</h2>
        <p className="text-xs text-slate-500 mb-6">Connect your wallet to trade on decentralized exchanges.</p>
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-600">1inch</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">⭕ Not connected</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors">
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm opacity-60">
        <h2 className="text-base font-semibold text-slate-900 mb-1">Coming Soon</h2>
        <p className="text-xs text-slate-500 mb-5">These exchanges are on the roadmap.</p>
        <div className="space-y-3">
          {['Coinbase', 'Bybit', 'Kraken', 'Uniswap', 'Jupiter', 'PancakeSwap', 'Curve', 'Robinhood'].map((name) => (
            <div key={name} className="flex items-center justify-between py-2 px-3 rounded-xl bg-slate-50">
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-sm text-slate-400 font-medium">{name}</span>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">Coming Soon</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CredentialInput({ label, value, onChange, show, onToggle, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void; placeholder: string
}) {
  return (
    <div>
      <label className="text-xs font-medium text-slate-500 mb-1 block">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-indigo-400 font-mono transition-colors"
        />
        <button onClick={onToggle} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

function StatusBadge({ hasKey, testStatus }: { hasKey: boolean; testStatus: ConnectionStatus }) {
  if (testStatus === 'success') return (
    <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
      <CheckCircle className="w-3 h-3" /> Verified
    </span>
  )
  if (testStatus === 'error') return (
    <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600">
      <XCircle className="w-3 h-3" /> Failed
    </span>
  )
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${hasKey ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
      {hasKey ? '✅ Connected' : '⭕ Not configured'}
    </span>
  )
}
