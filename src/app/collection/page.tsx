"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import WatchGrid from "@/components/WatchGrid";
import { watches } from "@/data/watches";

export default function CollectionPage() {
  return (
    <div className="min-h-screen bg-black">
      <section className="relative flex min-h-[72vh] items-end overflow-hidden pb-20 pt-36">
        <Image
          src="https://www.datocms-assets.com/99008/1761868839-casino-front-new.webp"
          alt="Jacob & Co timepieces collection"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70 brightness-110"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15),#000_96%),linear-gradient(90deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.15)_48%,rgba(0,0,0,0.8)_100%)]" />
        <div className="container relative z-10 mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 32, filter: "blur(18px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl"
          >
            <p className="mb-5 text-xs uppercase tracking-[0.36em] text-[#D4AF37]">
              Jacob & Co Collections
            </p>
            <h1 className="font-display text-5xl leading-none text-white sm:text-6xl md:text-8xl">
              Timepieces
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60">
              A complete luxury collection page with real Jacob & Co inspired lines, black-glass presentation, cinematic spacing, and gallery-led navigation into every dynamic watch page.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="cinematic-bg pb-28 pt-10 md:pb-36">
        <div className="container mx-auto px-6">
          <div data-gsap="reveal" className="mb-12 flex flex-col justify-between gap-6 border-y border-white/10 py-8 md:flex-row md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">Showing</p>
              <p className="mt-2 font-serif text-2xl text-white">{watches.length} grand complications</p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-white/45">
              {["Astronomia", "Bugatti", "Epic X", "Twin Turbo", "Billionaire", "Casino", "Opera", "Oil Pump", "Gotham"].map((item) => (
                <span key={item} className="border border-white/10 px-3 py-2">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <WatchGrid watches={watches} />
        </div>
      </section>
    </div>
  );
}
