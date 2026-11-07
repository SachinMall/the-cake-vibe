import { fullAddress, siteConfig } from '../data/siteConfig'

/** Builds a wa.me link with an optional, properly URL-encoded pre-filled message. */
export function whatsappLink(message: string = siteConfig.whatsappMessages.general): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const whatsappForCake = (cakeName: string) =>
  whatsappLink(siteConfig.whatsappMessages.cake(cakeName))

export const whatsappForCustomCake = () => whatsappLink(siteConfig.whatsappMessages.custom)

export const telLink = `tel:${siteConfig.phone.tel}`

/** Google Maps directions to the address text — no invented coordinates. */
export const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${siteConfig.name}, ${fullAddress}`,
)}`

/** Props for links that leave the site. */
export const external = { target: '_blank', rel: 'noopener noreferrer' } as const
