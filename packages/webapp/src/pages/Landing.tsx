import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import DemoPreview from '../components/landing/DemoPreview'
import NegotiationDemo from '../components/landing/NegotiationDemo'
import Pricing from '../components/landing/Pricing'
import Venues from '../components/landing/Venues'

export default function Landing() {
  return (
    <div>
      <Hero />
      <NegotiationDemo />
      <DemoPreview />
      <HowItWorks />
      <Pricing />
      <Venues />
    </div>
  )
}
