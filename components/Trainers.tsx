import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';

const TRAINERS = [
  { id: 1, name: 'Alex Stone', specialty: 'Strength & Powerlifting' },
  { id: 2, name: 'Sara Khalil', specialty: 'HIIT & Cardio' },
  { id: 3, name: 'Omar Farid', specialty: 'Nutrition & Weight Loss' },
  { id: 4, name: 'Lina Nour', specialty: 'Yoga & Flexibility' },
];

export default function Trainers() {
  const t = useTranslations('trainers');

  return (
    <SectionWrapper id="trainers">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRAINERS.map((trainer) => (
          <div key={trainer.id} className="bg-surface rounded-lg overflow-hidden text-center">
            <div className="h-48 bg-gradient-to-br from-surface to-background flex items-center justify-center text-6xl">
              👤
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold mb-1">{trainer.name}</h3>
              <p className="text-accent text-sm">{trainer.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
