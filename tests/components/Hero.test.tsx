import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Hero from '@/components/Hero';
import messages from '@/messages/en.json';

test('renders hero CTA buttons', () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Hero />
    </NextIntlClientProvider>
  );
  expect(screen.getByText(messages.hero.cta)).toBeInTheDocument();
  expect(screen.getByText(messages.hero.ctaSecondary)).toBeInTheDocument();
});
