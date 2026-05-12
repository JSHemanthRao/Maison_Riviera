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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [label, setLabel] = useState("Preparing");
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
      setLabel("Preparing");
      setIsTransitioning(true);

      fallbackTimerRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
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
    if (!isTransitioning) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isTransitioning]);

  useEffect(() => {
    if (!isTransitioning || startPathRef.current === pathname) {
      return;
    }

    let isCancelled = false;
    const transitionId = transitionIdRef.current;

    const finishTransition = async () => {
      setLabel("Rendering");
      await withTimeout(waitForRouteReady(), ROUTE_READY_TIMEOUT);

      if (isCancelled || transitionId !== transitionIdRef.current) {
        return;
      }

      setLabel("Entering");
      await sleep(260);

      if (!isCancelled && transitionId === transitionIdRef.current) {
        if (fallbackTimerRef.current) {
          window.clearTimeout(fallbackTimerRef.current);
        }
        setIsTransitioning(false);
        startPathRef.current = null;
      }
    };

    finishTransition();

    return () => {
      isCancelled = true;
    };
  }, [pathname, isTransitioning]);

  if (!isTransitioning) {
    return null;
  }

  return (
    <div className="pointer-events-auto fixed inset-0 z-[9999] flex animate-[curtainIn_420ms_ease-out_both] items-center justify-center bg-black/96">
      <div className="flex w-[min(78vw,520px)] flex-col items-center">
        <p className="mb-6 font-serif text-xs uppercase tracking-[0.42em] text-[#D4AF37]">{label}</p>
        <div className="relative h-px w-full overflow-hidden bg-white/10">
          <div className="absolute inset-y-0 left-0 w-1/3 animate-[siteLoadRail_1.05s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>
      </div>
    </div>
  );
}
