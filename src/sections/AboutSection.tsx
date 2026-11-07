import { CakeImage } from '../components/CakeImage'
import { Reveal } from '../components/motion'
import { featuredImages } from '../data/cakes'
import { siteConfig } from '../data/siteConfig'

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="section bg-sand">
      <div className="container-page grid items-center gap-9 sm:gap-12 lg:grid-cols-[5fr_6fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-md lg:max-w-none">
          <CakeImage
            id={featuredImages.about}
            alt="Heart-shaped cake with pink piped ruffles, made by Nutan Ambavane"
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 448px, 90vw"
            fill
            className="aspect-[4/3] rounded-panel sm:aspect-[4/5] sm:rounded-t-[12rem]"
            objectPosition="50% 40%"
          />
        </Reveal>

        <div className="max-w-xl">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              About The Cake Vibe
            </p>
            <h2 id="about-title" className="heading-section mt-3 text-balance sm:mt-4">
              A little love in <em className="text-accent">every layer</em>
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lede mt-5 space-y-4 sm:mt-6">
            <p>
              Welcome to The Cake Vibe, a home bakery by {siteConfig.owner}. Every cake is made with care, creativity
              and love, bringing a little extra sweetness to your special moments.
            </p>
            <p>
              From birthday celebrations to anniversaries and custom occasions, we're here to make your celebrations
              memorable.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="mt-7 flex items-center gap-4 border-t border-cocoa/10 pt-6 sm:mt-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream font-display text-lg text-accent-deep">
              NA
            </span>
            <div>
              <p className="font-display text-lg text-cocoa italic">{siteConfig.owner}</p>
              <p className="text-sm text-muted">Owner &amp; baker, The Cake Vibe</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
