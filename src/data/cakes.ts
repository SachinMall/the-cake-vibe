/**
 * Cake collection.
 *
 * Every entry uses the owner's real photographs (see raw-photos/ and
 * scripts/process-images.py). Several cakes were photographed from more than
 * one angle — those angles are grouped under one cake and shown in the
 * detail view instead of repeating the cake in the gallery.
 *
 * Names and descriptions below are written from what is visible in each photo.
 * Edit them freely. `price` is optional and only shown when filled in — no
 * prices have been provided yet, so none are listed.
 */
import manifest from './imageManifest.json'

export type ImageId = keyof typeof manifest

export const categories = [
  { id: 'chocolate', label: 'Chocolate' },
  { id: 'celebration', label: 'Celebration' },
  { id: 'designer', label: 'Designer & Theme' },
  { id: 'fusion', label: 'Indian Fusion' },
  { id: 'fruit-cream', label: 'Fruit & Cream' },
  { id: 'tea-time', label: 'Tea-Time & Cupcakes' },
] as const

export type CategoryId = (typeof categories)[number]['id']

export interface Cake {
  id: string
  name: string
  description?: string
  /** Display string, e.g. "₹650 / 500 g". Leave undefined to hide. */
  price?: string
  categories: CategoryId[]
  /** First image is the cover. */
  images: ImageId[]
  /** Describes the photo for screen readers and SEO. */
  alt: string
  /** Focal point for the square gallery crop of the cover photo (CSS object-position). */
  coverPosition?: string
}

export const cakes: Cake[] = [
  {
    id: 'pink-rosette-heart',
    name: 'Pink Rosette Heart Cake',
    description: 'A heart-shaped cake covered in hand-piped pink ruffles, finished with silver pearls.',
    categories: ['designer', 'celebration'],
    images: ['cake-03', 'cake-01', 'cake-04'],
    alt: 'Heart-shaped cake covered in pink piped rosette ruffles on a floral plate',
  },
  {
    id: 'rose-petal-celebration',
    name: 'Rose Petal Celebration Cake',
    description: 'A cream cake topped with fresh rose petals, chopped dry fruits and saffron strands.',
    categories: ['fusion', 'celebration'],
    images: ['cake-19'],
    alt: 'Cream cake decorated with red rose petals, sliced nuts and saffron',
  },
  {
    id: 'black-forest-classic',
    name: 'Classic Black Forest Cake',
    description: 'Whipped cream swirls, red cherries and a heap of chocolate shavings.',
    categories: ['chocolate'],
    images: ['cake-09'],
    alt: 'Round black forest cake with cream rosettes, red cherries and chocolate shavings',
  },
  {
    id: 'chocolate-ganache',
    name: 'Chocolate Ganache Cake',
    description: 'A glossy chocolate top framed by whipped cream piping and chocolate shards.',
    categories: ['chocolate'],
    images: ['cake-08', 'cake-12'],
    alt: 'Chocolate ganache cake with a white whipped cream border and chocolate shards',
  },
  {
    id: 'chocolate-heart',
    name: 'Chocolate Heart Cake',
    description: 'A heart-shaped chocolate cake dressed with chocolates, truffles and cherries.',
    categories: ['chocolate', 'designer'],
    images: ['cake-15'],
    alt: 'Heart-shaped dark chocolate cake topped with chocolate bars, truffles and cherries',
  },
  {
    id: 'mango-rava',
    name: 'Mango Rava Cake',
    description: 'Topped with fresh mango cubes and sliced almonds.',
    categories: ['fruit-cream', 'fusion', 'tea-time'],
    images: ['cake-11', 'cake-17'],
    alt: 'Mango rava cake topped with fresh mango cubes and sliced almonds',
  },
  {
    id: 'anniversary-barfi',
    name: 'Happy Anniversary Cake',
    description:
      'A personalised anniversary cake with a Marathi message, barfi pieces with silver leaf and pistachio.',
    categories: ['celebration', 'fusion'],
    images: ['cake-26', 'cake-25', 'cake-32', 'cake-23', 'cake-27'],
    alt: 'White cream anniversary cake with green piped Happy Anniversary message and barfi pieces',
  },
  {
    id: 'car-theme',
    name: 'Car Theme Cake',
    description: 'A playful car-shaped cake piped entirely by hand — a favourite for little ones.',
    categories: ['designer', 'celebration'],
    images: ['cake-21', 'cake-30'],
    alt: 'Car-shaped cake piped in cream with chocolate wheels and headlights',
  },
  {
    id: 'krishna-birthday',
    name: 'Little Krishna Birthday Cake',
    description: 'A birthday cake with a Little Krishna topper, peacock feather and rose petals.',
    categories: ['designer', 'celebration'],
    images: ['cake-28'],
    alt: 'Birthday cake with a Little Krishna topper, peacock feather and rose petals',
    coverPosition: '50% 30%',
  },
  {
    id: 'milestone-65',
    name: 'Milestone Birthday Cake',
    description: 'A golden glazed cream cake with the milestone number piped on top.',
    categories: ['celebration', 'fruit-cream'],
    images: ['cake-31'],
    alt: 'Round cream cake with golden glaze and the number 65 piped on top',
  },
  {
    id: 'personalised-chocolate',
    name: 'Personalised Chocolate Cake',
    description: 'Chocolate cake with a name piped on top, chocolate pearls and cream border.',
    categories: ['chocolate', 'celebration'],
    images: ['cake-10'],
    alt: 'Round chocolate cake with a name piped in white and chocolate pearls',
  },
  {
    id: 'pista-dry-fruit',
    name: 'Pista Green Dry Fruit Cake',
    description: 'A pastel green cream cake loaded with chopped dry fruits and saffron.',
    categories: ['fusion'],
    images: ['cake-20', 'cake-29'],
    alt: 'Pastel green cream cake topped with chopped dry fruits and saffron',
  },
  {
    id: 'golden-heart',
    name: 'Golden Heart Cream Cake',
    description: 'A heart-shaped cream cake with a golden glaze and cherries.',
    categories: ['fruit-cream', 'designer'],
    images: ['cake-14'],
    alt: 'Heart-shaped cream cake with a golden yellow glaze and red cherries',
  },
  {
    id: 'black-forest-square',
    name: 'Square Black Forest Cake',
    description: 'A square black forest cake with chocolate curls and cherries.',
    categories: ['chocolate'],
    images: ['cake-22'],
    alt: 'Square black forest cake with chocolate curls, cherries and whipped cream',
  },
  {
    id: 'royal-dry-fruit-square',
    name: 'Royal Dry Fruit Square Cake',
    description: 'A square cream cake with dry fruits, saffron and delicate piping.',
    categories: ['fusion'],
    images: ['cake-24'],
    alt: 'Square cream cake with yellow and green tones topped with dry fruits',
  },
  {
    id: 'golden-cream',
    name: 'Golden Cream Cake',
    description: 'Cream rosettes around a bright golden glaze.',
    categories: ['fruit-cream'],
    images: ['cake-18'],
    alt: 'Round cream cake with whipped cream rosettes around a golden glaze',
  },
  {
    id: 'chocolate-pearl',
    name: 'Chocolate Pearl Cake',
    description: 'Chocolate cake with whipped cream florets and chocolate pearls.',
    categories: ['chocolate'],
    images: ['cake-06'],
    alt: 'Chocolate cake with white cream florets and chocolate pearls',
  },
  {
    id: 'chocolate-almond',
    name: 'Chocolate Almond Cake',
    description: 'A homestyle chocolate cake topped with sliced almonds.',
    categories: ['chocolate', 'tea-time'],
    images: ['cake-13'],
    alt: 'Homestyle chocolate cake topped with sliced almonds',
  },
  {
    id: 'heart-cookie-cupcakes',
    name: 'Heart Cookie Cupcakes',
    description: 'Chocolate cupcakes with green swirls, each topped with a heart-shaped cookie.',
    categories: ['tea-time', 'designer'],
    images: ['cake-05', 'cake-02'],
    alt: 'Three chocolate cupcakes with green frosting and heart-shaped cookies',
  },
  {
    id: 'homestyle-tea-cake',
    name: 'Homestyle Tea Cake',
    description: 'A soft, simple tea-time cake with a sprinkled top.',
    categories: ['tea-time'],
    images: ['cake-07', 'cake-16'],
    alt: 'Round homestyle tea cake with a sprinkled top',
  },
]

/** Photos used outside the gallery. */
export const featuredImages = {
  hero: 'cake-19',
  heroAccent: 'cake-03',
  about: 'cake-01',
  delivery: 'cake-26',
  instagram: ['cake-09', 'cake-28', 'cake-21', 'cake-11', 'cake-15', 'cake-24'],
} satisfies Record<string, ImageId | ImageId[]>
