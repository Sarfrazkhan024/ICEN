# ICEN — International Council for Emerging Nations

## Problem Statement (original)
Build a world-class institutional website for ICEN — a global council of emerging nations (UN / WEF gravitas, but focused on rising economies). Core vision: "A Global Council Where Emerging Nations Shape the Future Together." Premium multi-page marketing + membership application + admin dashboard + email notifications.

## User Personas
1. **Emerging-nation leaders / builders** — apply for membership (Observer / Fellow / Council / Founding)
2. **ICEN Secretariat admins** — review, filter, and update application statuses
3. **Public visitors** — learn about ICEN, its pillars, chapters, governance, and programs

## Architecture
- **Frontend**: React + Tailwind + framer-motion + react-globe.gl (Three.js) + lucide-react
- **Backend**: FastAPI + Motor (async MongoDB) + JWT (bcrypt, HS256) + Resend email
- **DB**: MongoDB collections — `users`, `applications`
- **Auth**: JWT-based admin auth, idempotent admin seeding on startup

## Core Requirements
- Home with cinematic hero + interactive rotating globe (Three.js), animated counters, 12 pillars, parallax story, regional chapters, membership preview, final CTA
- 8 pages: Home, About, Pillars, Membership, Chapters & Regions, Governance (animated flow chart), Programs, Apply
- Multi-step Apply form (Identity → Profile → Motivation → Review) → saves to MongoDB → fires confirmation + admin-notify emails via Resend
- Admin login + dashboard (stats, filters, search, detail drawer, status updates)
- Premium institutional voice in all copy; UN-style SVG emblem/wordmark

## What's Been Implemented

### 2026-01 — MVP
- Full 8-page public site with distinctive design (Playfair Display + Manrope, not Inter/Roboto)
- react-globe.gl hero globe with arcs between emerging nations + pulsing rings
- 12 interactive pillars with SDG-style icons (lucide)
- Parallax "Why ICEN Exists" cinematic section
- 8-region interactive chapters page (tab switcher)
- Governance flow-chart with animated SVG connectors
- Programs grid (Summit, Accelerator, Policy Lab, Fellows, Capital Bridge, Observatory)
- 4-tier membership with glassmorphism / elevated "Most Popular"
- 4-step Apply wizard with validation + success screen
- Admin login → dashboard with stats, filters, search, detail drawer, status updates
- Backend: JWT auth, idempotent admin seed, applications CRUD, Resend emails (best-effort async)
- UN-style ICEN emblem (SVG): concentric frame, laurel ticks, azimuthal globe, blue meridian, rising chevron

### 2026-01 — Light Theme Redesign (current)
- Entire site reworked from dark-first to a premium light/ivory institutional aesthetic
- Palette: ivory paper (#F7F5EF) + deep navy ink (#0A1628) + electric blue accent (#0057FF) + SDG green (#008F4C)
- New refined SVG emblem: concentric frame + 24 laurel ticks + azimuthal globe + rising chevron + blue meridian
- Strategic dark panels kept for cinematic contrast: hero globe card, "Why ICEN Exists" story section, final CTA
- All components (Navbar, Footer, 8 pages, AdminLogin, AdminDashboard) rewritten for light theme
- Buttons: deep-navy primary that transitions to electric blue on hover; uppercase tracked legal-style labels

## Prioritized Backlog

### P1 (next iteration)
- Email templates verified in Resend (currently test sender `onboarding@resend.dev` — may need a verified domain for applicant confirmation delivery)
- Regional map with actual vector countries (currently a tab-based switcher)
- Pillar detail pages (one per pillar) — currently a list view

### P2
- Press / News / Insights section (editorial articles)
- Public events calendar with RSVP
- Applicant self-service portal (check status by reference ID + email)
- Language variants (FR, ES, AR)

### P3
- Embedded newsletter + lead capture
- Programs detail pages with cohort data
- Partner / funder logo wall

## Next Tasks
- Confirm email deliverability end-to-end (applicant + admin) once domain verified in Resend
- Add Open Graph / meta tags for social sharing
- SEO — sitemap.xml, robots.txt, JSON-LD organization schema
