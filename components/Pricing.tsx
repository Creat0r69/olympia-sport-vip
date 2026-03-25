import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';
import { plans } from '@/data/pricing';

export default function Pricing() {
  const t = useTranslations('pricing');

  return (
    <SectionWrapper id="pricing">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      {/* 2-column plan grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.key}
            className={`rounded-2xl p-7 flex flex-col relative ${
              plan.highlight
                ? 'bg-surface border-2 border-accent'
                : 'bg-surface border border-white/10'
            }`}
          >
            {/* BEST VALUE badge */}
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">
                {t('bestValue')}
              </span>
            )}

            {/* Plan header */}
            <div className="text-2xl mb-2">{plan.icon}</div>
            <h3 className={`text-lg font-black mb-6 ${plan.highlight ? 'text-accent' : 'text-white'}`}>
              {t(`plans.${plan.key}`)}
            </h3>

            {/* Duration rows */}
            <div className="flex-1 divide-y divide-white/10">
              {plan.durations.map((d) => (
                <div key={d.months} className="flex items-center justify-between py-3">
                  <span className="text-muted text-sm font-semibold">
                    {t('months', { count: d.months })}
                  </span>
                  <div className="text-right">
                    {d.original !== d.discounted && (
                      <span className="text-muted/40 text-xs line-through block">
                        {d.original} dt
                      </span>
                    )}
                    <span className="text-accent font-black text-xl">
                      {d.discounted} dt
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className={`mt-6 text-center font-bold py-3 rounded-lg transition-colors ${
                plan.highlight
                  ? 'bg-accent text-black hover:bg-accent/80'
                  : 'border border-white text-white hover:bg-white hover:text-black'
              }`}
            >
              {t('cta')}
            </a>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
