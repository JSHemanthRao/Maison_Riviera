"use client";

import React, { memo, useEffect, useState } from "react";
import { usePreloader } from "@/hooks/usePreloader";
import Image from "next/image";

function PreloaderComponent() {
  const { isLoading, phase, counterRef } = usePreloader();
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => setMounted(false), 1400); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!mounted) return null;

  const isExiting = !isLoading;

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden transform-gpu transition-transform duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ transform: isExiting ? "translateY(-100%)" : "translateY(0%)" }}
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
        <div
          className="flex flex-col items-center will-change-transform will-change-opacity transition-all duration-800 ease-out absolute"
          style={{
            opacity: phase === "counting" && !isExiting ? 1 : 0,
            transform: phase === "counting" && !isExiting ? "translateY(0) scale(1)" : "translateY(-15px) scale(1.05)",
            pointerEvents: phase === "counting" ? "auto" : "none"
          }}
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
        </div>

        <div
          className="absolute inset-0 flex flex-col items-center justify-center will-change-transform will-change-opacity transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: phase === "brand" && !isExiting ? 1 : 0,
            transform: phase === "brand" && !isExiting ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
            pointerEvents: phase === "brand" ? "auto" : "none"
          }}
        >
          <h1 className="font-serif text-4xl uppercase tracking-[0.3em] text-white md:text-6xl text-center">
            Maison Riviera
          </h1>
          <p className="mt-4 text-sm font-light tracking-[0.4em] text-white/60 uppercase">
            BY SHARVEX
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(PreloaderComponent);