# DriveMatch Landing Page - Design Specs (Print 4)

## Color Palette

| Element | Color | Usage |
|---------|-------|-------|
| **Background** | Black `#000000` | Main page background |
| **Primary Accent** | Purple 600 `#9333ea` | Buttons, highlights, borders |
| **Secondary Background** | Purple 950 `#3f0f5c` | Section backgrounds, gradients |
| **Text Primary** | White `#ffffff` | Headlines, primary text |
| **Text Secondary** | White/60% `rgba(255,255,255,0.6)` | Body text, descriptions |
| **Border** | Purple 600/30% `rgba(147,51,234,0.3)` | Card borders, dividers |
| **Accent Glow** | Purple 500 `#a855f7` | Subtle highlights, hovers |

**NO YELLOW** - Remove all `yellow-*` classes. Accent color is **PURPLE only**.

---

## Sections

### 1. Navigation Bar
- **Background**: `black/80` with `backdrop-blur-md`
- **Border**: Bottom border `border-purple-600/30`
- **Logo**: Simple dot (white circle) + text "DriveMatch"
- **Links**: White text, hover to `text-purple-400`
- **Sign In Button**: Purple 600 with hover to Purple 500

### 2. Hero Section
- **Background**: Full black with centered purple glow
- **Layout**: Centered column (not side-by-side grid)
- **Heading**: "Drive Your Dream Car Today" - large, white, centered
- **Showcase**: Circular purple glow with centered car emoji
- **Brand Logos**: 6 car brands in row below showcase (grayscale, minimal)
- **CTA Button**: Purple 600 "Browse" button
- **Description**: White/60 text below

### 3. Unlock Your Car Section
- **Background**: Gradient from Purple 950 to Black
- **Heading**: "Unlock Your Car" - white, centered
- **Cards**: 3 feature cards in grid
  - Background: `from-purple-900/40 to-black/40`
  - Border: `border-purple-600/30`
  - Hover: Border brightens to `purple-500/60`
  - Each card: Image placeholder + title + description

### 4. FAQ Section
- **Background**: Gradient from Black to Purple 950
- **Heading**: "Frequently Asked Questions"
- **FAQ Items**: Stack of 4 collapsible items
  - Background: `bg-purple-900/30`
  - Border: `border-purple-600/30`
  - Light interaction on hover

### 5. CTA Section
- **Background**: Gradient from Purple 900 to Purple 800
- **Heading**: "Find Your Perfect Car Today"
- **Buttons**:
  - Primary: Purple 600 button "Browse"
  - Secondary: Border button "Learn More"

### 6. Footer
- **Background**: Black with top border `border-purple-600/20`
- **Text**: White/60 secondary text
- **Links**: Hover to white

---

## Typography

| Element | Font Size | Weight | Color |
|---------|-----------|--------|-------|
| Main Heading | 7xl-8xl | Black (900) | White |
| Section Heading | 4xl-5xl | Black (900) | White |
| Body Text | xl | Normal (500) | White/60 |
| Card Title | lg | Bold (700) | White |
| Button | lg | Bold (700) | White (on purple) |

---

## Component Sizing

- **Page Max Width**: `max-w-7xl` (1280px)
- **Padding**:
  - Horizontal: `px-4 sm:px-6 lg:px-8`
  - Vertical sections: `py-20`
- **Card Gap**: `gap-8`
- **Hero Min Height**: `min-h-screen`
- **Card Rounded**: `rounded-xl` (16px)

---

## Key Rules (DO's and DON'Ts)

### ✅ DO:
- Use **Purple** as the main accent color
- Keep text **White and White/60** for hierarchy
- Use **Black** as primary background
- Apply subtle purple glows for depth
- Keep borders at `**/30` opacity for elegance
- Center content vertically in hero section
- Use white text on purple buttons

### ❌ DON'T:
- **NO YELLOW** anywhere - this was the main error
- Don't use bright, high-saturation colors
- Don't add extra decorative elements not in print
- Don't change button styles from purple
- Don't use different layouts than the grid shown
- Don't increase opacity on borders (stay at 30%)

---

## Interactive States

### Buttons
- **Hover**: `hover:bg-purple-500` (slightly brighter purple)
- **Scale**: `hover:scale-105` (slight grow on hover)
- **Transition**: `transition-all` (smooth 200ms)

### Cards
- **Hover Border**: `hover:border-purple-500/60`
- **Transition**: `transition-all`
- **No Shadow changes** - keep minimal

### Links
- **Default**: `text-white`
- **Hover**: `hover:text-purple-400`
- **Transition**: `transition-colors`

---

## Spacing Distances

- **Section Vertical**: 80px (`py-20`)
- **Content Max Width**: 1280px
- **Grid Gap**: 32px (`gap-8`)
- **Card Padding**: 24px (`p-6` or `p-8`)
- **Button Padding**: 16px vertical, 40px horizontal (`px-10 py-4`)

---

## Responsive Breakpoints

- **Mobile**: Single column, full width
- **Tablet** (md): 2-3 columns
- **Desktop** (lg): Full layout with max-width container

All components use `grid-cols-1 md:grid-cols-3` pattern.

---

## Print 4 Reference

The design is based on official print #4 which shows:
- Dark (nearly black) background
- Purple/magenta as primary accent
- Minimal yellow (removed in this version)
- Centered hero with car showcase
- Clean, minimal card design
- Professional, modern aesthetic

**Source**: `apps/web/public/designs/4.webp`
