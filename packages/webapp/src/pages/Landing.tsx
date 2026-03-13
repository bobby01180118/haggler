import Hero from '../components/landing/Hero'
import Architecture from '../components/landing/Architecture'
import NegotiationDemo from '../components/landing/NegotiationDemo'
import IntegrationShowcase from '../components/landing/IntegrationShowcase'
import HowItWorks from '../components/landing/HowItWorks'
import Pricing from '../components/landing/Pricing'
import Venues from '../components/landing/Venues'
import DevCTA from '../components/landing/DevCTA'

export default function Landing() {
  return (
    <div>
      <Hero />
      <Architecture />
      <NegotiationDemo />
      <IntegrationShowcase />
      <HowItWorks />
      <Pricing />
      <Venues />
      <DevCTA />
    </div>
  )
}
