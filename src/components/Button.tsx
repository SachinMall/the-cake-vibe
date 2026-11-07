import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'light' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-cocoa text-cream shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_8px_20px_-12px_rgb(73_53_47/0.6)] hover:bg-cocoa-deep hover:shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_14px_28px_-14px_rgb(73_53_47/0.7)]',
  outline: 'border border-cocoa/20 bg-white/40 text-cocoa hover:border-cocoa/60 hover:bg-white',
  light: 'bg-white text-cocoa shadow-soft hover:bg-cream',
  ghost: 'text-cocoa underline-offset-4 hover:text-accent-deep hover:underline',
}

/* All sizes meet the 44px touch-target minimum except `sm`, used only on desktop chrome. */
const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-[0.875rem] gap-2',
  md: 'h-11 px-5 text-[0.925rem] gap-2',
  lg: 'h-[3.25rem] px-6 text-[0.95rem] gap-2.5',
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconRight?: ReactNode
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  className = '',
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      className={`group inline-flex max-w-full shrink-0 items-center justify-center rounded-full font-medium tracking-[0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-(--ease-soft) hover:-translate-y-px active:translate-y-0 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon}
      <span className="truncate">{children}</span>
      {iconRight}
    </a>
  )
}
