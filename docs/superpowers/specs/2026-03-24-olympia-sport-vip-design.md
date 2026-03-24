# OLYMPIA SPORT VIP — Website Design Spec

**Date:** 2026-03-24
**Type:** Marketing / Lead Generation Website
**Framework:** Next.js 14 (App Router, static export)

---

## 1. Overview

A single-domain marketing website for **OLYMPIA SPORT VIP** gym. Goal: attract and convert new members. The site is fully static (no backend), bilingual (English + Arabic with RTL support), and deployed to Vercel.

---

## 2. Architecture

- **Next.js 14 App Router** with static export (`output: 'export'` in `next.config.js`)
- **Route structure:** `/en/` and `/ar/` locale prefixes via `next-intl` middleware
- **`<html>` tag** switches `dir="ltr"` / `dir="rtl"` and `lang` attribute based on active locale
- **UI base:** `typeui.sh bold` (pulled via `npx typeui.sh pull bold`) for design tokens and bold component primitives
- **Tailwind CSS** for layout, spacing, and custom overrides
- **Framer Motion** for scroll-reveal animations
- **EmailJS** for contact form submission (no server required)
- **Hosting:** Vercel (free tier, auto-deploys from git)

### Directory Structure

```
olympia-sport-vip/
├── app/
│   └── [locale]/
│       ├── layout.tsx          # html dir/lang, fonts, navbar, footer
│       ├── page.tsx            # single-page homepage (all sections)
│       └── contact/
│           └── page.tsx        # dedicated contact page
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Pricing.tsx
│   ├── Trainers.tsx
│   ├── Gallery.tsx
│   ├── Testimonials.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── messages/
│   ├── en.json                 # all English strings
│   └── ar.json                 # all Arabic strings
├── public/
│   └── images/                 # gym photos, trainer headshots
├── i18n.ts                     # next-intl config
├── middleware.ts               # locale detection & redirect
├── tailwind.config.ts
└── next.config.js
```

---

## 3. Pages & Sections

All sections live on the homepage (`/`) as a single scrollable page with anchor-link navigation. A dedicated `/contact` page mirrors the contact section for direct linking.

### 3.1 Navbar
- Fixed top, dark background, semi-transparent on scroll
- Logo (OLYMPIA SPORT VIP wordmark) on the left
- Anchor links: About | Services | Pricing | Trainers | Gallery | Testimonials | Contact
- Language switcher: `EN` / `ع` toggles between `/en/` and `/ar/`
- "Join Now" CTA button (accent color)
- Mobile: hamburger menu collapses to full-screen overlay

### 3.2 Hero
- Full-viewport-height section
- Dark background with subtle gym imagery overlay (high contrast)
- Gym name in large bold typography
- Tagline (translatable)
- Two CTAs: "Join Now" (primary) + "View Plans" (secondary/ghost)
- Scroll-down indicator

### 3.3 About
- Two-column layout: text left, image right (flips in RTL)
- Gym story and mission statement
- Stats row: Years Active | Members | Certified Trainers | Equipment Pieces

### 3.4 Services
- Section heading + subtitle
- 5 service cards in a responsive grid:
  - Weight Training
  - Cardio Zone
  - Group Classes
  - Personal Training
  - Nutrition Coaching
- Each card: icon, title, short description

### 3.5 Pricing
- 3-tier cards: Basic | Pro | VIP
- VIP card visually elevated (border highlight, badge)
- Each card: price/month, feature list (checkmarks), CTA button
- Monthly/annual toggle (optional — can be phase 2)

### 3.6 Trainers
- Grid of trainer cards (3–4 columns responsive)
- Each card: photo, name, specialty, social link (Instagram/optional)

### 3.7 Gallery
- Masonry or uniform grid of gym photos
- Lightbox on click (using a lightweight library or custom modal)

### 3.8 Testimonials
- Carousel/slider of member reviews
- Each testimonial: avatar, name, rating (stars), quote

### 3.9 Contact
- Two-column: form left, map + info right
- Form fields: Name, Email, Phone (optional), Message
- Submission via **EmailJS** (client-side, no backend)
- Google Maps embed for gym location
- Social media icons row

### 3.10 Footer
- Logo, short tagline
- Quick links (same as navbar)
- Contact details (address, phone, email)
- Social links
- Copyright line with current year

---

## 4. i18n / RTL

- `next-intl` library handles locale routing and string lookup
- All user-visible strings are externalized into `messages/en.json` and `messages/ar.json`
- Nothing is hardcoded in components — every label, heading, and button text is a translation key
- When locale is `ar`:
  - `<html dir="rtl" lang="ar">`
  - Font: **Cairo** or **Tajawal** (Google Fonts, Arabic-supporting)
  - Tailwind `rtl:` variants handle layout mirroring (flex-row-reverse, text-right, etc.)
- When locale is `en`:
  - `<html dir="ltr" lang="en">`
  - Font: **Inter** or similar sans-serif

---

## 5. Visual Style

- **Theme:** Bold dark luxury (black/near-black backgrounds, gold or white accents)
- **Base components:** `typeui.sh bold` design tokens
- **Typography:** Large, heavy headings; clean body text
- **Animations:** Framer Motion scroll-reveal (fade-up) on section entry
- **Color palette:**
  - Background: `#0a0a0a` / `#111111`
  - Primary accent: Gold `#c9a84c` or bright white `#ffffff`
  - Surface cards: `#1a1a1a`
  - Text: `#ffffff` primary, `#a0a0a0` secondary

---

## 6. Contact Form (EmailJS)

- User fills out form → client calls EmailJS API with template ID and service ID
- No server, no database — emails land directly in the gym owner's inbox
- Form validation: required fields, basic email format check
- Success/error states shown inline

---

## 7. Performance & SEO

- Static export = zero cold starts, fast global delivery via Vercel CDN
- `next/image` for all images (lazy load, WebP conversion)
- `<meta>` tags and Open Graph per locale
- `robots.txt` and `sitemap.xml` generated at build time

---

## 8. Out of Scope (Phase 1)

- Member login / portal
- Class booking system
- Online payment
- CMS / admin panel
- Blog
