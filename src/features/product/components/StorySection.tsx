import CmsImage from "@/components/server/CmsImage";
import { Watch } from "@/features/product/types";

export default function StorySection({ watch }: { watch: Watch }) {
  return (
    <section className="relative overflow-hidden bg-black py-28 md:py-36">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[#D4AF37]">Storytelling</p>
          <h2 className="font-display text-5xl leading-none text-white md:text-7xl">
            Impossible, rendered intimate.
          </h2>
        </div>

        <div className="space-y-28">
          {watch.story.map((block, index) => (
            <div
              key={block.title}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              <div
                className={`relative min-h-[520px] overflow-hidden border border-white/5 bg-[#050505] ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <CmsImage
                  src={watch.images[index + 1] || watch.images[0] || block.image}
                  alt={`${watch.name} ${block.title}`}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover opacity-90 transition duration-[1800ms] ease-[0.16,1,0.3,1] hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <p className="mb-5 text-xs uppercase tracking-[0.32em] text-[#D4AF37]">
                  {block.kicker}
                </p>
                <h3 className="mb-7 max-w-xl font-display text-4xl leading-tight text-white md:text-6xl">
                  {block.title}
                </h3>
                <div className="gold-line mb-8" />
                <p className="max-w-xl text-lg leading-8 text-white/60">{block.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
