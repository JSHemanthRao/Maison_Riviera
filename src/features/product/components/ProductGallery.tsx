"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import CmsImage from "@/components/server/CmsImage";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

function ProductGallery({ images, title }: ProductGalleryProps) {
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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isFullscreen) {
        return;
      }

      if (event.key === "Escape") {
        setIsFullscreen(false);
      }

      if (event.key === "ArrowLeft") {
        goTo("prev");
      }

      if (event.key === "ArrowRight") {
        goTo("next");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, isFullscreen]);

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_168px]">
        <div className="group relative min-h-[520px] overflow-hidden border border-white/5 bg-[#050505] md:min-h-[680px]">
          <div
            key={`${images[currentIndex]}-${currentIndex}`}
            className="absolute inset-0 animate-[fadeIn_0.75s_cubic-bezier(0.16,1,0.3,1)]"
          >
            <CmsImage
              src={images[currentIndex]}
              alt={`${title} gallery image ${currentIndex + 1}`}
              fill
              sizes="(min-width: 1024px) 75vw, 100vw"
              className="object-contain p-8 transition-transform duration-[1800ms] ease-[0.16,1,0.3,1] group-hover:scale-[1.035]"
            />
          </div>

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
            <Maximize2 size={18} />
          </button>

          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => goTo("prev")}
              className="grid size-12 place-items-center border border-white/10 bg-black/45 text-white/75 backdrop-blur-md transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => goTo("next")}
              className="grid size-12 place-items-center border border-white/10 bg-black/45 text-white/75 backdrop-blur-md transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              aria-label={`View ${title} image ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
              className={`relative h-28 w-28 shrink-0 overflow-hidden border bg-[#070707] transition duration-500 lg:h-36 lg:w-full ${
                currentIndex === index
                  ? "border-[#D4AF37] opacity-100 shadow-[0_0_28px_rgba(212,175,55,0.2)]"
                  : "border-white/5 opacity-45 hover:opacity-100"
              }`}
            >
              <CmsImage src={image} alt="" fill sizes="168px" cmsWidth={240} className="object-contain p-3" />
            </button>
          ))}
        </div>
      </div>

      {isFullscreen && (
        <div
          className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-xl animate-[fadeIn_0.45s_cubic-bezier(0.16,1,0.3,1)]"
        >
          <button
            type="button"
            aria-label="Close fullscreen gallery"
            onClick={() => setIsFullscreen(false)}
            className="absolute right-5 top-5 z-10 grid size-12 place-items-center border border-white/10 text-white/75 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            <X size={20} />
          </button>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => goTo("prev")}
            className="absolute left-5 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center border border-white/10 text-white/75 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => goTo("next")}
            className="absolute right-5 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center border border-white/10 text-white/75 transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            <ChevronRight size={22} />
          </button>
          <div
            key={`modal-${images[currentIndex]}-${currentIndex}`}
            className="absolute inset-0 animate-[zoomIn_0.55s_cubic-bezier(0.16,1,0.3,1)]"
          >
            <CmsImage
              src={images[currentIndex]}
              alt={`${title} fullscreen image ${currentIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain p-8 md:p-16"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default memo(ProductGallery);
