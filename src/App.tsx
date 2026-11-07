import { MotionConfig } from 'framer-motion'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { WhatsAppButton } from './components/WhatsAppButton'
import { Home } from './pages/Home'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#cakes"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-cocoa focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to cakes
      </a>
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  )
}
