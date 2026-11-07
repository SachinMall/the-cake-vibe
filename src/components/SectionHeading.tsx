import type { ReactNode } from 'react'
import { Reveal } from './motion'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  /**
   * center — stacked and centred.
   * left   — stacked, left aligned.
   * split  — title left, intro/aside right on large screens (stacks left-aligned on mobile).
   */
  align?: 'left' | 'center' | 'split'
  /** Extra content shown beside the intro in `split` mode (e.g. a link or button). */
  aside?: ReactNode
  id?: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
  aside,
  id,
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center'

  const head = (
    <>
      <p className={`eyebrow flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
        <span className="h-px w-6 bg-accent" aria-hidden="true" />
        {eyebrow}
        {centered && <span className="h-px w-6 bg-accent" aria-hidden="true" />}
      </p>
      <h2 id={id} className="heading-section mt-3 text-balance sm:mt-4">
        {title}
      </h2>
    </>
  )

  if (align === 'split') {
    // With an aside (e.g. a button), the intro stays under the title and the aside sits right.
    // Without one, the intro itself becomes the right-hand column.
    const right = aside ?? (intro && <p className="lede max-w-xl">{intro}</p>)
    return (
      <Reveal
        className={`grid gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16 ${className}`}
      >
        <div>
          {head}
          {aside && intro && <p className="lede mt-3 max-w-xl sm:mt-4">{intro}</p>}
        </div>
        {right && <div className={aside ? '' : 'lg:max-w-sm lg:pb-1'}>{right}</div>}
      </Reveal>
    )
  }

  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      {head}
      {intro && <p className={`lede mt-4 ${centered ? 'mx-auto max-w-xl' : 'max-w-xl'}`}>{intro}</p>}
    </Reveal>
  )
}
