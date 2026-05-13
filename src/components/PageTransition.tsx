"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const MINIMUM_LOADER_TIME = 900;
const ROUTE_READY_TIMEOUT = 5200;
const MEDIA_READY_TIMEOUT = 3600;

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function nextFrame() {
  return new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()));
}

async function waitForPaint() {
  await nextFrame();
  await nextFrame();
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | void> {
  return Promise.race([promise, sleep(ms)]);
}

function isVisibleElement(element: Element) {
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0 && rect.top < window.innerHeight * 1.4 && rect.bottom > -120;
}

function getCriticalRouteMedia() {
  const main = document.querySelector("main");
  const firstSection = main?.querySelector("section");
  const media = new Set<Element>();

  document.querySelectorAll("[data-route-critical]").forEach((element) => media.add(element));
  firstSection?.querySelectorAll("img, video, iframe").forEach((element) => media.add(element));

  return Array.from(media).filter(isVisibleElement);
}

function waitForImage(image: HTMLImageElement) {
  if (image.complete && image.naturalWidth > 0) {
    return image.decode ? image.decode().catch(() => undefined) : Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const done = () => {
      image.removeEventListener("load", done);
      image.removeEventListener("error", done);
      resolve();
    };

    image.addEventListener("load", done, { once: true });
    image.addEventListener("error", done, { once: true });
  });
}

function waitForVideo(video: HTMLVideoElement) {
  if (video.readyState >= 2) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const done = () => {
      video.removeEventListener("loadeddata", done);
      video.removeEventListener("canplay", done);
      video.removeEventListener("playing", done);
      video.removeEventListener("error", done);
      resolve();
    };

    video.addEventListener("loadeddata", done, { once: true });
    video.addEventListener("canplay", done, { once: true });
    video.addEventListener("playing", done, { once: true });
    video.addEventListener("error", done, { once: true });
  });
}

function waitForIframe(frame: HTMLIFrameElement) {
  return new Promise<void>((resolve) => {
    const done = () => {
      frame.removeEventListener("load", done);
      frame.removeEventListener("error", done);
      resolve();
    };

    frame.addEventListener("load", done, { once: true });
    frame.addEventListener("error", done, { once: true });
    window.setTimeout(done, 900);
  });
}

async function waitForRouteReady() {
  const start = performance.now();

  await waitForPaint();
  await withTimeout(document.fonts?.ready ?? Promise.resolve(), 1200);

  const media = getCriticalRouteMedia();
  await withTimeout(
    Promise.all(
      media.map((element) => {
        if (element instanceof HTMLImageElement) {
          return waitForImage(element);
        }

        if (element instanceof HTMLVideoElement) {
          return waitForVideo(element);
        }

        if (element instanceof HTMLIFrameElement) {
          return waitForIframe(element);
        }

        return Promise.resolve();
      }),
    ),
    MEDIA_READY_TIMEOUT,
  );

  await waitForPaint();

  const elapsed = performance.now() - start;
  if (elapsed < MINIMUM_LOADER_TIME) {
    await sleep(MINIMUM_LOADER_TIME - elapsed);
  }
}

export default function PageTransition() {
  const pathname = usePathname();
  const [transitionState, setTransitionState] = useState<"idle" | "entering" | "loading" | "exiting">("idle");
  const [label, setLabel] = useState("Calibrating Movement");
  const startPathRef = useRef<string | null>(null);
  const transitionIdRef = useRef(0);
  const fallbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const handleStart = () => {
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
      }

      startPathRef.current = window.location.pathname;
      transitionIdRef.current += 1;
      setLabel("Calibrating Movement");
      setTransitionState("entering");

      // After curtain closes, move to loading state
      setTimeout(() => {
        if (transitionIdRef.current) setTransitionState("loading");
      }, 500);

      fallbackTimerRef.current = window.setTimeout(() => {
        setTransitionState("exiting");
        setTimeout(() => setTransitionState("idle"), 600);
        startPathRef.current = null;
      }, ROUTE_READY_TIMEOUT + 1800);
    };

    window.addEventListener("page-transition-start", handleStart);
    return () => {
      window.removeEventListener("page-transition-start", handleStart);
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (transitionState === "idle") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [transitionState]);

  useEffect(() => {
    if (transitionState !== "loading" || startPathRef.current === pathname) {
      return;
    }

    let isCancelled = false;
    const transitionId = transitionIdRef.current;

    const finishTransition = async () => {
      setLabel("Synchronizing Complications");
      await withTimeout(waitForRouteReady(), ROUTE_READY_TIMEOUT);

      if (isCancelled || transitionId !== transitionIdRef.current) {
        return;
      }

      setLabel("Unveiling Timepiece");
      await sleep(200);

      if (!isCancelled && transitionId === transitionIdRef.current) {
        if (fallbackTimerRef.current) {
          window.clearTimeout(fallbackTimerRef.current);
        }
        setTransitionState("exiting");
        setTimeout(() => {
          if (transitionId === transitionIdRef.current) {
            setTransitionState("idle");
            startPathRef.current = null;
          }
        }, 700);
      }
    };

    finishTransition();

    return () => {
      isCancelled = true;
    };
  }, [pathname, transitionState]);

  if (transitionState === "idle") {
    return null;
  }

  // Curtain animation logic
  const isExiting = transitionState === "exiting";

  return (
    <div className="pointer-events-auto fixed inset-0 z-[9999] overflow-hidden">
      {/* The wipe panel */}
      <div
        className="absolute inset-0 bg-[#050505] transition-transform duration-700 ease-[0.76,0,0.24,1]"
        style={{
          transform: isExiting ? "translateY(-100%)" : transitionState === "entering" ? "translateY(100%)" : "translateY(0%)",
        }}
      />
      
      {/* Loading content inside the panel */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{
          opacity: transitionState === "loading" ? 1 : 0,
        }}
      >
        <div className="flex flex-col items-center">
          <div className="relative size-12 overflow-hidden rounded-full border border-white/10">
            <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 origin-top-left animate-[spin_1.5s_linear_infinite] bg-gradient-to-br from-[#D4AF37] to-transparent opacity-50" />
            <div className="absolute inset-1 rounded-full bg-[#050505]" />
          </div>
          <p className="mt-6 font-serif text-[10px] uppercase tracking-[0.42em] text-[#D4AF37] opacity-80">{label}</p>
        </div>
      </div>
    </div>
  );
}
