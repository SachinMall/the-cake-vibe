import { Navigation, Phone, MapPin, Truck, User } from 'lucide-react'
import type { ReactNode } from 'react'
import { siteConfig } from '../data/siteConfig'
import { directionsLink, external, telLink, whatsappLink } from '../utils/links'
import { InstagramIcon, WhatsAppIcon } from './BrandIcons'
import { ButtonLink } from './Button'
import { Reveal } from './motion'
import { SectionHeading } from './SectionHeading'

function Row({ icon, label, children, wide }: { icon: ReactNode; label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`flex gap-3.5 border-t border-line py-4 ${wide ? 'sm:col-span-2' : ''}`}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control bg-mist text-ink">{icon}</span>
      <div className="min-w-0">
        <dt className="text-[0.68rem] font-semibold tracking-[0.18em] text-muted uppercase">{label}</dt>
        <dd className="mt-0.5 text-[0.95rem] leading-relaxed break-words text-ink">{children}</dd>
      </div>
    </div>
  )
}

export function ContactSection() {
  const { address } = siteConfig
  return (
    <section id="contact" aria-labelledby="contact-title" className="section bg-mist">
      <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            align="left"
            eyebrow="Contact"
            title={
              <>
                Let's make your <span className="text-muted">celebration</span> sweeter
              </>
            }
            intro="Message us on WhatsApp or give us a call — we'd love to hear what you're celebrating."
          />
          <Reveal delay={0.08} className="mt-7 sm:mt-8">
            <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap">
              <ButtonLink href={whatsappLink()} {...external} size="lg" icon={<WhatsAppIcon size={19} />}>
                Chat on WhatsApp
              </ButtonLink>
              <ButtonLink href={telLink} variant="outline" size="lg" icon={<Phone size={17} strokeWidth={1.75} />}>
                Call Now
              </ButtonLink>
            </div>
            <a
              href={directionsLink}
              {...external}
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-[0.925rem] font-medium text-ink underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              <Navigation size={16} strokeWidth={1.75} className="text-accent" /> Get directions
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="rounded-panel border border-line bg-white px-5 pt-5 pb-1 shadow-soft sm:px-8 sm:pt-7 sm:pb-3">
            <p className="pb-4 font-display text-[1.6rem] leading-tight font-semibold tracking-[-0.015em] text-ink">{siteConfig.name}</p>
            <dl className="grid sm:grid-cols-2 sm:gap-x-8">
              <Row icon={<User size={16} strokeWidth={1.6} />} label="Owner">
                {siteConfig.owner}
              </Row>
              <Row icon={<Phone size={16} strokeWidth={1.6} />} label="Phone & WhatsApp">
                <a href={telLink} className="transition-colors hover:text-accent">
                  {siteConfig.phone.display}
                </a>
              </Row>
              <Row icon={<MapPin size={16} strokeWidth={1.6} />} label="Address" wide>
                {address.line1}, {address.line2}, {address.locality}, {address.region}
              </Row>
              <Row icon={<Truck size={16} strokeWidth={1.6} />} label="Delivery">
                {siteConfig.deliveryArea}
              </Row>
              <Row icon={<InstagramIcon size={16} />} label="Instagram">
                <a href={siteConfig.instagram.url} {...external} className="transition-colors hover:text-accent">
                  @{siteConfig.instagram.handle}
                </a>
              </Row>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
