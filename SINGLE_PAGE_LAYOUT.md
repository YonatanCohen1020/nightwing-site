# Single Page Layout Specification - Night Wing PH

## 🎯 Layout Overview

**Design Decision:** Single-page application with smooth scroll navigation. Hero section at top, menu section immediately below on the same page. No page routing until checkout modal.

---

## 📐 Page Structure

```
┌─────────────────────────────────────┐
│         HEADER (Sticky)             │
│  Logo | Nav | Cart | Language      │
├─────────────────────────────────────┤
│                                     │
│      HERO SECTION (100vh)           │
│                                     │
│    [Floating Wings Background]     │
│    [Stars Background]               │
│                                     │
│         Title (Large)               │
│      Subtitle/Description           │
│         Hours | Location            │
│                                     │
│      [BIG ORDER BUTTON]             │
│      (Scrolls to Menu ↓)            │
│                                     │
├─────────────────────────────────────┤
│                                     │
│    MENU SECTION (id="menu")         │
│                                     │
│    [Menu Grid - All Items]         │
│                                     │
├─────────────────────────────────────┤
│                                     │
│        FOOTER                       │
│    Contact | Hours | Location      │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎨 Hero Section Specification

### Dimensions
- **Mobile:** 100vh (full viewport height)
- **Desktop:** 80vh (can show hint of menu below)
- **Min Height:** 600px (mobile), 700px (desktop)

### Layout (Centered Content)
```css
.hero-section {
  position: relative;
  min-height: 100vh; /* mobile */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* Hide overflow for animations */
}
```

### Content Structure

#### Background Layers (z-index: 1, 2)
1. **StarField** - Twinkling stars
2. **FloatingWings** - Animated chicken wings

#### Content Layer (z-index: 10, centered)
1. **Title**
   - Size: 48px (mobile), 72px (desktop)
   - Font: Bebas Neue or Montserrat Black
   - Color: `#b7fef6` (light teal)
   - Weight: Bold (700-900)
   - Text: "NIGHT WING" or Hebrew tagline

2. **Subtitle/Description**
   - Size: 18px (mobile), 24px (desktop)
   - Font: Inter/Montserrat
   - Color: `#b7fef6` (light teal)
   - Weight: Regular (400)
   - Text: Appetizing description in Hebrew
   - Max width: 600px (centered)

3. **Info Line** (Hours | Location)
   - Size: 14px (mobile), 16px (desktop)
   - Font: Inter
   - Color: `#e3b5a4` (soft accent)
   - Format: "21:00-2:00 • Paar 29 Pardes Hanna"
   - Spacing: 24px below subtitle

4. **ORDER BUTTON (Primary CTA)**
   - **Size:**
     - Height: 64px (mobile), 80px (desktop)
     - Width: 280px (mobile), 320px (desktop)
     - Border radius: 12px
   - **Styling:**
     - Background: `#f66dce` (hot pink)
     - Text: "הזמן" (ORDER) in Hebrew
     - Text size: 28px (mobile), 36px (desktop)
     - Text color: White
     - Font weight: Bold (700)
   - **Effects:**
     - Box shadow: Glow effect (pink glow)
     - Animation: Pulse (subtle, continuous)
     - Hover: Scale 1.05, stronger glow
   - **Behavior:**
     - Click: Smooth scroll to `#menu` section
     - No navigation: Stays on same page
     - Scroll offset: Account for sticky header

### Smooth Scroll Implementation

```typescript
const scrollToMenu = () => {
  const menuSection = document.getElementById('menu');
  if (menuSection) {
    const headerHeight = 70; // Header height
    const offset = menuSection.offsetTop - headerHeight;
    
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  }
};

// CSS alternative
// html { scroll-behavior: smooth; }
// .order-button { scroll-margin-top: 70px; }
```

---

## 🍗 Menu Section Specification

### Positioning
- **Immediately below Hero:** No gap or minimal gap
- **Section ID:** `id="menu"` for anchor targeting
- **Padding:** 48px (mobile), 80px (desktop) top and bottom

### Section Header
```
┌─────────────────────────────────────┐
│         תְּפָרִיט (Menu)             │
│     ──────────────────────          │
│      (pink underline)              │
└─────────────────────────────────────┘
```

- **Title:** "תפריט" (Menu) in Hebrew
- **Font:** Montserrat Bold
- **Size:** 36px (mobile), 48px (desktop)
- **Color:** `#f66dce` (hot pink)
- **Underline:** 3px solid `#f66dce`
- **Spacing:** 32px below title for first menu item

### Menu Grid Layout

#### Mobile (< 640px)
- **Columns:** 1 column
- **Gap:** 24px vertical
- **Item width:** Full width minus padding (32px sides)

#### Tablet (640px - 1024px)
- **Columns:** 2 columns
- **Gap:** 24px horizontal, 32px vertical
- **Item width:** Auto (grid)

#### Desktop (> 1024px)
- **Columns:** 3 columns
- **Gap:** 32px horizontal, 40px vertical
- **Item width:** Auto (grid)
- **Max width:** 1280px container (centered)

### Scroll Behavior
- **Smooth scroll:** When ORDER button clicked
- **Scroll offset:** Account for sticky header (70px)
- **Scroll margin:** CSS `scroll-margin-top: 70px` on menu section

---

## 🎬 Smooth Scroll Behavior

### Scroll Implementation Options

#### Option 1: CSS Native (Simplest)
```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 70px; /* Header height */
}

#menu {
  scroll-margin-top: 70px;
}
```

#### Option 2: JavaScript (More Control)
```typescript
const scrollToMenu = (event: React.MouseEvent) => {
  event.preventDefault();
  const menuSection = document.getElementById('menu');
  const header = document.querySelector('header');
  const headerHeight = header?.offsetHeight || 70;
  
  if (menuSection) {
    const offset = menuSection.offsetTop - headerHeight;
    
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  }
};
```

#### Option 3: Framer Motion (Animated)
```typescript
import { useScroll, useMotionValueEvent } from 'framer-motion';

const scrollToMenu = () => {
  const menuSection = document.getElementById('menu');
  const headerHeight = 70;
  
  if (menuSection) {
    const offset = menuSection.offsetTop - headerHeight;
    window.scroll({
      top: offset,
      behavior: 'smooth'
    });
  }
};
```

**Recommendation:** Start with CSS native (simplest, fastest), enhance with JavaScript if needed.

---

## 📱 Mobile Optimizations

### Hero Section (Mobile)
- **Full viewport:** Uses 100vh (account for browser chrome)
- **Content padding:** 24px sides, 40px top/bottom
- **Button size:** 64px height, full width minus padding
- **Text sizes:** Optimized for mobile readability

### Menu Section (Mobile)
- **Single column:** Full width items
- **Touch targets:** All buttons ≥ 44px
- **Scroll performance:** Hardware acceleration for smooth scrolling
- **Lazy loading:** Menu items load as they come into view

### Scroll Performance (Mobile)
- **Use transform:** For any scroll-triggered animations
- **Reduce motion:** Respect `prefers-reduced-motion`
- **Debounce scroll:** For scroll event handlers

---

## ⚡ Performance Considerations

### Hero Section Performance
1. **Critical render path:**
   - Hero content loads first (above fold)
   - Floating wings animate after initial render
   - Stars fade in progressively

2. **Animation optimization:**
   - Use `transform` and `opacity` only
   - `will-change: transform` on animated elements
   - Limit number of animated wings (4-6 max)

3. **Image loading:**
   - No images in hero (vector graphics or CSS)
   - If background image: WebP, lazy load, low quality placeholder

### Menu Section Performance
1. **Lazy loading:**
   - Menu items load as they enter viewport
   - Images lazy load with Intersection Observer

2. **Virtual scrolling (if needed):**
   - For very large menus (100+ items)
   - Only render visible items

3. **Grid layout:**
   - CSS Grid (better performance than flexbox for large grids)
   - Hardware accelerated

---

## 🎯 User Flow (Updated)

### Landing Flow
```
1. User lands on page
   ↓
2. Sees Hero section (full viewport)
   ↓
3. Reads title, description, hours
   ↓
4. Sees floating wings animation
   ↓
5. Sees prominent ORDER button
   ↓
6. Clicks ORDER button
   ↓
7. Smooth scrolls to Menu section (same page)
   ↓
8. Can immediately see menu items
   ↓
9. Starts adding items to cart
```

### Navigation Flow
```
1. User scrolls down naturally
   ↓
2. Menu section appears
   ↓
3. Or clicks navigation link
   ↓
4. Smooth scrolls to menu section
```

---

## 🔧 Implementation Checklist

### Hero Section
- [ ] Full viewport height on mobile
- [ ] Floating wings background animation
- [ ] Star field background animation
- [ ] Centered content layout
- [ ] Title with correct typography
- [ ] Subtitle/description text
- [ ] Hours and location display
- [ ] BIG ORDER button (64px+ height)
- [ ] Smooth scroll to menu on button click
- [ ] Button pulse/glow animation
- [ ] Mobile-responsive text sizes

### Menu Section
- [ ] Section ID: `id="menu"`
- [ ] Section header with title and underline
- [ ] Responsive grid layout (1/2/3 columns)
- [ ] Smooth scroll offset for sticky header
- [ ] Lazy loading for menu items
- [ ] Touch-friendly item cards

### Smooth Scroll
- [ ] CSS `scroll-behavior: smooth` enabled
- [ ] Scroll offset accounts for sticky header
- [ ] Works on all browsers (fallback for Safari)
- [ ] No page reload or navigation
- [ ] Smooth animation (60fps)

### Performance
- [ ] Hero renders immediately
- [ ] Animations don't block rendering
- [ ] Menu items lazy load
- [ ] Smooth scroll is performant
- [ ] No layout shifts (CLS)

---

## 📐 Component Structure (Updated)

```typescript
// App.tsx
<>
  <Header />
  <HeroSection onOrderClick={scrollToMenu} />
  <MenuSection id="menu" />
  <CartPanel />
  <CheckoutModal /> {/* Opens as modal/overlay */}
  <Footer />
</>

// HeroSection.tsx
<section className="hero-section">
  <StarField />
  <FloatingWings />
  <div className="hero-content">
    <h1 className="hero-title">NIGHT WING</h1>
    <p className="hero-description">...</p>
    <div className="hero-info">...</div>
    <OrderButton onClick={scrollToMenu}>
      הזמן
    </OrderButton>
  </div>
</section>

// MenuSection.tsx
<section id="menu" className="menu-section">
  <h2 className="section-title">תפריט</h2>
  <div className="menu-grid">
    {menuItems.map(item => (
      <MenuItemCard key={item.id} item={item} />
    ))}
  </div>
</section>
```

---

## 🎨 Visual Examples

### Hero Section Layout
```
┌─────────────────────────────────────┐
│                                     │
│           ⭐  🍗  ⭐                │
│      🍗           ⭐                │
│   ⭐      🍗          ⭐            │
│                                     │
│         NIGHT WING                  │
│   הכנפיים החמות והטעימות ביותר     │
│                                     │
│   21:00-2:00 • Paar 29 Pardes      │
│                                     │
│    ┌─────────────────────┐         │
│    │      הזמן          │         │
│    │   (BIG BUTTON)     │         │
│    └─────────────────────┘         │
│                                     │
└─────────────────────────────────────┘
```

### Scroll Behavior
```
[User clicks ORDER]
  ↓
Smooth scroll animation (500-800ms)
  ↓
Menu section slides into view
  ↓
Stops with header offset (70px from top)
```

---

## 🚀 Quick Implementation Steps

1. **Create Hero Section Component**
   - Full viewport height
   - Centered content
   - Floating wings and stars

2. **Create Menu Section Component**
   - ID: `menu`
   - Responsive grid
   - Section header

3. **Implement Smooth Scroll**
   - Add `scroll-behavior: smooth` to CSS
   - Create `scrollToMenu` function
   - Attach to ORDER button

4. **Test Scroll Behavior**
   - Verify smooth animation
   - Check header offset
   - Test on mobile devices

5. **Optimize Performance**
   - Lazy load menu items
   - Optimize animations
   - Test loading speed

---

**Document Version:** 1.0  
**Layout Type:** Single Page with Smooth Scroll  
**Status:** Specification Complete

