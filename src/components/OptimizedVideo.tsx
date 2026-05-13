"use client";

import React, { useEffect, useRef, useState, memo } from "react";

interface OptimizedVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  className?: string;
}

function OptimizedVideoComponent({ src, className, ...props }: OptimizedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: "200px 0px", // Preload slightly before it comes into view
        threshold: 0,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isIntersecting) {
      // Use a play promise to avoid DOMException on rapid play/pause
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented or interrupted, this is normal in some browsers
          console.debug("Video play interrupted:", error);
        });
      }
    } else {
      video.pause();
    }
  }, [isIntersecting, src]);

  // Support for WebM fallback if passing an .mp4
  const isMp4 = typeof src === "string" && src.endsWith(".mp4");
  const webmSrc = isMp4 ? src.replace(".mp4", ".webm") : null;

  return (
    <video
      ref={videoRef}
      className={className}
      {...props}
    >
      {isMp4 && webmSrc && <source src={webmSrc} type="video/webm" />}
      <source src={src} type={isMp4 ? "video/mp4" : undefined} />
    </video>
  );
}

export default memo(OptimizedVideoComponent);
