"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import TransitionLink from "@/components/client/TransitionLink";

const links = [
  { name: "Timepieces", path: "/collection" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        className="grid size-11 place-items-center border border-white/10 text-white"
        onClick={() => setIsOpen((value) => !value)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-24 animate-[fadeInUp_260ms_ease-out_both] border-t border-white/10 bg-black/95 px-6 py-8">
          <div className="flex flex-col gap-7">
            {links.map((item) => (
              <TransitionLink
                key={item.name}
                href={item.path}
                className="text-lg uppercase tracking-[0.24em] text-white/80"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </TransitionLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
