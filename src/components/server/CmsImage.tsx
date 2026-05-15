"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { imageFallbacks } from "@/constants/imageFallbacks";

interface CmsImageProps extends Omit<ImageProps, "src"> {
  src: string;
  cmsWidth?: number;
  cmsQuality?: number;
  fallbackSlug?: string;
}

/**
 * Uses the source CDN directly for CMS-hosted images so large remote assets do
 * not get re-optimized through /_next/image at request time.
 */
export default function CmsImage({
  src,
  cmsWidth,
  cmsQuality = 80,
  alt,
  fallbackSlug,
  ...props
}: CmsImageProps) {
  const [errorLevel, setErrorLevel] = useState(0);

  // If we've failed completely, hide the image
  if (errorLevel >= 2) {
    return null;
  }

  let currentSrc = src;
  
  if (errorLevel === 1) {
    if (fallbackSlug && imageFallbacks[fallbackSlug]) {
      currentSrc = imageFallbacks[fallbackSlug];
    } else {
      // If we don't have a fallback slug or it's not in the map, try to infer from src
      // or just hide it by returning null early
      const foundFallback = Object.values(imageFallbacks).find(v => v !== src);
      if (foundFallback && !src.includes("datocms-assets")) {
        currentSrc = foundFallback; // this is just a backup if all else fails
      } else {
         return null;
      }
    }
  }

  const isExternal = /^https?:\/\//.test(currentSrc);
  const isDatoCms = currentSrc.includes("datocms-assets.com");
  const optimizedSrc = isDatoCms
    ? getDatoCmsSrc(currentSrc, cmsWidth ?? getNumericWidth(props.width), cmsQuality)
    : currentSrc;

  return (
    <Image
      src={optimizedSrc}
      alt={alt || "Image"}
      unoptimized={isExternal}
      onError={() => {
        console.warn(`[CmsImage] Failed to load image: ${currentSrc}`);
        setErrorLevel(prev => prev + 1);
      }}
      {...props}
    />
  );
}

function getNumericWidth(width: ImageProps["width"]) {
  if (typeof width === "number") {
    return width;
  }

  if (typeof width === "string") {
    const parsed = Number.parseInt(width, 10);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function getDatoCmsSrc(src: string, width: number | undefined, quality: number) {
  try {
    const url = new URL(src);
    url.searchParams.set("auto", url.searchParams.get("auto") ?? "format");
    url.searchParams.set("fit", url.searchParams.get("fit") ?? "max");
    url.searchParams.set("q", url.searchParams.get("q") ?? String(quality));

    if (!url.searchParams.has("w")) {
      url.searchParams.set("w", String(width ?? 1200));
    }

    return url.toString();
  } catch {
    return src;
  }
}
