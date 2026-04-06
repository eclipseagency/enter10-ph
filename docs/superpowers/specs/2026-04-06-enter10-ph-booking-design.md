# Enter10 Philippines — Booking Website Design Spec

## Overview
Standalone Next.js 15 web app for Enter10 Philippines (Venice Grand Canal Mall, Taguig). Serves as a booking platform for individuals, companies, and schools. Dark neon entertainment theme. Deployed on Vercel with its own domain. PWA-ready for future App/Play Store wrapping via Capacitor.

## Tech Stack
- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** Supabase (existing instance: `pcbttbylqcmbplvvqcsz.supabase.co`)
- **i18n:** `next-intl` — English (default) + Filipino
- **Animations:** Framer Motion
- **PWA:** `next-pwa`
- **Deploy:** Vercel
- **Email:** Resend (booking notifications)

## Visual Identity
- **Theme:** Dark immersive — neon accents on deep black
- **Backgrounds:** `#0A0A0A` (base), `#141414` (cards)
- **Primary accent:** Electric blue `#00D4FF`
- **Secondary accent:** Neon magenta `#FF2D78`
- **Tertiary:** Amber/gold `#FFB800` (CTAs)
- **Text:** White `#FFFFFF`, muted `#9CA3AF`
- **Style:** Glass-morphism cards, neon glow hovers, full-bleed venue photos with dark overlays, smooth scroll animations, mobile-first

## Project Structure
```
enter10-ph/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Landing
│   │   ├── activities/page.tsx   # Activities showcase
│   │   ├── packages/page.tsx     # Packages (school/corp/bday)
│   │   ├── booking/page.tsx      # 4-step booking flow
│   │   └── contact/page.tsx      # Location, hours, form
│   ├── (admin)/admin/
│   │   ├── page.tsx              # Dashboard
│   │   ├── bookings/page.tsx     # Manage bookings
│   │   └── settings/page.tsx     # Pricing, hours, toggles
│   ├── api/
│   │   ├── bookings/route.ts     # POST create, GET list
│   │   └── bookings/[id]/route.ts # PATCH update status
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── booking/
│   ├── landing/
│   └── admin/
├── lib/
│   ├── supabase.ts
│   ├── i18n.ts
│   └── utils.ts
├── messages/
│   ├── en.json
│   └── fil.json
├── public/images/
└── types/
```

## Pages

### Public
1. **Landing `/`** — Full-screen hero (venue photo + "Your Night Out Starts Here"), activities grid (6 cards), packages preview (3 cards), photo gallery, location + hours, CTA strip
2. **Activities `/activities`** — Cards per activity: photo, description, price/hr, "Book Now" CTA. PH branch: Bowling (₱100/hr), Billiards (₱70/hr), Arcade (₱40/hr), Air Hockey (₱50/hr), Food & Coffee Lounge (free entry)
3. **Packages `/packages`** — School Fun Day (₱50/person, 20-100 ppl, 3hrs), Corporate Team Building (₱120/person, 10-50 ppl, 4hrs), Birthday Bash (₱80/person, 5-30 ppl, 3hrs). Each shows includes, min/max, price, duration
4. **Booking `/booking`** — 4-step: Choose Type → Details (date, time, people, activities/package) → Contact Info (name, email, phone, company/school, notes) → Review & Submit
5. **Contact `/contact`** — Google Maps (Venice Grand Canal Mall), address, phone, hours, contact form

### Admin (protected)
6. **Dashboard `/admin`** — Today's bookings, pending/confirmed/cancelled counts, recent list
7. **Bookings `/admin/bookings`** — Filterable table, view details, confirm/cancel actions
8. **Settings `/admin/settings`** — Update pricing, hours, toggle activities

## Database
Uses existing Supabase instance. Existing tables: `branches`, `activities`, `branch_activities`, `packages`, `bookings`, `profiles`.

### Migration: Guest booking fields
Add to `bookings` table:
- `guest_name TEXT NOT NULL DEFAULT ''`
- `guest_email TEXT NOT NULL DEFAULT ''`
- `guest_phone TEXT NOT NULL DEFAULT ''`
- `company_name TEXT NOT NULL DEFAULT ''`
- `special_requests TEXT NOT NULL DEFAULT ''`
- `booking_source TEXT NOT NULL DEFAULT 'web' CHECK (booking_source IN ('web', 'app', 'walk_in'))`
- Make `user_id` nullable (guest bookings have no user)

### PH Branch ID
`b1000000-0000-0000-0000-000000000008`

## Auth
- **Public booking:** No auth — guest submits name/email/phone
- **Admin:** Supabase Auth email/password for venue staff

## Notifications
- **New booking:** Email to venue staff
- **Status change:** Email to customer on confirm/cancel

## API Routes
- `POST /api/bookings` — Validate + insert + notify staff
- `GET /api/bookings` — Admin: list with date/status/type filters
- `PATCH /api/bookings/[id]` — Admin: update status (confirm/cancel)
- `GET /api/activities` — Fetch PH branch activities with prices

## i18n
- English (default) + Filipino
- `next-intl` with JSON message files
- Language switcher in nav

## PWA / Future Native
- `next-pwa` for service worker + manifest
- Mobile-first responsive design
- Ready for Capacitor wrapping → App Store / Play Store
