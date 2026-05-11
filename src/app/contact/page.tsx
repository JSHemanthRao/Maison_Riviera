"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative flex min-h-screen items-center overflow-hidden py-36">
        <Image
          src="https://www.datocms-assets.com/99008/1703273139-1-billionaire-iii-lifestyle.webp"
          alt="Luxury watch appointment"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.78)_45%,rgba(0,0,0,0.5)_100%),linear-gradient(180deg,#000,transparent,#000)]" />

        <div className="container relative z-10 mx-auto grid gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28, filter: "blur(18px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-5 text-xs uppercase tracking-[0.34em] text-[#D4AF37]">Private Appointment</p>
            <h1 className="font-display text-6xl leading-none text-white md:text-8xl">Speak with a specialist.</h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/60">
              Request a private consultation for a grand complication, boutique viewing, or collector appointment.
            </p>
            <div className="mt-10 space-y-3 text-sm uppercase tracking-[0.18em] text-white/45">
              <p>48 East 57 Street, New York, NY 10022</p>
              <p>+1 (212) 719-5887</p>
              <p>website.inquiries@jacobandco.com</p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 28, filter: "blur(18px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="glass-luxury p-7 md:p-12"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-8 md:grid-cols-2">
              <Field label="Name" placeholder="Full name" />
              <Field label="Email" placeholder="Email address" type="email" />
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <Field label="Phone" placeholder="Phone number" />
              <Field label="Collection" placeholder="Astronomia, Bugatti..." />
            </div>
            <div className="mt-8">
              <label className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4AF37]">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us about the timepiece or appointment you have in mind"
                className="w-full resize-none border-b border-white/20 bg-transparent pb-3 text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]"
              />
            </div>
            <button type="submit" className="luxury-button mt-10 w-full">
              <span>Send Inquiry</span>
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-3 block text-xs uppercase tracking-[0.24em] text-[#D4AF37]">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-b border-white/20 bg-transparent pb-3 text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]"
      />
    </label>
  );
}
