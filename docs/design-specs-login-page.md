# Design Specs - Login Page

## Overview

Split-screen login page with image on left and login form on right. Dark theme with purple accents matching the DriveMatch brand identity.

---

## Layout

**Desktop (≥1024px):**
- Left 50%: Full-height background image with gradient overlay
- Right 50%: Centered login form with max-width 448px

**Mobile (<1024px):**
- Full width with image hidden
- Login form centered on black background

---

## Color Palette

| Element | Color | Tailwind | Hex |
|---------|-------|----------|-----|
| Background | Black | `bg-black` | `#000000` |
| Primary | Purple 600 | `from-purple-600 to-purple-500` | `#9333ea → #a855f7` |
| Primary Hover | Purple 500 | `hover:from-purple-500 hover:to-purple-400` | `#a855f7 → #c084fc` |
| Text Primary | White | `text-white` | `#ffffff` |
| Text Secondary | White 60% | `text-white/60` | `rgba(255,255,255,0.6)` |
| Border | White 20% | `border-white/20` | `rgba(255,255,255,0.2)` |
| Input Background | White 10% | `bg-white/10` | `rgba(255,255,255,0.1)` |
| Logo Gradient | Purple → Purple | `from-purple-500 to-purple-600` | `#a855f7 → #9333ea` |

---

## Typography

| Element | Font | Weight | Size | Line Height |
|---------|------|--------|------|-------------|
| Logo (DRIVE) | sans-serif | 900 (black) | 24px | tight |
| Logo (MATCH) | sans-serif | 900 (black) | 24px | tight |
| Page Title | sans-serif | 900 (black) | 30px | tight |
| Form Label | sans-serif | 700 (bold) | 14px | normal |
| Body Text | sans-serif | 400 (normal) | 14px | normal |
| Input Text | sans-serif | 400 (normal) | 14px | normal |
| Button Text | sans-serif | 700 (bold) | 14px | normal |

---

## Components

### Left Side (Image)
- Full-height background image (1200x1000px)
- Gradient overlay: `linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))`
- Centered text overlay:
  - Brand name: "DriveMatch" (white, 36px bold)
  - Tagline: "Encontre o veículo perfeito com inteligência" (white/80, 20px)

### Right Side (Form Container)
- `max-w-md` (448px)
- Centered vertically and horizontally
- Padding: 32px on desktop, 16px on mobile

### Logo
- `flex gap-2 items-center`
- DRIVE: purple gradient text
- MATCH: white text

### Form Sections

**Header Section**
- Title: "Bem-vindo" (30px, bold)
- Subtitle: "Acesse sua conta para continuar" (white/60, 14px)
- Margin bottom: 32px

**Input Fields**
- Label: 14px, bold white, margin-bottom 8px
- Input height: 44px (py-3)
- Input padding: 16px (px-4)
- Border: 1px solid white/20
- Border radius: 8px (rounded-lg)
- Placeholder color: white/40
- Focus state:
  - Border: purple-500
  - Ring: 1px purple-500
- Spacing between inputs: 20px (space-y-5)

**Checkbox & Links**
- Checkbox size: 16px
- Spacing from label: 8px
- "Lembrar-me" text: 14px, white/60
- "Esqueceu a senha?" text: 14px, purple-400 with hover state

**Login Button**
- Width: 100%
- Height: 44px
- Background: gradient purple-600 → purple-500
- Hover: gradient purple-500 → purple-400
- Border radius: 8px
- Font: bold, 14px
- Margin top: 32px
- Disabled state: opacity 50%, cursor not-allowed
- Transition: smooth color change

**Divider**
- Border color: white/20
- Text: "Ou continue com" (white/60, 14px)
- Padding: 32px vertical

**Social Buttons**
- Grid: 2 columns, 16px gap
- Height: 44px
- Border: 1px solid white/20
- Hover: background white/5
- Display: emoji + text (hidden on mobile)
- Border radius: 8px

**Sign Up Link**
- Text: "Não tem uma conta?" (white/60, 14px)
- Link: "Crie uma agora" (purple-400, bold with hover state)
- Margin top: 32px

---

## Responsive Behavior

### Mobile (<1024px)
- Hide left image (hidden lg:flex)
- Full width: 100%
- Padding: 16px (px-4)
- Form max-width: 100% (max-w-md)

### Tablet (768px - 1023px)
- Show image at 50%
- Form at 50%

### Desktop (≥1024px)
- Image: 50% width
- Form: 50% width, max-width 448px

---

## Do's & Don'ts

✅ **Do:**
- Use only the specified purple shades for accents
- Keep all text aligned to left in form
- Use consistent 8px spacing unit
- Ensure all interactive elements have hover states
- Test image aspect ratio on all screen sizes
- Use semantic HTML (form, label, input)

❌ **Don't:**
- Use any yellow colors
- Mix different primary colors
- Add unnecessary gradients beyond specified ones
- Use shadows (keep clean, flat design)
- Override focus states
- Use different font weights than specified

---

## Asset References

- Background image: Professional workplace/woman (~1200x1000px)
- Logo: DriveMatch (brand identity, no Mibbers logo)
- Icons: Emoji placeholders for Google/Apple (🔵, 🍎)

---

## Implementation Notes

1. Image should be sourced from Cloudinary (production) or Unsplash API (development)
2. Login logic will connect to Express backend (`/api/auth/login`)
3. Form validation using Zod (if integrated)
4. Error states: Show red text below input fields
5. Loading state: Button text changes to "Entrando..." and becomes disabled
6. Success: Redirect to marketplace (`/marketplace`)
7. Mobile image can be hidden completely or shown as overlay in future iterations

*Last updated: 2026-03-22*
