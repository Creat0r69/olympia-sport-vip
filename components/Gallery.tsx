'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';

const PHOTOS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  label: `Photo ${i + 1}`,
}));

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
        {PHOTOS.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelected(photo.id)}
            className="aspect-square bg-surface rounded overflow-hidden hover:opacity-80 transition-opacity"
            aria-label={photo.label}
          >
            <div className="w-full h-full bg-gradient-to-br from-surface to-background flex items-center justify-center text-muted text-xs">
              {photo.label}
            </div>
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
          <div className="max-w-4xl w-full aspect-video bg-surface rounded flex items-center justify-center">
            <p className="text-muted">Photo {selected}</p>
          </div>
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setSelected(null)}
            aria-label="Close lightbox"
          >
            ✕
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}
