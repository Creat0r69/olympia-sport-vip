'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';

const PHOTOS = Array.from({ length: 20 }, (_, i) => `/${i + 1}.jpg`);

export default function Gallery() {
  const t = useTranslations('gallery');
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <SectionWrapper id="gallery" className="bg-surface/10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PHOTOS.map((src, i) => (
          <button
            key={src}
            onClick={() => setSelected(i)}
            className="aspect-square rounded overflow-hidden hover:opacity-80 transition-opacity relative"
            aria-label={`Gallery photo ${i + 1}`}
          >
            <Image
              src={src}
              alt={`Gallery photo ${i + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
        >
          <div className="relative max-w-4xl w-full aspect-video">
            <Image
              src={PHOTOS[selected]}
              alt={`Gallery photo ${selected + 1}`}
              fill
              className="object-contain"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition-colors"
            onClick={(e) => { e.stopPropagation(); setSelected(null); }}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          {/* Prev / Next */}
          {selected > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelected(selected - 1); }}
              aria-label="Previous photo"
            >
              ‹
            </button>
          )}
          {selected < PHOTOS.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-2xl bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelected(selected + 1); }}
              aria-label="Next photo"
            >
              ›
            </button>
          )}
        </div>
      )}
    </SectionWrapper>
  );
}
