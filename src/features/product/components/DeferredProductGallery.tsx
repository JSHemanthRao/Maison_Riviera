"use client";

import dynamic from "next/dynamic";

interface DeferredProductGalleryProps {
  images: string[];
  title: string;
}

const ProductGallery = dynamic(() => import("@/features/product/components/ProductGallery"), {
  ssr: false,
  loading: () => <GallerySkeleton />,
});

export default function DeferredProductGallery(props: DeferredProductGalleryProps) {
  return <ProductGallery {...props} />;
}

function GallerySkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_168px]">
      <div className="min-h-[520px] animate-pulse border border-white/5 bg-[#050505] md:min-h-[680px]" />
      <div className="flex gap-3 overflow-hidden lg:flex-col">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 w-28 shrink-0 animate-pulse border border-white/5 bg-[#070707] lg:h-36 lg:w-full"
          />
        ))}
      </div>
    </div>
  );
}
