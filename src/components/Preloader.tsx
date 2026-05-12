"use client";

import React, { memo, useEffect, useRef, useState } from "react";

function PreloaderComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<"counting" | "brand">("counting");

  const counterRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("luxury-entry-preloader-seen") === "true") {
        setIsLoading(false);
        return;
      }
      sessionStorage.setItem("luxury-entry-preloader-seen", "true");
    } catch {
      // If storage is blocked, still show the entrance loader once for this mount.
    }

    document.body.style.overflow = "hidden";

    const minimumWait = 2200;
    const maximumWait = 8500;
    const timers = timersRef.current;
    let pageReady = document.readyState === "complete";
    let startTime: number | null = null;
    let animationFrameId: number;

    const markPageReady = () => {
      pageReady = true;
    };

    if (!pageReady) {
      window.addEventListener("load", markPageReady, { once: true });
    }

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const canEnterSite = (pageReady && progress >= minimumWait) || progress >= maximumWait;
      const percentage = canEnterSite ? 1 : Math.min(0.94, progress / minimumWait);

      // Custom cinematic easeOutQuart (optimized math)
      const easeProgress = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(easeProgress * 100);

      // Direct DOM manipulation - strictly no layout thrashing
      if (counterRef.current) {
        counterRef.current.textContent = currentCount.toString();
      }

      if (!canEnterSite) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setPhase("brand");

        const t1 = setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 1150);
        timers.push(t1);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("load", markPageReady);
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="preloader-container fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-black transform-gpu">
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        preload="auto"
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-50 brightness-110 transform-gpu will-change-transform"
      >
        <source src="/videos/twin-turbo-furious.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,1)_100%)]" />
      <div className="absolute left-1/2 top-1/2 h-px w-[64vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-[#D4AF37]/55 to-transparent" />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
        {phase === "counting" && (
          <div className="absolute flex animate-[fadeInUp_360ms_ease-out_both] flex-col items-center">
            <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#D4AF37] opacity-80">
              Inspired by the impossible
            </p>
            <div className="mt-8 flex min-w-[300px] justify-center overflow-hidden text-center">
              <div
                ref={counterRef}
                className="font-display text-8xl font-light tracking-normal text-white md:text-[12rem]"
              >
                0
              </div>
            </div>
          </div>
        )}

        {phase === "brand" && (
          <div className="absolute inset-0 flex animate-[fadeInUp_440ms_ease-out_both] items-center justify-center">
            <h1 className="text-center font-serif text-4xl uppercase tracking-[0.3em] text-white md:text-6xl">
              Jacob & Co
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(PreloaderComponent);
