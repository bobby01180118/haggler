import { motion } from 'framer-motion'
import type { AgentStep } from '@arbiter/core'
import VenueCheckStep from './VenueCheckStep'
import ComparisonTable from './ComparisonTable'
import ExecuteConfirm from './ExecuteConfirm'
import { Bot, User, MessageSquare } from 'lucide-react'

interface Props {
  step: AgentStep
}

export default function AgentMessage({ step }: Props) {
  if (step.type === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end"
      >
        <div className="flex items-start gap-2 max-w-[80%]">
          <div className="bg-indigo-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm">
            {step.message}
          </div>
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <User className="w-3.5 h-3.5 text-indigo-600" />
          </div>
        </div>
      </motion.div>
    )
  }

  if (step.type === 'venue-check') {
    return <VenueCheckStep step={step} />
  }

  if (step.type === 'comparison') {
    return <ComparisonTable step={step} />
  }

  if (step.type === 'confirm') {
    return <ExecuteConfirm step={step} />
  }

  if (step.type === 'negotiation') {
    const isExchange = step.message?.startsWith('OKX')
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-2"
      >
        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
          isExchange ? 'bg-amber-50' : 'bg-slate-100'
        }`}>
          <MessageSquare className={`w-3.5 h-3.5 ${isExchange ? 'text-amber-600' : 'text-slate-400'}`} />
        </div>
        <div className={`px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm max-w-[80%] ${
          isExchange
            ? 'bg-amber-50 border border-amber-200 text-amber-800'
            : 'bg-slate-50 border border-slate-200 text-slate-700'
        }`}>
          {step.message}
        </div>
      </motion.div>
    )
  }

  // System message or result
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-2"
    >
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
        step.type === 'result' ? 'bg-emerald-50' : 'bg-slate-100'
      }`}>
        <Bot className={`w-3.5 h-3.5 ${step.type === 'result' ? 'text-emerald-600' : 'text-slate-400'}`} />
      </div>
      <div className={`px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm max-w-[80%] ${
        step.type === 'result'
          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
          : step.status === 'error'
            ? 'bg-red-50 border border-red-200 text-red-700'
            : 'bg-slate-50 border border-slate-200 text-slate-700'
      }`}>
        {step.message}
        {step.type === 'result' && typeof step.data === 'string' && (
          <div className="mt-2 text-xs text-slate-500 font-mono">{step.data}</div>
        )}
      </div>
    </motion.div>
  )
}
