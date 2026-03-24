import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Navbar from '@/components/Navbar';
import messages from '@/messages/en.json';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/en',
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <NextIntlClientProvider locale="en" messages={messages}>
    {children}
  </NextIntlClientProvider>
);

test('renders gym name in navbar', () => {
  render(<Navbar locale="en" />, { wrapper: Wrapper });
  expect(screen.getByText(/OLYMPIA SPORT VIP/i)).toBeInTheDocument();
});
