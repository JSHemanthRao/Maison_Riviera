import ContactForm from "@/components/server/ContactForm";
import OptimizedVideo from "@/components/client/OptimizedVideo";
import { watchVideos } from "@/constants/watchVideos";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative flex min-h-screen items-center overflow-hidden py-36">
        <OptimizedVideo
          data-route-critical
          src={watchVideos["billionaire"] || "/videos/billionaire-iii.mp4"}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-40 brightness-90 transform-gpu will-change-transform"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.78)_45%,rgba(0,0,0,0.5)_100%),linear-gradient(180deg,#000,transparent,#000)]" />

        <div className="container relative z-10 mx-auto grid gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="animate-[fadeInUp_900ms_ease-out_120ms_both]">
            <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[#D4AF37]">Private Appointment</p>
            <h1 className="font-display text-6xl leading-none text-white md:text-8xl">Speak with a specialist.</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">
              Request a private consultation for a grand complication, boutique viewing, or collector appointment.
            </p>
            <div className="mt-10 space-y-3 text-sm uppercase tracking-[0.18em] text-white/45">
              <p>48 East 57 Street, New York, NY 10022</p>
              <p>+1 (212) 719-5887</p>
              <p>website.inquiries@maisonriviera.com</p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
}
