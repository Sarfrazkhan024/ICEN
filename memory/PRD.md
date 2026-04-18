# ICEN — International Council for Emerging Nations

## Problem Statement
Build a world-class institutional website for ICEN — a global council of emerging nations. Premium marketing + membership application + admin dashboard + email notifications.

## User Personas
1. Emerging-nation leaders / builders — apply for membership
2. ICEN Secretariat admins — review applications, manage Insights + Research content
3. Public visitors / journalists / researchers — consume content

## Architecture
- **Frontend**: React + Tailwind + framer-motion + react-simple-maps (d3-geo) + react-helmet-async + flagcdn.com flags
- **Backend**: FastAPI + Motor (MongoDB) + JWT (bcrypt, HS256) + Resend email
- **Collections**: `users`, `applications`, `blog`, `research`

## What's Been Implemented

### 2026-01 — MVP + Theme + Content + SEO (Sprints 1–3)
- 8-page public site, JWT admin, Resend email
- Light institutional theme (ivory + deep navy + electric blue)
- UN-style SVG emblem (concentric frame, laurel ticks, azimuthal globe, rising chevron)
- Blog + Research Library (public + admin CRUD + seed content)
- Per-pillar deep-dive pages (12)
- Impact mosaic with premium photography
- SEO: meta / OG / Twitter / JSON-LD / sitemap.xml / robots.txt
- Mobile responsiveness

### 2026-01 — Identity & Atlas (Sprint 4) — current
- **Replaced Three.js globe** with a refined 2D editorial **WorldMap** (`react-simple-maps` + d3-geo Mercator). Countries rendered as soft ivory shapes; animated curved blue arcs between 10 key emerging-nation pairs; 18 pulsing capital markers. Blends into the light theme via radial vignette.
- **FlagsMarquee** section — two rows of continuously scrolling flags (50 member nations via flagcdn.com), pausable on hover, with fade-mask edges. Placed directly after the atlas.
- **Logo wordmark** now displays the full "INTERNATIONAL COUNCIL · EMERGING NATIONS" tagline under "ICEN" (both compact navbar variant and full footer variant).
- **Hero subtitle** — the full institutional name "International Council for Emerging Nations" now sits prominently above the main H1 in tracked uppercase.

## Prioritized Backlog

### P1
- Verify Resend custom domain for applicant email delivery
- Tag / pillar filters on `/blog` and `/research`
- Pagination for lists beyond ~24
- Image upload for blog/research covers (S3/Cloudinary)

### P2
- RSS feed for Insights
- Applicant self-service status lookup
- Multilingual (FR, ES, AR)
- Public events calendar

### P3
- Founding Nation Spotlight banner on Home
- Newsletter capture
- Partner logo wall

## Next Tasks
- Connect Resend custom domain for production email deliverability
- Add filters + pagination on Insights & Research
- Introduce image-upload flow in admin editor
