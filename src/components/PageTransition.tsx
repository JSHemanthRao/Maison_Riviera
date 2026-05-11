"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsTransitioning(true);
    window.addEventListener("page-transition-start", handleStart);
    return () => window.removeEventListener("page-transition-start", handleStart);
  }, []);

  useEffect(() => {
    if (isTransitioning) {
      // The new page has mounted (pathname changed).
      // We keep the curtain up for a tiny fraction of a second 
      // to let the browser paint, then fade it out.
      const timeoutId = setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [pathname, isTransitioning]);

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="transition-curtain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto fixed inset-0 z-[9999] bg-black"
        />
      )}
    </AnimatePresence>
  );
}
