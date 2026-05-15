import { useEffect, useRef, useState } from "react";
import { sleep, waitForImage, waitForVideo } from "@/utils/dom";

export function usePreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<"counting" | "brand">("counting");

  const counterRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    try {
      const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      const isReload = navEntries.length > 0 && navEntries[0].type === "reload";
      const hasSeen = sessionStorage.getItem("luxury-entry-preloader-seen");

      if (hasSeen === "true" && !isReload) {
        setTimeout(() => setIsLoading(false), 0);
        return;
      }

      sessionStorage.setItem("luxury-entry-preloader-seen", "true");
    } catch {
      // Ignore storage errors
    }

    document.body.style.overflow = "hidden";

    let animationFrameId: number;
    let currentCount = 0;
    let targetCount = 0;
    let isCancelled = false;
    let allReady = false;

    // Fast-tracking fonts
    document.fonts?.ready.then(() => {
      targetCount = Math.max(targetCount, 25);
    }).catch(() => {
      // ignore
    });

    // Main initialization sequence
    const initLoadingSequence = async () => {
      await sleep(100);

      try {
        const media = new Set<Element>();
        document.querySelectorAll("[data-route-critical]").forEach((element) => media.add(element));
        
        const firstSection = document.querySelector("main section");
        firstSection?.querySelectorAll("img, video, iframe").forEach((element) => media.add(element));

        const mediaElements = Array.from(media);
        const totalItems = mediaElements.length + 1; // +1 for basic page load
        let itemsLoaded = 0;

        const incrementProgress = () => {
          if (allReady) return;
          itemsLoaded++;
          targetCount = 25 + Math.floor((itemsLoaded / totalItems) * 70);
        };

        if (document.readyState === "complete") {
          incrementProgress();
        } else {
          window.addEventListener("load", incrementProgress, { once: true });
        }

        const loadPromises = mediaElements.map(async (element) => {
          try {
            if (element instanceof HTMLImageElement) {
              await waitForImage(element);
            } else if (element instanceof HTMLVideoElement) {
              await waitForVideo(element);
            }
          } catch (e) {
            console.warn("Asset load failed, continuing", e);
          }
          incrementProgress();
        });

        await Promise.race([
          Promise.all(loadPromises),
          sleep(6000) // 6 seconds max fallback timeout
        ]);
      } catch (e) {
        console.warn("Preloader sequence error", e);
      } finally {
        allReady = true;
        targetCount = 100;
      }
    };

    initLoadingSequence();

    // Max 6s fallback safety
    const safetyTimer = setTimeout(() => {
      if (!allReady) {
        allReady = true;
        targetCount = 100;
      }
    }, 6000);
    timersRef.current.push(safetyTimer);

    // Smooth counter animation
    const animate = () => {
      if (isCancelled) return;

      currentCount += (targetCount - currentCount) * 0.15;
      
      if (counterRef.current) {
        counterRef.current.textContent = Math.floor(currentCount).toString();
      }

      if (currentCount > 99.5 && allReady) {
        if (counterRef.current) {
          counterRef.current.textContent = "100";
        }
        setPhase("brand");

        const t1 = setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = "";
        }, 1150);
        timersRef.current.push(t1);
        return;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const currentTimers = timersRef.current;
    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      currentTimers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  return { isLoading, phase, counterRef };
}
