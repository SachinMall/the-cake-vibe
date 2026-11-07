import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'light' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  primary:
    'bg-ink-deep text-white hover:bg-ink active:bg-black',
  outline: 'border border-line bg-white text-ink hover:border-ink-deep/40 hover:bg-mist',
  light: 'bg-white text-ink border border-line hover:bg-mist',
  ghost: 'text-ink underline-offset-4 hover:text-accent hover:underline',
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
      className={`group inline-flex max-w-full shrink-0 items-center justify-center rounded-control font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-(--ease-soft) hover:-translate-y-px active:translate-y-0 active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon}
      <span className="truncate">{children}</span>
      {iconRight}
    </a>
  )
}
