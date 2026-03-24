import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';

const STATS = [
  { value: '10+', key: 'years' },
  { value: '2000+', key: 'members' },
  { value: '20+', key: 'trainers' },
  { value: '150+', key: 'equipment' },
] as const;

export default function About() {
  const t = useTranslations('about');

  return (
    <SectionWrapper id="about">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">{t('eyebrow')}</p>
          <h2 className="text-4xl font-black text-white mb-6">{t('heading')}</h2>
          <p className="text-muted text-lg leading-relaxed">{t('body')}</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {STATS.map(({ value, key }) => (
            <div key={key} className="bg-surface rounded-lg p-6 text-center">
              <p className="text-4xl font-black text-accent mb-2">{value}</p>
              <p className="text-muted text-sm">{t(`stats.${key}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
