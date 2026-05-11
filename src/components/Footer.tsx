import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.7fr_0.7fr_0.9fr]">
          <div>
            <Link href="/" className="inline-flex flex-col">
              <span className="font-serif text-3xl uppercase tracking-[0.18em] text-white">Jacob & Co</span>
              <span className="mt-1 text-[10px] uppercase tracking-[0.36em] text-white/45">Geneve</span>
            </Link>
            <p className="mt-7 max-w-md text-sm leading-7 text-white/45">
              A cinematic clone-style luxury experience inspired by the official Jacob & Co timepieces universe.
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
              <p>website.inquiries@jacobandco.com</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 text-xs uppercase tracking-[0.18em] text-white/30 md:flex-row">
          <p>© {new Date().getFullYear()} Jacob & Co inspired experience</p>
          <p>Built with Next.js, React, Tailwind, GSAP, Framer Motion, and Lenis</p>
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
            <Link href={href} className="transition hover:text-[#D4AF37]">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
