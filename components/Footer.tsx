import { useTranslations } from 'next-intl';

const NAV_LINKS = ['about', 'services', 'pricing', 'trainers', 'gallery', 'testimonials', 'contact'] as const;
const SOCIALS = ['Instagram', 'Facebook', 'Twitter'] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-surface border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-black text-white text-lg tracking-widest mb-2">OLYMPIA SPORT VIP</p>
            <p className="text-muted text-sm">{t('tagline')}</p>
          </div>
          <div>
            <p className="text-white font-semibold mb-3">Quick Links</p>
            <ul className="space-y-2">
              {NAV_LINKS.map((key) => (
                <li key={key}>
                  <a href={`#${key}`} className="text-muted text-sm hover:text-accent transition-colors capitalize">
                    {tNav(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white font-semibold mb-3">Follow Us</p>
            <div className="flex gap-4">
              {SOCIALS.map((s) => (
                <a key={s} href="#" className="text-muted hover:text-accent text-sm transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-muted text-xs">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
