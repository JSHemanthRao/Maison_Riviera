"use client";

import { useRef, useState } from "react";

interface MagneticProps {
  children: React.ReactNode;
  intensity?: number;
}

export default function Magnetic({ children, intensity = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const boundsRef = useRef<DOMRect | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const captureBounds = () => {
    boundsRef.current = ref.current?.getBoundingClientRect() ?? null;
  };

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boundsRef.current || window.matchMedia("(hover: none)").matches) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = boundsRef.current;
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * intensity, y: middleY * intensity });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={captureBounds}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      className="inline-block transition-transform duration-300 ease-out"
    >
      {children}
    </div>
  );
}
