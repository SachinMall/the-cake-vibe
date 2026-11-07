import { motion } from 'framer-motion'
import { Images } from 'lucide-react'
import { type Cake, categories } from '../data/cakes'
import { external, whatsappForCake } from '../utils/links'
import { easeSoft } from '../utils/motion'
import { WhatsAppIcon } from './BrandIcons'
import { CakeImage } from './CakeImage'

interface CakeCardProps {
  cake: Cake
  onOpen: (cake: Cake) => void
}

const categoryLabel = (id: string) => categories.find((c) => c.id === id)?.label

/**
 * Gallery card. The photo is the hero: a uniform square crop with no frame,
 * then a short text block. The card is a flex column so the Order action
 * always sits on the same baseline across a row.
 */
export function CakeCard({ cake, onOpen }: CakeCardProps) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeSoft } },
      }}
      className="group flex h-full flex-col"
    >
      <button
        type="button"
        onClick={() => onOpen(cake)}
        className="relative block w-full cursor-zoom-in overflow-hidden rounded-card bg-mist text-left"
        aria-label={`View ${cake.name}`}
      >
        <CakeImage
          id={cake.images[0]}
          alt={cake.alt}
          sizes="(min-width: 1280px) 290px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, 50vw"
          fill
          objectPosition={cake.coverPosition}
          className="aspect-square w-full"
          imgClassName="transition-transform duration-[900ms] ease-(--ease-soft) group-hover:scale-[1.04]"
        />
        {/* gentle shade so the hover label reads on any photo */}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {cake.images.length > 1 && (
          <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded-full bg-canvas/90 px-2 py-0.5 text-[0.68rem] font-medium text-ink backdrop-blur-sm sm:top-3 sm:right-3 sm:text-xs">
            <Images size={12} strokeWidth={2} aria-hidden="true" />
            {cake.images.length}
            <span className="sr-only">photos</span>
          </span>
        )}
        <span className="absolute bottom-3 left-3 hidden translate-y-1 rounded-full bg-canvas/95 px-3 py-1.5 text-xs font-medium text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:inline-block">
          View details
        </span>
      </button>

      <div className="flex flex-1 flex-col pt-3 sm:pt-4">
        <p className="text-[0.62rem] font-semibold tracking-[0.12em] text-muted uppercase sm:text-[0.66rem]">
          {categoryLabel(cake.categories[0])}
        </p>
        <h3 className="mt-1 font-display text-[1.02rem] leading-snug font-semibold tracking-[-0.015em] text-ink sm:text-[1.2rem]">
          <button
            type="button"
            onClick={() => onOpen(cake)}
            className="text-left transition-colors hover:text-accent"
          >
            {cake.name}
          </button>
        </h3>
        {cake.description && (
          <p className="mt-1 hidden text-[0.875rem] leading-relaxed text-muted sm:line-clamp-2">{cake.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <a
            href={whatsappForCake(cake.name)}
            {...external}
            aria-label={`Order ${cake.name} on WhatsApp`}
            className="inline-flex h-10 items-center gap-1.5 rounded-control border border-line bg-white px-3.5 text-[0.8rem] font-semibold text-ink transition-[background-color,border-color,color,transform] duration-300 hover:border-accent hover:text-accent active:scale-[0.97] sm:px-4 sm:text-[0.85rem]"
          >
            <WhatsAppIcon size={15} />
            Order
          </a>
          {cake.price && <span className="text-sm font-medium text-ink">{cake.price}</span>}
        </div>
      </div>
    </motion.article>
  )
}
