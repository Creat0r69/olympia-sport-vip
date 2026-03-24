import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../globals.css';

// Module-level export — must be outside the LocaleLayout function
export const metadata: Metadata = {
  title: 'OLYMPIA SPORT VIP — Premium Gym',
  description: 'Join OLYMPIA SPORT VIP — a world-class gym offering weight training, cardio, group classes, personal training and nutrition coaching.',
  openGraph: {
    title: 'OLYMPIA SPORT VIP',
    description: 'Forge Your Strength. Elevate Your Life.',
    type: 'website',
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ar')) notFound();

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          <main>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
