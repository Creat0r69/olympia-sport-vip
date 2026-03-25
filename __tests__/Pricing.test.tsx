import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Pricing from '@/components/Pricing';

const messages = {
  pricing: {
    heading: 'Change Your Life',
    subtitle: 'March 19 – April 30',
    bestValue: 'BEST VALUE',
    cta: 'Get Started',
    perMonth: '/month',
    months: '{count} months',
    plans: {
      plateau: 'Plateau + Cours',
      vip: 'VIP Program',
    },
    // Minimal required for current component to render (will be replaced in implementation)
    basic: {
      name: 'Basic Plan',
      price: '29',
      features: [],
    },
    pro: {
      name: 'Pro Plan',
      price: '49',
      features: [],
    },
    vip: {
      name: 'VIP Plan',
      price: '99',
      features: [],
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

  it('renders both plan names', () => {
    renderPricing();
    expect(screen.getByText('Plateau + Cours')).toBeInTheDocument();
    expect(screen.getByText('VIP Program')).toBeInTheDocument();
  });

  it('renders the BEST VALUE badge on the VIP plan', () => {
    renderPricing();
    expect(screen.getByText('BEST VALUE')).toBeInTheDocument();
  });

  it('renders original prices with strikethrough for both plans', () => {
    renderPricing();
    expect(screen.getByText('210 dt')).toBeInTheDocument();
    expect(screen.getByText('290 dt')).toBeInTheDocument();
  });

  it('renders discounted prices for both plans', () => {
    renderPricing();
    expect(screen.getByText('168 dt')).toBeInTheDocument();
    expect(screen.getByText('232 dt')).toBeInTheDocument();
  });

  it('renders two CTA buttons', () => {
    renderPricing();
    expect(screen.getAllByText('Get Started')).toHaveLength(2);
  });

  it('renders 3-month duration label', () => {
    renderPricing();
    expect(screen.getAllByText(/3 months/).length).toBeGreaterThanOrEqual(1);
  });
});
