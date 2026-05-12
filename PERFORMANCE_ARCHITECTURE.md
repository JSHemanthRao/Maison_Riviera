# Luxury Cinematic Watch Website Performance Architecture

## 1. Full System Architecture

The site should render as a static luxury editorial shell with small client islands for media orchestration, navigation, gallery controls, and scroll effects. Product data stays in Server Components, watch pages are statically generated with `generateStaticParams`, and rich motion is layered after first paint.

Rendering pipeline:

- First paint: server HTML, poster images, typography, black/gold art direction.
- First interaction: hydrate only the navigation, video controller, gallery form, and scroll-effect island.
- Cinematic enhancement: autoplay video replaces poster only after the video has a frame ready.
- Offscreen economy: sections below the fold use `content-visibility`, videos only mount near the viewport, and ScrollTrigger initializes during idle time.

Media orchestration:

- One optimized video component owns all `<video>` rendering.
- A video orchestrator limits concurrent decodes to one on mobile and two on desktop.
- Hero video gets priority; offscreen story videos pause and release buffers.
- Posters are treated as the LCP asset, not a fallback afterthought.

GPU budget:

- Animate only `transform` and `opacity`.
- Avoid full-screen animated `filter`, heavy blur, and multiple translucent layers.
- Use static gradients for atmosphere; avoid stacking many blend/filter layers over video.
- Preserve luxury through lighting, crop, timing, typography, and restraint rather than brute-force effects.

Cinematic sequencing:

- Above the fold: poster + instant text reveal + hero video handoff.
- Mid-scroll: GSAP reveal and parallax are idle-initialized and one-shot where possible.
- Detail pages: interactive galleries hydrate only on watch routes.
- Long-form motion: use short loops with editorial crosscuts to imply expensive footage without shipping long files.

## 2. Video Delivery Optimization

Codec strategy:

- AV1: primary for Chrome/Edge/Android and high-end desktop. Best compression for cinematic dark footage. Use for `.mp4` when device support is strong.
- VP9: WebM fallback for browsers with good VP9 support and no AV1 hardware decode.
- H264: mandatory Safari/iPhone fallback. Use high-profile H264, yuv420p, fast-start MP4.
- HLS: use for long hero reels, detail-page hero films, and any video above 8-10 seconds. It reduces startup time and adapts bitrate under mobile network pressure.

Recommended bitrate ladder:

| Rendition | Resolution | FPS | H264 bitrate | AV1/VP9 bitrate | Target use |
| --- | ---: | ---: | ---: | ---: | --- |
| mobile-light | 540p | 24 | 650-900 kbps | 350-600 kbps | Save-data/low-end |
| mobile | 720p | 24 | 1.0-1.6 Mbps | 650-950 kbps | iPhone/Android |
| desktop | 1080p | 24 | 2.2-3.5 Mbps | 1.2-2.0 Mbps | Hero desktop |
| editorial | 1440p | 24 | 4.5-6.5 Mbps | 2.8-4.0 Mbps | Premium desktop only |

Target file sizes:

- LCP poster: AVIF/WebP under 180 KB mobile, under 320 KB desktop.
- Mobile hero loop: 0.8-1.8 MB.
- Desktop hero loop: 2-4 MB.
- Offscreen section loop: under 1.5 MB.
- Full detail reel: prefer HLS segments over single MP4 if above 5 MB.

Loop illusion strategy:

- Use 4-7 second macro loops: rotating tourbillon, sapphire glint, dial sweep, or hand movement.
- Start and end on visually similar frames.
- Add slow scale in CSS, not inside the encoded video, so the same asset feels alive.
- Use cross-cut storytelling instead of one massive continuous video.

Progressive streaming:

- MP4 fallbacks must include `-movflags +faststart`.
- CDN must preserve range requests.
- HLS segments should be 2 seconds for fast startup and tight adaptive switching.
- Preload poster immediately, preload hero video metadata or auto only for the highest-priority hero.

## 3. FFMPEG Optimization

AV1 export:

```bash
ffmpeg -i input.mov -an -vf "scale=1920:-2:flags=lanczos,fps=24" -c:v libsvtav1 -preset 6 -crf 32 -pix_fmt yuv420p10le -g 48 -movflags +faststart public/videos/hero-1080.av1.mp4
```

VP9 export:

```bash
ffmpeg -i input.mov -an -vf "scale=1920:-2:flags=lanczos,fps=24" -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 -tile-columns 2 -frame-parallel 1 -deadline good -cpu-used 2 public/videos/hero-1080.webm
```

H264 Safari fallback:

```bash
ffmpeg -i input.mov -an -vf "scale=1920:-2:flags=lanczos,fps=24" -c:v libx264 -profile:v high -level 4.1 -preset slow -crf 20 -pix_fmt yuv420p -g 48 -keyint_min 48 -sc_threshold 0 -movflags +faststart public/videos/hero-1080.mp4
```

Mobile H264:

```bash
ffmpeg -i input.mov -an -vf "scale=1280:-2:flags=lanczos,fps=24" -c:v libx264 -profile:v high -level 4.0 -preset slow -crf 22 -pix_fmt yuv420p -g 48 -keyint_min 48 -sc_threshold 0 -movflags +faststart public/videos/hero-720.mp4
```

Adaptive HLS ladder:

```bash
ffmpeg -i input.mov -filter_complex "[0:v]fps=24,split=3[v1][v2][v3];[v1]scale=960:-2[v1out];[v2]scale=1280:-2[v2out];[v3]scale=1920:-2[v3out]" -map "[v1out]" -c:v:0 libx264 -b:v:0 900k -maxrate:v:0 1050k -bufsize:v:0 1800k -map "[v2out]" -c:v:1 libx264 -b:v:1 1600k -maxrate:v:1 1900k -bufsize:v:1 3200k -map "[v3out]" -c:v:2 libx264 -b:v:2 3200k -maxrate:v:2 3800k -bufsize:v:2 6400k -an -preset slow -profile:v high -pix_fmt yuv420p -g 48 -keyint_min 48 -sc_threshold 0 -f hls -hls_time 2 -hls_playlist_type vod -hls_flags independent_segments -master_pl_name master.m3u8 -var_stream_map "v:0,name:540 v:1,name:720 v:2,name:1080" "public/videos/hls/hero-%v.m3u8"
```

Seamless loop from a clean section:

```bash
ffmpeg -ss 00:00:03.000 -to 00:00:09.000 -i input.mov -an -vf "fps=24,scale=1920:-2:flags=lanczos" -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p -g 48 -movflags +faststart public/videos/loop-clean.mp4
```

Short-loop cinematic illusion with crossfade:

```bash
ffmpeg -i input.mov -filter_complex "[0:v]trim=start=3:end=8,setpts=PTS-STARTPTS[a];[0:v]trim=start=8:end=9,setpts=PTS-STARTPTS[b];[a][b]xfade=transition=fade:duration=0.35:offset=4.65,scale=1920:-2:flags=lanczos,fps=24" -an -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p -movflags +faststart public/videos/loop-xfade.mp4
```

Poster extraction:

```bash
ffmpeg -ss 00:00:04.200 -i input.mov -frames:v 1 -vf "scale=1600:-2:flags=lanczos" -q:v 2 public/posters/hero-poster.jpg
```

## 4. Next.js Optimization

Current implementation direction:

- Home, collection, about, contact, specs, story, watch grid, and watch cards render server-first.
- Client code is pushed into `OptimizedVideo`, `ContactForm`, navigation, gallery controls, Lenis, and idle GSAP.
- Watch routes are static via `generateStaticParams`.
- `next/image` negotiates AVIF/WebP and remote image caching.
- Link prefetch is disabled for dense watch-card grids to avoid fetching many product routes at once.

Recommended next steps:

- Keep App Router pages as Server Components by default.
- Keep Framer Motion out of layout-level components; use CSS transitions for shell motion.
- Dynamically import heavy interactive sections when they are not above the fold.
- Prefer route-level chunks: gallery code only on `/watch/[slug]`, contact form only on `/contact`.
- Use Suspense for future dynamic data islands while keeping the static shell immediate.

## 5. Video Component Engineering

Implemented files:

- `src/components/OptimizedVideo.tsx`
- `src/lib/video-orchestrator.ts`

The component:

- Renders a poster with `next/image`.
- Loads video sources only near the viewport.
- Plays only when visible.
- Pauses offscreen.
- Releases buffers on unmount.
- Honors reduced motion, Save-Data, slow network, and low memory.
- Sets `muted`, `playsInline`, and `webkit-playsinline` for Safari/iPhone.
- Lets hero video request priority from the orchestrator.

Why it works:

- The poster becomes the fast LCP path.
- Video decode starts after layout and paint instead of blocking them.
- Only one mobile video can actively decode, preventing Safari memory spikes.
- Removing sources and calling `load()` lets the browser release buffers.

Usage:

```tsx
<OptimizedVideo
  alt="Bugatti Chiron Tourbillon hero film"
  className="absolute inset-0 h-full w-full"
  imageClassName="object-cover brightness-75"
  mp4Src="/videos/bugatti-chiron.mp4"
  posterPriority
  posterSrc="https://www.datocms-assets.com/99008/1711638416-bu210-80-aa-aa-bbrua.webp"
  priority
  videoClassName="object-cover brightness-75"
/>
```

## 6. Scroll Performance Optimization

GSAP:

- Register `ScrollTrigger` once inside a tiny client island.
- Initialize during `requestIdleCallback`.
- Use one-shot reveals for editorial blocks.
- Keep parallax to `transform: translateY`.
- Avoid scrubbed timelines with filters, clip-path, layout properties, or many pinned sections.

Framer Motion:

- Keep Framer off the global shell.
- Use it only for high-value localized interactions such as the gallery.
- Remove animated blur/filter states.

Layout safety:

- No `top/left/width/height` animation.
- No per-frame DOM reads in scroll handlers.
- Mouse magnetism caches bounds on enter instead of reading layout every frame.

## 7. GPU Rendering Optimization

Layering rules:

- One video layer, one dark gradient overlay, one text layer.
- No nested cards inside cards.
- Avoid full-screen blend modes over videos on mobile.
- Prefer static lighting gradients to animated filters.
- Turn off backdrop blur for glass cards on mobile.

Expensive effects to avoid:

- Animated `filter: blur()` on large elements.
- Animated `brightness()` on video.
- Multiple fixed overlays with mix-blend-mode.
- Simultaneous full-screen video plus preloader video.

## 8. Mobile Optimization

Mobile strategy:

- Serve 720p or 540p H264 by default.
- Use static posters for Save-Data, reduced motion, 2G, or low-memory devices.
- Limit active decodes to one.
- Disable glass blur and cursor glow on touch devices.
- Keep Lenis touch behavior conservative so native scroll remains responsive.
- Use `playsInline`, `muted`, `autoPlay`, and programmatic `play().catch()` handling for iPhone.

Fallback design:

- Static luxury poster, subtle CSS scale, gold typography, and editorial gradients.
- The site should still feel premium when every video is disabled.

## 9. Network Optimization

CDN architecture:

- Put videos behind Mux, Cloudflare Stream, Bunny Stream, or a CDN configured for byte-range requests.
- Use HLS for long reels and MP4/WebM/AV1 for short loops.
- Put posters through Next image optimization or an image CDN.
- Use HTTP/3 where available.
- Keep Brotli enabled for JS/CSS/HTML.

Recommended headers:

```http
Cache-Control: public, max-age=604800, stale-while-revalidate=31536000
Accept-Ranges: bytes
```

For immutable hashed media:

```http
Cache-Control: public, max-age=31536000, immutable
```

## 10. Video Playback Engineering

Autoplay policy:

- Always `muted`.
- Always `playsInline`.
- Start hero playback only after source is mounted and at least one frame can play.
- If `play()` rejects, leave the poster visible.

Concurrent decode limiting:

- Mobile: one active video.
- Desktop: two active videos.
- Hero priority is higher than section reels.
- Visibility change pauses all videos.

Seamless loops:

- Encode loop segments with matched first/last frames.
- Use 24 fps and 2-second GOPs.
- Avoid audio tracks.
- Avoid long source durations for visual texture loops.

## 11. UX Preservation

Performance should not make the site feel cheap. The premium feel comes from:

- high-quality poster frames,
- black-stage composition,
- disciplined gold accents,
- slow transform-only motion,
- macro horology imagery,
- quiet spacing,
- typography hierarchy,
- smooth route curtains,
- cinematic sequencing instead of constant animation.

The optimized version preserves the museum-grade mood by replacing heavy video brute force with illusion engineering.

## 12. Production Deployment

Deployment target:

- Vercel for Next.js shell.
- Mux, Cloudflare Stream, or Bunny for adaptive video.
- Image CDN/Next Image for posters and remote watch renders.

Monitoring:

- Lighthouse CI on home, collection, and one watch detail page.
- Core Web Vitals RUM: LCP, INP, CLS, TTFB.
- Custom metrics: hero poster loaded, hero first frame, autoplay rejected, active video count, video error rate.
- Safari/iPhone QA on real devices using Web Inspector.
- Chrome Performance panel for long tasks and dropped frames.
- Memory timeline on iOS for watch detail pages.

Targets:

- LCP under 2.5s.
- CLS below 0.05.
- INP below 200ms.
- Home JS under 130 kB first load.
- Mobile active video count: one.
- No full-screen animated filters.

## 13. Code Requirements

Implemented:

- React optimized video component.
- Intersection Observer loading and viewport playback.
- Decode budget manager.
- Buffer cleanup and memory release.
- `requestIdleCallback` GSAP setup.
- Server-first App Router route boundaries.
- Static page reveal CSS.
- Video cache headers.

Dynamic import example for a future heavy section:

```tsx
import dynamic from "next/dynamic";

const ProductGallery = dynamic(() => import("@/components/ProductGallery"), {
  loading: () => <div className="min-h-[520px] bg-[#050505]" />,
});
```

Idle preload example:

```ts
const idle = window.requestIdleCallback ?? ((cb) => window.setTimeout(cb, 250));

idle(() => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "video";
  link.href = "/videos/hero-720.mp4";
  document.head.appendChild(link);
});
```

## 14. Final Output Style

The production philosophy is Apple-style restraint: ship the feeling of impossible machinery through careful sequence, image quality, and motion economy. Use video where it earns emotion, posters where they win LCP, and GPU-safe transforms everywhere else.

