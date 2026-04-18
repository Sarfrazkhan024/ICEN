# ICEN — International Council for Emerging Nations

## Problem Statement
A world-class institutional website for ICEN — a global council of emerging nations. Premium marketing + membership application + admin dashboard + email notifications + editorial content (Insights + Research).

## User Personas
1. Emerging-nation leaders / builders — apply for membership (now with phone)
2. ICEN Secretariat admins — review applications, manage Insights + Research content
3. Public visitors / journalists / researchers — consume content

## Architecture
- **Frontend**: React + Tailwind + framer-motion + react-simple-maps (d3-geo) + react-helmet-async + flagcdn.com
- **Backend**: FastAPI + Motor (MongoDB) + JWT (bcrypt, HS256) + Resend email
- **Collections**: `users`, `applications`, `blog`, `research`

## Implemented

### Sprints 1–4 — MVP / Light Theme / Content / Atlas & Flags
- 8-page public site + JWT admin + Resend email (applicant + notify)
- Light institutional theme (ivory + deep navy + electric blue)
- UN-style emblem + wordmark with full "INTERNATIONAL COUNCIL · EMERGING NATIONS" tagline
- Blog/Insights + Research Library (public + admin CRUD + seeded)
- Per-pillar deep-dive pages (12 slugs)
- Impact mosaic photography
- SEO: meta / OG / Twitter / JSON-LD / sitemap.xml / robots.txt
- Mobile responsive
- Editorial WorldMap (flat Mercator with animated arcs + pulse markers) replacing 3D globe
- FlagsMarquee (50 nations, dual-row scrolling)

### Sprint 5 — Filters, Phone, Clickable Cards, Hero Refinement (current)
- **Phone field** added to membership applications (backend model + frontend form + admin drawer + admin email template)
- **Home cards are fully clickable**: Pillar cards → `/pillars/:slug`, Region cards → `/chapters`, Tier cards → `/membership`, Impact tiles → relevant `/pillars/:slug` or `/programs`
- **Insights filter + pagination**: tag chips (All + unique tags) with client-side filter; "Load more" at 9 items
- **Research filter + pagination**: pillar chips with filter; "Load more" at 8 items
- **Hero refinement**: Removed the "A Global Council · Est. MMXXVI" overline. Replaced with an editorial masthead treatment — a horizontal rule + "International Council **for Emerging Nations**" (italic blue accent on the last three words)
- **Footer cleanup**: removed "Est. MMXXVI"
- Testing agent passed all tests (backend + frontend, iteration 3) with zero bugs

## Prioritized Backlog

### P1
- Verify Resend custom domain for reliable applicant email delivery
- Image upload for blog/research covers (S3/Cloudinary)
- Interactive WorldMap — clickable countries showing member-nation profiles

### P2
- RSS feed for Insights
- Applicant self-service status lookup (reference ID + email)
- Multilingual (FR, ES, AR)
- Events calendar with RSVP

### P3
- Founding Nation Spotlight carousel on Home
- Newsletter capture
- Partner logo wall
- Full-text search across Blog + Research

## Next Tasks
- Connect Resend custom domain for production email
- Add image-upload flow in admin editor
- Make the WorldMap interactive (country click → profile page)
