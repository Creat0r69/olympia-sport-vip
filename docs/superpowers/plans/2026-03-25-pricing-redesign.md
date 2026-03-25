# Pricing Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 3-tier monthly pricing section with a 2-plan × 3-duration promotional layout (Plateau + Cours and VIP Program) with strikethrough original prices and discounted prices in Tunisian Dinar.

**Architecture:** A new typed data file (`data/pricing.ts`) holds plan metadata and prices. The `Pricing.tsx` component is fully rewritten to render 2 cards each with 3 duration rows. Both i18n JSON files have their `pricing` block replaced entirely. No other files change.

**Tech Stack:** Next.js 14, next-intl (ICU message format), Tailwind CSS, React Testing Library + Jest

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `messages/en.json` | Replace `pricing` block with new EN strings |
| Modify | `messages/ar.json` | Replace `pricing` block with new AR strings |
| Create | `data/pricing.ts` | Typed plan data — 2 plans × 3 durations with prices |
| Create | `__tests__/Pricing.test.tsx` | Unit tests for new Pricing component |
| Modify | `components/Pricing.tsx` | Full rewrite to render new layout |

---

## Task 1: Replace i18n pricing strings

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/ar.json`

- [ ] **Step 1: Replace the `pricing` block in `messages/en.json`**

Find the entire `"pricing": { ... }` block (currently has keys: heading, subtitle, basic, pro, vip, bestValue, perMonth, cta) and replace it with:

```json
"pricing": {
  "heading": "Change Your Life",
  "subtitle": "March 19 – April 30",
  "bestValue": "BEST VALUE",
  "cta": "Get Started",
  "months": "{count} months",
  "plans": {
    "plateau": "Plateau + Cours",
    "vip": "VIP Program"
  }
}
```

- [ ] **Step 2: Replace the `pricing` block in `messages/ar.json`**

Find the entire `"pricing": { ... }` block and replace it with:

```json
"pricing": {
  "heading": "بدّل حياتك",
  "subtitle": "١٩ مارس – ٣٠ أبريل",
  "bestValue": "أفضل قيمة",
  "cta": "ابدأ الآن",
  "months": "{count} أشهر",
  "plans": {
    "plateau": "الصالة + الدروس",
    "vip": "برنامج VIP"
  }
}
```

- [ ] **Step 3: Verify both files are valid JSON**

```bash
node -e "require('./messages/en.json'); require('./messages/ar.json'); console.log('JSON valid')"
```

Expected: `JSON valid`

- [ ] **Step 4: Commit**

```bash
git add messages/en.json messages/ar.json
git commit -m "feat: replace pricing i18n with 2-plan promotional structure"
```

---

## Task 2: Create pricing data file

**Files:**
- Create: `data/pricing.ts`

- [ ] **Step 1: Create `data/pricing.ts`**

```ts
export interface PricingDuration {
  months: 3 | 6 | 12;
  original: number;
  discounted: number;
}

export interface PricingPlan {
  key: string;
  icon: string;
  highlight: boolean;
  durations: PricingDuration[];
}

export const plans: PricingPlan[] = [
  {
    key: 'plateau',
    icon: '🏋️',
    highlight: false,
    durations: [
      { months: 3,  original: 210, discounted: 168 },
      { months: 6,  original: 390, discounted: 312 },
      { months: 12, original: 720, discounted: 576 },
    ],
  },
  {
    key: 'vip',
    icon: '👑',
    highlight: true,
    durations: [
      { months: 3,  original: 290, discounted: 232 },
      { months: 6,  original: 540, discounted: 432 },
      { months: 12, original: 960, discounted: 768 },
    ],
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add data/pricing.ts
git commit -m "feat: add pricing data file (2 plans x 3 durations)"
```

---

## Task 3: Write failing tests for Pricing component

**Files:**
- Create: `__tests__/Pricing.test.tsx`

- [ ] **Step 1: Create `__tests__/Pricing.test.tsx`**

```tsx
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
```

- [ ] **Step 2: Run tests — expect FAIL (component not yet updated)**

```bash
npx jest __tests__/Pricing.test.tsx --no-coverage
```

Expected: some tests FAIL — `Change Your Life` and new keys not found in old component.

- [ ] **Step 3: Commit**

```bash
git add __tests__/Pricing.test.tsx
git commit -m "test: add failing tests for redesigned Pricing component"
```

---

## Task 4: Rewrite the Pricing component

**Files:**
- Modify: `components/Pricing.tsx`

- [ ] **Step 1: Replace the entire content of `components/Pricing.tsx`**

```tsx
import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';
import { plans } from '@/data/pricing';

export default function Pricing() {
  const t = useTranslations('pricing');

  return (
    <SectionWrapper id="pricing">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      {/* 2-column plan grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.key}
            className={`rounded-2xl p-7 flex flex-col relative ${
              plan.highlight
                ? 'bg-surface border-2 border-accent'
                : 'bg-surface border border-white/10'
            }`}
          >
            {/* BEST VALUE badge */}
            {plan.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-xs font-black px-4 py-1 rounded-full whitespace-nowrap">
                {t('bestValue')}
              </span>
            )}

            {/* Plan header */}
            <div className="text-2xl mb-2">{plan.icon}</div>
            <h3 className={`text-lg font-black mb-6 ${plan.highlight ? 'text-accent' : 'text-white'}`}>
              {t(`plans.${plan.key}`)}
            </h3>

            {/* Duration rows */}
            <div className="flex-1 divide-y divide-white/10">
              {plan.durations.map((d) => (
                <div key={d.months} className="flex items-center justify-between py-3">
                  <span className="text-muted text-sm font-semibold">
                    {t('months', { count: d.months })}
                  </span>
                  <div className="text-right">
                    <span className="text-muted/40 text-xs line-through block">
                      {d.original} dt
                    </span>
                    <span className="text-accent font-black text-xl">
                      {d.discounted} dt
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className={`mt-6 text-center font-bold py-3 rounded-lg transition-colors ${
                plan.highlight
                  ? 'bg-accent text-black hover:bg-accent/80'
                  : 'border border-white text-white hover:bg-white hover:text-black'
              }`}
            >
              {t('cta')}
            </a>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 2: Run the Pricing tests — expect all 8 to PASS**

```bash
npx jest __tests__/Pricing.test.tsx --no-coverage
```

Expected: 8/8 tests PASS.

- [ ] **Step 3: Run the full test suite**

```bash
npx jest --no-coverage
```

Expected: all tests PASS (including existing Schedule tests).

- [ ] **Step 4: Run a production build**

```bash
npx next build
```

Expected: build completes with no errors.

- [ ] **Step 5: Commit**

```bash
git add components/Pricing.tsx
git commit -m "feat: rewrite Pricing component for 2-plan promotional layout"
```

---

## Task 5: Manual smoke test

These are manual checks — no automated test needed.

- [ ] **Start the dev server**

```bash
npm run dev
```

Open `http://localhost:3000/en` in a browser.

- [ ] **Check English layout**
  - Pricing section heading reads "Change Your Life"
  - Subtitle reads "March 19 – April 30"
  - Two cards side by side: "Plateau + Cours" (left) and "VIP Program" (right)
  - VIP card has gold border and "BEST VALUE" badge
  - Each card shows 3 rows: "3 months", "6 months", "12 months"
  - Original prices appear in strikethrough (e.g. `210 dt`)
  - Discounted prices appear in gold (e.g. `168 dt`)
  - Both "Get Started" buttons link to `#contact`
  - On mobile (resize to ~375px): cards stack vertically

- [ ] **Check Arabic layout**

Open `http://localhost:3000/ar`.

  - Heading shows "بدّل حياتك"
  - Subtitle shows "١٩ مارس – ٣٠ أبريل"
  - Plan names are in Arabic
  - Duration labels show Arabic (e.g. "٣ أشهر")
  - "BEST VALUE" badge shows "أفضل قيمة"
  - Layout mirrors correctly (RTL)

- [ ] **Push to GitHub**

```bash
git push origin master
```
