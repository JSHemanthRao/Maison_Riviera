import { Specification } from '@/data/watches';

export default function SpecsGrid({ specs }: { specs: Specification[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {specs.map((spec, idx) => (
        <div 
          key={idx}
          data-gsap="reveal"
          style={{ transitionDelay: `${Math.min(idx * 70, 280)}ms` }}
          className="glass-luxury group relative overflow-hidden p-8 transition-colors duration-500 hover:border-[#D4AF37]/45 md:p-10"
        >
          {/* Glassmorphism / Glow background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <div className="relative z-10">
            <p className="text-[#D4AF37] text-xs tracking-[0.2em] uppercase mb-4 font-medium font-inter">
              {spec.label}
            </p>
            <p className="text-white text-xl md:text-2xl font-serif leading-relaxed">
              {spec.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
