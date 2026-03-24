import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';
import { schedule, DAY_KEYS } from '@/data/schedule';

export default function Schedule() {
  const t = useTranslations('schedule');

  return (
    <SectionWrapper id="schedule">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
          {t('eyebrow')}
        </p>
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-surface">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="bg-surface px-4 py-3 text-accent text-xs font-bold uppercase tracking-widest text-center border-b border-surface/60 w-16">
                {t('time')}
              </th>
              {DAY_KEYS.map((day) => (
                <th
                  key={day}
                  className="bg-surface px-3 py-3 text-accent text-xs font-bold uppercase tracking-widest text-center border-b border-surface/60"
                >
                  {t(`days.${day}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.map((slot, rowIndex) => (
              <tr
                key={slot.time}
                className={rowIndex % 2 === 0 ? 'bg-background' : 'bg-surface/30'}
              >
                <td className="bg-surface px-4 py-3 text-accent text-xs font-bold text-center border-r border-surface/60 sticky ltr:left-0 rtl:right-0">
                  {slot.time}
                </td>
                {slot.days.map((cell, dayIndex) => (
                  <td
                    key={dayIndex}
                    className="px-3 py-3 text-center text-xs align-middle border-b border-surface/20"
                  >
                    {cell.type === 'empty' ? (
                      <span className="text-muted/30">—</span>
                    ) : (
                      <>
                        <span className="text-white font-medium">
                          {t(`classes.${cell.key}`)}
                        </span>
                        {cell.subKey && (
                          <span className="block text-muted text-xs mt-0.5">
                            {t(`classes.${cell.subKey}`)}
                          </span>
                        )}
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hours note */}
      <p className="text-muted text-sm text-center mt-6">{t('hours')}</p>
    </SectionWrapper>
  );
}
