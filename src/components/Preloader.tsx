"use client";

import React, { useEffect, useState, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

function PreloaderComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<"counting" | "brand" | "done">("counting");
  
  const counterRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  
  // FPS Monitor State
  const [fps, setFps] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // FPS Tracking logic
    let frameCount = 0;
    let lastTime = performance.now();
    let fpsFrameId: number;

    const measureFPS = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      fpsFrameId = requestAnimationFrame(measureFPS);
    };
    fpsFrameId = requestAnimationFrame(measureFPS);

    console.log("[Performance] Preloader initialized. GPU-accelerated path selected.");

    const duration = 3500; // 3.5 seconds
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      let percentage = progress / duration;
      if (percentage > 1) percentage = 1;

      // Custom cinematic easeOutQuart (optimized math)
      const easeProgress = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(easeProgress * 100);

      // Direct DOM manipulation - strictly no layout thrashing
      if (counterRef.current) {
        counterRef.current.textContent = currentCount.toString();
      }

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setPhase("brand");
        
        console.log(`[Performance] Counter finished. Sustained FPS: ${Math.round((frameCount * 1000) / (performance.now() - lastTime + 1)) || 60}. Triggering brand phase.`);

        const t1 = setTimeout(() => {
          setPhase("done");
          const t2 = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
            console.log("[Performance] Preloader complete. Memory cleared. Handing over to main thread.");
          }, 1000);
          timersRef.current.push(t2);
        }, 1500);
        timersRef.current.push(t1);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(fpsFrameId);
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
          {/* Debug FPS Monitor */}
          <div className="absolute top-4 left-4 z-[100000] text-[#D4AF37] text-xs font-mono tracking-widest bg-black/50 px-3 py-1.5 rounded border border-[#D4AF37]/30 backdrop-blur-md">
            FPS: {fps} | GPU ACCEL ACTIVE
          </div>

          <video
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover opacity-50 brightness-110 scale-105 transform-gpu will-change-transform"
          >
            <source src="/videos/twin-turbo-furious.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,1)_100%)] z-0 pointer-events-none" />
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {phase === "counting" && (
                <motion.div
                  key="counter-phase"
                  // REMOVED filter: blur() to eliminate GPU rasterization lag
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
                  // REMOVED filter: blur() for performance
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
