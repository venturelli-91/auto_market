# AutoMarket Design System — Master

**Generated:** 2026-03-22
**Version:** 1.0.0
**Reasoning Engine:** UI UX Pro Max (Automotive E-Commerce Category)

---

## Philosophy

AutoMarket is a **product-centric marketplace** that builds trust through transparency and data. The design system reflects:
- **Confidence** — Trust badges, verified dealer indicators
- **Clarity** — Pricing intelligence, market comparisons
- **Efficiency** — Quick filtering, actionable CTAs
- **Premium Feel** — Quality over quantity

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage | Notes |
|------|-----|-----|-------|-------|
| **Primary Dark** | `#0F172A` | (15, 23, 42) | Headers, primary buttons, navigation | Deep slate for authority |
| **Primary Blue** | `#2563EB` | (37, 99, 235) | Links, CTAs, accents | Trust/stability color |
| **Primary Light** | `#DBEAFE` | (219, 238, 254) | Backgrounds, hover states | Soft blue for contrast |

### Secondary Colors

| Name | Hex | RGB | Usage | Notes |
|------|-----|-----|-------|-------|
| **Success Green** | `#10B981` | (16, 185, 145) | "Great Deal" badge, confirmations | Positive action |
| **Warning Amber** | `#F59E0B` | (245, 158, 11) | "Fair Price" badge, warnings | Caution indicator |
| **Danger Red** | `#EF4444` | (239, 68, 68) | "High Price" badge, errors | Critical attention |

### Neutral Colors

| Name | Hex | RGB | Usage | Notes |
|------|-----|-----|-------|-------|
| **Text Dark** | `#1F2937` | (31, 41, 55) | Body text, primary content | High contrast, readable |
| **Text Gray** | `#6B7280` | (107, 114, 128) | Secondary text, metadata | Softer contrast |
| **Border Gray** | `#E5E7EB` | (229, 231, 235) | Borders, dividers, outlines | Subtle separation |
| **Background** | `#FFFFFF` | (255, 255, 255) | Main background | Clean, bright |
| **Background Alt** | `#F9FAFB` | (249, 250, 251) | Card backgrounds, sections | Very subtle contrast |

### Semantic Colors

```typescript
// apps/web/lib/colors.ts
export const colors = {
  primary: '#2563EB',
  success: '#10B981',  // Great Deal
  warning: '#F59E0B',  // Fair Price
  danger: '#EF4444',   // High Price
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  bg: '#FFFFFF',
  bgAlt: '#F9FAFB',
};
```

---

## Typography

### Font Stack

```css
/* Primary: Clean, modern, highly readable */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Display/Headlines: Sophisticated, premium */
font-family: 'Cormorant Garamond', Georgia, serif;
```

### Scale & Hierarchy

| Level | Font Size | Line Height | Weight | Usage |
|-------|-----------|------------|--------|-------|
| **Display 1** | 48px | 1.2 | Bold (700) | Page title |
| **Display 2** | 36px | 1.3 | Bold (700) | Section heading |
| **Heading 1** | 28px | 1.4 | Semibold (600) | Card title, feature heading |
| **Heading 2** | 22px | 1.4 | Semibold (600) | Subsection heading |
| **Heading 3** | 18px | 1.5 | Semibold (600) | Component heading |
| **Body Large** | 16px | 1.6 | Regular (400) | Primary body text |
| **Body** | 14px | 1.6 | Regular (400) | Standard body text |
| **Body Small** | 12px | 1.5 | Regular (400) | Metadata, secondary text |
| **Caption** | 11px | 1.4 | Medium (500) | Labels, badges, tags |

### Tailwind Configuration

```typescript
// apps/web/tailwind.config.ts
export const theme = {
  fontFamily: {
    sans: ['Inter', 'system-ui'],
    display: ['Cormorant Garamond', 'Georgia'],
  },
  fontSize: {
    'display-1': ['48px', { lineHeight: '1.2', fontWeight: '700' }],
    'display-2': ['36px', { lineHeight: '1.3', fontWeight: '700' }],
    'h1': ['28px', { lineHeight: '1.4', fontWeight: '600' }],
    'h2': ['22px', { lineHeight: '1.4', fontWeight: '600' }],
    'h3': ['18px', { lineHeight: '1.5', fontWeight: '600' }],
    'body-lg': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
    'body': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
    'body-sm': ['12px', { lineHeight: '1.5', fontWeight: '400' }],
    'caption': ['11px', { lineHeight: '1.4', fontWeight: '500' }],
  },
};
```

---

## Spacing & Layout

### Spacing Scale

```css
/* Based on 4px unit (Tailwind default) */
xs:  4px   (0.25rem)
sm:  8px   (0.5rem)
md:  16px  (1rem)
lg:  24px  (1.5rem)
xl:  32px  (2rem)
2xl: 48px  (3rem)
3xl: 64px  (4rem)
```

### Responsive Breakpoints

```typescript
breakpoints: {
  'sm': '375px',   // Mobile
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1440px',  // Large desktop
}
```

### Grid System

- **Mobile (375px):** 1 column, 16px padding
- **Tablet (768px):** 2-4 columns, 24px padding
- **Desktop (1024px):** 3-4 columns, 32px padding
- **Large (1440px):** 4 columns, 48px padding

---

## Components & Patterns

### 1. **Vehicle Card** (Core Component)

**Purpose:** Display a vehicle listing with pricing intelligence

**Structure:**
```
┌─────────────────┐
│  Vehicle Image  │ (aspect-ratio: 16/9)
├─────────────────┤
│ Make Model Year │ (Heading 3)
│ Mileage • Color │ (Body Small, gray)
├─────────────────┤
│  Price Badge    │ (Great Deal / Fair Price / High Price)
│    $25,999      │ (Display 2, bold)
├─────────────────┤
│  [View Details] │ (Primary CTA)
└─────────────────┘
```

**Colors:**
- Background: `#FFFFFF` or `#F9FAFB`
- Border: `#E5E7EB`
- Price badge: Success/Warning/Danger based on score
- CTA: Primary Blue `#2563EB`

**Spacing:**
- Padding: 16px (md)
- Image height: 200px (mobile), 300px (desktop)
- Gap between elements: 12px (sm)

**States:**
- Default: Static card
- Hover: Subtle shadow lift, image scale 1.05
- Active/Favorite: Heart icon fill, state persistence

**Accessibility:**
- Image alt text: "{Year} {Make} {Model}"
- Link semantics: Wrap card in `<a>` or button
- ARIA: `aria-label="View {year} {make} {model}"`

---

### 2. **Price Badge** (Semantic Component)

**Purpose:** Display pricing intelligence (Great Deal / Fair Price / High Price)

**Design:**
```
┌──────────────────────┐
│ 🏆 Great Deal        │  ← Badge icon + label
│ P25: $20k | Med: $23k│  ← Market context (tooltip)
└──────────────────────┘
```

**Colors:**
- Great Deal: Success Green `#10B981` background, white text
- Fair Price: Warning Amber `#F59E0B` background, white text
- High Price: Danger Red `#EF4444` background, white text

**Typography:**
- Label: Caption (11px, bold)
- Subtext: Body Small (12px, medium)

**Spacing:**
- Padding: 8px 12px (sm/md)
- Icon size: 16px

**Variants:**
1. **Compact:** Just badge + label (card footer)
2. **Extended:** Badge + market stats (detail page)
3. **Tooltip:** On hover, show P25/median/P75

---

### 3. **Search Filters** (Container Component)

**Purpose:** Refine listings by price, year, fuel type, etc.

**Layout:**
```
Mobile (375px):
┌──────────────────┐
│  Price Range     │
│  [slider]        │
├──────────────────┤
│  Fuel Type       │
│  ☐ Gasoline      │
│  ☐ Diesel        │
│  ☐ Hybrid        │
├──────────────────┤
│  [Apply Filters] │
└──────────────────┘

Desktop (1024px):
┌─────────┬──────────────────┐
│  Price  │  [Results Grid]  │
│  Year   │                  │
│  Fuel   │                  │
│  Trans  │                  │
└─────────┴──────────────────┘
```

**Colors:**
- Panel background: `#F9FAFB`
- Slider track: `#E5E7EB`
- Slider thumb: Primary Blue `#2563EB`
- Checkbox focus: Primary Blue `#2563EB`

**Typography:**
- Label: Body (14px, semibold)
- Input text: Body (14px, regular)

**Interactions:**
- Debounce query 300ms while user adjusts
- Show result count dynamically
- Mobile: Collapse/expand accordion per filter type
- Desktop: All filters visible

---

### 4. **Dealer Card** (Social Proof)

**Purpose:** Build trust with dealer branding and reviews

**Design:**
```
┌──────────────────────┐
│  [Dealer Logo]       │
│  Acme Auto Sales     │ (Heading 3)
│  ⭐⭐⭐⭐⭐ (4.8)      │ (Caption)
│  23 reviews • Verified│ (Body Small, green)
├──────────────────────┤
│  📍 Los Angeles, CA  │
│  🔗 Visit Website    │
└──────────────────────┘
```

**Colors:**
- Background: `#FFFFFF`
- Logo border: `#E5E7EB`
- Star color: Warning Amber `#F59E0B`
- Verified badge: Success Green `#10B981`

**Spacing:**
- Padding: 16px (md)
- Gap: 12px (sm)

---

### 5. **Landing Hero Section**

**Purpose:** First impression, establish value proposition

**Pattern:** Image-driven with overlay

```
┌────────────────────────────────┐
│                                │
│     [Hero Image]               │
│     (vehicle showcase)         │
│     ┌─────────────────────┐    │
│     │ Find Your Perfect   │    │
│     │ Car Today           │    │
│     │ [Search CTA]        │    │
│     └─────────────────────┘    │
│                                │
└────────────────────────────────┘
```

**Colors:**
- Overlay: Dark gradient (rgba(15, 23, 42, 0.6))
- Headline: White `#FFFFFF`
- CTA: Primary Blue `#2563EB`

**Typography:**
- Headline: Display 1 or 2, white
- Subtext: Body Large, light gray
- CTA text: Caption, bold

**Height:** 60vh (mobile), 80vh (desktop)

---

## Interactions & Micro-interactions

### Transitions

```css
/* Standard timing */
transition-duration: 150ms;    /* Fast interactions */
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); /* easeInOutCubic */

/* Apply to: */
background-color, color, border-color, box-shadow, transform
```

### Hover States

```typescript
// Vehicle Card
.card:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  img {
    transform: scale(1.05);
  }
}

// Button
button:hover {
  background-color: darken(primary, 10%);
  transform: translateY(-2px);
}

// Link
a:hover {
  color: primary;
  text-decoration: underline;
}
```

### Loading States

- Use skeleton screens (pulse animation) instead of spinners
- Skeleton color: `#E5E7EB`
- Animation: opacity pulse 200ms infinite

### Focus States (Accessibility)

```css
button:focus {
  outline: 2px solid primary;
  outline-offset: 2px;
}

input:focus {
  border-color: primary;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Key Effects

### Shadows (Elevation System)

```typescript
// Tailwind
shadow:   0 1px 2px 0 rgba(0, 0, 0, 0.05);
shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

### Glass Effect (Optional, Premium Cards)

```css
background: rgba(255, 255, 255, 0.8);
backdrop-filter: blur(10px);
border: 1px solid rgba(229, 231, 235, 0.5);
```

---

## Anti-patterns (What NOT to Do)

### Color & Style

- ❌ **AI Purple/Pink Gradients** — Overused, signals "AI project"
- ❌ **Neon Colors** — Harsh, doesn't fit automotive trust narrative
- ❌ **Dark Mode by Default** — Automotive industry expects light, clean
- ❌ **Comic Sans / Handwriting Fonts** — Kills credibility
- ❌ **Bright Yellow Text** — Unreadable, painful contrast

### Layout & UX

- ❌ **Horizontally Scrolling Lists** — Confusing on mobile
- ❌ **Auto-playing Videos** — Annoying, kills performance
- ❌ **Infinite Scroll Without Pagination** — Can't bookmark/share
- ❌ **Clickable Images Without Context** — "Is this a button?"
- ❌ **Form Fields Without Labels** — Accessibility fail

### Interactions

- ❌ **Animations > 500ms** — Feels sluggish
- ❌ **Hover-only CTAs** — Mobile users can't interact
- ❌ **No Focus Indicators** — Keyboard users left out
- ❌ **Animations on Reduced Motion** — Violates accessibility
- ❌ **Hover Effects on Touch Devices** — Confusing interaction model

### Performance

- ❌ **Unoptimized Images** — Slow load, bad mobile UX
- ❌ **No Lazy Loading** — Downloads images not in viewport
- ❌ **Massive Fonts Files** — Slow paint, layout shift
- ❌ **No Caching Headers** — Repeat visits slow
- ❌ **Render-blocking JS** — Slow Time to Interactive

---

## Pre-delivery Checklist

Before shipping any component:

### Visual

- [ ] No emoji as icons (use SVG: Heroicons, Lucide)
- [ ] `cursor: pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] No placeholder text left visible
- [ ] Consistent spacing (use spacing scale)
- [ ] Typography hierarchy is clear

### Accessibility

- [ ] Text contrast ≥ 4.5:1 (WCAG AA, light mode)
- [ ] Focus indicators visible for all interactive elements
- [ ] Form labels present + associated to inputs
- [ ] Images have meaningful alt text
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Screen reader tested (VoiceOver, NVDA)
- [ ] Color not the only indicator (e.g., red badge + icon)

### Responsive

- [ ] Mobile (375px): Full bleed, readable, touchable (48px tap targets)
- [ ] Tablet (768px): 2-column layout, balanced spacing
- [ ] Desktop (1024px): 3-4 column layout, breathing room
- [ ] Large (1440px): Max-width container (maybe 1200px)
- [ ] No horizontal scroll on any breakpoint

### Performance

- [ ] Images optimized (WebP, next/Image)
- [ ] Lazy loading for off-screen images
- [ ] Font loading strategy (swap, optional)
- [ ] No layout shift (CLS < 0.1)
- [ ] CSS minified, unused classes removed

### Browser Support

- [ ] Chrome/Edge 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Mobile Safari (iOS 14+)

### Code Quality

- [ ] No `console.log`, `debugger` statements
- [ ] TypeScript strict mode (no `any`)
- [ ] Component has tests (Jest + RTL)
- [ ] Storybook story added (if complex)
- [ ] Comments explain "why", not "what"

---

## Usage Guidelines

### 1. Building a New Component

1. **Read this MASTER.md** completely
2. **Check `design-system/pages/[page-name].md`** if it exists (overrides MASTER)
3. **Use the color palette** — no custom hex values
4. **Follow the spacing scale** — no arbitrary padding
5. **Apply typography hierarchy** — don't invent sizes
6. **Test accessibility** — contrast, focus, keyboard nav
7. **Test responsiveness** — 375px, 768px, 1024px, 1440px

### 2. Adding a New Page

1. Create `design-system/pages/[page-name].md`
2. Copy relevant sections from MASTER.md
3. Override only what's different
4. Example: `design-system/pages/checkout.md` might have different CTA colors

### 3. Updating the Design System

1. Changes to MASTER.md affect all pages
2. Changes to page override only that page
3. Major version bump if breaking change
4. Document rationale in commit message

---

## Resources

### Fonts (Google Fonts)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Icons

- **Heroicons** (heroicons.com) — Official Tailwind icons
- **Lucide** (lucide.dev) — Modern, clean icons
- **SVG-based** — Always vectorize, never rasterize

### Tools

- **Contrast Checker:** webaim.org/resources/contrastchecker/
- **Color Palette Generator:** coolors.co
- **Responsive Testing:** responsively.app
- **Accessibility Audit:** wave.webaim.org

---

## Design System Versioning

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-22 | Initial design system generated for automotive e-commerce |

---

*This design system is the source of truth for all AutoMarket UI development.*
*Last updated: 2026-03-22*
