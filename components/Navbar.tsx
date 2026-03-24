'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './ui/LanguageSwitcher';

const NAV_LINKS = ['about', 'services', 'schedule', 'pricing', 'trainers', 'gallery', 'testimonials', 'contact'] as const;

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur border-b border-surface">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <span className="font-black text-lg tracking-widest text-white">
          OLYMPIA SPORT VIP
        </span>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-sm text-muted hover:text-white transition-colors capitalize"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <a
            href="#contact"
            className="hidden md:inline-flex bg-accent text-black font-bold text-sm px-4 py-2 rounded hover:bg-accent/80 transition-colors"
          >
            {t('joinNow')}
          </a>
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-t border-surface px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-sm text-muted hover:text-white transition-colors capitalize"
              onClick={() => setOpen(false)}
            >
              {t(key)}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-black font-bold text-sm px-4 py-2 rounded text-center hover:bg-accent/80 transition-colors">
            {t('joinNow')}
          </a>
        </div>
      )}
    </header>
  );
}
