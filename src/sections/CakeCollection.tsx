import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { WhatsAppIcon } from '../components/BrandIcons'
import { ButtonLink } from '../components/Button'
import { CakeCard } from '../components/CakeCard'
import { CakeModal } from '../components/CakeModal'
import { Reveal } from '../components/motion'
import { SectionHeading } from '../components/SectionHeading'
import { type Cake, type CategoryId, cakes, categories } from '../data/cakes'
import { external, whatsappForCustomCake } from '../utils/links'

type Filter = 'all' | CategoryId

export function CakeCollection() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Cake | null>(null)

  const filters = useMemo(
    () => [
      { id: 'all' as const, label: 'All Cakes', count: cakes.length },
      ...categories
        .map((c) => ({ ...c, count: cakes.filter((cake) => cake.categories.includes(c.id)).length }))
        .filter((c) => c.count > 0),
    ],
    [],
  )

  const visible = filter === 'all' ? cakes : cakes.filter((c) => c.categories.includes(filter))

  return (
    <section id="cakes" aria-labelledby="cakes-title" className="section">
      <div className="container-page">
        <SectionHeading
          id="cakes-title"
          align="split"
          eyebrow="Our Cake Collection"
          title={
            <>
              <span className="block sm:inline">Baked at home,</span>{' '}
              <em className="text-accent">made for you</em>
            </>
          }
          intro="Cakes we've made for birthdays, anniversaries and everyday celebrations. Tap a cake to see more, then order it on WhatsApp in one message."
        />

        {/* Category filter — sticky, edge-to-edge scroller on phones; a single row on larger screens */}
        <div className="sticky top-16 z-30 -mx-5 mt-8 border-b border-line bg-cream/92 backdrop-blur-md sm:static sm:mx-0 sm:mt-10 sm:bg-transparent sm:backdrop-blur-none">
          <div
            role="tablist"
            aria-label="Filter cakes by category"
            className="flex gap-1 overflow-x-auto px-5 scrollbar-none sm:gap-2 sm:px-0"
          >
            {filters.map((f) => {
              const active = filter === f.id
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className={`relative inline-flex h-12 shrink-0 items-center gap-1.5 px-3 text-[0.875rem] font-medium whitespace-nowrap transition-colors duration-300 sm:px-3.5 ${
                    active ? 'text-cocoa' : 'text-muted hover:text-cocoa'
                  }`}
                >
                  {f.label}
                  <span className={`text-[0.7rem] tabular-nums ${active ? 'text-accent-deep' : 'text-muted/70'}`}>
                    {f.count}
                  </span>
                  {active && (
                    <motion.span
                      layoutId="filter-underline"
                      className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-cocoa sm:inset-x-3.5"
                      transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <motion.div
          key={filter}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -5% 0px' }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
          className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:mt-8 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10 xl:grid-cols-4"
          role="tabpanel"
          aria-label={filters.find((f) => f.id === filter)?.label}
          aria-live="polite"
        >
          {visible.map((cake) => (
            <CakeCard key={cake.id} cake={cake} onOpen={setSelected} />
          ))}
        </motion.div>

        {/* Custom cake call-out */}
        <Reveal className="mt-12 grid grid-cols-1 items-center gap-5 rounded-panel bg-sand px-6 py-8 sm:mt-16 sm:px-10 sm:py-10 md:grid-cols-[1fr_auto] md:gap-10 lg:px-14">
          <div>
            <h3 className="font-display text-[1.6rem] leading-tight text-balance text-cocoa sm:text-[2rem]">
              Have a cake in mind that isn't here?
            </h3>
            <p className="mt-2 max-w-xl leading-relaxed text-pretty text-muted">
              Share your idea, theme or occasion on WhatsApp and we'll talk through what's possible.
            </p>
          </div>
          <ButtonLink
            href={whatsappForCustomCake()}
            {...external}
            size="lg"
            className="w-full md:w-auto"
            icon={<WhatsAppIcon size={19} />}
          >
            <span className="min-[380px]:hidden">Enquire on WhatsApp</span>
            <span className="hidden min-[380px]:inline">Enquire About a Custom Cake</span>
          </ButtonLink>
        </Reveal>
      </div>

      <CakeModal cake={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
