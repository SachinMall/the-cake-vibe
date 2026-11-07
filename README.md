# The Cake Vibe — Website

Website for **The Cake Vibe**, a home bakery in Wada by Nutan Ambavane.
Built with React, Vite, TypeScript, Tailwind CSS v4, Framer Motion and Lucide icons.

## Run it

```bash
npm install
npm run dev       # local development → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Where to edit things

| What | File |
| --- | --- |
| Phone, WhatsApp number, Instagram, address, delivery area, WhatsApp messages | `src/data/siteConfig.ts` |
| Cake names, descriptions, prices, categories, which photos belong to each cake | `src/data/cakes.ts` |
| Hero / About / Delivery / Instagram photos | `featuredImages` in `src/data/cakes.ts` |
| Colours and fonts | `@theme` block in `src/index.css` |
| SEO title / description | `index.html` |

**Prices** — add `price: '₹…'` to a cake in `cakes.ts` and it appears on the card and in the detail view. Cakes without a price show none.

## Adding new cake photos

1. Copy the photo into `raw-photos/` as `cake-33.jpg`, `cake-34.jpg`, …
2. Run `python3 scripts/process-images.py` (needs ImageMagick 7 and Pillow).
   It enhances each photo (noise clean-up, upscaling, colour and sharpness), writes responsive WebP sizes to `public/images/cakes/`, and updates `src/data/imageManifest.json`.
3. Add a cake entry in `src/data/cakes.ts` that uses the new image id.

If a photo has phone "story" bars or a watermark, add a crop for it to `CROPS` in the script.

`raw-photos/SOURCE_MAP.txt` lists which original WhatsApp file each `cake-XX.jpg` came from.

## Going live

Create a `.env` file with your domain (see `.env.example`):

```
SITE_URL=https://your-domain.com
```

The build then adds a canonical URL, absolute Open Graph image URLs and `sitemap.xml`. `robots.txt` and the LocalBusiness structured data are always generated.

`dist/` is a static site — deploy it to Netlify, Vercel, Cloudflare Pages or any static host.
