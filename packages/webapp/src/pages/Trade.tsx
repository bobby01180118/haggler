import AgentFeed from '../components/trade/AgentFeed'
import TradeInput from '../components/trade/TradeInput'

export default function Trade() {
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)]">
      <AgentFeed />
      <TradeInput />
    </div>
  )
}
