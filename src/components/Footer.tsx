import { MapPin, Phone } from 'lucide-react'
import { navLinks, siteConfig } from '../data/siteConfig'
import { external, telLink, whatsappLink } from '../utils/links'
import { CakeMark, InstagramIcon, WhatsAppIcon } from './BrandIcons'

const year = new Date().getFullYear()

const iconLink =
  'flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream/80 transition-colors hover:border-rose-light hover:text-rose-light'

export function Footer() {
  const { address } = siteConfig
  return (
    // extra bottom padding on phones clears the fixed WhatsApp / Call bar
    <footer className="bg-cocoa-deep pb-[calc(5rem+env(safe-area-inset-bottom))] text-cream/75 md:pb-0">
      <div className="container-page grid gap-9 py-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.4fr_0.8fr_1.2fr] lg:py-16">
        <div>
          <a href="#home" className="inline-flex items-center gap-2.5 text-cream">
            <CakeMark size={28} className="text-rose-light" />
            <span className="font-display text-[1.4rem] leading-none">
              The Cake <em className="text-rose-light">Vibe</em>
            </span>
          </a>
          <p className="mt-4 max-w-sm text-[0.925rem] leading-relaxed text-cream/60">{siteConfig.shortBio}</p>
          <div className="mt-5 flex gap-2">
            <a href={siteConfig.instagram.url} {...external} aria-label="Instagram" className={iconLink}>
              <InstagramIcon size={18} />
            </a>
            <a href={whatsappLink()} {...external} aria-label="WhatsApp" className={iconLink}>
              <WhatsAppIcon size={18} />
            </a>
            <a href={telLink} aria-label="Call" className={iconLink}>
              <Phone size={17} strokeWidth={1.6} />
            </a>
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-rose-light uppercase">Explore</p>
          <ul className="mt-3 flex flex-wrap gap-x-6 sm:mt-4 sm:block">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="inline-flex min-h-11 items-center transition-colors hover:text-cream sm:min-h-10">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-[0.68rem] font-semibold tracking-[0.22em] text-rose-light uppercase">Get in touch</p>
          <ul className="mt-3 space-y-1 sm:mt-4">
            <li>
              <a href={telLink} className="inline-flex min-h-11 items-center gap-3 transition-colors hover:text-cream">
                <Phone size={16} strokeWidth={1.6} className="text-rose-light" /> {siteConfig.phone.display}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                {...external}
                className="inline-flex min-h-11 items-center gap-3 transition-colors hover:text-cream"
              >
                <WhatsAppIcon size={16} className="text-rose-light" /> Order on WhatsApp
              </a>
            </li>
            <li className="flex gap-3 pt-2">
              <MapPin size={16} strokeWidth={1.6} className="mt-1 shrink-0 text-rose-light" />
              <span className="leading-relaxed">
                {address.line1}, {address.line2}, {address.locality}
                <span className="block text-cream/50">Delivery: {siteConfig.deliveryArea}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col gap-1 py-5 text-[0.8rem] text-cream/45 sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Homemade with love in Wada.</p>
        </div>
      </div>
    </footer>
  )
}
