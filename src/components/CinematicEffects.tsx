"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

export default function CinematicEffects() {
  const pathname = usePathname();
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // A short timeout ensures React hydration completes before GSAP 
    // injects inline styles, preventing hydration mismatch errors.
    const timeoutId = setTimeout(() => {
      ctxRef.current = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-gsap='reveal']").forEach((element) => {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 54, filter: "blur(16px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: element,
                start: "top 82%",
                once: true,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-gsap='parallax']").forEach((element) => {
          gsap.to(element, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: element.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
    };
  }, [pathname]);

  return null;
}
