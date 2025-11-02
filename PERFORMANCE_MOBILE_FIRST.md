# Performance & Mobile-First Strategy - Night Wing PH

## 🎯 Performance Goals

### Core Performance Metrics (Target)
- **First Contentful Paint (FCP):** < 1.0s (mobile), < 0.8s (desktop)
- **Largest Contentful Paint (LCP):** < 1.5s (mobile), < 1.2s (desktop)
- **Time to Interactive (TTI):** < 2.5s (mobile), < 2.0s (desktop)
- **Cumulative Layout Shift (CLS):** < 0.05
- **First Input Delay (FID):** < 100ms
- **Total Blocking Time (TBT):** < 200ms

### Lighthouse Scores (Target)
- **Performance:** 95+ (mobile), 98+ (desktop)
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 90+

---

## 📱 Mobile-First Design Philosophy

### Core Principles
1. **Mobile First:** Design and develop for mobile, enhance for desktop
2. **Touch-First:** All interactions optimized for touch
3. **Thumb-Friendly:** Important actions within thumb reach zone
4. **Fast Loading:** Optimize for 3G/4G connections
5. **Minimal Data:** Reduce initial bundle size
6. **Progressive Enhancement:** Core functionality works everywhere

### Mobile Viewport Strategy
- **Viewport Meta:** Properly configured for all devices
- **Safe Areas:** Support for notches and rounded corners
- **Orientation:** Works in portrait and landscape
- **Swipe Gestures:** Native swipe for cart, navigation

---

## 🚀 Performance Optimizations

### 1. Code Splitting & Lazy Loading

#### Route-Based Splitting (if routes exist)
```typescript
// Only checkout is code-split (modal/overlay)
const CheckoutWizard = lazy(() => import('./components/checkout/CheckoutWizard'));
```

#### Component-Based Lazy Loading
```typescript
// Cart panel - only loads when opened
const CartPanel = lazy(() => import('./components/cart/CartPanel'));

// Images - lazy load below fold
import { LazyImage } from './components/shared/LazyImage';
```

#### Critical Path Optimization
- **Above-fold content:** Load immediately (Hero section)
- **Below-fold content:** Lazy load (Menu items, Footer)

### 2. Image Optimization Strategy

#### Image Format Priority
1. **WebP with fallback:** Primary format
2. **AVIF support:** For modern browsers (optional)
3. **JPEG/PNG fallback:** For older browsers

#### Image Sizing
```typescript
// Responsive images with srcset
<img
  srcSet="
    /images/wings-320.webp 320w,
    /images/wings-640.webp 640w,
    /images/wings-1024.webp 1024w,
    /images/wings-1280.webp 1280w
  "
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  src="/images/wings-640.webp"
  loading="lazy"
  alt="Wings"
/>
```

#### Image Optimization Tools
- **Cloudflare Images:** Automatic optimization
- **Vite Image Plugin:** Build-time optimization
- **Lazy Loading:** Intersection Observer API

### 3. Bundle Size Optimization

#### Target Bundle Sizes (Gzipped)
- **Initial Bundle:** < 100KB
- **Total JavaScript:** < 200KB
- **Total CSS:** < 20KB
- **Total Images (initial):** < 300KB

#### Tree Shaking Strategy
```javascript
// Import only what you need
import { motion } from 'framer-motion'; // Not entire library
import { useCartStore } from './stores/useCartStore'; // Not entire store
```

#### Dependency Audit
- **Regular audits:** `npm audit`
- **Bundle analyzer:** `vite-bundle-visualizer`
- **Remove unused:** Dead code elimination

### 4. CSS Optimization

#### Critical CSS Inlining
```html
<!-- Inline critical CSS in <head> -->
<style>
  /* Hero section, header - critical styles */
</style>
```

#### CSS Purging (Tailwind)
```javascript
// tailwind.config.js - aggressive purging
content: [
  "./src/**/*.{js,ts,jsx,tsx}",
],
purge: {
  enabled: process.env.NODE_ENV === 'production',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
}
```

#### CSS Loading Strategy
- **Critical CSS:** Inline in `<head>`
- **Non-critical CSS:** Load asynchronously
- **Font Loading:** `font-display: swap`

### 5. JavaScript Optimization

#### Code Splitting
- **Vendor chunks:** Separate React, Framer Motion
- **Component chunks:** Large components lazy-loaded
- **Route chunks:** If routing exists (only checkout modal)

#### Execution Optimization
- **Defer non-critical JS:** Load after initial render
- **Intersection Observer:** For scroll-triggered animations
- **RequestIdleCallback:** For non-urgent tasks

#### Framework Optimizations
```typescript
// React optimizations
- Use React.memo() for expensive components
- Use useMemo() for expensive calculations
- Use useCallback() for stable function references
- Avoid unnecessary re-renders
```

### 6. Font Loading Strategy

#### Font Display
```css
@font-face {
  font-family: 'Bebas Neue';
  font-display: swap; /* Show fallback immediately */
}
```

#### Preload Critical Fonts
```html
<link rel="preload" href="/fonts/bebas-neue.woff2" as="font" type="font/woff2" crossorigin>
```

#### Font Subsetting
- Only include Hebrew + English characters
- Remove unused glyphs

### 7. Network Optimization

#### Preconnect to External Resources
```html
<link rel="preconnect" href="https://api.nightwingph.com">
<link rel="dns-prefetch" href="https://api.nightwingph.com">
```

#### Resource Hints
```html
<!-- Prefetch for likely next navigation -->
<link rel="prefetch" href="/images/menu-items.webp">
```

#### HTTP/2 & HTTP/3
- **Cloudflare:** Automatic HTTP/3 support
- **Server Push:** If needed (Cloudflare Pages)

### 8. Caching Strategy

#### Static Assets
- **Cache-Control:** `public, max-age=31536000, immutable`
- **Versioned URLs:** `/assets/main-abc123.js`

#### API Responses
- **React Query:** 5-minute cache
- **Service Worker:** Optional offline support

#### LocalStorage
- Cart state persistence
- Language preference
- User settings

---

## 📱 Mobile-Specific Optimizations

### 1. Viewport & Meta Tags
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
<meta name="theme-color" content="#23262d">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

### 2. Touch Optimization

#### Touch Target Sizes
- **Minimum:** 44x44px (iOS guidelines)
- **Recommended:** 48x48px (Android guidelines)
- **Spacing:** 8px minimum between targets

#### Touch Feedback
- **Active states:** Visual feedback on touch
- **Haptic feedback:** Optional (if supported)

### 3. Mobile Navigation

#### Sticky Header
- **Height:** Minimal (60-70px)
- **Scroll behavior:** Hide on scroll down, show on scroll up (optional)
- **Cart icon:** Always visible, right side

#### Bottom Navigation (Mobile)
```typescript
// Fixed bottom bar for mobile
<div className="fixed bottom-0 left-0 right-0 md:hidden">
  <CartSummary /> {/* Quick cart view */}
  <CheckoutButton /> {/* Quick checkout */}
</div>
```

### 4. Mobile Images

#### Srcset Strategy
```typescript
// Smaller images for mobile
const mobileSrc = '/images/menu-item-320.webp';
const tabletSrc = '/images/menu-item-640.webp';
const desktopSrc = '/images/menu-item-1024.webp';
```

#### Lazy Loading Priority
- **Above fold:** Eager load
- **Below fold:** Lazy load
- **Very far below:** Defer loading

### 5. Mobile Animations

#### Performance Considerations
- **Use `transform` and `opacity`:** GPU-accelerated
- **Avoid:** `width`, `height`, `top`, `left` animations
- **Reduce Motion:** Respect `prefers-reduced-motion`

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 6. Mobile Input Optimization

#### Input Types
```html
<!-- Correct input types for mobile keyboards -->
<input type="tel" /> <!-- Numeric keypad -->
<input type="email" /> <!-- Email keyboard -->
<input type="text" /> <!-- Text keyboard -->
```

#### Autocomplete
```html
<input autocomplete="name" />
<input autocomplete="tel" />
<input autocomplete="email" />
<input autocomplete="street-address" />
```

---

## ⚡ Runtime Performance

### 1. Rendering Optimization

#### Virtual Scrolling (if needed)
- For large menu lists
- Only render visible items

#### Memoization
```typescript
// Expensive calculations
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0);
}, [items]);

// Stable callbacks
const handleAddToCart = useCallback((item) => {
  addItem(item);
}, [addItem]);
```

### 2. Animation Performance

#### Use CSS Animations When Possible
```css
/* GPU-accelerated */
.floating {
  transform: translateY(0);
  animation: float 3s ease-in-out infinite;
  will-change: transform;
}
```

#### Framer Motion Optimization
```typescript
// Use layout animations sparingly
<motion.div layout={false}> {/* Disable if not needed */}

// Use transform, not position
animate={{ y: [0, -20, 0] }} // Good
animate={{ top: [0, -20, 0] }} // Bad
```

### 3. State Management Optimization

#### Zustand Selectors
```typescript
// Only subscribe to needed state
const itemCount = useCartStore(state => state.getItemCount());
// Not: const cart = useCartStore(); // Would subscribe to all changes
```

---

## 🔍 Monitoring & Measurement

### Real User Monitoring (RUM)
- **Cloudflare Web Analytics:** Free, privacy-focused
- **Custom metrics:** Track key user interactions

### Performance Budgets
- **Initial Load:** < 2MB total
- **JavaScript:** < 200KB (gzipped)
- **CSS:** < 20KB (gzipped)
- **Images:** < 300KB (initial load)

### Performance Testing
- **Lighthouse CI:** Automated testing
- **WebPageTest:** Regular monitoring
- **Chrome DevTools:** Performance profiling

---

## 📊 Performance Checklist

### Development
- [ ] Code splitting implemented
- [ ] Images optimized (WebP, sizes)
- [ ] Lazy loading for below-fold content
- [ ] Critical CSS inlined
- [ ] Fonts optimized (subset, preload)
- [ ] Tree shaking enabled
- [ ] Bundle size < targets

### Mobile
- [ ] Touch targets ≥ 44x44px
- [ ] Viewport meta configured
- [ ] Mobile images sized correctly
- [ ] Animations use transform/opacity
- [ ] Input types correct
- [ ] Bottom navigation for mobile
- [ ] Swipe gestures supported

### Runtime
- [ ] React.memo() for expensive components
- [ ] useMemo() for calculations
- [ ] useCallback() for handlers
- [ ] Zustand selectors optimized
- [ ] No unnecessary re-renders

### Testing
- [ ] Lighthouse score > 95 (mobile)
- [ ] Lighthouse score > 98 (desktop)
- [ ] Tested on real devices
- [ ] Tested on slow 3G
- [ ] Performance budgets met

---

## 🎯 Mobile-First Component Specifications

### Touch Targets
- **Buttons:** Min 44x44px, recommended 48x48px
- **Input fields:** Min 44px height
- **Links:** Min 44px touch area
- **Spacing:** 8px minimum between targets

### Typography (Mobile)
- **Body text:** 16px minimum (prevents zoom on iOS)
- **Headings:** 24px+ (clear hierarchy)
- **Line height:** 1.5-1.6 (readability)

### Layout (Mobile)
- **Padding:** 16px standard, 24px for sections
- **Margins:** Generous spacing between sections
- **Width:** Full width, no horizontal scroll
- **Scroll:** Smooth, native scrolling

### Interactions (Mobile)
- **Swipe:** Cart panel (swipe to close)
- **Pull to refresh:** Optional
- **Tap feedback:** Immediate visual response
- **Long press:** Menu item options (optional)

---

## 🚀 Quick Wins for Performance

1. **Lazy load images** (saves ~70% initial load)
2. **Code split checkout** (saves ~30KB initial)
3. **Optimize fonts** (saves ~50KB)
4. **Compress images** (saves ~60% file size)
5. **Remove unused CSS** (saves ~10KB)
6. **Use React.memo()** (reduces re-renders by ~40%)
7. **Defer non-critical JS** (improves TTI by ~1s)

---

**Document Version:** 1.0  
**Focus:** Maximum Performance + Mobile-First  
**Status:** Performance Strategy Defined

