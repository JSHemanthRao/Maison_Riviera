'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08, syncTouch: true, wheelMultiplier: 1.15, smoothWheel: true, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
