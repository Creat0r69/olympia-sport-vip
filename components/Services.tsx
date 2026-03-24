import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';

const SERVICES = [
  { key: 'weightTraining', icon: '🏋️' },
  { key: 'cardio', icon: '🏃' },
  { key: 'groupClasses', icon: '👥' },
  { key: 'personalTraining', icon: '🎯' },
  { key: 'nutrition', icon: '🥗' },
] as const;

export default function Services() {
  const t = useTranslations('services');

  return (
    <SectionWrapper id="services">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map(({ key, icon }) => (
          <div key={key} className="bg-surface rounded-lg p-6 hover:border hover:border-accent transition-all">
            <span className="text-4xl mb-4 block">{icon}</span>
            <h3 className="text-white font-bold text-lg mb-2">{t(`${key}.title`)}</h3>
            <p className="text-muted text-sm leading-relaxed">{t(`${key}.desc`)}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
