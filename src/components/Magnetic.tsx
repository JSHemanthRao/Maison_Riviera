"use client";

import React, { useRef, memo } from "react";

interface MagneticProps {
  children: React.ReactNode;
  intensity?: number;
}

function Magnetic({ children, intensity = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);

  const captureBounds = () => {
    boundsRef.current = ref.current?.getBoundingClientRect() ?? null;
  };

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boundsRef.current || !ref.current || window.matchMedia("(hover: none)").matches) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = boundsRef.current;
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Direct DOM manipulation to avoid React re-renders on mouse move (60fps lock)
    ref.current.style.transform = `translate3d(${middleX * intensity}px, ${middleY * intensity}px, 0)`;
  };

  const reset = () => {
    if (ref.current) {
      ref.current.style.transform = `translate3d(0px, 0px, 0)`;
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={captureBounds}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="inline-block transition-transform duration-300 ease-out will-change-transform"
    >
      {children}
    </div>
  );
}

export default memo(Magnetic);
