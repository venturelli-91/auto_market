-- ============================================================
-- AutoMarket — Initial Schema
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- dealers
-- ============================================================
CREATE TABLE IF NOT EXISTS dealers (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT        NOT NULL,
  email         TEXT        UNIQUE NOT NULL,
  password_hash TEXT        NOT NULL,
  location      TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- vehicles
-- ============================================================
CREATE TABLE IF NOT EXISTS vehicles (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  make         TEXT        NOT NULL,
  model        TEXT        NOT NULL,
  year         INTEGER     NOT NULL CHECK (year >= 1900 AND year <= 2100),
  trim         TEXT,
  body_type    TEXT        NOT NULL,
  fuel_type    TEXT        NOT NULL,
  transmission TEXT        NOT NULL,
  mileage      INTEGER     NOT NULL CHECK (mileage >= 0),
  condition    TEXT        NOT NULL,
  engine_size  NUMERIC(4,1),
  horsepower   INTEGER,
  color        TEXT        NOT NULL,
  interior     TEXT,
  features     TEXT[]      NOT NULL DEFAULT '{}',
  description  TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- vehicle_images
-- ============================================================
CREATE TABLE IF NOT EXISTS vehicle_images (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID        NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  url        TEXT        NOT NULL,
  public_id  TEXT        NOT NULL,
  width      INTEGER     NOT NULL,
  height     INTEGER     NOT NULL,
  "order"    INTEGER     NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- listings
-- ============================================================
CREATE TABLE IF NOT EXISTS listings (
  id                   UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  dealer_id            UUID        NOT NULL REFERENCES dealers(id),
  vehicle_id           UUID        NOT NULL REFERENCES vehicles(id),
  price                INTEGER     NOT NULL CHECK (price > 0),
  -- Price score (computed async by pricing engine)
  price_badge          TEXT,
  price_confidence     NUMERIC(4,3),
  price_market_median  INTEGER,
  price_p25            INTEGER,
  price_p75            INTEGER,
  price_sample_size    INTEGER,
  status               TEXT        NOT NULL DEFAULT 'draft'
                         CHECK (status IN ('draft','published','sold','delisted')),
  published_at         TIMESTAMPTZ,
  sold_at              TIMESTAMPTZ,
  view_count           INTEGER     NOT NULL DEFAULT 0,
  favorite_count       INTEGER     NOT NULL DEFAULT 0,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Indexes
-- ============================================================

-- Pricing engine: percentile queries by make+model+year
CREATE INDEX IF NOT EXISTS idx_vehicles_pricing
  ON vehicles(make, model, year, mileage);

-- Filter by make/model text search
CREATE INDEX IF NOT EXISTS idx_vehicles_make_model
  ON vehicles(lower(make), lower(model));

-- Published listings price queries (for percentile_cont)
CREATE INDEX IF NOT EXISTS idx_listings_published_price
  ON listings(price) WHERE status = 'published';

-- Listings by dealer (RLS + dealer dashboard)
CREATE INDEX IF NOT EXISTS idx_listings_dealer_id
  ON listings(dealer_id);

-- Listings by vehicle
CREATE INDEX IF NOT EXISTS idx_listings_vehicle_id
  ON listings(vehicle_id);

-- Images ordered per vehicle
CREATE INDEX IF NOT EXISTS idx_vehicle_images_vehicle_order
  ON vehicle_images(vehicle_id, "order");

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Anyone can read published listings (marketplace)
CREATE POLICY listings_public_read
  ON listings FOR SELECT
  USING (status = 'published');

-- Dealers can read all their own listings (including drafts)
CREATE POLICY listings_dealer_read_own
  ON listings FOR SELECT
  USING (
    dealer_id = current_setting('app.current_dealer_id', true)::uuid
  );

-- Dealers can only insert/update/delete their own listings
CREATE POLICY listings_dealer_write
  ON listings FOR ALL
  USING (
    dealer_id = current_setting('app.current_dealer_id', true)::uuid
  );

-- migrations tracking table
CREATE TABLE IF NOT EXISTS schema_migrations (
  version    TEXT        PRIMARY KEY,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
