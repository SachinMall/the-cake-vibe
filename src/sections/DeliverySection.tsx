import { motion } from 'framer-motion'
import { MapPin, MessageCircleHeart, PencilRuler } from 'lucide-react'
import { CakeImage } from '../components/CakeImage'
import { Reveal } from '../components/motion'
import { fadeUp, stagger } from '../utils/motion'
import { featuredImages } from '../data/cakes'

const points = [
  { icon: MapPin, title: 'Delivery across Wada', text: 'We deliver to homes and venues all over Wada.' },
  { icon: MessageCircleHeart, title: 'Confirmed on WhatsApp', text: 'Every order is confirmed with you personally over WhatsApp.' },
  { icon: PencilRuler, title: 'Custom requirements welcome', text: 'Theme, message or design in mind? We can discuss it directly.' },
]

/** Continues the How-to-Order section, so it carries only bottom padding. */
export function DeliverySection() {
  return (
    <section aria-labelledby="delivery-title" className="pb-16 sm:pb-20 lg:pb-24">
      <div className="container-page">
        <Reveal className="grid overflow-hidden rounded-panel bg-cocoa text-cream lg:grid-cols-2">
          {/* The text column sets the card height on desktop; the photo is absolutely
              positioned so its natural size can't stretch the card. */}
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:order-2 lg:aspect-auto">
            <CakeImage
              id={featuredImages.delivery}
              alt="Happy Anniversary cake with a Marathi message, decorated with barfi pieces and pistachio"
              sizes="(min-width: 1024px) 640px, 100vw"
              fill
              className="absolute! inset-0 h-full w-full"
              objectPosition="50% 40%"
            />
          </div>
          <div className="px-6 py-9 sm:px-10 sm:py-12 lg:order-1 lg:flex lg:flex-col lg:justify-center lg:px-14 lg:py-16">
            <p className="flex items-center gap-3 text-[0.7rem] font-semibold tracking-[0.22em] text-sand/80 uppercase">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              Delivery
            </p>
            <h2
              id="delivery-title"
              className="mt-3 font-display text-[1.9rem] leading-[1.1] font-normal tracking-[-0.015em] text-balance sm:mt-4 sm:text-[2.4rem]"
            >
              Freshly made, <em className="text-rose-light">delivered with love</em>
            </h2>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              variants={stagger(0.1)}
              className="mt-7 space-y-5 sm:mt-9 sm:space-y-6"
            >
              {points.map(({ icon: Icon, title, text }) => (
                <motion.li key={title} variants={fadeUp} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream/10 text-rose-light">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="mt-0.5 text-[0.925rem] leading-relaxed text-cream/70">{text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
