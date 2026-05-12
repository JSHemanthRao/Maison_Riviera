import Image from "next/image";
import { notFound } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import ProductGallery from "@/components/ProductGallery";
import SpecsGrid from "@/components/SpecsGrid";
import StorySection from "@/components/StorySection";
import WatchGrid from "@/components/WatchGrid";
import { getRelatedWatches, getWatchBySlug, watches } from "@/data/watches";

export function generateStaticParams() {
  return watches.map((watch) => ({
    slug: watch.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const watch = getWatchBySlug(slug);

  if (!watch) {
    return {
      title: "Watch Not Found",
    };
  }

  return {
    title: `${watch.name} | Jacob & Co Timepieces`,
    description: watch.description,
  };
}

export default async function WatchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const watch = getWatchBySlug(slug);

  if (!watch) {
    notFound();
  }

  const related = getRelatedWatches(watch.relatedWatches);

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-[#F5F5F5]">
      <section className="relative flex min-h-screen items-end justify-center overflow-hidden pb-16 pt-32">
        {watch.youtubeId ? (
          <div className="absolute inset-0 z-0 h-full w-full overflow-hidden opacity-100 brightness-110">
            <iframe
              data-route-critical
              src={`https://www.youtube.com/embed/${watch.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${watch.youtubeId}&controls=0&showinfo=0&modestbranding=1&disablekb=1&playsinline=1`}
              className="absolute left-1/2 top-1/2 min-h-[200%] min-w-[200%] -translate-x-1/2 -translate-y-1/2 object-cover"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        ) : watch.heroVideo ? (
          <video
            data-route-critical
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover opacity-100 brightness-110 transform-gpu will-change-transform"
          >
            <source src={watch.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <Image
            data-route-critical
            src={watch.heroImage}
            alt={`${watch.name} hero`}
            fill
            priority
            sizes="100vw"
            className="object-cover p-8 opacity-100 brightness-110 animate-[slowZoom_24s_ease-out_forwards] md:p-20"
          />
        )}
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.11),transparent_28rem),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.84)_78%,#000_100%),linear-gradient(90deg,#000_0%,rgba(0,0,0,0.25)_50%,#000_100%)] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6 text-center">
          <div className="mx-auto max-w-6xl animate-[fadeInUp_1s_ease-out_0.2s_both]">
            <p className="mb-5 text-xs uppercase tracking-[0.38em] text-[#D4AF37] md:text-sm">
              {watch.collection}
            </p>
            <h1 className="font-display text-4xl leading-[0.94] text-white sm:text-5xl md:text-8xl lg:text-[8.5rem]">
              {watch.name}
            </h1>
            <p className="mt-7 font-serif text-xl text-white/80 md:text-3xl">{watch.price}</p>
          </div>
        </div>
      </section>

      <section className="cinematic-bg py-24 md:py-32">
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
          <div data-gsap="reveal" className="relative min-h-[520px] overflow-hidden border border-white/5 bg-[#050505]">
            <Image
              src={watch.images[0]}
              alt={`${watch.name} studio image`}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-contain p-8 drop-shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          <div data-gsap="reveal">
            <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[#D4AF37]">Watch Details</p>
            <h2 className="font-display text-5xl leading-tight text-white md:text-7xl">
              Built for the impossible.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">{watch.description}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                ["Movement", watch.movement],
                ["Case", watch.caseMaterial],
                ["Diameter", watch.diameter],
                ["Reserve", watch.powerReserve],
                ["Water", watch.waterResistance],
                ["Collection", watch.collection],
              ].map(([label, value]) => (
                <div key={label} className="glass-luxury p-5">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.24em] text-[#D4AF37]">{label}</p>
                  <p className="text-sm leading-6 text-white/75">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <TransitionLink href="/contact" className="luxury-button">
                <span>Request Appointment</span>
              </TransitionLink>
              <a href={watch.sourceUrl} target="_blank" rel="noreferrer" className="luxury-button border-white/20">
                <span>Official Reference</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-[#050505] py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div data-gsap="reveal" className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.34em] text-[#D4AF37]">Image Gallery</p>
              <h2 className="font-display text-5xl leading-tight text-white md:text-7xl">Full cinematic gallery.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/45">
              Browse macro angles, movement interiors, lifestyle scenes, and studio images. Open fullscreen for the complete frame.
            </p>
          </div>
          <ProductGallery images={watch.images} title={watch.name} />
        </div>
      </section>

      <section className="bg-black py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div data-gsap="reveal" className="mx-auto mb-16 max-w-4xl text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.34em] text-[#D4AF37]">Specifications</p>
            <h2 className="font-display text-5xl leading-tight text-white md:text-7xl">Technical detail.</h2>
          </div>
          <SpecsGrid specs={watch.specifications} />
        </div>
      </section>

      <StorySection watch={watch} />

      {related.length > 0 && (
        <section className="border-t border-white/5 bg-[#050505] py-24 md:py-32">
          <div className="container mx-auto px-6">
            <div data-gsap="reveal" className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.34em] text-[#D4AF37]">Related Watches</p>
                <h2 className="font-display text-5xl leading-tight text-white md:text-7xl">Continue the collection.</h2>
              </div>
              <TransitionLink href="/collection" className="text-xs uppercase tracking-[0.26em] text-[#D4AF37] transition hover:text-white">
                All timepieces
              </TransitionLink>
            </div>
            <WatchGrid watches={related} variant="rail" />
          </div>
        </section>
      )}
    </div>
  );
}
