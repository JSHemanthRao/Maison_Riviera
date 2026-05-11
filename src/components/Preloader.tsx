"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState<"counting" | "brand" | "done">("counting");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const duration = 3500; // 3.5 seconds of counting
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = Math.min((currentStep / steps) * 100, 100);
      
      const easeProgress = 1 - Math.pow(1 - progress / 100, 4);
      setCounter(Math.floor(easeProgress * 100));

      if (currentStep >= steps) {
        clearInterval(interval);
        setPhase("brand"); // Switch to brand logo flash
        
        setTimeout(() => {
          setPhase("done");
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
          }, 1000); // Wait for brand flash to finish before lifting curtain
        }, 1500); // Show brand logo for 1.5 seconds
      }
    }, intervalTime);

    return () => {
      clearInterval(interval);
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
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-40 brightness-50"
          >
            <source src="/videos/twin-turbo-furious.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40 z-0" />
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {phase === "counting" && (
                <motion.div 
                  key="counter-phase"
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="flex flex-col items-center"
                >
                  <p className="font-serif text-xs uppercase tracking-[0.4em] text-[#D4AF37] opacity-80">
                    Inspired by the impossible
                  </p>
                  <div className="mt-8 overflow-hidden">
                    <motion.div
                      className="font-display text-8xl font-light text-white md:text-[12rem] tracking-tighter"
                    >
                      {counter}
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {phase === "brand" && (
                <motion.div
                  key="brand-phase"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
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
