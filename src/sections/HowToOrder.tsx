import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { WhatsAppIcon } from '../components/BrandIcons'
import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/motion'
import { fadeUp, stagger } from '../utils/motion'
import { SectionHeading } from '../components/SectionHeading'
import { external, telLink, whatsappLink } from '../utils/links'

const steps = [
  { n: '01', title: 'Explore', text: 'Browse our collection and find your favourite cake.' },
  { n: '02', title: 'Connect', text: 'Contact us through WhatsApp or phone to discuss your requirements.' },
  { n: '03', title: 'Celebrate', text: 'Confirm your order and get your cake delivered across Wada.' },
]

export function HowToOrder() {
  return (
    <section aria-labelledby="order-title" className="section bg-mist">
      <div className="container-page">
        <SectionHeading
          id="order-title"
          eyebrow="How to Order"
          title={
            <>
              Three easy steps to <span className="text-muted">your cake</span>
            </>
          }
          intro="No sign-ups, no forms — just a quick conversation."
        />

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          variants={stagger(0.12)}
          className="relative mx-auto mt-9 grid max-w-5xl gap-6 sm:mt-12 md:grid-cols-3 md:gap-8"
        >
          {/* connecting rule between the numbers (desktop) */}
          <span aria-hidden="true" className="absolute top-7 right-[17%] left-[17%] hidden h-px bg-line md:block" />
          {steps.map((step) => (
            <motion.li
              key={step.n}
              variants={fadeUp}
              className="relative flex items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center"
            >
              <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-white font-display text-base font-bold text-accent">
                {step.n}
              </span>
              <div className="pt-1.5 md:pt-5">
                <h3 className="font-display text-[1.3rem] leading-snug font-semibold tracking-[-0.015em] text-ink">{step.title}</h3>
                <p className="mt-1 max-w-xs text-[0.95rem] leading-relaxed text-muted">{step.text}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        <Reveal className="mt-9 grid grid-cols-1 gap-3 sm:mt-12 sm:flex sm:justify-center">
          <ButtonLink href={whatsappLink()} {...external} size="lg" icon={<WhatsAppIcon size={19} />}>
            <span className="min-[360px]:hidden">Order on WhatsApp</span>
            <span className="hidden min-[360px]:inline">Start Your Order on WhatsApp</span>
          </ButtonLink>
          <ButtonLink href={telLink} variant="outline" size="lg" icon={<Phone size={17} strokeWidth={1.75} />}>
            Call Now
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  )
}
