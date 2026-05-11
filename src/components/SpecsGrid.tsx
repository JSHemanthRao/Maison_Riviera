'use client';

import { motion } from 'framer-motion';
import { Specification } from '@/data/watches';

export default function SpecsGrid({ specs }: { specs: Specification[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {specs.map((spec, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
        </motion.div>
      ))}
    </div>
  );
}
