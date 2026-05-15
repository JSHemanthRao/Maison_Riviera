# Next.js Performance Architecture

This app is optimized as a mostly static luxury product experience with tiny client islands. The goal is fast HTML, minimal hydration, direct CDN media delivery, stable layouts, and instant route transitions on desktop and mobile.

## Current Architecture

The production shell is server-first:

- `src/app/layout.tsx` renders fonts, static chrome, navigation, main content, and footer as Server Components.
- `src/components/MobileMenu.tsx` is the only global navigation client island.
- `src/components/OptimizedVideo.tsx` is a small client island that mounts video sources only when critical or near the viewport.
- `src/components/CmsImage.tsx` keeps external CMS imagery off `/_next/image` and uses source CDN transformations.
- `src/components/DeferredProductGallery.tsx` lazy-loads the Framer gallery from a client wrapper so the heavy gallery chunk is isolated from route shell hydration.
- Watch detail routes are statically generated with `generateStaticParams`.

Removed from the global shell:

- route-blocking custom transition manager,
- first-load video preloader,
- GSAP scroll runtime,
- Lenis smooth-scroll runtime,
- cursor glow mouse tracker,
- magnetic pointer wrappers.

Those effects looked premium, but they cost global JavaScript, hydration time, long tasks, and video bandwidth on every route. The current version keeps the visual identity through server-rendered layout, CDN images, video posters, CSS transitions, and route-level code splitting.

## Optimized Folder Structure

```txt
src/
  app/
    layout.tsx                  # Server shell, fonts, metadata
    page.tsx                    # Static home route
    collection/page.tsx         # Static collection route
    contact/page.tsx            # Server-rendered contact route
    watch/[slug]/
      page.tsx                  # SSG watch detail route
      loading.tsx               # Segment fallback
    globals.css                 # Tokens, layout stability, content-visibility
  components/
    CmsImage.tsx                # Server-safe CDN-direct Image wrapper
    OptimizedVideo.tsx          # Tiny client video loader
    DeferredProductGallery.tsx  # Client dynamic import boundary
    ProductGallery.tsx          # Heavy client gallery, route-local
    MobileMenu.tsx              # Header client island
    Navbar.tsx                  # Server navigation shell
    WatchGrid.tsx               # Server list renderer
    WatchCard.tsx               # Server card renderer
  data/
    watches.ts                  # Static product data
public/
  videos/                       # Short loops only, cacheable
```

For enterprise scale, add:

```txt
src/
  lib/
    data/                       # server-only data access
    cache/                      # cache tags, cacheLife profiles
    analytics/                  # web-vitals reporting
  components/
    islands/                    # interactive client islands only
    skeletons/                  # route and component fallbacks
```

## Server Components First

Rule: a file gets `"use client"` only when it needs state, effects, event handlers, browser APIs, or a client-only library.

Use Server Components for static layout, product cards, specs, story blocks, footer links, and CMS image URL shaping:

```tsx
// Server Component by default
import WatchGrid from "@/components/WatchGrid";
import { watches } from "@/data/watches";

export default function CollectionPage() {
  return <WatchGrid watches={watches} />;
}
```

Keep client boundaries narrow:

```tsx
// src/components/MobileMenu.tsx
"use client";

import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return <button onClick={() => setIsOpen((value) => !value)}>Menu</button>;
}
```

Do not wrap the whole app in a client provider unless the entire tree truly needs that provider. Providers should sit as deep as possible.

## Lazy Loading And Dynamic Imports

Server Components are route split automatically. Lazy loading is for Client Components and browser-only libraries.

Correct route-local heavy island pattern:

```tsx
// src/components/DeferredProductGallery.tsx
"use client";

import dynamic from "next/dynamic";

const ProductGallery = dynamic(() => import("@/components/ProductGallery"), {
  ssr: false,
  loading: () => <GallerySkeleton />,
});

export default function DeferredProductGallery(props: { images: string[]; title: string }) {
  return <ProductGallery {...props} />;
}
```

Use conditional imports for optional libraries:

```tsx
"use client";

async function openSearchIndex(query: string) {
  const Fuse = (await import("fuse.js")).default;
  return new Fuse(items).search(query);
}
```

Use Suspense for slow server data:

```tsx
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails />
    </Suspense>
  );
}
```

## Hydration Strategy

Hydrate only:

- mobile menu toggle,
- video viewport loader,
- fullscreen/gallery controls,
- future search or filters.

Avoid hydrating:

- cards,
- static links,
- specs,
- story sections,
- footer,
- headings,
- CTA shells.

Do not delay navigation with custom route curtains. Use native `<Link>` so Next can prefetch RSC payloads and perform client transitions immediately.

Dense product grids should keep `prefetch={false}` to avoid prefetching every detail page at once:

```tsx
<TransitionLink href={`/watch/${watch.slug}`} prefetch={false}>
  {watch.name}
</TransitionLink>
```

Primary nav and high-intent CTAs can use the default prefetch behavior.

## Re-Render Control

Use memoization only inside Client Components where prop stability or expensive work matters.

Component memoization:

```tsx
"use client";

import { memo } from "react";

function PriceBadge({ price }: { price: string }) {
  return <span>{price}</span>;
}

export default memo(PriceBadge);
```

Stable callbacks:

```tsx
const goTo = useCallback((direction: "prev" | "next") => {
  setCurrentIndex((index) => (direction === "next" ? index + 1 : index - 1));
}, []);
```

Stable derived values:

```tsx
const visibleItems = useMemo(
  () => items.filter((item) => item.collection === activeCollection),
  [items, activeCollection],
);
```

State colocation:

- keep gallery state in the gallery,
- keep mobile menu state in the menu,
- keep search state in the search island,
- never store global state for static visual sections.

## Image Delivery

External CMS images should be served by the source CDN, not re-optimized through `/_next/image`. This prevents optimizer timeouts, SSRF exposure, disk cache growth, and slow first requests.

```tsx
<CmsImage
  src={watch.heroImage}
  alt={watch.name}
  fill
  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
  cmsWidth={1200}
  className="object-contain"
/>
```

`CmsImage` rules:

- add `auto=format`, `fit=max`, `q`, and `w` for DatoCMS assets,
- set `unoptimized` for external CDN assets,
- keep `fill` inside a parent with stable dimensions,
- always provide `sizes`,
- use `preload` only for the single route LCP image.

Next 16 image config:

```ts
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 70, 75, 80, 85],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [96, 128, 168, 240, 320, 420, 640],
  },
};
```

## Video Delivery

The current app uses a tiny client video controller:

- critical hero videos render a source immediately,
- below-the-fold videos render no `<source>` until near viewport,
- offscreen videos pause,
- unmount cleanup releases buffers,
- reduced motion and Save-Data prevent autoplay.

```tsx
<OptimizedVideo
  data-route-critical
  src={watch.heroVideo}
  poster={watch.heroImage}
  priority
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
/>
```

Production video targets:

- hero poster under 320 KB desktop and 180 KB mobile,
- mobile loop under 1.8 MB,
- desktop loop under 4 MB,
- HLS or Mux/Cloudflare/Bunny for anything over 8-10 seconds,
- byte-range requests enabled,
- no audio tracks for background loops,
- 24 fps, short GOPs, and `-movflags +faststart` for MP4.

FFmpeg baseline:

```bash
ffmpeg -i input.mov -an -vf "scale=1280:-2:flags=lanczos,fps=24" \
  -c:v libx264 -profile:v high -level 4.0 -preset slow -crf 22 \
  -pix_fmt yuv420p -g 48 -keyint_min 48 -sc_threshold 0 \
  -movflags +faststart public/videos/hero-720.mp4
```

## API Fetching And Caching

Static product data should stay in Server Components or a server-only data layer.

Parallel fetching:

```tsx
const [product, related, reviews] = await Promise.all([
  getProduct(slug),
  getRelated(slug),
  getReviews(slug),
]);
```

Cached shared data:

```tsx
import { cacheLife, cacheTag } from "next/cache";

export async function getProduct(slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(`product:${slug}`);
  return fetchProduct(slug);
}
```

On-demand invalidation:

```tsx
"use server";

import { revalidateTag } from "next/cache";

export async function updateProduct(slug: string, formData: FormData) {
  await saveProduct(slug, formData);
  revalidateTag(`product:${slug}`, "max");
}
```

Streaming dynamic islands:

```tsx
<Suspense fallback={<InventorySkeleton />}>
  <LiveAvailability sku={sku} />
</Suspense>
```

Avoid API waterfalls:

- do not call Route Handlers from Server Components,
- fetch directly in the Server Component/data layer,
- dedupe repeated product reads through cache functions,
- stream non-critical data behind local Suspense boundaries.

## Bundle Size Policy

Current bundle controls:

- removed unused `gsap` and `lenis`,
- isolated `framer-motion` to the deferred gallery,
- optimized `lucide-react` imports,
- removed global client route transition code,
- converted CMS image and contact form to Server Components.

Import policy:

```tsx
// Good
import { Search } from "lucide-react";

// Avoid
import * as Icons from "lucide-react";
```

Analyzer:

```bash
npx next experimental-analyze --output
```

For Webpack-only projects:

```bash
ANALYZE=true npm run build
```

Dependency replacement rules:

- use CSS transitions before animation libraries,
- use native form/server actions before form-state libraries,
- use source CDN transforms before runtime image processing,
- use virtualized lists before rendering hundreds of cards.

## Animation And Scrolling

Rules:

- animate `transform` and `opacity` only,
- avoid animated `filter`, `backdrop-filter`, `clip-path`, width, height, top, and left,
- avoid custom smooth-scroll on mobile,
- avoid scroll listeners unless they are passive and throttled by `requestAnimationFrame`,
- use `content-visibility: auto` for below-the-fold sections.

CSS example:

```css
main > section:not(:first-child),
main > div > section:not(:first-child) {
  content-visibility: auto;
  contain-intrinsic-size: 900px;
}
```

If scroll effects return later, use one tiny client island with dynamic imports and idle init:

```tsx
"use client";

useEffect(() => {
  const idle = window.requestIdleCallback ?? ((cb) => window.setTimeout(cb, 250));
  const id = idle(async () => {
    const gsap = (await import("gsap")).default;
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);
  });
  return () => window.cancelIdleCallback?.(id as number);
}, []);
```

## Core Web Vitals

LCP:

- server-render hero shell,
- preload only one LCP image when no critical video is used,
- use video poster as the perceived LCP path,
- keep hero text visible without waiting for video decode.

CLS:

- stable aspect ratios and min heights,
- no late injected nav/preloader,
- `next/font` hosted fonts,
- no card dimensions that depend on loaded media.

INP:

- no global scroll/mousemove effects,
- no route transition delay before `router.push`,
- no gallery hydration until the gallery route section.

FCP:

- static Server Components,
- no blocking third-party scripts,
- no global client providers.

TBT/TTI:

- tiny client islands,
- dynamic imports for heavy UI,
- removed global animation libraries.

## Fonts

Use `next/font` only:

```tsx
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
```

Rules:

- no external Google Font `<link>`,
- font variables on `<html>`,
- `font-display` handled by Next,
- avoid layout shifts by using consistent fallback stacks.

## Caching

Static assets:

- `/_next/static/*` is immutable automatically,
- `/videos/*` is configured as immutable for production CDN delivery,
- external CMS assets are cached by their source CDN.

Route caching:

- marketing/product routes are static,
- watch detail routes use SSG,
- future CMS-backed routes should use ISR and tag invalidation.

Headers:

```ts
async headers() {
  return [
    {
      source: "/videos/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        { key: "Accept-Ranges", value: "bytes" },
      ],
    },
  ];
}
```

## Deployment

Recommended production shape:

- Vercel for the Next.js app,
- Mux, Cloudflare Stream, Bunny Stream, or Vercel Blob/CDN for videos,
- DatoCMS/image CDN for product imagery,
- Brotli and HTTP/3 at the edge,
- CDN purge paired with `revalidateTag` for CMS writes,
- Lighthouse CI on `/`, `/collection`, `/watch/bugatti-chiron`, and `/contact`.

Do not self-host Next behind a CDN that strips RSC headers or `_rsc` query parameters. Client navigation depends on RSC payload separation.

## Monitoring And Profiling

Web Vitals client island:

```tsx
"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    navigator.sendBeacon("/api/vitals", JSON.stringify(metric));
  });
  return null;
}
```

Profiling tools:

- `npm run build` for static generation and type validation,
- `npm run lint` for framework and accessibility rules,
- `npx next experimental-analyze --output` for route/module tracing,
- Chrome Performance panel for long tasks and dropped frames,
- Lighthouse/PageSpeed for lab signals,
- real-user monitoring for LCP, INP, CLS, FCP, and TTFB.

Custom metrics worth tracking:

- hero poster loaded,
- hero first video frame,
- video autoplay rejected,
- active video count,
- gallery chunk loaded,
- route transition duration.

## Production Checklist

- [x] Root layout is a Server Component.
- [x] CMS images bypass `/_next/image`.
- [x] Hero videos have posters and metadata preload only.
- [x] Below-the-fold video sources are deferred.
- [x] Global GSAP/Lenis/preloader code removed.
- [x] Product gallery is route-local and dynamically loaded from a client boundary.
- [x] Watch pages are statically generated.
- [x] Dense watch cards disable broad viewport prefetching.
- [x] Next 16 image qualities are explicitly allowlisted.
- [x] Build and lint pass.
- [ ] Replace large MP4 loops with compressed 540p/720p/1080p ladders or HLS.
- [ ] Add RUM endpoint for Web Vitals.
- [ ] Add Lighthouse CI budgets.
- [ ] Add bundle analyzer snapshots to CI for regression tracking.

