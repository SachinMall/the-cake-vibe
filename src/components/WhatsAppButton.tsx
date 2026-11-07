import { AnimatePresence, motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { useScrolledPast } from '../hooks/useScrollState'
import { external, telLink, whatsappLink } from '../utils/links'
import { WhatsAppIcon } from './BrandIcons'
import { easeSoft } from '../utils/motion'

/**
 * Persistent ordering access:
 *  - md+   : floating WhatsApp button, bottom-right, always visible.
 *  - phones: the hero already shows both CTAs, so once the visitor scrolls past it
 *            a bottom action bar (Call + WhatsApp) slides in. Nothing floats over the photos.
 */
export function WhatsAppButton() {
  const scrolled = useScrolledPast(560)

  return (
    <>
      <div className="fixed right-6 bottom-6 z-40 hidden md:block">
        <motion.a
          href={whatsappLink()}
          {...external}
          aria-label="Order on WhatsApp"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: easeSoft, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_28px_-10px_rgb(31_168_85/0.6)]"
        >
          <WhatsAppIcon size={26} />
        </motion.a>
      </div>

      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="action-bar"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.45, ease: easeSoft }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 pb-safe backdrop-blur-xl md:hidden"
          >
            <div className="flex gap-2.5 px-4 py-2.5">
              <a
                href={telLink}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-cocoa/20 bg-white/60 text-[0.925rem] font-medium text-cocoa transition-transform active:scale-[0.97]"
              >
                <Phone size={17} strokeWidth={1.75} /> Call Now
              </a>
              <a
                href={whatsappLink()}
                {...external}
                className="flex h-12 flex-[1.5] items-center justify-center gap-2 rounded-full bg-cocoa text-[0.925rem] font-medium text-cream transition-transform active:scale-[0.97]"
              >
                <WhatsAppIcon size={18} className="text-[#5fd08c]" /> Order on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
