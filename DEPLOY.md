# Doost Travel — Deployment Guide

## Stack
- **Frontend/Backend**: Next.js 14 (App Router)
- **Database + Auth**: Supabase
- **Flights API**: Duffel
- **Payments**: Stripe
- **Hosting**: Vercel

---

## Step 1 — Set up Supabase

1. Go to [supabase.com](https://supabase.com) → your project
2. Open **SQL Editor** → paste the contents of `supabase/schema.sql` → **Run**
3. In **Authentication → Providers**, enable **Google OAuth** and add your Google Client ID/Secret
4. In **Project Settings → API**, copy your `service_role` key (keep this secret!)

---

## Step 2 — Get your API keys

### Duffel (Flights)
1. Sign up at [duffel.com](https://duffel.com)
2. Go to **Dashboard → API Keys**
3. Create a **Live key** (or use **Test key** for development)
4. Copy your API key → paste into `DUFFEL_API_KEY`

> ✅ **Yes, Duffel works perfectly** for this site. It gives you real-time flight search across 300+ airlines, handles passenger data, and creates bookable orders. The integration is in `lib/duffel/client.ts`.

### Stripe (Payments)
1. Sign up at [stripe.com](https://stripe.com)
2. Go to **Developers → API Keys**
3. Copy **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Copy **Secret key** → `STRIPE_SECRET_KEY`
5. For webhooks: Go to **Developers → Webhooks → Add endpoint**
   - URL: `https://your-domain.vercel.app/api/payments/webhook`
   - Events: `checkout.session.completed`, `checkout.session.expired`
   - Copy **Signing secret** → `STRIPE_WEBHOOK_SECRET`

---

## Step 3 — Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit: Doost Travel"
git remote add origin https://github.com/YOUR_USERNAME/doost-travel.git
git push -u origin main

# 2. Go to vercel.com → Import your repo
# 3. Add ALL environment variables (see below)
# 4. Deploy!
```

### Environment Variables (add in Vercel → Settings → Environment Variables)

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://kezgkhwvihfvcikaiseo.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *(your anon key)* |
| `SUPABASE_SERVICE_ROLE_KEY` | *(from Supabase settings)* |
| `DUFFEL_API_KEY` | *(from Duffel dashboard)* |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `STRIPE_SECRET_KEY` | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |
| `NEXT_PUBLIC_APP_URL` | `https://your-site.vercel.app` |

---

## Step 4 — Test the flow

1. Open the site → search a flight (e.g., **DXB → LHR**)
2. Select a flight → fill passenger details
3. Complete Stripe checkout (use test card `4242 4242 4242 4242`)
4. Check your **Dashboard → Bookings**

---

## Project Structure

```
doost-travel/
├── app/
│   ├── page.tsx              # Homepage
│   ├── flights/page.tsx      # Flight search + booking
│   ├── packages/page.tsx     # Tour packages
│   ├── destinations/page.tsx # Destinations catalog
│   ├── about/page.tsx        # About us
│   ├── contact/page.tsx      # Contact form
│   ├── dashboard/page.tsx    # User dashboard (protected)
│   ├── auth/login/           # Sign in
│   ├── auth/signup/          # Create account
│   └── api/
│       ├── flights/search/   # Duffel flight search
│       ├── payments/create-session/  # Stripe checkout
│       └── payments/webhook/ # Stripe webhook handler
├── components/
│   ├── layout/               # Header, Footer
│   ├── home/                 # Hero, Destinations, Packages, etc.
│   ├── flights/              # FlightCard, PassengerForm
│   └── ui/                   # Shared UI components
├── lib/
│   ├── supabase/             # Client + Server Supabase instances
│   ├── duffel/               # Duffel API client
│   ├── stripe/               # Stripe client
│   └── utils.ts              # Helpers, mock data
├── supabase/schema.sql       # Run this in Supabase SQL Editor
└── middleware.ts             # Auth route protection
```

---

## Adding your own content

- **Destinations & Packages**: Edit `lib/utils.ts` → `DESTINATIONS` and `PACKAGES` arrays, OR manage them via Supabase table editor
- **Brand colors**: Edit `tailwind.config.js` → `colors`
- **Logo**: Replace the `<Plane>` icon in `components/layout/Header.tsx` with your logo image
- **Contact info**: Update `components/layout/Footer.tsx`
