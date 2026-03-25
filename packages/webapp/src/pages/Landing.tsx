import Hero from '../components/landing/Hero'
import ThreeEras from '../components/landing/ThreeEras'
import ProofPoint from '../components/landing/ProofPoint'
import ArchitectureDiagram from '../components/landing/ArchitectureDiagram'
import WhatYouCanSay from '../components/landing/WhatYouCanSay'
import OnChainVerification from '../components/landing/OnChainVerification'
import LiquidityNetwork from '../components/landing/LiquidityNetwork'
import ForDevelopers from '../components/landing/ForDevelopers'

export default function Landing() {
  return (
    <div className="marketing-page">
      <Hero />
      <ThreeEras />
      <ProofPoint />
      <ArchitectureDiagram />
      <WhatYouCanSay />
      <OnChainVerification />
      <LiquidityNetwork />
      <ForDevelopers />
    </div>
  )
}
