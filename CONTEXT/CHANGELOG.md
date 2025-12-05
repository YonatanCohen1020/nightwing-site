 # Night Wing PH – Changelog (Context)

 This changelog captures the major user-facing decisions and implementation steps made during development.

 ## 2025-01-15

- Checkout system
  - Added simple order submission to n8n webhook (https://n8n.yarden-zamir.com/webhook/order).
  - Checkout form with customer name, phone, order type (pickup/delivery), payment method (cash/paybox), and optional delivery address.
  - Native location picker for delivery addresses (browser geolocation).
  - Automatic order time (ISO 8601).
  - Success feedback; clear cart; auto-close after 3 seconds.
  - Translatable UI for Hebrew/English.

## 2025-11-03

 - Fonts and typography
   - Self-host Josefin Sans (logo/title) and Amatic SC (Hebrew/body). Ensure `font-logo` and `font-heading` use Josefin Sans; `font-body` uses Amatic SC.
   - Make all Amatic SC text larger and bolder by default; apply across subtitles and UI.
   - Fix outline for title "WING": use `-webkit-text-stroke` with `paint-order: stroke fill` and responsive stroke widths; fill set to background color.

 - Hero section
   - Keep only language button; remove header component from page.
   - Add top-right language button (Hebrew↔English); make it smaller; reduce glow; reintroduce lighter pulse.
   - Hours/location: show only day and hours ("Thursdays 21:00-2:00"); no "שעות פעילות" label. Adjust typography and subtle glow. Iterate to reduce over-boldness.
   - Ensure flying wings/background never obscure text: lower z-index, reposition towards edges, lower opacity and glow.
   - Disable hero subtitle/description for now.

 - Menu section
   - Rename main menu title to "אני במאנץ' ל...:" and increase visual weight (custom shadow-based thickening). Adjust underline to rounded, symmetric, pink, thicker; fix spacing on mobile and desktop.
   - Use Amatic SC for all section/category subtitles. Category title text in blue; underline in pink with rounded corners and improved spacing.
   - Reorder categories: Combo first; Wings; Tenders; Fries; Salads; Sauces; Drinks. (Fries moved above Salads.)
   - Integrate images in menu cards; remove individual item titles and hot symbol; center and emphasize descriptions; make description size `text-lg md:text-xl`.

 - Combo/wings/tenders selection flow
   - Add selection panel (bottom sheet via portal) for Combo/Wings/Tenders.
   - Wings/Tenders: choose 2 sauces; Combo: choose Wings or Tenders + 2 sauces + 1 drink.
   - Add drink selection to Combo (Cola Zero, Fanta, Sprite Zero). Remove 1.5L option.
   - Improve mobile ergonomics: sticky header/footer, centered button content, larger touch targets, overscroll containment.

 - Cart
   - Add floating cart button (top-left) showing count; opens side cart panel.
   - Cart panel lists items with images, names, quantities, total-only (remove per-item price line).
   - Actions: Clear, Keep Ordering, Remove item, Edit. Allow removing Combo items (revised policy).
   - Support editing configurations for Combo (type/sauces/drink) and for Wings/Tenders (sauces).
   - Use combo image when showing combo item in cart.

 - i18n
   - Add keys for day label, hero order text, new menu title, fries, selection panel labels, cart labels, drink names.
   - Correct spelling to "מאנץ'" (with alef) across button/title.

 - Styling utilities
   - Button: less bright; pink outline; semi-transparent background (`bg-accent-pink/20`), subtle hover, lighter pulse animation (`pulse-glow-light`).
   - Add `.menu-title-thick` to visually thicken Amatic SC; adjust letter-spacing.
   - Add `.hours-glow` for subtle glow.

 - Tech & fixes
   - Resolve Tailwind circular dependency from `@apply font-body` in global CSS by using direct `font-family`/`font-weight`.
   - Fix TS build: guard `cartItem.comboConfig` in `CartPanel`; remove unused `removeItem` import from `ItemSelectionPanel`.
   - Render selection panel via `createPortal`; lock body scrolling; raise z-index; smoother spring animation.

 ## 2025-11-02

 - Initial menu/category scaffolding; floating wings and star field.
 - Basic cart store (Zustand) and menu cards.
 - Baseline i18n setup and translations.

 ---

 Refer to `CONTEXT/IMPLEMENTATION_STATUS.md` for current feature status and `src/styles/index.css` for the latest font and outline utilities.

# Changelog - Night Wing PH Website

All notable changes and integrations from the initial implementation session are documented in this file.

---

## [1.0.0] - Initial Implementation - 2024

### 🎉 Project Initialization

#### Project Structure Created
- Initialized Vite + React + TypeScript project
- Configured Tailwind CSS with custom color palette
- Set up project directory structure:
  ```
  nightwing_ph/
  ├── assets/              # Static assets (wing.png)
  ├── src/
  │   ├── components/     # React components
  │   │   ├── layout/     # Header, Footer
  │   │   ├── hero/       # Hero section, animations
  │   │   ├── menu/       # Menu section, items
  │   │   ├── cart/       # Cart components (future)
  │   │   └── shared/     # Shared components
  │   ├── stores/         # Zustand state stores
  │   ├── hooks/          # Custom React hooks
  │   ├── types/          # TypeScript types
  │   ├── locales/        # i18n translations
  │   └── styles/         # Global CSS
  ├── CONTEXT/            # Documentation files
  └── public/             # Public assets
  ```

#### Dependencies Installed
- **Core:** React 18.2.0, React DOM 18.2.0
- **Routing:** react-router-dom 6.20.0
- **Animations:** framer-motion 10.16.0
- **State Management:** zustand 4.4.0
- **Forms:** react-hook-form 7.48.0, zod 3.22.0
- **Data Fetching:** @tanstack/react-query 5.0.0
- **Internationalization:** react-i18next 13.5.0, i18next 23.7.0
- **UI Components:** @headlessui/react 1.7.0
- **Icons:** lucide-react 0.294.0
- **Utilities:** clsx 2.0.0
- **Build Tools:** Vite 5.0.0, TypeScript 5.3.0
- **Styling:** Tailwind CSS 3.3.0, PostCSS, Autoprefixer

---

## ✨ Features Implemented

### 1. Single-Page Layout Architecture

#### Hero Section
- **Full viewport height:** 100vh on mobile, 80vh on desktop
- **Floating animations:**
  - 4 animated chicken wings using `assets/wing.png`
  - Each wing has unique floating path and rotation
  - Different animation speeds (2-4.5 seconds)
  - Random initial positions
- **Star field background:**
  - 30 twinkling stars
  - Random positions, sizes, and twinkle patterns
  - Opacity animations (0.3 to 1.0)
- **Content:**
  - Large title: "NIGHT WING" (NIGHT in teal, WING in pink)
  - Subtitle in Hebrew: "כנפיים חמות וטעימות"
  - Description text
  - Hours display: "21:00-2:00"
  - Location: "Pardes Hanna, Paar 29"
- **ORDER Button:**
  - Large size: 64px height (mobile), 80px (desktop)
  - Hot pink background (#f66dce) with glow effect
  - Bold text: "הזמן" (Hebrew) / "ORDER" (English)
  - Pulse/glow animation (continuous)
  - Smooth scroll to menu section (same page, no reload)
  - Hover/tap interactions
- **Scroll indicator:** Animated down arrow

#### Menu Section
- **Same-page implementation:** Located directly below hero
- **Section anchor:** `id="menu"` for smooth scroll targeting
- **Scroll offset:** Accounts for sticky header (70px)
- **Menu items grouped by category:**
  - Wings
  - Tenders
  - Sauces
  - Salads
  - Drinks
  - Add-ons
  - Combo

### 2. Complete Menu Items

All items from the menu description implemented:

#### Wings & Tenders
- **Wings:** 9 pieces, 2 sauces, 45₪
- **Tenders:** 6 chicken fillet pieces, 2 sauces, 45₪

#### Sauces
- Classic Chili (0₪)
- Spicy Honey (2₪, spice level: 4)
- Peanut Butter (0₪)
- Mustard and Honey (0₪)

#### Salads
- Classic American Coleslaw (5₪)

#### Drinks
- 1.5 Liter Drink (15₪)
- Can (10₪)

#### Add-ons
- Fries (15₪)

#### Combo Meal
- Tenders/Wings + Fries + Can Drink + Salad (65₪)

### 3. RTL/LTR Internationalization

#### Implementation Details
- **Primary language:** Hebrew (RTL) - default
- **Secondary language:** English (LTR)
- **Framework:** react-i18next with i18next-browser-languagedetector
- **Language detection:** Browser preference + localStorage persistence
- **Translation files:**
  - `src/locales/he/translation.json` - Hebrew translations
  - `src/locales/en/translation.json` - English translations

#### Direction Switching
- Automatic HTML `dir` attribute switching (rtl/ltr)
- Automatic HTML `lang` attribute switching (he/en)
- All UI components adapt to direction
- Navigation links adjust based on direction
- Text alignment switches automatically

#### Language Switcher
- Located in header
- Button toggles between "עברית" and "EN"
- Persistent preference (localStorage)
- Smooth transition between languages

### 4. Shopping Cart System

#### Cart Store (Zustand)
- **State management:** Zustand with persistence middleware
- **Storage:** localStorage (persists across sessions)
- **Actions:**
  - `addItem()` - Add item to cart (increments if exists)
  - `removeItem()` - Remove item from cart
  - `updateQuantity()` - Update item quantity
  - `clearCart()` - Clear all items
  - `getTotal()` - Calculate cart total
  - `getItemCount()` - Get total item count

#### Cart UI
- Cart icon in header with badge
- Badge shows item count (0-99+)
- Add to cart buttons on menu items
- Cart persists on page reload

### 5. Smooth Scrolling

#### Implementation
- **CSS native:** `scroll-behavior: smooth` in global CSS
- **Scroll padding:** `scroll-padding-top: 70px` for header offset
- **JavaScript enhancement:** `useSmoothScroll` hook
- **ORDER button:** Scrolls to `#menu` section with header offset
- **Navigation links:** All nav items scroll to menu section

#### Smooth Scroll Hook
- `src/hooks/useSmoothScroll.ts`
- `scrollToSection(sectionId, offset)` function
- Accounts for sticky header height
- Smooth animation behavior

### 6. Header Component

#### Features
- **Sticky positioning:** Fixed at top, always visible
- **Backdrop blur:** Semi-transparent with blur effect
- **Logo:** "NIGHT WING" (NIGHT in teal, WING in pink)
- **Navigation:**
  - Desktop: Horizontal nav links
  - Mobile: Responsive (future: hamburger menu)
  - Links scroll to sections (anchor links)
- **Cart icon:**
  - Shopping cart icon from lucide-react
  - Badge showing item count
  - Badge appears only when count > 0
- **Language switcher:**
  - Button toggles between Hebrew and English
  - Shows current language opposite (EN/עברית)

### 7. Menu Section Components

#### MenuSection Component
- Displays all menu items
- Groups items by category
- Section title: "תפריט" (Hebrew) / "Menu" (English)
- Category titles with pink underlines
- Responsive grid layout

#### MenuItemCard Component
- **Layout:**
  - Image placeholder (ready for future images)
  - Item name (Hebrew/English based on language)
  - Description (Hebrew/English)
  - Price display (₪ with accent pink color)
  - Add to cart button
- **Features:**
  - Spice indicator (flame icon for spicy items)
  - Hover effects: scale up, lift, border glow
  - Slide-in animation on scroll into view
  - Responsive sizing
- **Interactions:**
  - Add to cart button with icon
  - Hover and tap animations

### 8. Footer Component

#### Content
- Contact information:
  - Phone: 058-6230849 (clickable)
  - Hours: 21:00-2:00
  - Location: Pardes Hanna, Paar 29
- Disclaimer:
  - Pickup available message
  - Delivery cost (₪20)
- Copyright notice

### 9. Styling & Design System

#### Color Palette (Tailwind Config)
- **Background:** `#23262d` (bg-primary)
- **Background dark:** `#1a1d23` (bg-dark)
- **Background light:** `#2d3239` (bg-light)
- **Text:** `#b7fef6` (text-primary, light teal)
- **Accent pink:** `#f66dce` (accent-pink, hot pink)
- **Accent orange:** `#fa7e61` (accent-orange, for wings)
- **Accent peach:** `#e3b5a4` (accent-peach, soft accent)

#### Typography
- **Logo font:** Bebas Neue, Montserrat (fallback)
- **Heading font:** Montserrat (bold 700, 900)
- **Body font:** Inter, system-ui (fallback)
- **Hebrew font:** Assistant, Noto Sans Hebrew (fallback)

#### Custom Animations (Tailwind)
- `float` - Floating animation (3s, ease-in-out, infinite)
- `float-slow` - Slow float (4s)
- `float-fast` - Fast float (2s)
- `twinkle` - Star twinkle (2s)
- `glow` - Glow effect (2s)
- `pulse-glow` - Pulse with glow (2s)

#### Responsive Breakpoints
- **Mobile:** < 640px (single column)
- **Tablet:** 640px - 1024px (2 columns)
- **Desktop:** > 1024px (3 columns)

### 10. Animations (Framer Motion)

#### Hero Section Animations
- Title fade-in and scale
- Subtitle fade-in with delay
- Description fade-in with delay
- ORDER button fade-in with delay
- All animations staggered for smooth entrance

#### Floating Wings
- 4 wings with unique animations
- Y-axis movement: 0 to -30px
- Rotation: 0° to ±5°
- Scale variation: 1.0 to 1.05
- Different durations: 2s to 4.5s
- Staggered delays: 0s to 1.5s

#### Star Field
- 30 stars with random properties
- Opacity animation: 0.3 to 1.0
- Scale animation: 1.0 to 1.2
- Random positions across viewport
- Random sizes: 2px to 6px

#### Menu Card Animations
- Slide-in on scroll (Intersection Observer)
- Hover: scale 1.05, lift -8px
- Border glow on hover
- Smooth transitions (300ms)

#### Button Interactions
- ORDER button: pulse-glow animation
- Add to cart: hover scale, tap scale
- All buttons: smooth transitions

### 11. Performance Optimizations

#### Code Splitting
- React vendor chunk (react, react-dom)
- Animation vendor chunk (framer-motion)
- State vendor chunk (zustand)
- i18n vendor chunk (react-i18next, i18next)
- Main app bundle

#### Bundle Sizes (Production Build)
- `index.html`: 1.40 KB (gzip: 0.66 KB)
- `wing.png`: 56.81 KB
- `index.css`: 16.42 KB (gzip: 4.08 KB)
- `state-vendor`: 3.59 KB (gzip: 1.58 KB)
- `index.js`: 29.54 KB (gzip: 9.94 KB)
- `i18n-vendor`: 53.22 KB (gzip: 16.37 KB)
- `animation-vendor`: 98.59 KB (gzip: 33.12 KB)
- `react-vendor`: 140.88 KB (gzip: 45.25 KB)

**Total gzipped:** ~140 KB (excluding images)

#### Build Configuration
- TypeScript strict mode enabled
- Tree shaking enabled
- Minification enabled
- Source maps disabled (production)
- Manual chunk splitting configured

### 12. Accessibility Features

#### Semantic HTML
- Proper heading hierarchy (h1, h2, h3)
- Semantic sections
- Button elements with proper labels
- ARIA labels where needed

#### Focus Management
- Visible focus indicators (ring-2, accent-pink)
- Keyboard navigation support
- Focus offset from edges

#### Motion Preferences
- `prefers-reduced-motion` support
- Disables animations when user prefers reduced motion
- Ensures accessibility compliance

#### RTL Support
- Full RTL layout support
- Proper text direction
- Mirrored layouts for Hebrew

### 13. TypeScript Implementation

#### Type Definitions
- `MenuItem` interface (menu items)
- `CartItem` interface (cart items)
- `CartStore` interface (cart store state)
- Component prop interfaces
- Type-safe translations

#### Configuration
- Strict mode enabled
- No unused variables/parameters
- Proper module resolution
- Path aliases configured (@/*)

### 14. Asset Management

#### Assets Moved
- `wing.png` → `assets/wing.png`
- Image properly imported in FloatingWings component
- TypeScript declarations for image imports

---

## 🔧 Configuration Files

### Build Configuration
- **vite.config.ts:**
  - React plugin configured
  - Port: 5173
  - Auto-open browser
  - Manual code splitting
  - Output directory: dist

### TypeScript Configuration
- **tsconfig.json:**
  - ES2020 target
  - React JSX mode
  - Strict type checking
  - Path aliases
  - Include src directory

### Tailwind Configuration
- **tailwind.config.js:**
  - Custom color palette
  - Custom fonts
  - Custom animations
  - Content paths configured

### PostCSS Configuration
- **postcss.config.js:**
  - Tailwind plugin
  - Autoprefixer plugin

### ESLint Configuration
- **.eslintrc.cjs:**
  - TypeScript parser
  - React hooks rules
  - React refresh plugin

---

## 📁 File Structure Created

### Source Files
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── hero/
│   │   ├── HeroSection.tsx
│   │   ├── FloatingWings.tsx
│   │   └── StarField.tsx
│   └── menu/
│       ├── MenuSection.tsx
│       └── MenuItemCard.tsx
├── stores/
│   └── useCartStore.ts
├── hooks/
│   └── useSmoothScroll.ts
├── types/
│   └── menu.ts
├── locales/
│   ├── he/
│   │   └── translation.json
│   └── en/
│       └── translation.json
├── styles/
│   └── index.css
├── App.tsx
├── main.tsx
├── i18n.ts
└── vite-env.d.ts
```

### Configuration Files
```
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
├── .gitignore
└── index.html
```

### Documentation (Moved to CONTEXT/)
```
CONTEXT/
├── README.md
├── PROJECT_PLAN.md
├── COMPONENT_ARCHITECTURE.md
├── TECH_STACK_COMPARISON.md
├── USER_FLOW_DETAILED.md
├── SINGLE_PAGE_LAYOUT.md
├── PERFORMANCE_MOBILE_FIRST.md
├── QUICK_START.md
├── SETUP.md
└── IMPLEMENTATION_STATUS.md
```

---

## 🐛 Bug Fixes & Improvements

### Fixed Issues
1. **Zustand persist middleware:** Fixed import and storage configuration
2. **TypeScript errors:**
   - Removed unused `isRTL` variable in Header
   - Changed `Chili` icon to `Flame` (lucide-react doesn't have Chili)
3. **Build configuration:** All TypeScript errors resolved
4. **Image imports:** Added TypeScript declarations for image files

---

## 📝 Translation Keys

### Navigation (nav)
- wings, tenders, sauces, salads, drinks, addons, combo

### Hero Section (hero)
- title, subtitle, description, order, hours, hoursValue, location

### Menu (menu)
- title, wings, tenders, sauces, salads, drinks, addons, combo

### Cart (cart)
- title, empty, checkout, total, subtotal, delivery, deliveryFee, addToCart

### Footer (footer)
- phone, hours, location, pickup, delivery

---

## 🎯 Design Decisions

### Single-Page Architecture
- **Decision:** Keep hero and menu on same page
- **Reason:** Faster navigation, no page reloads, better UX
- **Implementation:** Smooth scroll with anchor links

### RTL/LTR Support
- **Decision:** Full bidirectional support from start
- **Reason:** Hebrew is primary language, English secondary
- **Implementation:** react-i18next with direction switching

### Mobile-First Design
- **Decision:** Design for mobile, enhance for desktop
- **Reason:** Target audience primarily uses mobile
- **Implementation:** Responsive breakpoints, touch-friendly sizes

### Performance Focus
- **Decision:** Code splitting, lazy loading, optimizations
- **Reason:** Fast loading critical for mobile users
- **Implementation:** Vite code splitting, intersection observer

---

## 🚀 Deployment Ready

### Build Status
- ✅ Production build successful
- ✅ TypeScript compilation passes
- ✅ No linting errors
- ✅ All assets included
- ✅ Optimized bundles

### Ready For
- Cloudflare Pages deployment
- n8n backend integration
- Cart panel implementation
- Checkout flow implementation
- Menu item images

---

## 📊 Statistics

- **Total Components:** 7 React components
- **Total Menu Items:** 11 items (from menu description)
- **Translation Keys:** 30+ keys
- **Animation Elements:** 34 (4 wings + 30 stars)
- **Bundle Size:** ~140 KB gzipped
- **Build Time:** ~3.8 seconds
- **Dependencies:** 15 production, 8 development

---

## 🔮 Future Enhancements (Planned)

- [ ] Cart panel component (slide-out drawer)
- [ ] Checkout flow (multi-step form)
- [ ] Menu item images integration
- [ ] n8n backend API integration
- [ ] Order submission functionality
- [ ] Loading states
- [ ] Error handling
- [ ] Image optimization (WebP conversion)
- [ ] PWA support
- [ ] Analytics integration
- [ ] Mobile hamburger menu
- [ ] Order confirmation page

---

## 📚 Documentation

All planning and documentation files have been moved to the `CONTEXT/` folder:
- Project planning documents
- Component architecture
- User flow diagrams
- Performance strategies
- Setup guides
- Implementation status

---

**Version:** 1.0.0  
**Date:** 2024  
**Status:** Core UI Complete ✅  
**Next Phase:** Cart Panel & Checkout Flow

---

## 🎨 Design Credits

- Color palette based on provided menu design
- Typography optimized for Hebrew and English
- Animations inspired by modern web design trends
- Layout follows single-page application best practices

---

*This changelog documents all changes and integrations from the initial implementation session. For detailed planning documents, see the `CONTEXT/` folder.*

