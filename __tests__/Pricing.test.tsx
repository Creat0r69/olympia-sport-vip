import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Pricing from '@/components/Pricing';

const messages = {
  pricing: {
    heading: 'Change Your Life',
    subtitle: 'March 19 – April 30',
    bestValue: 'BEST VALUE',
    cta: 'Get Started',
    months: '{count} months',
    plans: {
      basic: 'Basic',
      plateau: 'Plateau + Cours',
      vip: 'VIP Program',
    },
  },
};

function renderPricing() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Pricing />
    </NextIntlClientProvider>
  );
}

describe('Pricing', () => {
  it('renders the section heading', () => {
    renderPricing();
    expect(screen.getByText('Change Your Life')).toBeInTheDocument();
  });

  it('renders the promotional subtitle', () => {
    renderPricing();
    expect(screen.getByText('March 19 – April 30')).toBeInTheDocument();
  });

  it('renders all three plan names', () => {
    renderPricing();
    expect(screen.getByText('Basic')).toBeInTheDocument();
    expect(screen.getByText('Plateau + Cours')).toBeInTheDocument();
    expect(screen.getByText('VIP Program')).toBeInTheDocument();
  });

  it('renders the BEST VALUE badge on the VIP plan', () => {
    renderPricing();
    expect(screen.getByText('BEST VALUE')).toBeInTheDocument();
  });

  it('renders the basic plan price', () => {
    renderPricing();
    expect(screen.getByText('80 dt')).toBeInTheDocument();
  });

  it('renders original prices with strikethrough for promo plans', () => {
    renderPricing();
    expect(screen.getByText('210 dt')).toBeInTheDocument();
    expect(screen.getByText('290 dt')).toBeInTheDocument();
  });

  it('renders discounted prices for promo plans', () => {
    renderPricing();
    expect(screen.getByText('168 dt')).toBeInTheDocument();
    expect(screen.getByText('232 dt')).toBeInTheDocument();
  });

  it('renders three CTA buttons', () => {
    renderPricing();
    expect(screen.getAllByText('Get Started')).toHaveLength(3);
  });

  it('renders 1-month duration label for basic plan', () => {
    renderPricing();
    expect(screen.getAllByText(/1 months/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders 3-month duration label for promo plans', () => {
    renderPricing();
    expect(screen.getAllByText(/3 months/).length).toBeGreaterThanOrEqual(1);
  });
});
