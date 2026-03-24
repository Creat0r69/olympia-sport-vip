'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === 'en' ? 'ar' : 'en';
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/'));
  };

  return (
    <button
      onClick={toggle}
      className="text-sm font-semibold border border-accent text-accent px-3 py-1 rounded hover:bg-accent hover:text-black transition-colors"
      aria-label="Switch language"
    >
      {locale === 'en' ? 'ع' : 'EN'}
    </button>
  );
}
