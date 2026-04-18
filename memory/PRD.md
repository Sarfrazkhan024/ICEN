# ICEN — International Council for Emerging Nations

## Problem Statement
Build a world-class institutional website for ICEN — a global council of emerging nations (UN / WEF gravitas). Core vision: "A Global Council Where Emerging Nations Shape the Future Together." Premium marketing + membership application + admin dashboard + email notifications.

## User Personas
1. **Emerging-nation leaders / builders** — apply for membership (Observer / Fellow / Council / Founding)
2. **ICEN Secretariat admins** — review applications, manage Insights (blog) + Research library content
3. **Public visitors / journalists / researchers** — consume Insights briefings + download Research Library papers

## Architecture
- **Frontend**: React + Tailwind + framer-motion + react-globe.gl (Three.js) + react-helmet-async
- **Backend**: FastAPI + Motor (async MongoDB) + JWT (bcrypt, HS256) + Resend email
- **DB collections**: `users`, `applications`, `blog`, `research`
- Idempotent admin + content seeding on startup

## Core Requirements — Implemented
- Light institutional theme (ivory + deep navy + electric blue + SDG green)
- Refined UN-style ICEN emblem (concentric frame, laurel ticks, azimuthal globe, rising chevron)
- Three.js hero globe with arcs + pulse rings
- 8 primary pages: Home, About, Pillars, Membership, Chapters, Governance, Programs, Apply
- Per-pillar deep-dive pages at `/pillars/:slug` (12 pages) with stats, initiatives, partners, pull-quote
- Blog/Insights section: `/blog`, `/blog/:slug` (+ 6 seed posts)
- Research Library: `/research`, `/research/:slug` (+ 5 seed papers)
- Impact mosaic on Home with 6 curated photographs
- Admin dashboard with tabs: Applications · Insights · Research — full CRUD
- Multi-step Apply form with Resend email (applicant + admin notify)
- SEO: per-page title, description, OG + Twitter tags via react-helmet-async; JSON-LD organization schema; sitemap.xml; robots.txt
- Mobile responsive: hero stacks on <lg, mobile menu with Insights/Research, typography scales

## What's Been Implemented

### 2026-01 — MVP (Sprint 1)
- Full 8-page public site + JWT admin + Resend email + seed admin

### 2026-01 — Light Theme Redesign (Sprint 2)
- Entire site re-skinned to premium editorial light theme
- New refined UN-style emblem

### 2026-01 — Content & SEO Expansion (Sprint 3) — current
- Blog (Insights) + Research Library with full admin CRUD + seed content
- Per-pillar deep-dive pages (12) with rich content structure
- Impact-mosaic on Home with quality photography
- SEO meta + Open Graph + Twitter Card + JSON-LD + sitemap.xml + robots.txt
- Mobile responsiveness fixes (hero grid, typography, mobile nav)
- Admin tabs pattern with drawer-based content editor (title/body/cover/tags/pillar/pdf)

## Prioritized Backlog

### P1
- Replace test Resend sender with verified ICEN domain for applicant email delivery
- Search/filter on public Blog + Research (by tag / pillar)
- Pagination when lists grow beyond ~24
- Image upload for blog/research covers (currently URL field)

### P2
- RSS feed for Insights
- Programs detail pages + cohort data
- Applicant self-service status lookup
- Language variants (FR, ES, AR)
- Public events calendar with RSVP

### P3
- Founding Nation spotlight banner on Home (conversion lever)
- Newsletter capture + list management
- Partner logo wall

## Next Tasks
- Confirm deliverability with Resend-verified domain
- Add image-upload support in admin editor (S3/Cloudinary)
- Introduce tag/pillar filters to /blog and /research
