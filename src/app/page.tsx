import WatchGrid from "@/features/product/components/WatchGrid";
import TransitionLink from "@/components/client/TransitionLink";
import OptimizedVideo from "@/components/client/OptimizedVideo";
import CmsImage from "@/components/server/CmsImage";
import { watches } from "@/features/product/constants";

export default function Home() {
  const featuredWatches = watches.slice(0, 4);
  const heroWatch = watches.find((watch) => watch.slug === "bugatti-chiron") ?? watches[0];

  return (
    <div className="bg-black">
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0">
          {heroWatch.heroVideo ? (
            <OptimizedVideo
              data-route-critical
              src={heroWatch.heroVideo}
              poster={heroWatch.heroImage}
              priority
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover opacity-85 brightness-75 transform-gpu will-change-transform animate-[slowZoom_24s_ease-out_forwards]"
            />
          ) : (
            <CmsImage
              data-route-critical
              src={heroWatch.images[2]}
              alt={`${heroWatch.name} cinematic hero`}
              fill
              preload
              fetchPriority="high"
              sizes="100vw"
              className="object-cover opacity-85 brightness-75 animate-[slowZoom_24s_ease-out_forwards]"
            />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.45),rgba(0,0,0,0.9)),linear-gradient(180deg,rgba(0,0,0,0.1),#000_94%)]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 pt-24">
          <div className="max-w-5xl animate-[fadeInUp_900ms_ease-out_120ms_both]">
            <p className="mb-6 text-xs uppercase tracking-[0.38em] text-[#D4AF37] md:text-sm">
              Inspired by the impossible
            </p>
            <h1 className="text-balance font-display text-5xl leading-[0.9] sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] luxury-heading">
              Timepieces beyond imagination.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65 md:text-xl">
              A cinematic exploration of Maison Riviera&apos;s most impossible grand complications, built as a luxury digital experience with sweeping motion, deep black surfaces, and gold-lit detail.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <TransitionLink href="/collection" className="luxury-button w-full sm:w-auto">
                <span>Discover Timepieces</span>
              </TransitionLink>
              <TransitionLink href={`/watch/${heroWatch.slug}`} className="luxury-button border-white/20 w-full sm:w-auto">
                <span>Enter The Hero</span>
              </TransitionLink>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 right-6 z-10 flex items-end justify-between text-xs uppercase tracking-[0.24em] text-white/45">
          <span>Grand complications</span>
          <span className="hidden md:inline">Scroll</span>
        </div>
      </section>

      <section className="cinematic-bg py-28 md:py-36">
        <div className="container mx-auto px-6">
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.34em] text-[#D4AF37]">Featured</p>
              <h2 className="max-w-4xl font-display text-5xl leading-tight text-white md:text-7xl">
                Watches that behave like cinema.
              </h2>
            </div>
            <TransitionLink href="/collection" className="text-xs uppercase tracking-[0.26em] text-[#D4AF37] transition hover:text-white">
              View all
            </TransitionLink>
          </div>

          <WatchGrid watches={featuredWatches} />
        </div>
      </section>

      <section className="relative overflow-hidden py-32 md:py-44">
        <OptimizedVideo
          src="/videos/godfather-ii.mp4"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-70 brightness-110 transform-gpu will-change-transform"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.5)_45%,transparent_100%),linear-gradient(180deg,#000_0%,transparent_20%,transparent_80%,#000_100%)]" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[#D4AF37]">House Language</p>
            <h2 className="font-display text-5xl leading-tight text-white md:text-7xl">
              Mechanical spectacle, edited with restraint.
            </h2>
            <p className="mt-8 text-lg leading-8 text-white/60">
              The experience leans into Maison Riviera&apos;s impossible watchmaking codes: sapphire transparency, automata, roulette, music boxes, tourbillons, diamond architecture, and a black-stage presentation that lets each object command the frame.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-28 md:py-36">
        <div className="container mx-auto px-6">
          <div className="mb-14 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <p className="text-xs uppercase tracking-[0.34em] text-[#D4AF37]">Collections</p>
            <h2 className="font-display text-4xl leading-tight text-white md:text-6xl">
              Astronomia. Bugatti. Casino. Opera. Gotham. Billionaire.
            </h2>
          </div>
          <WatchGrid watches={watches.slice(4)} variant="rail" />
        </div>
      </section>
    </div>
  );
}
