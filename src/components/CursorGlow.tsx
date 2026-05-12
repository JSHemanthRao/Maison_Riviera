"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      return;
    }

    let frame = 0;
    let x = -150;
    let y = -150;

    const moveCursor = (e: MouseEvent) => {
      x = e.clientX - 150;
      y = e.clientY - 150;

      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          if (glowRef.current) {
            glowRef.current.style.opacity = "1";
            glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
          }
        });
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-50 h-[300px] w-[300px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-700"
      style={{
        background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.03) 40%, transparent 70%)",
        transform: "translate3d(-150px, -150px, 0)",
      }}
    />
  );
}
