import TransitionLink from "@/components/client/TransitionLink";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.7fr_0.7fr_0.9fr]">
          <div>
            <TransitionLink href="/" className="inline-flex items-center gap-3">
              <div className="relative h-12 w-12 md:h-14 md:w-14 shrink-0">
                <Image src="/logo.png" alt="Sharvex Logo" fill className="object-contain" sizes="56px" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl uppercase tracking-[0.18em] text-white md:text-3xl">Maison Riviera</span>
                <span className="text-[9px] uppercase tracking-[0.36em] text-white/45">by Sharvex</span>
              </div>
            </TransitionLink>
            <p className="mt-7 max-w-md text-sm leading-7 text-white/45">
              A cinematic clone-style luxury experience inspired by the official Maison Riviera timepieces universe.
            </p>
          </div>

          <FooterGroup
            title="Explore"
            links={[
              ["Timepieces", "/collection"],
              ["Astronomia", "/watch/astronomia"],
              ["Bugatti", "/watch/bugatti-chiron"],
              ["Casino", "/watch/casino-tourbillon"],
            ]}
          />
          <FooterGroup
            title="House"
            links={[
              ["About", "/about"],
              ["Contact", "/contact"],
              ["Epic X", "/watch/epic-x"],
              ["Gotham", "/watch/gotham-city"],
            ]}
          />

          <div>
            <p className="mb-6 font-serif text-sm uppercase tracking-[0.2em] text-white">Contact</p>
            <div className="space-y-4 text-sm leading-6 text-white/45">
              <p>48 East 57 Street, New York, NY 10022</p>
              <p>+1 (212) 719-5887</p>
              <p>website.inquiries@maisonriviera.com</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 text-xs uppercase tracking-[0.18em] text-white/30 md:flex-row">
          <p>© {new Date().getFullYear()} Maison Riviera inspired experience</p>
          <p>Built with Next.js, React Server Components, Tailwind, and CDN-first media</p>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <p className="mb-6 font-serif text-sm uppercase tracking-[0.2em] text-white">{title}</p>
      <ul className="space-y-4 text-sm text-white/45">
        {links.map(([label, href]) => (
          <li key={href}>
            <TransitionLink href={href} className="transition hover:text-[#D4AF37]">
              {label}
            </TransitionLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
