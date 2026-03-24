# Class Schedule Section — Design Spec

**Date:** 2026-03-24
**Feature:** Planning des Cours / Class Schedule section
**Parent spec:** `2026-03-24-olympia-sport-vip-design.md`

---

## 1. Overview

Add a **Class Schedule** section to the OLYMPIA SPORT VIP homepage, placed immediately after the Services section. The section displays a full-week grid of group classes (time slots × days), bilingual (English + Arabic/RTL), matching the gym's dark gold visual theme.

---

## 2. Data Architecture

### 2.1 Schedule Data File — `data/schedule.ts`

Holds the schedule matrix as a typed TypeScript constant. Class names are i18n translation keys (not literal strings), enabling full EN/AR translation.

```ts
export type ScheduleCell =
  | { type: 'class'; key: string; subKey?: string }  // i18n key(s)
  | { type: 'empty' };

export interface TimeSlot {
  time: string; // e.g. "10:30"
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

---

## 3. i18n Strings

### 3.1 Keys added to `messages/en.json`

```json
"schedule": {
  "heading": "Class Schedule",
  "eyebrow": "Our Schedule",
  "subtitle": "March 23 – April 30",
  "hours": "Mon–Sat: 07:00–22:00  ·  Sunday: 10:00–17:00",
  "days": {
    "mon": "Mon", "tue": "Tue", "wed": "Wed", "thu": "Thu",
    "fri": "Fri", "sat": "Sat", "sun": "Sun"
  },
  "time": "Time",
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

### 3.2 Keys added to `messages/ar.json`

Same structure with Arabic translations (RTL rendering handled by existing `dir="rtl"` on `<html>`).

```json
"schedule": {
  "heading": "جدول الحصص",
  "eyebrow": "برنامجنا",
  "subtitle": "٢٣ مارس – ٣٠ أبريل",
  "hours": "الإثنين–السبت: ٠٧:٠٠–٢٢:٠٠  ·  الأحد: ١٠:٠٠–١٧:٠٠",
  "days": {
    "mon": "إثنين", "tue": "ثلاثاء", "wed": "أربعاء", "thu": "خميس",
    "fri": "جمعة", "sat": "سبت", "sun": "أحد"
  },
  "time": "الوقت",
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

---

## 4. Component — `components/Schedule.tsx`

### Structure

```
<section id="schedule">
  <SectionWrapper>
    <!-- Eyebrow label -->
    <!-- Heading -->
    <!-- Subtitle (date range) -->
    <!-- Horizontally scrollable table container -->
      <table>
        <thead> — day headers (Mon–Sun) with Time label first </thead>
        <tbody>
          {schedule.map(slot => (
            <tr>
              <td> {slot.time} </td>
              {slot.days.map(cell => (
                <td> class name OR "—" </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    <!-- Opening hours note -->
  </SectionWrapper>
</section>
```

### Visual details

- **Background:** `#0a0a0a` (matches site)
- **Table border:** `1px solid #222`, `border-radius: 12px`, `overflow: hidden`
- **Header row:** `background: #111`, day names in gold `#c9a84c`, uppercase, letter-spacing
- **Time column:** `background: #111`, gold text, sticky left on scroll (optional enhancement)
- **Class cells:** alternate row backgrounds `#0a0a0a` / `#111111` for readability
- **Empty cells:** `—` in `#333` (dimmed)
- **Cells with `subKey`** (e.g. Ladies Only + Calisthenics): main key on one line, subKey in smaller `#a0a0a0` text below
- **Mobile:** table wrapped in `overflow-x: auto` container; no layout breakage
- **Animation:** Framer Motion `fadeUp` on section entry (consistent with other sections)

---

## 5. Homepage Integration

File: `app/[locale]/page.tsx`

```tsx
import Schedule from '@/components/Schedule';

// Order:
<Services />
<Schedule />   // ← inserted here
<Pricing />
```

---

## 6. Navbar

Add "Schedule" / "جدول الحصص" anchor link (`#schedule`) to:
- `components/Navbar.tsx` — add link between Services and Pricing
- `messages/en.json` → `nav.schedule: "Schedule"`
- `messages/ar.json` → `nav.schedule: "جدول الحصص"`
- `components/Footer.tsx` — add to quick links

---

## 7. Out of Scope

- Interactive class booking
- Filtering by class type or audience
- Admin interface to edit the schedule
- Class detail modals/pages
