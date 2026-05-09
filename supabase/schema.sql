-- ============================================================
-- Doost Travel — Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Profiles ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name   TEXT,
  phone       TEXT,
  avatar_url  TEXT,
  country     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── Bookings ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.bookings (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id           UUID REFERENCES auth.users ON DELETE SET NULL,
  booking_type      TEXT NOT NULL DEFAULT 'flight', -- 'flight' | 'package' | 'hotel'
  status            TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'confirmed' | 'cancelled' | 'expired'
  description       TEXT,
  duffel_offer_id   TEXT,
  duffel_order_id   TEXT,
  stripe_session_id TEXT,
  total_amount      NUMERIC(10, 2),
  currency          TEXT DEFAULT 'USD',
  passenger_count   INT DEFAULT 1,
  passenger_details JSONB,
  paid_at           TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

-- ── Destinations (admin-managed) ───────────────────────────
CREATE TABLE IF NOT EXISTS public.destinations (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name        TEXT NOT NULL,
  country     TEXT NOT NULL,
  description TEXT,
  image_url   TEXT,
  price_from  NUMERIC(10, 2),
  rating      NUMERIC(3, 2) DEFAULT 4.5,
  review_count INT DEFAULT 0,
  tag         TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── Packages ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.packages (
  id             UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title          TEXT NOT NULL,
  destination    TEXT NOT NULL,
  description    TEXT,
  image_url      TEXT,
  duration_days  INT,
  price          NUMERIC(10, 2),
  original_price NUMERIC(10, 2),
  rating         NUMERIC(3, 2) DEFAULT 4.5,
  review_count   INT DEFAULT 0,
  included       TEXT[],
  tag            TEXT,
  is_featured    BOOLEAN DEFAULT FALSE,
  is_active      BOOLEAN DEFAULT TRUE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── Row Level Security ────────────────────────────────────
ALTER TABLE public.profiles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages  ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/write their own
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Bookings: users see their own; service role sees all
CREATE POLICY "bookings_select_own" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "bookings_insert_own" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "bookings_update_own" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);

-- Destinations & Packages: public read
CREATE POLICY "destinations_public_read" ON public.destinations FOR SELECT USING (TRUE);
CREATE POLICY "packages_public_read"     ON public.packages     FOR SELECT USING (TRUE);

-- ── Sample Data ───────────────────────────────────────────
INSERT INTO public.destinations (name, country, description, image_url, price_from, rating, review_count, tag, is_featured) VALUES
  ('Santorini',     'Greece',    'Iconic white-washed villages above the azure Aegean.',       'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', 1299, 4.9, 2341, 'Romantic',  TRUE),
  ('Bali',          'Indonesia', 'Emerald rice terraces, temples, and spiritual tranquility.', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', 899,  4.8, 4123, 'Adventure', TRUE),
  ('Maldives',      'Maldives',  'Crystal-clear lagoons and overwater bungalows.',             'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', 2499, 5.0, 1876, 'Luxury',    TRUE),
  ('Tokyo',         'Japan',     'Where ancient temples meet futuristic skylines.',            'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', 1599, 4.9, 3211, 'Cultural',  TRUE),
  ('Amalfi Coast',  'Italy',     'Dramatic cliffs and pastel villages on the Mediterranean.',  'https://images.unsplash.com/photo-1533606688076-b6683a5f5f62?w=800', 1799, 4.8, 1654, 'Scenic',    TRUE),
  ('Machu Picchu',  'Peru',      'The lost Incan citadel hidden in the Andes clouds.',        'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800', 1399, 4.9, 2890, 'Adventure', TRUE)
ON CONFLICT DO NOTHING;

INSERT INTO public.packages (title, destination, image_url, duration_days, price, original_price, rating, review_count, included, tag, is_featured) VALUES
  ('Greek Islands Escape',    'Santorini & Mykonos',    'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', 8,  2299, 2899, 4.9, 456, ARRAY['Flights','Hotels','Transfers','Breakfast'], 'Best Seller', TRUE),
  ('Bali Serenity Package',   'Ubud & Seminyak',        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', 10, 1699, 2100, 4.8, 312, ARRAY['Flights','Villa','Transfers','Spa Day'],     'Popular',     TRUE),
  ('Japan Cultural Journey',  'Tokyo, Kyoto & Osaka',   'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', 12, 3199, 3800, 5.0, 789, ARRAY['Flights','Hotels','Bullet Train','Guide'],  'Premium',     TRUE),
  ('Maldives Honeymoon',      'North Male Atoll',       'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800', 7,  4299, 5200, 5.0, 234, ARRAY['Flights','Overwater Villa','All Meals','Snorkeling'], 'Luxury', TRUE)
ON CONFLICT DO NOTHING;
