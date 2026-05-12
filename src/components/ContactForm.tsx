"use client";

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

export default function ContactForm() {
  return (
    <form
      className="glass-luxury animate-[fadeInUp_900ms_ease-out_220ms_both] p-7 md:p-12"
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
    </form>
  );
}
