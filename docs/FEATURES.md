# Features Roadmap

This document outlines the planned features for AutoMarket, organized by priority and implementation status.

---

## MVP (Minimum Viable Product)

These features must be implemented before demo/interview.

### 1. Listings Catalog

**Status:** ✅ Done

**Description:**
Display available vehicles for sale with vehicle details, images, pricing, and dealer info.

**User Stories:**
- As a buyer, I can see a list of available vehicles
- As a buyer, I can view vehicle details (make, model, year, mileage, features)
- As a buyer, I can see vehicle images in a carousel
- As a dealer, I can upload a new vehicle listing
- As a dealer, I can edit/delete my listings

**Components (Frontend):**
- `VehicleCard` — Compact card showing vehicle summary + price
- `VehicleCarousel` — Image carousel with Framer Motion
- `ListingsGrid` — Responsive grid layout (1-4 columns)
- `VehicleDetails` — Full page with all vehicle info

**API Endpoints (Backend):**
- `GET /api/listings` — List all listings with filters
- `GET /api/listings/:id` — Get single listing detail
- `POST /api/listings` — Create listing (dealers only)
- `PUT /api/listings/:id` — Update listing (owner/admin only)
- `DELETE /api/listings/:id` — Delete listing (owner/admin only)

**Database:**
- `vehicles` table (make, model, year, trim, mileage, features, condition)
- `listings` table (vehicle_id, dealer_id, price, status, created_at)
- `vehicle_images` table (listing_id, url, cloudinary_public_id, order)

**Design Reference:**
- `public/designs/3.webp` (DriveMatch - main listing page with sidebar filters)
- Vehicle cards with compare/favorite buttons ✅ Implemented
- Sidebar filter panel ✅ Implemented
- 2-column responsive grid ✅ Implemented

---

### 2. Price Intelligence (PRIMARY FEATURE)

**Status:** ✅ Done

**Description:**
Analyze market data and badge each listing as "Great Deal", "Fair Price", or "High Price" based on percentile pricing.

**How It Works:**
1. Dealer lists vehicle
2. Backend enqueues pricing job
3. Bull worker queries PostgreSQL for comparable vehicles (same make/model within year/mileage range)
4. Calculates P25 (25th percentile), median, P75 (75th percentile)
5. Compares listing price against percentiles
6. Returns badge + market stats
7. Badge is stored on listing and displayed in UI

**User Stories:**
- As a buyer, I can see if a vehicle is a "Great Deal" (below P25)
- As a buyer, I can see market price range for similar vehicles
- As a dealer, I can see why my pricing is competitive/high/low
- As a buyer, I can filter by price badge (show only "Great Deals")

**Components (Frontend):**
- `PriceScore` — Badge (Great Deal/Fair Price/High Price) + market stats tooltip
- `PricingBreakdown` — P25/median/P75 visualization (chart or text)

**API Endpoints (Backend):**
- `GET /api/pricing/stats?make=Toyota&model=Corolla&year=2020` — Market stats for a vehicle type
- `POST /api/listings/:id/recalculate-price` — Force recalculation (admin)
- `GET /api/listings/:id/price-analysis` — Detailed pricing breakdown

**Database:**
- `listings.price_score` (badge enum: great_deal, fair_price, high_price)
- `listings.market_stats` (JSON: p25, median, p75, sample_size, strategy_used)

**Bull Jobs:**
- `pricing` queue: enqueued when listing is saved, calculates price asynchronously

**Pricing Strategies (Strategy Pattern):**
1. **ExactMatchStrategy** — same make/model, year ±2, mileage ±30k (highest confidence)
2. **MakeModelStrategy** — same make/model, year ±3 (no mileage restriction)
3. **NationalStrategy** — same make/model, any year (broadest fallback)

Each strategy implements `canApply()` (checks minimum sample size ≥ 5) and `compute()` (runs `percentile_cont` query). Engine tries them in order, uses the first that qualifies.

**Key Technology:**
- PostgreSQL `percentile_cont()` for P25/median/P75
- Composite index on (make, model, year, mileage) for fast queries
- ~8ms query time on 500k rows

**Design Reference:**
- `public/designs/price-badge.png`
- `public/designs/pricing-breakdown.png`

---

### 3. Faceted Search

**Status:** ✅ Done (filters wired to real API)

**Description:**
Filter and search listings by price, year, mileage, fuel type, transmission, condition, make, model, etc.

**User Stories:**
- As a buyer, I can search by vehicle make (e.g., "Toyota")
- As a buyer, I can filter by price range (e.g., $10k-$20k)
- As a buyer, I can filter by year range (e.g., 2020-2024)
- As a buyer, I can filter by fuel type (gasoline, diesel, hybrid, electric)
- As a buyer, I can filter by transmission (manual, automatic, CVT)
- As a buyer, I can filter by mileage range (e.g., 0-50k miles)
- As a buyer, I can see facet counts (e.g., "Toyota (45)", "Honda (32)")
- As a buyer, I can sort by price (ascending/descending), relevance, newest, deal score

**Components (Frontend):**
- `SearchFiltersContainer` ✅ — Sidebar with filter controls (Brand, Model, Price, Duration, Instant Availability)
- `PriceRangeSlider` ✅ — Dual-handle slider ($10k - $100k)
- `ListingsContainer` ✅ — Grid of vehicles (2 columns)
- Still needed: Facet counters, Sort dropdown, Dynamic filtering

**API Endpoints (Backend):**
- `GET /api/search` — List listings with filters + facets
  - Query params: `make`, `model`, `minPrice`, `maxPrice`, `minYear`, `maxYear`, `fuelType[]`, `transmission[]`, `condition[]`
  - Returns paginated results + facet counts
- `GET /api/search/facets` — Get available facet values (for autocomplete)

**Database:**
- Composite index: `(make, model, year, mileage)`
- GIN full-text index on vehicle description + make + model
- Materialized view for facet counts (refreshed daily)

**Pagination:**
- Cursor-based pagination (more efficient than offset/limit)
- Limit 20 results per page, max 100

**Caching:**
- Redis cache for search results (5-minute TTL)
- Cache invalidated when new listing is saved

**Design Reference:**
- `public/designs/search-page.png`
- `public/designs/search-filters.png`

---

### 4. Auth & Dealer Workspaces

**Status:** ⏳ Auth done (JWT), dealer workspace UI pending

**Description:**
Multi-tenant dealer management with role-based access (owner, admin, agent).

**User Stories:**
- As a dealer owner, I can create a workspace for my dealership
- As a dealer owner, I can invite agents/admins to my workspace
- As a dealer admin, I can manage agent access and permissions
- As a dealer agent, I can view and create listings for my dealership
- As a dealer, I can only see my own listings (enforced by RLS)
- As a buyer, I can see dealer info (name, logo, average rating, verified badge)

**Components (Frontend):**
- `DealerWorkspace` — Dashboard showing all my listings
- `DealerSettings` — Invite team members, manage roles
- `DealerProfile` — Public profile view

**API Endpoints (Backend):**
- `GET /api/dealers/:id` — Get dealer public info
- `GET /api/dealers/me` — Get current user's dealer
- `POST /api/dealers` — Create dealership
- `POST /api/dealers/:id/invite` — Invite team member
- `GET /api/dealers/:id/listings` — My listings (with RLS enforcement)

**Database:**
- `dealers` table (name, email, website, logo, description, verified)
- `dealer_users` table (user_id, dealer_id, email, name, role, is_active)
- **RLS Policy:** All queries include `WHERE dealer_id = (SELECT current_dealer_id FROM app.user_context)`

**Authentication:**
- `POST /api/auth/login` — bcrypt password check + JWT (7d expiry)
- Token stored in `localStorage`, sent as `Authorization: Bearer` header
- `JWT_SECRET` and `JWT_EXPIRES_IN` configured via environment variables

**Design Reference:**
- `public/designs/dealer-dashboard.png`
- `public/designs/dealer-invite.png`

---

## Phase 2 (After MVP)

### 5. AI Shopping Assistant

**Status:** 📋 Planned

**Description:**
AI-powered assistant that answers buyer questions about vehicles and makes recommendations based on active listings.

**Features:**
- Chat interface with streaming responses
- RAG (Retrieval Augmented Generation) over active listings
- Ask about price comparisons, features, reliability
- Get recommendations based on budget and preferences

**Technology:**
- Open-source LLM (e.g. Ollama + Llama 3) or any compatible API
- Vector embeddings for similarity search
- Redis for conversation history

---

### 6. Vehicle Photos & Image Processing

**Status:** 📋 Planned

**Description:**
Upload vehicle photos, auto-resize, optimize, and serve via CDN.

**Features:**
- Drag-and-drop photo upload
- Automatic resizing (thumbnail, medium, full)
- WebP format conversion
- Cloudinary integration
- EXIF data removal (privacy)

---

### 7. Saved Listings & Favorites

**Status:** 📋 Planned

**Description:**
Allow buyers to save listings for later.

**Features:**
- Favorite button on vehicle cards
- Favorites page showing all saved listings
- Email alerts for price changes on favorites
- Compare multiple vehicles side-by-side

---

### 8. User Reviews & Ratings

**Status:** 📋 Planned

**Description:**
Buyers can rate dealers and leave reviews.

**Features:**
- 5-star rating system
- Text reviews with photos
- Review moderation (admin)
- Average rating displayed on dealer profile

---

## Technical Debt & Improvements

### Documentation
- [ ] Add E2E tests (Cypress or Playwright)
- [ ] Add Storybook for component library
- [ ] Add database migration guide
- [ ] Add deployment checklist

### Performance
- [ ] Implement query caching strategy
- [ ] Add Redis caching for popular listings
- [ ] Optimize image loading (lazy load, placeholder)
- [ ] Analyze and optimize bundle size

### Security
- [ ] Implement rate limiting on API
- [ ] Add CSRF protection
- [ ] Add input sanitization (XSS prevention)
- [ ] Implement API key rotation for Cloudinary/Anthropic

### Monitoring
- [ ] Add error tracking (Sentry)
- [ ] Add analytics (Plausible or similar)
- [ ] Add performance monitoring
- [ ] Add database query logging

---

## Feature Status Legend

- ✅ **Done** — Implemented and tested
- ⏳ **In Progress** — Currently being developed
- 📋 **Planned** — Scheduled for development
- 🔄 **Review** — Under code review
- ❓ **On Hold** — Waiting for dependencies or decisions

---

## Dependency Graph

```
MVP Features:
1. Listings Catalog
   ↓
2. Price Intelligence (depends on listings)
   ↓
3. Faceted Search (depends on listings)
   ↓
4. Dealer Workspaces (enables multi-tenant features)

Phase 2 Features:
5. AI Shopping Assistant (works with listings + pricing)
6. Vehicle Photos (enhances listings)
7. Saved Listings (requires user auth)
8. User Reviews (requires user auth + listings)
```

---

## Interview Talking Points

When demoing, focus on:

1. **Price Intelligence** — The differentiator
   - "This replicates Cars Commerce's AccuTrade product"
   - Show the percentile query: ~8ms on 500k rows
   - Explain the Strategy Pattern: adding new pricing rules is easy

2. **PostgreSQL Features**
   - "We use `percentile_cont()` for accurate market stats"
   - "Composite index makes faceted search fast"
   - "Row Level Security enforces multi-tenancy at DB level"

3. **Architecture**
   - "Monorepo makes type safety a guarantee (shared types)"
   - "Bull queue decouples pricing from listing creation"
   - "Design patterns make the code maintainable and testable"

4. **Full-Stack Capability**
   - "Built both frontend and backend from scratch"
   - "Integrated Cloudinary for image processing"
   - "Implemented auth + RLS for multi-tenancy"

---

*Last updated: 2026-03-22*
