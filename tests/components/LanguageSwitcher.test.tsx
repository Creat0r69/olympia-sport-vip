import { render, screen } from '@testing-library/react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/en',
}));

test('shows Arabic button when locale is en', () => {
  render(<LanguageSwitcher locale="en" />);
  expect(screen.getByText('ع')).toBeInTheDocument();
});

test('shows EN button when locale is ar', () => {
  render(<LanguageSwitcher locale="ar" />);
  expect(screen.getByText('EN')).toBeInTheDocument();
});
