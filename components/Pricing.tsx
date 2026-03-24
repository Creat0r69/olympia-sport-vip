import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';

const PLANS = ['basic', 'pro', 'vip'] as const;

export default function Pricing() {
  const t = useTranslations('pricing');

  return (
    <SectionWrapper id="pricing">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const isVip = plan === 'vip';
          const features = t.raw(`${plan}.features`) as string[];

          return (
            <div
              key={plan}
              className={`rounded-lg p-8 flex flex-col ${
                isVip
                  ? 'bg-surface border-2 border-accent relative'
                  : 'bg-surface'
              }`}
            >
              {isVip && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-xs font-bold px-4 py-1 rounded-full">
                  BEST VALUE
                </span>
              )}
              <h3 className={`text-xl font-black mb-2 ${isVip ? 'text-accent' : 'text-white'}`}>
                {t(`${plan}.name`)}
              </h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-black text-white">${t(`${plan}.price`)}</span>
                <span className="text-muted pb-1">{t('perMonth')}</span>
              </div>
              <ul className="flex-1 space-y-3 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-accent mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`text-center font-bold py-3 rounded transition-colors ${
                  isVip
                    ? 'bg-accent text-black hover:bg-accent/80'
                    : 'border border-white text-white hover:bg-white hover:text-black'
                }`}
              >
                {t('cta')}
              </a>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
