import { useState } from 'react'
import manifest from '../data/imageManifest.json'
import type { ImageId } from '../data/cakes'

const WIDTHS = [480, 960, 1440] as const

const imageSrc = (id: ImageId, width: (typeof WIDTHS)[number] = 960) =>
  `/images/cakes/${id}-${width}.webp`

interface CakeImageProps {
  id: ImageId
  alt: string
  /** `sizes` attribute — tells the browser which width to download. */
  sizes: string
  className?: string
  imgClassName?: string
  /** Eager-load and prioritise (above-the-fold images only). */
  priority?: boolean
  /** When true the image fills its parent (object-cover); otherwise keeps natural ratio. */
  fill?: boolean
  objectPosition?: string
  /** contain = show whole photo (detail view) */
  fit?: 'cover' | 'contain'
}

/**
 * Responsive WebP image with intrinsic dimensions (no layout shift),
 * an inline blurred placeholder and a soft fade-in.
 */
export function CakeImage({
  id,
  alt,
  sizes,
  className = '',
  imgClassName = '',
  priority = false,
  fill = false,
  objectPosition = 'center',
  fit = 'cover',
}: CakeImageProps) {
  const meta = manifest[id]
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`relative overflow-hidden bg-blush ${className}`}
      style={{
        aspectRatio: fill ? undefined : `${meta.width} / ${meta.height}`,
        backgroundImage: `url(${meta.placeholder})`,
        backgroundSize: 'cover',
        backgroundPosition: objectPosition,
      }}
    >
      <img
        src={imageSrc(id, 960)}
        srcSet={WIDTHS.map((w) => `${imageSrc(id, w)} ${w}w`).join(', ')}
        sizes={sizes}
        width={meta.width}
        height={meta.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          // cached images can finish before React attaches onLoad
          if (el?.complete && el.naturalWidth > 0) setLoaded(true)
        }}
        style={{ objectPosition }}
        className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} transition-opacity duration-700 ease-(--ease-soft) ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  )
}
