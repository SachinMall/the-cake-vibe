/**
 * Central business configuration.
 * Update contact details, links and messages here — every component reads from this file.
 */
export const siteConfig = {
  name: 'The Cake Vibe',
  tagline: 'Homemade cakes in Wada',
  owner: 'Nutan Ambavane',
  description:
    'Discover beautiful homemade cakes by The Cake Vibe. Freshly crafted cakes for birthdays, anniversaries and special occasions, with delivery across Wada.',
  shortBio:
    'A home bakery by Nutan Ambavane — freshly homemade cakes, crafted with love for your special moments.',

  phone: {
    display: '+91 70830 59919',
    tel: '+917083059919',
  },
  /** International format, digits only — used for wa.me links */
  whatsappNumber: '917083059919',

  instagram: {
    handle: 'the_cake.vibes_1107',
    url: 'https://www.instagram.com/the_cake.vibes_1107/',
  },

  address: {
    line1: 'Flat No. 103, Yash Laxmi Apartment',
    line2: 'Vani Aali',
    locality: 'Wada',
    region: 'Maharashtra',
    country: 'India',
    countryCode: 'IN',
  },

  deliveryArea: 'All over Wada',

  whatsappMessages: {
    general: "Hello The Cake Vibe! I'd like to order a cake. Please share the available options.",
    cake: (cakeName: string) =>
      `Hello The Cake Vibe! I'm interested in ordering ${cakeName}. Please share the available sizes, flavours and pricing.`,
    custom:
      'Hello The Cake Vibe! I would like to enquire about a custom cake. Please help me with the available options.',
  },
} as const

export const fullAddress = [
  siteConfig.address.line1,
  siteConfig.address.line2,
  siteConfig.address.locality,
  siteConfig.address.region,
  siteConfig.address.country,
].join(', ')

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'cakes', label: 'Our Cakes' },
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact' },
] as const
