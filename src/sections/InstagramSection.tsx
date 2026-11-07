import { motion } from 'framer-motion'
import { InstagramIcon } from '../components/BrandIcons'
import { ButtonLink } from '../components/Button'
import { CakeImage } from '../components/CakeImage'
import { fadeUp, stagger } from '../utils/motion'
import { SectionHeading } from '../components/SectionHeading'
import { cakes, featuredImages } from '../data/cakes'
import { siteConfig } from '../data/siteConfig'
import { external } from '../utils/links'

const altFor = (id: string) => cakes.find((c) => c.images.includes(id as never))?.alt ?? 'Cake by The Cake Vibe'

export function InstagramSection() {
  const follow = (
    <ButtonLink
      href={siteConfig.instagram.url}
      {...external}
      size="lg"
      variant="outline"
      icon={<InstagramIcon size={19} />}
      className="w-full sm:w-auto"
    >
      <span className="min-[380px]:hidden">Follow on Instagram</span>
      <span className="hidden min-[380px]:inline">Follow @{siteConfig.instagram.handle}</span>
    </ButtonLink>
  )

  return (
    <section aria-labelledby="insta-title" className="section bg-white">
      <div className="container-page">
        <SectionHeading
          id="insta-title"
          align="split"
          eyebrow="Instagram"
          title={
            <>
              More sweet moments <span className="text-muted">on Instagram</span>
            </>
          }
          intro="Follow our baking journey and discover more creations."
          aside={<div className="hidden lg:block">{follow}</div>}
        />

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          variants={stagger(0.06)}
          className="mt-8 grid grid-cols-3 gap-1.5 sm:mt-10 sm:gap-3 lg:grid-cols-6"
        >
          {featuredImages.instagram.map((id) => (
            <motion.li key={id} variants={fadeUp}>
              <a
                href={siteConfig.instagram.url}
                {...external}
                aria-label="View more cakes on Instagram"
                className="group relative block overflow-hidden rounded-[0.6rem] sm:rounded-card"
              >
                <CakeImage
                  id={id}
                  alt={altFor(id)}
                  sizes="(min-width: 1024px) 200px, 33vw"
                  fill
                  className="aspect-square"
                  imgClassName="transition-transform duration-[900ms] ease-(--ease-soft) group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-canvas opacity-0 transition-all duration-500 group-hover:bg-ink/30 group-hover:opacity-100">
                  <InstagramIcon size={24} />
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-6 sm:mt-8 lg:hidden">{follow}</div>
      </div>
    </section>
  )
}
