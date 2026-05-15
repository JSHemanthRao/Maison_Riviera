"use client";

import { memo, useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import CmsImage from "@/components/server/CmsImage";
import ThumbnailRail from "./ThumbnailRail";

// Dynamically import Lightbox to split heavy framer-motion and fullscreen logic
const Lightbox = dynamic(() => import("./Lightbox"), {
  ssr: false,
});

interface GalleryProps {
  images: string[];
  title: string;
}

function ImageGallery({ images, title }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const goTo = useCallback(
    (direction: "prev" | "next") => {
      setCurrentIndex((index) => {
        if (direction === "prev") {
          return index === 0 ? images.length - 1 : index - 1;
        }
        return index === images.length - 1 ? 0 : index + 1;
      });
    },
    [images.length],
  );

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_168px]">
        <div className="group relative min-h-[520px] overflow-hidden border border-white/5 bg-[#050505] md:min-h-[680px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <CmsImage
                src={images[currentIndex]}
                alt={`${title} gallery image ${currentIndex + 1}`}
                fill
                sizes="(min-width: 1024px) 75vw, 100vw"
                className="object-contain p-8 transition-transform duration-[2000ms] ease-out group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,175,55,0.08),transparent_34%),linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]" />

          <div className="absolute left-5 top-5 flex items-center gap-3 text-xs uppercase tracking-[0.26em] text-white/50">
            <span className="text-[#D4AF37]">{String(currentIndex + 1).padStart(2, "0")}</span>
            <span>/</span>
            <span>{String(images.length).padStart(2, "0")}</span>
          </div>

          <button
            type="button"
            aria-label="Open fullscreen gallery"
            onClick={() => setIsFullscreen(true)}
            className="absolute right-5 top-5 grid size-11 place-items-center border border-white/10 bg-black/40 text-white/75 backdrop-blur-md transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
          </button>

          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => goTo("prev")}
              className="grid size-12 place-items-center border border-white/10 bg-black/45 text-white/75 backdrop-blur-md transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => goTo("next")}
              className="grid size-12 place-items-center border border-white/10 bg-black/45 text-white/75 backdrop-blur-md transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <ThumbnailRail
          images={images}
          title={title}
          currentIndex={currentIndex}
          onChange={setCurrentIndex}
        />
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <Lightbox
            images={images}
            title={title}
            initialIndex={currentIndex}
            onClose={() => setIsFullscreen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(ImageGallery);
