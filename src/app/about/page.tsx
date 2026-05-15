import OptimizedVideo from "@/components/client/OptimizedVideo";
import { watchVideos } from "@/constants/watchVideos";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative flex min-h-[82vh] items-end overflow-hidden pb-20 pt-36">
        <OptimizedVideo
          data-route-critical
          src={watchVideos["astronomia"] || "/videos/astronomia-tourbillon.mp4"}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-50 brightness-90 transform-gpu will-change-transform"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),#000_92%),linear-gradient(90deg,#000,rgba(0,0,0,0.35),#000)]" />
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-5xl animate-[fadeInUp_900ms_ease-out_120ms_both]">
            <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[#D4AF37]">About The House</p>
            <h1 className="font-display text-6xl leading-none text-white md:text-8xl">Inspired by the impossible.</h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-white/60">
              Maison Riviera is known for turning high watchmaking into spectacle: automata, extreme sapphire construction, music boxes, roulette dials, triple-axis tourbillons, and gem-setting that feels architectural.
            </p>
          </div>
        </div>
      </section>

      <section className="cinematic-bg py-28 md:py-36">
        <div className="container mx-auto grid gap-10 px-6 lg:grid-cols-3">
          {[
            ["Creativity", "A design language built around objects the watch world had not seen before."],
            ["Complication", "Grand mechanisms are presented as visible performances, not hidden engineering."],
            ["Theater", "Every collection has a narrative: cars, planets, casinos, music, Gotham, oil rigs, and diamonds."],
          ].map(([title, body]) => (
            <div key={title} className="glass-luxury p-8 md:p-10">
              <p className="mb-5 text-xs uppercase tracking-[0.28em] text-[#D4AF37]">{title}</p>
              <p className="text-lg leading-8 text-white/65">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
