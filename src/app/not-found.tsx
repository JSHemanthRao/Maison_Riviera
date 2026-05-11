'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="relative bg-[#000000] min-h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Background Image / Texture */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://www.datocms-assets.com/99008/1698435765-1-astrotourb-inspo.webp"
          alt="404 Background"
          fill
          className="object-cover opacity-20 filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000] via-[#000]/60 to-[#000]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-8xl md:text-[150px] font-serif text-[#D4AF37] mb-2 uppercase tracking-widest leading-none drop-shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            404
          </h1>
          <h2 className="text-2xl md:text-4xl font-serif text-white mb-8 tracking-widest uppercase">
            Page Not Found
          </h2>
          
          <p className="text-white/60 text-lg font-light font-inter max-w-xl mx-auto mb-12">
            The page you are looking for does not exist or has been moved. Discover our current collection of masterpieces.
          </p>

          <Link href="/" className="luxury-button">
            <span>Return Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
