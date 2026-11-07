import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, MapPin, Phone } from 'lucide-react'
import { CakeImage } from '../components/CakeImage'
import { WhatsAppIcon } from '../components/BrandIcons'
import { ButtonLink } from '../components/Button'
import { easeSoft } from '../utils/motion'
import { featuredImages } from '../data/cakes'
import { siteConfig } from '../data/siteConfig'
import { external, telLink, whatsappLink } from '../utils/links'

const headline: { text: string; accent?: boolean }[] = [
  { text: 'Every' },
  { text: 'Celebration' },
  { text: 'Deserves' },
  { text: 'a' },
  { text: 'Beautiful', accent: true },
  { text: 'Cake.' },
]

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeSoft } },
}

export function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative pt-20 pb-14 sm:pt-28 sm:pb-20 lg:flex lg:min-h-[min(100svh,860px)] lg:items-center lg:pt-28 lg:pb-16"
    >
      <div className="container-page grid items-center gap-9 sm:gap-12 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          className="lg:col-span-6"
        >
          <motion.p variants={item} className="eyebrow flex items-center gap-3">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            Homemade in Wada
          </motion.p>

          <h1
            id="hero-title"
            className="mt-4 font-display text-[2.4rem] leading-[1.04] font-extrabold tracking-[-0.035em] text-ink min-[380px]:text-[2.65rem] sm:text-[3.4rem] lg:text-[3.35rem] xl:text-[3.9rem]"
          >
            {headline.map((word, i) => (
              <Fragment key={i}>
                {/* mask that each word slides up through */}
                <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <motion.span
                    className={`inline-block ${word.accent ? 'pr-[0.04em] text-accent' : ''}`}
                    variants={{
                      hidden: { y: '105%' },
                      show: { y: 0, transition: { duration: 0.9, ease: easeSoft } },
                    }}
                  >
                    {word.text}
                  </motion.span>
                </span>
                {/* the space lives outside the inline-block so it isn't collapsed */}
                {i < headline.length - 1 && ' '}
              </Fragment>
            ))}
          </h1>

          <motion.p variants={item} className="lede mt-5 max-w-md sm:mt-6 sm:text-lg">
            Freshly homemade cakes, crafted with love by {siteConfig.owner} and delivered to your doorstep across
            Wada.
          </motion.p>

          <motion.div variants={item} className="mt-7 grid grid-cols-1 gap-3 min-[440px]:flex min-[440px]:flex-wrap sm:mt-8">
            <ButtonLink
              href="#cakes"
              size="lg"
              iconRight={<ArrowDown size={17} className="transition-transform duration-300 group-hover:translate-y-0.5" />}
            >
              Explore Our Cakes
            </ButtonLink>
            <ButtonLink href={whatsappLink()} {...external} variant="outline" size="lg" icon={<WhatsAppIcon size={18} />}>
              Order on WhatsApp
            </ButtonLink>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-[0.875rem] text-muted sm:mt-7"
          >
            <li>
              <a href={telLink} className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-ink">
                <Phone size={15} strokeWidth={1.75} className="text-accent" />
                {siteConfig.phone.display}
              </a>
            </li>
            <li className="inline-flex min-h-11 items-center gap-2">
              <MapPin size={15} strokeWidth={1.75} className="text-accent" />
              Delivery across Wada
            </li>
          </motion.ul>
        </motion.div>

        <div className="relative lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: easeSoft }}
            className="relative overflow-hidden rounded-panel bg-mist"
          >
            <CakeImage
              id={featuredImages.hero}
              alt="Rose petal celebration cake with sliced nuts and saffron, made by The Cake Vibe"
              sizes="(min-width: 1280px) 58vw, (min-width: 1024px) 50vw, 100vw"
              priority
              fill
              className="aspect-[5/4] w-full lg:aspect-[6/5.4]"
              objectPosition="50% 55%"
            />
          </motion.div>

          {/* supporting detail photo — sits on the frame edge, desktop/tablet only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeSoft, delay: 0.6 }}
            className="absolute -bottom-8 -left-6 hidden w-[30%] max-w-[210px] rounded-[1.25rem] bg-canvas p-1.5 shadow-lift sm:block lg:-left-10"
          >
            <CakeImage
              id={featuredImages.heroAccent}
              alt="Pink rosette heart cake"
              sizes="210px"
              fill
              className="aspect-square rounded-[0.9rem]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
