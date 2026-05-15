"use client";

import { memo } from "react";
import CmsImage from "@/components/server/CmsImage";

interface ThumbnailRailProps {
  images: string[];
  title: string;
  currentIndex: number;
  onChange: (index: number) => void;
}

function ThumbnailRail({ images, title, currentIndex, onChange }: ThumbnailRailProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0 scrollbar-hide">
      {images.map((image, index) => (
        <button
          key={`${image}-${index}`}
          type="button"
          aria-label={`View ${title} image ${index + 1}`}
          onClick={() => onChange(index)}
          className={`relative h-28 w-28 shrink-0 overflow-hidden border bg-[#070707] transition duration-500 lg:h-36 lg:w-full ${
            currentIndex === index
              ? "border-[#D4AF37] opacity-100 shadow-[0_0_28px_rgba(212,175,55,0.2)]"
              : "border-white/5 opacity-45 hover:opacity-100"
          }`}
        >
          <CmsImage 
            src={image} 
            alt={`${title} thumbnail`} 
            fill 
            sizes="168px" 
            cmsWidth={240} 
            className="object-contain p-3 transition-transform duration-700 hover:scale-110" 
          />
        </button>
      ))}
    </div>
  );
}

export default memo(ThumbnailRail);
