"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CmsImage from "@/components/server/CmsImage";

interface LightboxProps {
  images: string[];
  title: string;
  initialIndex: number;
  onClose: () => void;
}

function Lightbox({ images, title, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (newDirection: 1 | -1) => {
      setDirection(newDirection);
      setCurrentIndex((prev) => {
        let nextIndex = prev + newDirection;
        if (nextIndex < 0) nextIndex = images.length - 1;
        if (nextIndex >= images.length) nextIndex = 0;
        return nextIndex;
      });
    },
    [images.length],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goTo(-1);
      if (event.key === "ArrowRight") goTo(1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, onClose]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 1.05
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
    >
      <button
        type="button"
        aria-label="Close fullscreen gallery"
        onClick={onClose}
        className="absolute right-6 top-6 z-50 grid size-12 place-items-center rounded-full border border-white/10 bg-black/50 text-white/75 backdrop-blur-md transition hover:border-[#D4AF37] hover:bg-black hover:text-[#D4AF37]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>

      <button
        type="button"
        onClick={() => goTo(-1)}
        className="absolute left-6 top-1/2 z-50 grid size-14 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/50 text-white/75 backdrop-blur-md transition hover:border-[#D4AF37] hover:bg-black hover:text-[#D4AF37]"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>

      <button
        type="button"
        onClick={() => goTo(1)}
        className="absolute right-6 top-1/2 z-50 grid size-14 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/50 text-white/75 backdrop-blur-md transition hover:border-[#D4AF37] hover:bg-black hover:text-[#D4AF37]"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2 z-50">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? "w-8 bg-[#D4AF37]" : "w-1.5 bg-white/20"}`}
          />
        ))}
      </div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.4 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              goTo(1);
            } else if (swipe > swipeConfidenceThreshold) {
              goTo(-1);
            }
          }}
          className="absolute inset-10 md:inset-24 flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <CmsImage
            src={images[currentIndex]}
            alt={`${title} fullscreen image ${currentIndex + 1}`}
            fill
            sizes="100vw"
            className="object-contain drop-shadow-2xl pointer-events-none"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default memo(Lightbox);
