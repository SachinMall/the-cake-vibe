import { ContactSection } from '../components/ContactSection'
import { AboutSection } from '../sections/AboutSection'
import { CakeCollection } from '../sections/CakeCollection'
import { DeliverySection } from '../sections/DeliverySection'
import { HeroSection } from '../sections/HeroSection'
import { HowToOrder } from '../sections/HowToOrder'
import { InstagramSection } from '../sections/InstagramSection'
import { WhyChooseUs } from '../sections/WhyChooseUs'

export function Home() {
  return (
    <>
      <HeroSection />
      <CakeCollection />
      <WhyChooseUs />
      <AboutSection />
      <HowToOrder />
      <DeliverySection />
      <InstagramSection />
      <ContactSection />
    </>
  )
}
