# Class Schedule Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a full-week class schedule grid section to the OLYMPIA SPORT VIP homepage, placed after Services, fully bilingual (EN/AR).

**Architecture:** A typed data file (`data/schedule.ts`) holds the schedule matrix (7 time slots × 7 days) using i18n keys for class names. A new `Schedule` component renders it as a horizontally-scrollable table using `SectionWrapper` (which provides animation automatically). Strings live in `messages/en.json` and `messages/ar.json`.

**Tech Stack:** Next.js 14 App Router, next-intl, Tailwind CSS, React Testing Library + Jest

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `data/schedule.ts` | Typed schedule matrix — time slots × day cells, using i18n keys |
| Create | `components/Schedule.tsx` | Section component — renders the schedule table |
| Create | `__tests__/Schedule.test.tsx` | Unit tests for the Schedule component |
| Modify | `messages/en.json` | Add `schedule.*` i18n namespace (EN strings) |
| Modify | `messages/ar.json` | Add `schedule.*` i18n namespace (AR strings) |
| Modify | `components/Navbar.tsx` | Add `'schedule'` to `NAV_LINKS` between `'services'` and `'pricing'` |
| Modify | `components/Footer.tsx` | Add `'schedule'` to `NAV_LINKS` between `'services'` and `'pricing'` |
| Modify | `app/[locale]/page.tsx` | Import and render `<Schedule />` between `<Services />` and `<Pricing />` |

---

## Task 1: Add i18n strings

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/ar.json`

- [ ] **Step 1: Add the `schedule` namespace to `messages/en.json`**

Open `messages/en.json`. Add the following as a top-level key (e.g. after the `"services"` block):

```json
"schedule": {
  "heading": "Class Schedule",
  "eyebrow": "Our Schedule",
  "subtitle": "March 23 – April 30",
  "hours": "Mon–Sat: 07:00–22:00  ·  Sunday: 10:00–17:00",
  "time": "Time",
  "days": {
    "mon": "Mon",
    "tue": "Tue",
    "wed": "Wed",
    "thu": "Thu",
    "fri": "Fri",
    "sat": "Sat",
    "sun": "Sun"
  },
  "classes": {
    "absCore": "Abs & Core",
    "stretching": "Stretching",
    "mobility": "Mobility",
    "circuitTraining": "Circuit Training",
    "caf": "C.A.F",
    "sportPrep": "Sport Prep",
    "kidsClub": "Kids Club",
    "ladiesOnly": "Ladies Only",
    "calisthenics": "Calisthenics",
    "orientalDance": "Oriental Dance",
    "pilates": "Pilates",
    "hiit": "HIIT",
    "combat": "Combat",
    "step": "Step",
    "pump": "Pump",
    "attack": "Attack",
    "mensOnly": "Men Only",
    "cross": "Cross"
  }
}
```

Also add `"schedule": "Schedule"` inside the existing `"nav"` object.

- [ ] **Step 2: Add the `schedule` namespace to `messages/ar.json`**

Open `messages/ar.json`. Add the following as a top-level key (after the `"services"` block):

```json
"schedule": {
  "heading": "جدول الحصص",
  "eyebrow": "برنامجنا",
  "subtitle": "٢٣ مارس – ٣٠ أبريل",
  "hours": "الإثنين–السبت: ٠٧:٠٠–٢٢:٠٠  ·  الأحد: ١٠:٠٠–١٧:٠٠",
  "time": "الوقت",
  "days": {
    "mon": "إثنين",
    "tue": "ثلاثاء",
    "wed": "أربعاء",
    "thu": "خميس",
    "fri": "جمعة",
    "sat": "سبت",
    "sun": "أحد"
  },
  "classes": {
    "absCore": "عضلات البطن",
    "stretching": "تمدد",
    "mobility": "مرونة",
    "circuitTraining": "تدريب دائري",
    "caf": "C.A.F",
    "sportPrep": "تحضير رياضي",
    "kidsClub": "نادي الأطفال",
    "ladiesOnly": "للسيدات فقط",
    "calisthenics": "كاليستينيكس",
    "orientalDance": "رقص شرقي",
    "pilates": "بيلاتس",
    "hiit": "HIIT",
    "combat": "كومبات",
    "step": "ستيب",
    "pump": "بامب",
    "attack": "أتاك",
    "mensOnly": "للرجال فقط",
    "cross": "كروس"
  }
}
```

Also add `"schedule": "جدول الحصص"` inside the existing `"nav"` object.

- [ ] **Step 3: Commit**

```bash
git add messages/en.json messages/ar.json
git commit -m "feat: add schedule i18n strings (EN + AR)"
```

---

## Task 2: Create the schedule data file

**Files:**
- Create: `data/schedule.ts`

- [ ] **Step 1: Create `data/schedule.ts`**

Create the file with this exact content:

```ts
export type ScheduleCell =
  | { type: 'class'; key: string; subKey?: string }
  | { type: 'empty' };

export interface TimeSlot {
  time: string;
  days: [
    ScheduleCell, // Monday
    ScheduleCell, // Tuesday
    ScheduleCell, // Wednesday
    ScheduleCell, // Thursday
    ScheduleCell, // Friday
    ScheduleCell, // Saturday
    ScheduleCell, // Sunday
  ];
}

export const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;

export const schedule: TimeSlot[] = [
  {
    time: '10:30',
    days: [
      { type: 'class', key: 'absCore' },
      { type: 'class', key: 'stretching' },
      { type: 'empty' },
      { type: 'class', key: 'stretching' },
      { type: 'empty' },
      { type: 'class', key: 'stretching' },
      { type: 'empty' },
    ],
  },
  {
    time: '11:30',
    days: [
      { type: 'class', key: 'mobility' },
      { type: 'class', key: 'circuitTraining' },
      { type: 'class', key: 'caf' },
      { type: 'class', key: 'mobility' },
      { type: 'class', key: 'absCore' },
      { type: 'empty' },
      { type: 'empty' },
    ],
  },
  {
    time: '15:00',
    days: [
      { type: 'empty' },
      { type: 'class', key: 'sportPrep' },
      { type: 'empty' },
      { type: 'class', key: 'sportPrep' },
      { type: 'empty' },
      { type: 'class', key: 'sportPrep' },
      { type: 'empty' },
    ],
  },
  {
    time: '16:00',
    days: [
      { type: 'empty' },
      { type: 'empty' },
      { type: 'empty' },
      { type: 'empty' },
      { type: 'class', key: 'kidsClub' },
      { type: 'class', key: 'kidsClub' },
      { type: 'empty' },
    ],
  },
  {
    time: '17:30',
    days: [
      { type: 'class', key: 'ladiesOnly', subKey: 'calisthenics' },
      { type: 'class', key: 'orientalDance' },
      { type: 'class', key: 'ladiesOnly', subKey: 'calisthenics' },
      { type: 'class', key: 'pilates' },
      { type: 'class', key: 'ladiesOnly', subKey: 'calisthenics' },
      { type: 'class', key: 'hiit' },
      { type: 'empty' },
    ],
  },
  {
    time: '18:30',
    days: [
      { type: 'class', key: 'combat' },
      { type: 'class', key: 'step' },
      { type: 'class', key: 'pump' },
      { type: 'class', key: 'circuitTraining' },
      { type: 'class', key: 'attack' },
      { type: 'empty' },
      { type: 'empty' },
    ],
  },
  {
    time: '19:30',
    days: [
      { type: 'class', key: 'mensOnly' },
      { type: 'class', key: 'cross' },
      { type: 'class', key: 'mensOnly' },
      { type: 'class', key: 'cross' },
      { type: 'class', key: 'mensOnly' },
      { type: 'empty' },
      { type: 'empty' },
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
git add data/schedule.ts
git commit -m "feat: add schedule data file with typed matrix"
```

---

## Task 3: Write tests for Schedule component

**Files:**
- Create: `__tests__/Schedule.test.tsx`

The project uses Jest + React Testing Library (already configured in `jest.config.ts`). The `next-intl` transform is already whitelisted in `transformIgnorePatterns`. Mock `next-intl` so tests don't need locale routing infrastructure.

- [ ] **Step 1: Create `__tests__/Schedule.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Schedule from '@/components/Schedule';

// Minimal EN messages needed for the Schedule component
const messages = {
  schedule: {
    heading: 'Class Schedule',
    eyebrow: 'Our Schedule',
    subtitle: 'March 23 – April 30',
    hours: 'Mon–Sat: 07:00–22:00 · Sunday: 10:00–17:00',
    time: 'Time',
    days: {
      mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu',
      fri: 'Fri', sat: 'Sat', sun: 'Sun',
    },
    classes: {
      absCore: 'Abs & Core',
      stretching: 'Stretching',
      mobility: 'Mobility',
      circuitTraining: 'Circuit Training',
      caf: 'C.A.F',
      sportPrep: 'Sport Prep',
      kidsClub: 'Kids Club',
      ladiesOnly: 'Ladies Only',
      calisthenics: 'Calisthenics',
      orientalDance: 'Oriental Dance',
      pilates: 'Pilates',
      hiit: 'HIIT',
      combat: 'Combat',
      step: 'Step',
      pump: 'Pump',
      attack: 'Attack',
      mensOnly: 'Men Only',
      cross: 'Cross',
    },
  },
};

function renderSchedule() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Schedule />
    </NextIntlClientProvider>
  );
}

describe('Schedule', () => {
  it('renders the section heading', () => {
    renderSchedule();
    expect(screen.getByText('Class Schedule')).toBeInTheDocument();
  });

  it('renders the eyebrow label', () => {
    renderSchedule();
    expect(screen.getByText('Our Schedule')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    renderSchedule();
    expect(screen.getByText('March 23 – April 30')).toBeInTheDocument();
  });

  it('renders all 7 day headers', () => {
    renderSchedule();
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it('renders all 7 time slots', () => {
    renderSchedule();
    ['10:30', '11:30', '15:00', '16:00', '17:30', '18:30', '19:30'].forEach(time => {
      expect(screen.getAllByText(time).length).toBeGreaterThanOrEqual(1);
    });
  });

  it('renders a class name in a cell', () => {
    renderSchedule();
    // "Abs & Core" appears at 10:30 Monday and 11:30 Friday
    expect(screen.getAllByText('Abs & Core').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the subKey label for Ladies Only + Calisthenics', () => {
    renderSchedule();
    expect(screen.getAllByText('Ladies Only').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Calisthenics').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the opening hours note', () => {
    renderSchedule();
    expect(screen.getByText(/07:00/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests — expect them to FAIL (component does not exist yet)**

```bash
npx jest __tests__/Schedule.test.tsx --no-coverage
```

Expected: FAIL — `Cannot find module '@/components/Schedule'`

- [ ] **Step 3: Commit the test file**

```bash
git add __tests__/Schedule.test.tsx
git commit -m "test: add failing tests for Schedule component"
```

---

## Task 4: Build the Schedule component

**Files:**
- Create: `components/Schedule.tsx`

- [ ] **Step 1: Create `components/Schedule.tsx`**

```tsx
import { useTranslations } from 'next-intl';
import SectionWrapper from './ui/SectionWrapper';
import { schedule, DAY_KEYS } from '@/data/schedule';

export default function Schedule() {
  const t = useTranslations('schedule');

  return (
    <SectionWrapper id="schedule">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
          {t('eyebrow')}
        </p>
        <h2 className="text-4xl font-black text-white mb-3">{t('heading')}</h2>
        <p className="text-muted">{t('subtitle')}</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-surface">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              <th className="bg-surface px-4 py-3 text-accent text-xs font-bold uppercase tracking-widest text-center border-b border-surface/60 w-16">
                {t('time')}
              </th>
              {DAY_KEYS.map((day) => (
                <th
                  key={day}
                  className="bg-surface px-3 py-3 text-accent text-xs font-bold uppercase tracking-widest text-center border-b border-surface/60"
                >
                  {t(`days.${day}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.map((slot, rowIndex) => (
              <tr
                key={slot.time}
                className={rowIndex % 2 === 0 ? 'bg-background' : 'bg-surface/30'}
              >
                <td className="bg-surface px-4 py-3 text-accent text-xs font-bold text-center border-r border-surface/60 sticky ltr:left-0 rtl:right-0">
                  {slot.time}
                </td>
                {slot.days.map((cell, dayIndex) => (
                  <td
                    key={dayIndex}
                    className="px-3 py-3 text-center text-xs align-middle border-b border-surface/20"
                  >
                    {cell.type === 'empty' ? (
                      <span className="text-muted/30">—</span>
                    ) : (
                      <>
                        <span className="text-white font-medium">
                          {t(`classes.${cell.key}`)}
                        </span>
                        {cell.subKey && (
                          <span className="block text-muted text-xs mt-0.5">
                            {t(`classes.${cell.subKey}`)}
                          </span>
                        )}
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hours note */}
      <p className="text-muted text-sm text-center mt-6">{t('hours')}</p>
    </SectionWrapper>
  );
}
```

- [ ] **Step 2: Run the tests — expect them to PASS**

```bash
npx jest __tests__/Schedule.test.tsx --no-coverage
```

Expected: all 8 tests PASS.

- [ ] **Step 3: Commit**

```bash
git add components/Schedule.tsx
git commit -m "feat: add Schedule component"
```

---

## Task 5: Wire up navigation and homepage

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `components/Footer.tsx`
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Update `NAV_LINKS` in `components/Navbar.tsx`**

Find this line (line 6):
```ts
const NAV_LINKS = ['about', 'services', 'pricing', 'trainers', 'gallery', 'testimonials', 'contact'] as const;
```

Replace with:
```ts
const NAV_LINKS = ['about', 'services', 'schedule', 'pricing', 'trainers', 'gallery', 'testimonials', 'contact'] as const;
```

- [ ] **Step 2: Update `NAV_LINKS` in `components/Footer.tsx`**

Find this line (line 3):
```ts
const NAV_LINKS = ['about', 'services', 'pricing', 'trainers', 'gallery', 'testimonials', 'contact'] as const;
```

Replace with:
```ts
const NAV_LINKS = ['about', 'services', 'schedule', 'pricing', 'trainers', 'gallery', 'testimonials', 'contact'] as const;
```

- [ ] **Step 3: Add `<Schedule />` to `app/[locale]/page.tsx`**

Current content of `app/[locale]/page.tsx`:
```tsx
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Trainers from '@/components/Trainers';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Trainers />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}
```

Replace with:
```tsx
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Schedule from '@/components/Schedule';
import Pricing from '@/components/Pricing';
import Trainers from '@/components/Trainers';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Schedule />
      <Pricing />
      <Trainers />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}
```

- [ ] **Step 4: Run the full test suite to confirm nothing is broken**

```bash
npx jest --no-coverage
```

Expected: all tests PASS (including the 8 Schedule tests from Task 3).

- [ ] **Step 5: Run a production build to confirm no TypeScript or build errors**

```bash
npx next build
```

Expected: build completes with no errors.

- [ ] **Step 6: Commit**

```bash
git add components/Navbar.tsx components/Footer.tsx app/[locale]/page.tsx
git commit -m "feat: wire up Schedule section to homepage and nav"
```

---

## Task 6: Manual smoke test

These are manual checks — no automated test needed.

- [ ] **Start the dev server**

```bash
npm run dev
```

Open `http://localhost:3000/en` in a browser.

- [ ] **Check English layout**
  - Schedule section appears between Services and Pricing when scrolling
  - Navbar has "Schedule" link between "Services" and "Pricing"
  - Footer quick links include "Schedule"
  - Clicking the nav link scrolls to the schedule section
  - Table shows all 7 time slots and 7 day columns
  - "Ladies Only" cells show "Calisthenics" in smaller text below
  - Empty cells show a dimmed `—`
  - Table scrolls horizontally on a narrow window (resize browser to ~375px wide)

- [ ] **Check Arabic layout**

Open `http://localhost:3000/ar`.

  - Section heading shows "جدول الحصص"
  - Day names are in Arabic
  - Class names are translated
  - Table layout mirrors correctly (RTL)
  - Navbar and footer show "جدول الحصص"

- [ ] **Final commit**

```bash
git add -A
git commit -m "feat: complete class schedule section (EN + AR)"
```
