"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function waitForImage(image: HTMLImageElement) {
  if (image.complete && image.naturalWidth > 0) {
    return image.decode ? image.decode().catch(() => undefined) : Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const done = () => {
      image.removeEventListener("load", done);
      image.removeEventListener("error", done);
      resolve();
    };

    image.addEventListener("load", done, { once: true });
    image.addEventListener("error", done, { once: true });
  });
}

function waitForVideo(video: HTMLVideoElement) {
  if (video.readyState >= 3) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const done = () => {
      video.removeEventListener("canplay", done);
      video.removeEventListener("playing", done);
      video.removeEventListener("error", done);
      resolve();
    };

    video.addEventListener("canplay", done, { once: true });
    video.addEventListener("playing", done, { once: true });
    video.addEventListener("error", done, { once: true });
  });
}

function PreloaderComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<"counting" | "brand">("counting");

  const counterRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    try {
      const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      const isReload = navEntries.length > 0 && navEntries[0].type === "reload";
      const hasSeen = sessionStorage.getItem("luxury-entry-preloader-seen");

      if (hasSeen === "true" && !isReload) {
        setIsLoading(false);
        return;
      }

      sessionStorage.setItem("luxury-entry-preloader-seen", "true");
    } catch {
      // Ignore storage errors
    }

    document.body.style.overflow = "hidden";

    let animationFrameId: number;
    let currentCount = 0;
    let targetCount = 0;
    let isCancelled = false;
    let allReady = false;

    // Fast-tracking fonts
    document.fonts?.ready.then(() => {
      targetCount = Math.max(targetCount, 25);
    });

    // Main initialization sequence
    const initLoadingSequence = async () => {
      await sleep(100);

      const media = new Set<Element>();
      document.querySelectorAll("[data-route-critical]").forEach((element) => media.add(element));
      
      const firstSection = document.querySelector("main section");
      firstSection?.querySelectorAll("img, video, iframe").forEach((element) => media.add(element));

      const mediaElements = Array.from(media);
      const totalItems = mediaElements.length + 1; // +1 for basic page load
      let itemsLoaded = 0;

      const incrementProgress = () => {
        itemsLoaded++;
        targetCount = 25 + Math.floor((itemsLoaded / totalItems) * 70);
      };

      if (document.readyState === "complete") {
        incrementProgress();
      } else {
        window.addEventListener("load", incrementProgress, { once: true });
      }

      const loadPromises = mediaElements.map(async (element) => {
        if (element instanceof HTMLImageElement) {
          await waitForImage(element);
        } else if (element instanceof HTMLVideoElement) {
          await waitForVideo(element);
        }
        incrementProgress();
      });

      await Promise.race([
        Promise.all(loadPromises),
        sleep(6000) // Fallback timeout
      ]);

      allReady = true;
      targetCount = 100;
    };

    initLoadingSequence();

    // Smooth counter animation
    const animate = () => {
      if (isCancelled) return;

      currentCount += (targetCount - currentCount) * 0.08;
      
      if (counterRef.current) {
        counterRef.current.textContent = Math.floor(currentCount).toString();
      }

      if (currentCount > 99.5 && allReady) {
        if (counterRef.current) {
          counterRef.current.textContent = "100";
        }
        setPhase("brand");

        const t1 = setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 1150);
        timersRef.current.push(t1);
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      timersRef.current.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden transform-gpu"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover opacity-50 brightness-110 scale-105 transform-gpu will-change-transform"
          >
            <source src="/videos/twin-turbo-furious.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,1)_100%)] z-0 pointer-events-none" />
          <div className="absolute left-1/2 top-1/2 h-px w-[64vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#D4AF37]/55 to-transparent z-0" />
          
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {phase === "counting" && (
                <motion.div
                  key="counter-phase"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.05, y: -15 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col items-center will-change-transform will-change-opacity"
                >
                  <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#D4AF37] opacity-80">
                    Inspired by the impossible
                  </p>
                  <div className="mt-8 overflow-hidden min-w-[300px] text-center flex justify-center">
                    <div
                      ref={counterRef}
                      className="font-display text-8xl font-light text-white md:text-[12rem] tracking-tighter tabular-nums transform-gpu"
                      style={{ willChange: "contents" }}
                    >
                      0
                    </div>
                  </div>
                </motion.div>
              )}

              {phase === "brand" && (
                <motion.div
                  key="brand-phase"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.1, y: -20 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center will-change-transform will-change-opacity"
                >
                  <h1 className="font-serif text-4xl uppercase tracking-[0.3em] text-white md:text-6xl text-center">
                    Jacob & Co
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default memo(PreloaderComponent);