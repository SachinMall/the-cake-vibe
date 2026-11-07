import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { easeSoft } from '../utils/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article'
}

/** Fades content gently up once it scrolls into view. Transform + opacity only, so it stays cheap on phones. */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeSoft, delay } },
      }}
    >
      {children}
    </Comp>
  )
}
