# OLYMPIA SPORT VIP Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (EN/AR, RTL) static marketing website for OLYMPIA SPORT VIP gym using Next.js 14 App Router, deployed to Vercel.

**Architecture:** Single Next.js 14 App Router app with `[locale]` dynamic segment routing via `next-intl`. All sections are on one scrollable homepage. Static export (`output: 'export'`) for zero-cost Vercel hosting.

**Tech Stack:** Next.js 14, Tailwind CSS, next-intl, Framer Motion, EmailJS, typeui.sh bold, React Testing Library, Playwright (e2e)

---

## File Map

```
vip-gym/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # Root layout: html dir/lang, fonts, Navbar, Footer
│   │   ├── page.tsx                # Homepage: all sections composed in order
│   │   └── contact/
│   │       └── page.tsx            # Dedicated contact page (same Contact component)
│   └── globals.css                 # Tailwind base + custom globals
├── components/
│   ├── Navbar.tsx                  # Fixed top nav, language switcher, mobile menu
│   ├── Hero.tsx                    # Full-viewport hero section
│   ├── About.tsx                   # Story, mission, stats
│   ├── Services.tsx                # Service cards grid
│   ├── Pricing.tsx                 # 3-tier pricing cards
│   ├── Trainers.tsx                # Trainer cards grid
│   ├── Gallery.tsx                 # Photo grid with lightbox
│   ├── Testimonials.tsx            # Review carousel
│   ├── Contact.tsx                 # EmailJS form + map
│   ├── Footer.tsx                  # Footer links + socials
│   └── ui/
│       ├── SectionWrapper.tsx      # Reusable scroll-reveal wrapper
│       └── LanguageSwitcher.tsx    # EN/AR toggle button
├── messages/
│   ├── en.json                     # All English strings
│   └── ar.json                     # All Arabic strings
├── public/
│   └── images/
│       ├── hero-bg.jpg
│       ├── about.jpg
│       ├── gallery/                # gym-1.jpg … gym-8.jpg (placeholders)
│       └── trainers/               # trainer-1.jpg … trainer-4.jpg (placeholders)
├── i18n.ts                         # next-intl routing config
├── middleware.ts                   # Locale detection + redirect
├── next.config.js                  # output: export, i18n plugin
├── tailwind.config.ts              # dark theme, RTL plugin, custom colors
├── tsconfig.json
├── package.json
├── .env.local                      # NEXT_PUBLIC_EMAILJS_* keys
└── tests/
    ├── components/
    │   ├── Navbar.test.tsx
    │   ├── Hero.test.tsx
    │   ├── Contact.test.tsx
    │   └── LanguageSwitcher.test.tsx
    └── e2e/
        └── homepage.spec.ts        # Playwright: EN + AR smoke test
```

---

## Task 1: Project Initialization

**Files:**
- Create: `package.json`, `next.config.js`, `tailwind.config.ts`, `tsconfig.json`, `app/globals.css`, `.env.local`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd C:/Users/thecr/Desktop/vip-gym
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir no --import-alias "@/*"
```

When prompted, answer: No to `src/` directory, Yes to App Router.

- [ ] **Step 2: Pull typeui.sh bold design system**

```bash
npx typeui.sh pull bold
```

Follow any prompts. This installs the bold component tokens/primitives into the project.

- [ ] **Step 3: Install dependencies**

```bash
npm install next-intl framer-motion @emailjs/browser
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event jest jest-environment-jsdom @types/jest
npm install -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 4: Configure `next.config.js`**

```js
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
};

module.exports = withNextIntl(nextConfig);
```

- [ ] **Step 5: Configure `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#1a1a1a',
        accent: '#c9a84c',
        muted: '#a0a0a0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['Cairo', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 6: Create `.env.local`**

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

(Placeholder values — user fills in real EmailJS credentials later.)

- [ ] **Step 7: Configure Jest — create `jest.config.ts`**

```ts
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config);
```

Create `jest.setup.ts`:

```ts
import '@testing-library/jest-dom';
```

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: Next.js dev server running at `http://localhost:3000` with no errors.

- [ ] **Step 9: Commit**

```bash
git init
git add .
git commit -m "feat: initialize Next.js 14 project with Tailwind, next-intl, Framer Motion"
```

---

## Task 2: i18n Routing Setup

**Files:**
- Create: `i18n.ts`, `middleware.ts`, `messages/en.json`, `messages/ar.json`

- [ ] **Step 1: Write failing test for locale redirect**

Create `tests/e2e/homepage.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

test('redirects root to /en', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveURL(/\/en/);
});

test('AR page has dir=rtl', async ({ page }) => {
  await page.goto('http://localhost:3000/ar');
  const dir = await page.getAttribute('html', 'dir');
  expect(dir).toBe('rtl');
});
```

- [ ] **Step 2: Run e2e tests to confirm they fail**

```bash
npx playwright test tests/e2e/homepage.spec.ts
```

Expected: FAIL — no locale routing yet.

- [ ] **Step 3: Create `i18n.ts`**

```ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});
```

- [ ] **Step 4: Create `middleware.ts`**

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
```

- [ ] **Step 5: Create `messages/en.json` (skeleton)**

```json
{
  "nav": {
    "about": "About",
    "services": "Services",
    "pricing": "Pricing",
    "trainers": "Trainers",
    "gallery": "Gallery",
    "testimonials": "Testimonials",
    "contact": "Contact",
    "joinNow": "Join Now"
  },
  "hero": {
    "tagline": "Forge Your Strength. Elevate Your Life.",
    "cta": "Join Now",
    "ctaSecondary": "View Plans"
  },
  "about": {
    "heading": "About OLYMPIA SPORT VIP",
    "body": "We are more than a gym — we are a community dedicated to excellence, strength, and transformation.",
    "stats": {
      "years": "Years of Excellence",
      "members": "Active Members",
      "trainers": "Certified Trainers",
      "equipment": "Premium Equipment"
    }
  },
  "services": {
    "heading": "Our Services",
    "subtitle": "Everything you need to reach your peak",
    "weightTraining": { "title": "Weight Training", "desc": "State-of-the-art free weights and machines for every level." },
    "cardio": { "title": "Cardio Zone", "desc": "Full cardio suite with treadmills, bikes, and rowing machines." },
    "groupClasses": { "title": "Group Classes", "desc": "Dynamic classes from HIIT to yoga, led by expert instructors." },
    "personalTraining": { "title": "Personal Training", "desc": "1-on-1 sessions tailored to your unique goals." },
    "nutrition": { "title": "Nutrition Coaching", "desc": "Expert nutrition plans to fuel your transformation." }
  },
  "pricing": {
    "heading": "Membership Plans",
    "subtitle": "Choose the plan that fits your goals",
    "basic": {
      "name": "Basic",
      "price": "29",
      "features": ["Gym access (6am–10pm)", "Locker room", "Free parking"]
    },
    "pro": {
      "name": "Pro",
      "price": "59",
      "features": ["24/7 gym access", "Group classes included", "Locker room", "Free parking", "1 PT session/month"]
    },
    "vip": {
      "name": "VIP",
      "price": "99",
      "features": ["24/7 gym access", "Unlimited group classes", "Priority locker", "Free parking", "4 PT sessions/month", "Nutrition coaching", "VIP lounge access"]
    },
    "perMonth": "/ month",
    "cta": "Get Started"
  },
  "trainers": {
    "heading": "Meet Our Trainers",
    "subtitle": "World-class coaches committed to your success"
  },
  "gallery": {
    "heading": "Our Facility",
    "subtitle": "Built for champions"
  },
  "testimonials": {
    "heading": "What Members Say",
    "subtitle": "Real results, real stories"
  },
  "contact": {
    "heading": "Get In Touch",
    "subtitle": "We'd love to hear from you",
    "name": "Your Name",
    "email": "Your Email",
    "phone": "Phone (optional)",
    "message": "Your Message",
    "send": "Send Message",
    "success": "Message sent! We'll be in touch soon.",
    "error": "Something went wrong. Please try again.",
    "address": "123 Champion Street, City",
    "phone_label": "+1 (555) 000-0000",
    "email_label": "info@olympiasportvip.com"
  },
  "footer": {
    "tagline": "Forge Your Strength.",
    "copyright": "© 2024 OLYMPIA SPORT VIP. All rights reserved."
  }
}
```

- [ ] **Step 6: Create `messages/ar.json`**

```json
{
  "nav": {
    "about": "من نحن",
    "services": "خدماتنا",
    "pricing": "الأسعار",
    "trainers": "المدربون",
    "gallery": "المعرض",
    "testimonials": "آراء الأعضاء",
    "contact": "تواصل معنا",
    "joinNow": "انضم الآن"
  },
  "hero": {
    "tagline": "ابنِ قوتك. ارتقِ بحياتك.",
    "cta": "انضم الآن",
    "ctaSecondary": "عرض الخطط"
  },
  "about": {
    "heading": "عن أولمبيا سبورت VIP",
    "body": "نحن أكثر من مجرد صالة رياضية — نحن مجتمع متكامل يسعى نحو التميز والقوة والتحول.",
    "stats": {
      "years": "سنوات من التميز",
      "members": "عضو نشط",
      "trainers": "مدرب معتمد",
      "equipment": "جهاز احترافي"
    }
  },
  "services": {
    "heading": "خدماتنا",
    "subtitle": "كل ما تحتاجه للوصول إلى قمة أدائك",
    "weightTraining": { "title": "تدريب الأثقال", "desc": "أجهزة ومعدات حديثة لجميع المستويات." },
    "cardio": { "title": "منطقة الكارديو", "desc": "مجموعة متكاملة من أجهزة الكارديو." },
    "groupClasses": { "title": "الدروس الجماعية", "desc": "دروس ديناميكية من HIIT إلى اليوغا بإشراف خبراء." },
    "personalTraining": { "title": "التدريب الشخصي", "desc": "جلسات فردية مصممة لأهدافك الخاصة." },
    "nutrition": { "title": "إرشاد التغذية", "desc": "خطط غذائية متخصصة لتسريع تحولك." }
  },
  "pricing": {
    "heading": "خطط العضوية",
    "subtitle": "اختر الخطة التي تناسب أهدافك",
    "basic": {
      "name": "أساسي",
      "price": "29",
      "features": ["دخول الصالة (6ص-10م)", "غرفة تبديل الملابس", "موقف سيارات مجاني"]
    },
    "pro": {
      "name": "برو",
      "price": "59",
      "features": ["دخول 24/7", "دروس جماعية مشمولة", "غرفة تبديل الملابس", "موقف مجاني", "جلسة PT شهرياً"]
    },
    "vip": {
      "name": "VIP",
      "price": "99",
      "features": ["دخول 24/7", "دروس جماعية غير محدودة", "خزانة مميزة", "موقف مجاني", "4 جلسات PT شهرياً", "إرشاد تغذوي", "صالة VIP"]
    },
    "perMonth": "/ شهر",
    "cta": "ابدأ الآن"
  },
  "trainers": {
    "heading": "تعرف على مدربينا",
    "subtitle": "مدربون عالميون ملتزمون بنجاحك"
  },
  "gallery": {
    "heading": "مرافقنا",
    "subtitle": "مبنية للأبطال"
  },
  "testimonials": {
    "heading": "ماذا يقول أعضاؤنا",
    "subtitle": "نتائج حقيقية، قصص حقيقية"
  },
  "contact": {
    "heading": "تواصل معنا",
    "subtitle": "يسعدنا سماع منك",
    "name": "اسمك",
    "email": "بريدك الإلكتروني",
    "phone": "الهاتف (اختياري)",
    "message": "رسالتك",
    "send": "إرسال الرسالة",
    "success": "تم الإرسال! سنتواصل معك قريباً.",
    "error": "حدث خطأ. يرجى المحاولة مرة أخرى.",
    "address": "123 شارع البطل، المدينة",
    "phone_label": "+1 (555) 000-0000",
    "email_label": "info@olympiasportvip.com"
  },
  "footer": {
    "tagline": "ابنِ قوتك.",
    "copyright": "© 2024 أولمبيا سبورت VIP. جميع الحقوق محفوظة."
  }
}
```

- [ ] **Step 7: Run e2e tests to confirm locale routing passes**

```bash
npm run dev &
sleep 3
npx playwright test tests/e2e/homepage.spec.ts
```

Expected: PASS — root redirects to `/en`, `/ar` has `dir="rtl"`.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: add next-intl i18n routing with EN/AR locale support"
```

---

## Task 3: Root Layout & Global Styles

**Files:**
- Create: `app/[locale]/layout.tsx`, `app/globals.css`

- [ ] **Step 1: Write failing test for layout**

Create `tests/components/Navbar.test.tsx` (shell — will grow in Task 4):

```tsx
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Navbar from '@/components/Navbar';
import messages from '@/messages/en.json';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <NextIntlClientProvider locale="en" messages={messages}>
    {children}
  </NextIntlClientProvider>
);

test('renders gym name in navbar', () => {
  render(<Navbar locale="en" />, { wrapper: Wrapper });
  expect(screen.getByText(/OLYMPIA SPORT VIP/i)).toBeInTheDocument();
});
```

Run: `npx jest tests/components/Navbar.test.tsx`
Expected: FAIL — Navbar not created yet.

- [ ] **Step 2: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=Cairo:wght@400;600;700;900&display=swap');

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0a0a0a;
  color: #ffffff;
}

[dir='rtl'] body {
  font-family: 'Cairo', sans-serif;
}

[dir='ltr'] body {
  font-family: 'Inter', sans-serif;
}
```

- [ ] **Step 3: Create `app/[locale]/layout.tsx`**

```tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) notFound();

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
```

- [ ] **Step 4: Create stub `components/Footer.tsx`** (so layout compiles)

```tsx
export default function Footer() {
  return <footer className="py-8 text-center text-muted text-sm">Footer</footer>;
}
```

- [ ] **Step 5: Run test — still fails (Navbar missing), that's expected**

```bash
npx jest tests/components/Navbar.test.tsx
```

Expected: FAIL — `Navbar` module not found.

- [ ] **Step 6: Commit layout skeleton**

```bash
git add .
git commit -m "feat: add locale layout with RTL/LTR html dir switching"
```

---

## Task 4: Navbar Component

**Files:**
- Create: `components/Navbar.tsx`, `components/ui/LanguageSwitcher.tsx`

- [ ] **Step 1: Create `components/ui/LanguageSwitcher.tsx`**

```tsx
'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggle = () => {
    const next = locale === 'en' ? 'ar' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
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
```

- [ ] **Step 2: Create `components/Navbar.tsx`**

```tsx
'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './ui/LanguageSwitcher';

const NAV_LINKS = ['about', 'services', 'pricing', 'trainers', 'gallery', 'testimonials', 'contact'] as const;

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur border-b border-surface">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <span className="font-black text-lg tracking-widest text-white">
          OLYMPIA SPORT VIP
        </span>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-sm text-muted hover:text-white transition-colors capitalize"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <a
            href="#contact"
            className="hidden md:inline-flex bg-accent text-black font-bold text-sm px-4 py-2 rounded hover:bg-accent/80 transition-colors"
          >
            {t('joinNow')}
          </a>
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-t border-surface px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="text-sm text-muted hover:text-white transition-colors capitalize"
              onClick={() => setOpen(false)}
            >
              {t(key)}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-black font-bold text-sm px-4 py-2 rounded text-center">
            {t('joinNow')}
          </a>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 3: Run Navbar test**

```bash
npx jest tests/components/Navbar.test.tsx
```

Expected: PASS.

- [ ] **Step 4: Write language switcher test**

Create `tests/components/LanguageSwitcher.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

test('shows AR button when locale is en', () => {
  render(<LanguageSwitcher locale="en" />);
  expect(screen.getByText('ع')).toBeInTheDocument();
});

test('shows EN button when locale is ar', () => {
  render(<LanguageSwitcher locale="ar" />);
  expect(screen.getByText('EN')).toBeInTheDocument();
});
```

Run: `npx jest tests/components/LanguageSwitcher.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add Navbar with language switcher and mobile menu"
```

---

## Task 5: Shared Utilities & Hero Section

**Files:**
- Create: `components/ui/SectionWrapper.tsx`, `components/Hero.tsx`, `app/[locale]/page.tsx`

- [ ] **Step 1: Create `components/ui/SectionWrapper.tsx`**

```tsx
'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export default function SectionWrapper({ id, children, className = '' }: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`py-20 px-6 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 2: Write failing Hero test**

Create `tests/components/Hero.test.tsx`:

```tsx
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
```

Run: `npx jest tests/components/Hero.test.tsx`
Expected: FAIL — Hero not created yet.

- [ ] **Step 3: Create `components/Hero.tsx`**

```tsx
'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-background">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-background/80 to-background z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-accent text-sm font-semibold tracking-widest uppercase mb-4"
        >
          OLYMPIA SPORT VIP
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-black text-white leading-tight mb-6"
        >
          {t('tagline')}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#contact" className="bg-accent text-black font-bold px-8 py-4 rounded text-lg hover:bg-accent/80 transition-colors">
            {t('cta')}
          </a>
          <a href="#pricing" className="border border-white text-white font-bold px-8 py-4 rounded text-lg hover:bg-white hover:text-black transition-colors">
            {t('ctaSecondary')}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `app/[locale]/page.tsx`** (stub — add sections as they're built)

```tsx
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <>
      <Hero />
    </>
  );
}
```

- [ ] **Step 5: Run Hero test**

```bash
npx jest tests/components/Hero.test.tsx
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add Hero section and SectionWrapper scroll-reveal utility"
```

---

## Task 6: About & Services Sections

**Files:**
- Create: `components/About.tsx`, `components/Services.tsx`
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Create `components/About.tsx`**

```tsx
import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';

const STATS = [
  { value: '10+', key: 'years' },
  { value: '2000+', key: 'members' },
  { value: '20+', key: 'trainers' },
  { value: '150+', key: 'equipment' },
];

export default function About() {
  const t = useTranslations('about');
  const tStats = useTranslations('about.stats');

  return (
    <SectionWrapper id="about">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">About Us</p>
          <h2 className="text-4xl font-black text-white mb-6">{t('heading')}</h2>
          <p className="text-muted text-lg leading-relaxed">{t('body')}</p>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {STATS.map(({ value, key }) => (
            <div key={key} className="bg-surface rounded-lg p-6 text-center">
              <p className="text-4xl font-black text-accent mb-2">{value}</p>
              <p className="text-muted text-sm">{tStats(key)}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 2: Create `components/Services.tsx`**

```tsx
import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';

const SERVICES = [
  { key: 'weightTraining', icon: '🏋️' },
  { key: 'cardio', icon: '🏃' },
  { key: 'groupClasses', icon: '👥' },
  { key: 'personalTraining', icon: '🎯' },
  { key: 'nutrition', icon: '🥗' },
] as const;

export default function Services() {
  const t = useTranslations('services');

  return (
    <SectionWrapper id="services" className="bg-surface/20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map(({ key, icon }) => (
          <div key={key} className="bg-surface rounded-lg p-6 hover:border hover:border-accent transition-all">
            <span className="text-4xl mb-4 block">{icon}</span>
            <h3 className="text-white font-bold text-lg mb-2">{t(`${key}.title`)}</h3>
            <p className="text-muted text-sm leading-relaxed">{t(`${key}.desc`)}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 3: Add to `app/[locale]/page.tsx`**

```tsx
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
    </>
  );
}
```

- [ ] **Step 4: Verify in browser — `npm run dev`, visit `http://localhost:3000/en`**

Expected: Hero → About → Services sections visible, dark themed.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add About and Services sections"
```

---

## Task 7: Pricing Section

**Files:**
- Create: `components/Pricing.tsx`
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Create `components/Pricing.tsx`**

```tsx
import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';

const PLANS = ['basic', 'pro', 'vip'] as const;

export default function Pricing() {
  const t = useTranslations('pricing');

  return (
    <SectionWrapper id="pricing">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const isVip = plan === 'vip';
          const features: string[] = t.raw(`${plan}.features`) as string[];

          return (
            <div
              key={plan}
              className={`rounded-lg p-8 flex flex-col ${
                isVip
                  ? 'bg-surface border-2 border-accent relative'
                  : 'bg-surface'
              }`}
            >
              {isVip && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-xs font-bold px-4 py-1 rounded-full">
                  BEST VALUE
                </span>
              )}
              <h3 className={`text-xl font-black mb-2 ${isVip ? 'text-accent' : 'text-white'}`}>
                {t(`${plan}.name`)}
              </h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-black text-white">${t(`${plan}.price`)}</span>
                <span className="text-muted pb-1">{t('perMonth')}</span>
              </div>
              <ul className="flex-1 space-y-3 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-accent mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`text-center font-bold py-3 rounded transition-colors ${
                  isVip
                    ? 'bg-accent text-black hover:bg-accent/80'
                    : 'border border-white text-white hover:bg-white hover:text-black'
                }`}
              >
                {t('cta')}
              </a>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 2: Add to `app/[locale]/page.tsx`**

Add `<Pricing />` after `<Services />`.

- [ ] **Step 3: Verify in browser**

Expected: 3 pricing cards, VIP card has gold border and "BEST VALUE" badge.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add Pricing section with 3-tier cards"
```

---

## Task 8: Trainers & Gallery Sections

**Files:**
- Create: `components/Trainers.tsx`, `components/Gallery.tsx`
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Create `components/Trainers.tsx`**

```tsx
import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';

const TRAINERS = [
  { id: 1, name: 'Alex Stone', specialty: 'Strength & Powerlifting' },
  { id: 2, name: 'Sara Khalil', specialty: 'HIIT & Cardio' },
  { id: 3, name: 'Omar Farid', specialty: 'Nutrition & Weight Loss' },
  { id: 4, name: 'Lina Nour', specialty: 'Yoga & Flexibility' },
];

export default function Trainers() {
  const t = useTranslations('trainers');

  return (
    <SectionWrapper id="trainers">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRAINERS.map((trainer) => (
          <div key={trainer.id} className="bg-surface rounded-lg overflow-hidden text-center group">
            <div className="h-48 bg-surface/60 flex items-center justify-center text-6xl">
              👤
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold mb-1">{trainer.name}</h3>
              <p className="text-accent text-sm">{trainer.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

Note: Replace `👤` placeholder with `<Image>` when real trainer photos are available in `public/images/trainers/`.

- [ ] **Step 2: Create `components/Gallery.tsx`**

```tsx
'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';

const PHOTOS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  src: `/images/gallery/gym-${i + 1}.jpg`,
  alt: `Gym photo ${i + 1}`,
}));

export default function Gallery() {
  const t = useTranslations('gallery');
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SectionWrapper id="gallery" className="bg-surface/10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {PHOTOS.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelected(photo.src)}
            className="aspect-square bg-surface rounded overflow-hidden hover:opacity-80 transition-opacity"
          >
            <div className="w-full h-full bg-gradient-to-br from-surface to-background flex items-center justify-center text-muted text-xs">
              Photo {photo.id}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="max-w-4xl w-full aspect-video bg-surface rounded flex items-center justify-center">
            <p className="text-muted">Photo preview</p>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
```

Note: Replace placeholder divs with `<Image>` components when real photos are provided.

- [ ] **Step 3: Add both to `app/[locale]/page.tsx`**

Add `<Trainers />` and `<Gallery />` after `<Pricing />`.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add Trainers and Gallery sections"
```

---

## Task 9: Testimonials Section

**Files:**
- Create: `components/Testimonials.tsx`
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Create `components/Testimonials.tsx`**

```tsx
'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';

const REVIEWS = [
  { id: 1, name: 'Mohammed A.', rating: 5, quote: 'Best gym in the city. The trainers are world-class and the equipment is top-notch.' },
  { id: 2, name: 'Fatima S.', rating: 5, quote: 'OLYMPIA SPORT VIP changed my life. Lost 20kg in 6 months with their expert guidance.' },
  { id: 3, name: 'David K.', rating: 5, quote: 'The VIP membership is worth every penny. Incredible facilities and a great community.' },
];

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const [current, setCurrent] = useState(0);

  return (
    <SectionWrapper id="testimonials">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-surface rounded-lg p-8 mb-6">
          <div className="flex justify-center mb-4">
            {Array.from({ length: REVIEWS[current].rating }).map((_, i) => (
              <span key={i} className="text-accent text-xl">★</span>
            ))}
          </div>
          <p className="text-white text-lg italic mb-4">"{REVIEWS[current].quote}"</p>
          <p className="text-accent font-semibold">{REVIEWS[current].name}</p>
        </div>

        <div className="flex justify-center gap-2">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === current ? 'bg-accent' : 'bg-surface'
              }`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 2: Add to `app/[locale]/page.tsx`**

Add `<Testimonials />` after `<Gallery />`.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: add Testimonials carousel"
```

---

## Task 10: Contact Section & EmailJS

**Files:**
- Create: `components/Contact.tsx`
- Modify: `app/[locale]/page.tsx`, `app/[locale]/contact/page.tsx`

- [ ] **Step 1: Write failing Contact test**

Create `tests/components/Contact.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Contact from '@/components/Contact';
import messages from '@/messages/en.json';

test('renders contact form fields', () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Contact />
    </NextIntlClientProvider>
  );
  expect(screen.getByPlaceholderText(messages.contact.name)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(messages.contact.email)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: messages.contact.send })).toBeInTheDocument();
});
```

Run: `npx jest tests/components/Contact.test.tsx`
Expected: FAIL.

- [ ] **Step 2: Create `components/Contact.tsx`**

```tsx
'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import emailjs from '@emailjs/browser';
import SectionWrapper from './ui/SectionWrapper';

export default function Contact() {
  const t = useTranslations('contact');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        { ...form },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus('success');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <SectionWrapper id="contact" className="bg-surface/10">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {(['name', 'email', 'phone'] as const).map((field) => (
            <input
              key={field}
              type={field === 'email' ? 'email' : 'text'}
              placeholder={t(field)}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              required={field !== 'phone'}
              className="w-full bg-surface border border-surface text-white placeholder-muted rounded px-4 py-3 focus:outline-none focus:border-accent"
            />
          ))}
          <textarea
            placeholder={t('message')}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={5}
            className="w-full bg-surface border border-surface text-white placeholder-muted rounded px-4 py-3 focus:outline-none focus:border-accent resize-none"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-accent text-black font-bold py-3 rounded hover:bg-accent/80 transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? '...' : t('send')}
          </button>
          {status === 'success' && <p className="text-green-400 text-sm">{t('success')}</p>}
          {status === 'error' && <p className="text-red-400 text-sm">{t('error')}</p>}
        </form>

        {/* Info + Map */}
        <div className="space-y-6">
          <div>
            <p className="text-accent text-sm font-semibold mb-1">Address</p>
            <p className="text-muted">{t('address')}</p>
          </div>
          <div>
            <p className="text-accent text-sm font-semibold mb-1">Phone</p>
            <p className="text-muted">{t('phone_label')}</p>
          </div>
          <div>
            <p className="text-accent text-sm font-semibold mb-1">Email</p>
            <p className="text-muted">{t('email_label')}</p>
          </div>
          {/* Google Maps embed — replace src with real embed URL */}
          <div className="rounded overflow-hidden h-48 bg-surface flex items-center justify-center text-muted text-sm">
            Map embed here (replace with Google Maps iframe)
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
```

- [ ] **Step 3: Run Contact test**

```bash
npx jest tests/components/Contact.test.tsx
```

Expected: PASS.

- [ ] **Step 4: Create `app/[locale]/contact/page.tsx`**

```tsx
import Contact from '@/components/Contact';

export default function ContactPage() {
  return <div className="pt-16"><Contact /></div>;
}
```

- [ ] **Step 5: Add to `app/[locale]/page.tsx`**

Add `<Contact />` after `<Testimonials />`.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add Contact section with EmailJS form submission"
```

---

## Task 11: Footer & Complete Homepage

**Files:**
- Modify: `components/Footer.tsx`, `app/[locale]/page.tsx`

- [ ] **Step 1: Update `components/Footer.tsx`**

```tsx
import { useTranslations } from 'next-intl';

const NAV_LINKS = ['about', 'services', 'pricing', 'trainers', 'gallery', 'testimonials', 'contact'] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  return (
    <footer className="bg-surface border-t border-surface/50 py-12 px-6">
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
              {['Instagram', 'Facebook', 'Twitter'].map((s) => (
                <a key={s} href="#" className="text-muted hover:text-accent text-sm transition-colors">{s}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-surface/50 pt-6 text-center">
          <p className="text-muted text-xs">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify full homepage in browser**

```bash
npm run dev
```

Visit `http://localhost:3000/en` — scroll through all 8 sections.
Visit `http://localhost:3000/ar` — verify RTL layout, Arabic text, Cairo font.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: complete homepage with all sections and Footer"
```

---

## Task 12: SEO & Static Export

**Files:**
- Modify: `app/[locale]/layout.tsx`, `next.config.js`
- Create: `public/robots.txt`

- [ ] **Step 1: Add metadata to layout**

Update `app/[locale]/layout.tsx` — add `export const metadata` as a **module-level export** (outside and before the `LocaleLayout` function, not inside it):

```tsx
import type { Metadata } from 'next';

// Module-level export — must NOT be inside the LocaleLayout function
export const metadata: Metadata = {
  title: 'OLYMPIA SPORT VIP — Premium Gym',
  description: 'Join OLYMPIA SPORT VIP — a world-class gym offering weight training, cardio, group classes, personal training and nutrition coaching.',
  openGraph: {
    title: 'OLYMPIA SPORT VIP',
    description: 'Forge Your Strength. Elevate Your Life.',
    type: 'website',
  },
};

export default async function LocaleLayout({ ... }) {
  // ... existing layout code
}
```

- [ ] **Step 2: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
```

- [ ] **Step 3: Run static build**

```bash
npm run build
```

Expected: Build succeeds. `out/` directory created with static HTML files.

- [ ] **Step 4: Test static output locally**

```bash
npx serve out
```

Visit `http://localhost:3000` — verify all pages work from static files.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add SEO metadata, robots.txt, verify static export"
```

---

## Task 13: Vercel Deployment

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Create `vercel.json`**

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "framework": "nextjs"
}
```

- [ ] **Step 2: Push to GitHub and deploy to Vercel**

```bash
git remote add origin https://github.com/YOUR_USERNAME/olympia-sport-vip.git
git push -u origin main
```

Then: Go to vercel.com → New Project → Import repo → Deploy.

- [ ] **Step 3: Set environment variables in Vercel**

In Vercel project settings → Environment Variables, add:
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

- [ ] **Step 4: Trigger a production deployment and verify live URL**

Expected: Site live at `https://your-project.vercel.app`, EN and AR both working.

- [ ] **Step 5: Final commit**

```bash
git add vercel.json
git commit -m "feat: add Vercel deployment config"
```

---

## Summary

| Task | Deliverable |
|------|------------|
| 1 | Project scaffold, dependencies, config |
| 2 | EN/AR locale routing with next-intl |
| 3 | Root layout with RTL/LTR html dir |
| 4 | Navbar + language switcher |
| 5 | Hero section + SectionWrapper |
| 6 | About + Services sections |
| 7 | Pricing 3-tier cards |
| 8 | Trainers + Gallery sections |
| 9 | Testimonials carousel |
| 10 | Contact form (EmailJS) |
| 11 | Footer + complete homepage |
| 12 | SEO + static export |
| 13 | Vercel deployment |
