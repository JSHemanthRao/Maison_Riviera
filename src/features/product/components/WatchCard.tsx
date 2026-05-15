"use client";

import { useState } from "react";
import CmsImage from "@/components/server/CmsImage";
import { ArrowUpRight } from "lucide-react";
import { Watch } from "@/features/product/types";
import TransitionLink from "@/components/client/TransitionLink";

interface WatchCardProps {
  watch: Watch;
  index: number;
}

export default function WatchCard({ watch, index }: WatchCardProps) {
  const [clicked, setClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{ transitionDelay: `${Math.min(index * 55, 220)}ms` }}
      className="h-full transform-gpu will-change-transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setClicked(true)}
    >
      <TransitionLink href={`/watch/${watch.slug}`} prefetch={false} className="group relative block overflow-hidden transform-gpu">
        <div
          className="glass-luxury relative flex h-full min-h-[520px] flex-col overflow-hidden transition-[transform,border-color,box-shadow] duration-700 ease-[0.16,1,0.3,1] hover:-translate-y-2 hover:border-[#D4AF37]/55 hover:shadow-[0_30px_90px_rgba(212,175,55,0.16)] transform-gpu will-change-transform"
        >
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-opacity">
            <div className="absolute top-0 left-[-100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] group-hover:animate-[sweep_1.5s_ease-in-out] transform-gpu will-change-transform" />
          </div>

          <div className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-black p-6 transform-gpu">
            <div className={`absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_18%,rgba(212,175,55,0.11),transparent_32%),linear-gradient(to_top,rgba(0,0,0,0.85),transparent)] transition-opacity duration-700 transform-gpu will-change-opacity ${isHovered || clicked ? 'opacity-45' : 'opacity-80'}`} />
            
            <div 
              className="w-full h-full relative z-10 transform-gpu will-change-transform"
            >
              <CmsImage
                style={{ viewTransitionName: `video-${watch.slug}` } as React.CSSProperties}
                src={watch.heroImage}
                alt={watch.name}
                fallbackSlug={watch.slug}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                className={`object-contain drop-shadow-2xl brightness-90 transition-all duration-1000 ease-[0.16,1,0.3,1] transform-gpu will-change-transform will-change-opacity ${isHovered || clicked ? 'scale-110 brightness-110' : ''}`}
              />
            </div>
          </div>
          
          <div className="relative z-20 flex flex-grow flex-col justify-end border-t border-white/5 bg-[#050505] p-6 transition-colors duration-700 group-hover:border-[#D4AF37]/30 transform-gpu">
            <div className="transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:-translate-y-2 transform-gpu will-change-transform">
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]">
                {watch.collection}
              </p>
              <h3 className="mb-4 text-2xl font-serif uppercase leading-tight text-white transition-colors duration-500 group-hover:text-[#D4AF37]">
                {watch.name}
              </h3>
              <p className="text-sm uppercase tracking-[0.18em] text-white/50 transition-colors duration-500 group-hover:text-white">
                {watch.price}
              </p>
            </div>
            <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5 text-xs uppercase tracking-[0.18em] text-white/40 transition-colors duration-500 group-hover:text-[#D4AF37]">
              <span>Explore</span>
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </TransitionLink>
    </div>
  );
}
