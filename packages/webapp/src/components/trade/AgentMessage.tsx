import { motion } from 'framer-motion'
import type { AgentStep } from '@haggler/core'
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
          <div className="bg-[#635BFF] text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm">
            {step.message}
          </div>
          <div className="w-7 h-7 rounded-full bg-[#635BFF]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <User className="w-3.5 h-3.5 text-[#635BFF]" />
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
    const isExchange = step.message?.startsWith('Exchange:') || step.message?.startsWith('Best I')
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-2"
      >
        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
          isExchange ? 'bg-amber-500/10' : 'bg-white/8'
        }`}>
          <MessageSquare className={`w-3.5 h-3.5 ${isExchange ? 'text-amber-400' : 'text-[#6B8299]'}`} />
        </div>
        <div className={`px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm max-w-[80%] ${
          isExchange
            ? 'bg-amber-500/10 border border-amber-500/20 text-amber-300'
            : 'bg-[#112E4E] border border-white/10 text-[#A3B8CC]'
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
        step.type === 'result' ? 'bg-[#00D4AA]/10' : 'bg-white/8'
      }`}>
        <Bot className={`w-3.5 h-3.5 ${step.type === 'result' ? 'text-[#00D4AA]' : 'text-[#6B8299]'}`} />
      </div>
      <div className={`px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm max-w-[80%] ${
        step.type === 'result'
          ? 'bg-[#00D4AA]/10 border border-[#00D4AA]/20 text-[#00D4AA]'
          : step.status === 'error'
            ? 'bg-red-500/10 border border-red-500/20 text-red-400'
            : 'bg-[#112E4E] border border-white/10 text-[#A3B8CC]'
      }`}>
        {step.message}
        {step.type === 'result' && typeof step.data === 'string' && (
          <div className="mt-2 text-xs text-[#A3B8CC] font-mono">{step.data}</div>
        )}
      </div>
    </motion.div>
  )
}
