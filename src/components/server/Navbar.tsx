import TransitionLink from "@/components/client/TransitionLink";
import MobileMenu from "@/components/islands/MobileMenu";
import { Search } from "lucide-react";
import Image from "next/image";

const links = [
  { name: "Timepieces", path: "/collection" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#D4AF37]/15 bg-black/75 backdrop-blur-xl">
      <div className="container mx-auto flex h-24 items-center justify-between px-6">
        <TransitionLink
          href="/"
          className="group flex min-w-0 items-center gap-3 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0 transition-transform group-hover:scale-105">
            <Image 
              src="/logo.png" 
              alt="Sharvex Logo" 
              fill 
              className="object-contain"
              sizes="48px"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-serif text-lg uppercase tracking-[0.14em] text-white transition group-hover:text-[#D4AF37] md:text-xl md:tracking-[0.2em]">
              Maison Riviera
            </span>
            <span className="text-[9px] uppercase tracking-[0.36em] text-white/45">by Sharvex</span>
          </div>
        </TransitionLink>

        <nav className="hidden items-center gap-12 md:flex">
          {links.map((item) => (
            <TransitionLink
              key={item.name}
              href={item.path}
              className="group relative block text-xs uppercase tracking-[0.24em] text-white/75 transition hover:-translate-y-0.5 hover:text-[#D4AF37]"
            >
              {item.name}
              <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-[#D4AF37] transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:scale-x-100" />
            </TransitionLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            aria-label="Search"
            className="grid size-11 place-items-center border border-white/10 text-white/70 transition hover:-translate-y-0.5 hover:border-[#D4AF37] hover:text-[#D4AF37]"
          >
            <Search size={17} />
          </button>
          <TransitionLink href="/contact" className="luxury-button px-6 py-3">
            <span>Inquire</span>
          </TransitionLink>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
