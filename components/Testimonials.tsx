'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';

const REVIEWS = [
  { id: 1, name: 'Mohammed A.', rating: 5, quote: 'Best gym in the city. The trainers are world-class and the equipment is top-notch.' },
  { id: 2, name: 'Fatima S.', rating: 5, quote: 'OLYMPIA SPORT VIP changed my life. Lost 20kg in 6 months with their expert guidance.' },
  { id: 3, name: 'David K.', rating: 5, quote: 'The VIP membership is worth every penny. Incredible facilities and a great community.' },
];

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const [current, setCurrent] = useState(0);

  return (
    <SectionWrapper id="testimonials">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-surface rounded-lg p-8 mb-6">
          <div className="flex justify-center mb-4" aria-label={`Rating: ${REVIEWS[current].rating} out of 5`}>
            {Array.from({ length: REVIEWS[current].rating }).map((_, i) => (
              <span key={i} className="text-accent text-xl" aria-hidden="true">★</span>
            ))}
          </div>
          <p className="text-white text-lg italic mb-4">"{REVIEWS[current].quote}"</p>
          <p className="text-accent font-semibold">{REVIEWS[current].name}</p>
        </div>

        <div className="flex justify-center gap-2" role="tablist" aria-label="Testimonials">
          {REVIEWS.map((review, i) => (
            <button
              key={review.id}
              role="tab"
              aria-selected={i === current}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === current ? 'bg-accent' : 'bg-surface'
              }`}
              aria-label={`Review by ${review.name}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
