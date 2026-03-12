import Hero from '../components/landing/Hero'
import HowItWorks from '../components/landing/HowItWorks'
import DemoPreview from '../components/landing/DemoPreview'
import Venues from '../components/landing/Venues'

export default function Landing() {
  return (
    <div>
      <Hero />
      <DemoPreview />
      <HowItWorks />
      <Venues />
    </div>
  )
}
