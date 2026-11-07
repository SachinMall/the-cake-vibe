import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks, siteConfig } from '../data/siteConfig'
import { useActiveSection, useBodyScrollLock, useScrolledPast } from '../hooks/useScrollState'
import { external, telLink, whatsappLink } from '../utils/links'
import { CakeMark, InstagramIcon, WhatsAppIcon } from './BrandIcons'
import { ButtonLink } from './Button'
import { easeSoft } from '../utils/motion'

const sectionIds = navLinks.map((l) => l.id)

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <a href="#home" onClick={onClick} className="flex items-center gap-2.5 text-ink" aria-label={`${siteConfig.name} — home`}>
      <CakeMark size={28} className="text-accent" />
      <span className="font-display text-[1.15rem] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap min-[360px]:text-[1.25rem] sm:text-[1.35rem]">
        The Cake <span className="text-accent">Vibe</span>
      </span>
    </a>
  )
}

export function Navbar() {
  const scrolled = useScrolledPast(16)
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  useBodyScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: easeSoft }}
        className={`transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? 'border-b border-line bg-canvas/90 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="container-page flex h-16 items-center justify-between gap-4 sm:h-20" aria-label="Main">
          <Brand onClick={close} />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className="relative rounded-control px-4 py-2 text-[0.925rem] font-medium text-muted transition-colors hover:text-ink aria-[current]:text-ink"
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-4 -bottom-0.5 h-px bg-accent"
                      transition={{ duration: 0.5, ease: easeSoft }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={siteConfig.instagram.url}
              {...external}
              aria-label="The Cake Vibe on Instagram"
              className="hidden h-11 w-11 items-center justify-center rounded-control text-ink transition-colors hover:bg-mist sm:flex"
            >
              <InstagramIcon size={20} />
            </a>
            <span className="hidden sm:block">
              <ButtonLink href={whatsappLink()} {...external} size="sm" icon={<WhatsAppIcon size={17} />} className="lg:h-11 lg:px-5">
                Order on WhatsApp
              </ButtonLink>
            </span>
            <a
              href={whatsappLink()}
              {...external}
              aria-label="Order on WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-control bg-ink-deep text-white transition-transform active:scale-95 sm:hidden"
            >
              <WhatsAppIcon size={19} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-11 w-11 items-center justify-center rounded-control text-ink transition-colors hover:bg-mist lg:hidden"
            >
              {open ? <X size={22} strokeWidth={1.6} /> : <Menu size={22} strokeWidth={1.6} />}
            </button>
          </div>
        </nav>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto bg-canvas sm:top-20 lg:hidden"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
              className="container-page flex min-h-full flex-col pt-8 pb-10"
            >
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeSoft } } }}
                    className="border-b border-line"
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={close}
                      className="flex items-baseline gap-4 py-4 font-display text-[1.6rem] leading-none font-bold tracking-[-0.03em] text-ink"
                    >
                      <span className="font-sans text-xs font-semibold tracking-widest text-accent">0{i + 1}</span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeSoft } } }}
                className="mt-auto flex flex-col gap-3 pt-10"
              >
                <ButtonLink href={whatsappLink()} {...external} size="lg" icon={<WhatsAppIcon size={20} />} onClick={close}>
                  Order on WhatsApp
                </ButtonLink>
                <ButtonLink href={telLink} variant="outline" size="lg" icon={<Phone size={18} strokeWidth={1.75} />}>
                  Call {siteConfig.phone.display}
                </ButtonLink>
                <a
                  href={siteConfig.instagram.url}
                  {...external}
                  className="mt-3 flex items-center justify-center gap-2 py-2 text-sm text-muted"
                >
                  <InstagramIcon size={18} /> @{siteConfig.instagram.handle}
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
