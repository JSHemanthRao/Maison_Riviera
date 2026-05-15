"use client";

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

interface OptimizedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
  priority?: boolean;
}

function OptimizedVideoPlayer({
  src,
  className,
  priority = false,
  preload = "metadata",
  autoPlay,
  ...props
}: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);
  const routeCritical = "data-route-critical" in props;
  const shouldLoadImmediately = priority || routeCritical;
  const [shouldLoad, setShouldLoad] = useState(shouldLoadImmediately);

  const shouldReduceMotion = useMemo(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;

    return (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      connection?.saveData === true ||
      connection?.effectiveType === "2g" ||
      connection?.effectiveType === "slow-2g"
    );
  }, []);

  const autoPlayRef = useRef(autoPlay);
  useEffect(() => {
    autoPlayRef.current = autoPlay;
  }, [autoPlay]);

  const playIfAllowed = useCallback(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion || !isVisibleRef.current) {
      return;
    }

    if (typeof src === "string") {
      try {
        const srcPath = new URL(src, "http://localhost").pathname;
        const savedKey = `video-time-${srcPath}`;
        const savedTime = sessionStorage.getItem(savedKey);
        
        if (savedTime && video.readyState >= 1) { // HAVE_METADATA or better
          const time = parseFloat(savedTime);
          if (time > 0 && time < video.duration) {
            video.currentTime = time;
          }
          sessionStorage.removeItem(savedKey);
        }
      } catch {
        // Ignore URL parsing errors
      }
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => undefined);
    }
  }, [shouldReduceMotion, src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          setShouldLoad(true);
          window.requestAnimationFrame(() => {
            if (autoPlayRef.current || videoRef.current?.paused === false) {
               playIfAllowed();
            }
          });
        } else {
          video.pause();
        }
      },
      {
        rootMargin: "200px 0px",
        threshold: 0,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [playIfAllowed]);

  useEffect(() => {
    const video = videoRef.current;
    return () => {
      if (video) {
        video.pause();
      }
    };
  }, []);

  // Force strict muting to prevent browser autoplay blocks
  useEffect(() => {
    if (videoRef.current && props.muted) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.setAttribute("muted", "true");
    }
  }, [props.muted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (autoPlay) {
      playIfAllowed();
    } else {
      video.pause();
    }
  }, [playIfAllowed, autoPlay, shouldLoad]);

  const isMp4 = typeof src === "string" && src.endsWith(".mp4");

  return (
    <video
      ref={videoRef}
      className={`${className} transform-gpu will-change-transform`}
      autoPlay={autoPlay}
      preload={shouldLoad ? preload : "none"}
      onCanPlay={playIfAllowed}
      {...props}
    >
      {shouldLoad ? <source src={src} type={isMp4 ? "video/mp4" : undefined} /> : null}
    </video>
  );
}

export default memo(OptimizedVideoPlayer);
