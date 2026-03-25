'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = ['/slider1-1.jpg', '/slider1-2.jpg', '/slider1-3.jpg'];

export default function Hero() {
  const t = useTranslations('hero');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-background">
      {/* Slider background */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={SLIDES[current]}
            alt=""
            fill
            className="object-cover"
            priority={current === 0}
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-background z-10" />

      {/* Slide dots */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-20" aria-hidden="true">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-accent w-6' : 'bg-white/40'}`}
          />
        ))}
      </div>

      <div className="relative z-20 max-w-4xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-accent text-sm font-semibold tracking-widest uppercase mb-4"
        >
          OLYMPIA SPORT VIP
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-black text-white leading-tight mb-6"
        >
          {t('tagline')}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#contact" className="bg-accent text-black font-bold px-8 py-4 rounded text-lg hover:bg-accent/80 transition-colors">
            {t('cta')}
          </a>
          <a href="#pricing" className="border border-white text-white font-bold px-8 py-4 rounded text-lg hover:bg-white hover:text-black transition-colors">
            {t('ctaSecondary')}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20" aria-hidden="true">
        <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
