import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, Phone, Sparkles, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { type Cake, categories } from '../data/cakes'
import { useBodyScrollLock } from '../hooks/useScrollState'
import { external, telLink, whatsappForCake, whatsappForCustomCake } from '../utils/links'
import { WhatsAppIcon } from './BrandIcons'
import { ButtonLink } from './Button'
import { CakeImage } from './CakeImage'
import { easeSoft } from '../utils/motion'

interface CakeModalProps {
  cake: Cake | null
  onClose: () => void
}

export function CakeModal({ cake, onClose }: CakeModalProps) {
  useBodyScrollLock(cake !== null)
  return (
    <AnimatePresence>
      {cake && <ModalBody key={cake.id} cake={cake} onClose={onClose} />}
    </AnimatePresence>
  )
}

function ModalBody({ cake, onClose }: { cake: Cake; onClose: () => void }) {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const count = cake.images.length

  const go = useCallback(
    (delta: number) => {
      if (count < 2) return
      setDirection(delta)
      setIndex((i) => (i + delta + count) % count)
    },
    [count],
  )

  // focus management + keyboard
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [go, onClose])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1)
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1)
  }

  const labels = cake.categories.map((id) => categories.find((c) => c.id === id)?.label).filter(Boolean)

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-cocoa-deep/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cake-modal-title"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.55, ease: easeSoft }}
        className="relative flex max-h-[94svh] w-full flex-col overflow-hidden rounded-t-panel bg-cream shadow-lift sm:max-h-[90vh] sm:max-w-5xl sm:rounded-panel lg:grid lg:grid-cols-[1.25fr_1fr]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-cream/90 text-cocoa shadow-soft backdrop-blur transition-colors hover:bg-white"
        >
          <X size={20} strokeWidth={1.75} />
        </button>

        {/* Image viewer */}
        <div className="relative shrink-0 overflow-hidden bg-blush">
          <div className="relative h-[46svh] max-h-[560px] sm:h-[52vh] lg:h-full lg:max-h-none lg:min-h-[560px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={cake.images[index]}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                  center: { opacity: 1, x: 0 },
                  exit: (d: number) => ({ opacity: 0, x: d * -60 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: easeSoft }}
                drag={count > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={onDragEnd}
                className="absolute inset-0 touch-pan-y"
              >
                <CakeImage
                  id={cake.images[index]}
                  alt={`${cake.alt}${count > 1 ? ` — photo ${index + 1} of ${count}` : ''}`}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  fill
                  fit="contain"
                  priority
                  className="h-full w-full"
                  imgClassName="pointer-events-none select-none"
                />
              </motion.div>
            </AnimatePresence>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous photo"
                  className="absolute top-1/2 left-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-cocoa shadow-soft backdrop-blur transition hover:bg-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photo"
                  className="absolute top-1/2 right-3 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-cocoa shadow-soft backdrop-blur transition hover:bg-white"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
                  {cake.images.map((id, i) => (
                    <span
                      key={id}
                      aria-hidden="true"
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/60'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10">
          <p className="eyebrow">{labels.join(' · ')}</p>
          <h2 id="cake-modal-title" className="mt-3 font-display text-3xl leading-tight text-cocoa sm:text-4xl">
            {cake.name}
          </h2>
          {cake.description && <p className="mt-4 leading-relaxed text-muted">{cake.description}</p>}
          {cake.price && <p className="mt-4 text-lg font-medium text-cocoa">{cake.price}</p>}

          {count > 1 && (
            <div className="mt-6 flex gap-2 overflow-x-auto scrollbar-none" role="group" aria-label="Choose photo">
              {cake.images.map((id, i) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setDirection(i > index ? 1 : -1)
                    setIndex(i)
                  }}
                  aria-label={`Show photo ${i + 1}`}
                  aria-pressed={i === index}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-cream transition ${
                    i === index ? 'ring-accent-deep' : 'opacity-70 ring-transparent hover:opacity-100'
                  }`}
                >
                  <CakeImage id={id} alt="" sizes="64px" fill className="h-full w-full" />
                </button>
              ))}
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-line bg-white/60 p-4 text-sm leading-relaxed text-muted">
            Sizes, flavours and pricing are shared on WhatsApp — tell us your occasion and we'll help you choose.
          </div>

          <a
            href={whatsappForCustomCake()}
            {...external}
            className="mt-4 inline-flex items-center gap-2 self-start py-2 text-sm text-accent-deep hover:text-cocoa"
          >
            <Sparkles size={15} /> Want something custom? Ask us
          </a>

          <div className="sticky bottom-0 -mx-6 mt-auto flex gap-3 bg-gradient-to-t from-cream from-75% to-cream/0 px-6 pt-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:-mx-8 sm:px-8 sm:pb-8 lg:static lg:mx-0 lg:flex-col lg:bg-none lg:px-0 lg:pt-8 lg:pb-10">
            <ButtonLink
              href={whatsappForCake(cake.name)}
              {...external}
              size="lg"
              icon={<WhatsAppIcon size={20} />}
              className="flex-1"
            >
              Order This Cake
            </ButtonLink>
            <a
              href={telLink}
              aria-label="Call to discuss"
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-cocoa/25 text-cocoa transition-colors hover:bg-cocoa hover:text-cream lg:hidden"
            >
              <Phone size={19} strokeWidth={1.75} />
            </a>
            <span className="hidden lg:block">
              <ButtonLink href={telLink} variant="outline" size="lg" icon={<Phone size={18} strokeWidth={1.75} />} className="w-full">
                Call to Discuss
              </ButtonLink>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
