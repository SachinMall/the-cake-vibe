import { motion } from 'framer-motion'
import { Gift, HeartHandshake, Home, Palette, Truck } from 'lucide-react'
import { fadeUp, stagger } from '../utils/motion'
import { SectionHeading } from '../components/SectionHeading'

const reasons = [
  { icon: Home, title: 'Homemade With Love', text: 'Every cake is baked at home by Nutan Ambavane, with care in every step.' },
  { icon: HeartHandshake, title: 'Freshly Prepared', text: 'Your cake is prepared for your order, so it reaches you fresh for the celebration.' },
  { icon: Palette, title: 'Beautifully Crafted', text: 'Piped rosettes, personal messages and themed designs — finished carefully by hand.' },
  { icon: Gift, title: 'Made for Your Moments', text: 'Birthdays, anniversaries, milestones and everyday treats — tell us what you are celebrating.' },
  { icon: Truck, title: 'Delivered Across Wada', text: 'We bring your cake to your doorstep anywhere in Wada.' },
]

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="section bg-white">
      <div className="container-page">
        <SectionHeading
          id="why-title"
          eyebrow="Why The Cake Vibe"
          title={
            <>
              The little things that make it <em className="text-accent">special</em>
            </>
          }
        />

        {/* Phones: a compact list with hairlines. Large screens: five equal columns divided by hairlines. */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          variants={stagger(0.08)}
          className="mt-8 divide-y divide-line border-y border-line sm:mt-12 sm:grid sm:grid-cols-2 sm:divide-y-0 sm:border-y-0 lg:grid-cols-5 lg:divide-x"
        >
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <motion.li
              key={title}
              variants={fadeUp}
              className={`flex gap-4 py-5 sm:flex-col sm:gap-0 sm:py-6 sm:pr-6 lg:px-6 lg:py-2 lg:first:pl-0 lg:last:pr-0 ${
                i === reasons.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand text-accent-deep">
                <Icon size={19} strokeWidth={1.5} />
              </span>
              <div className="sm:mt-4">
                <h3 className="font-display text-[1.15rem] leading-snug text-cocoa">{title}</h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-pretty text-muted">{text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
