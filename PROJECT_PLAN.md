# Night Wing PH - Detailed Project Plan

## 📋 Project Overview

**Client:** Night Wing PH  
**Product:** Hot deep fried wings restaurant  
**Target Audience:** Younger generations (Gen Z, Millennials)  
**Primary Language:** Hebrew (with English translation support)  
**Tech Stack:** React (Frontend), n8n (Backend), Cloudflare (Hosting)

---

## 🎨 Design System & Color Palette

### Color Palette
- **Background Primary:** `#23262d` (Dark charcoal grey)
- **Background Shades:** 
  - `#1a1d23` (Darker shade for cards/containers)
  - `#2d3239` (Lighter shade for hover states)
  - `#3a3f47` (Light accent background)
- **Text & Titles:** `#b7fef6` (Light teal/mint green)
- **Highlights & Lines:** `#f66dce` (Hot pink/magenta)
- **Accent Orange:** `#fa7e61` (Bright orange for chicken wings)
- **Soft Accent:** `#e3b5a4` (Light peach/pink for subtle accents)

### Typography
- **Logo:** Bold, condensed sans-serif (e.g., Montserrat Black, Bebas Neue)
- **Headings:** Bold sans-serif (Montserrat Bold, 700 weight)
- **Body Text:** Clean sans-serif (Inter, Poppins, or system fonts)
- **Hebrew Support:** Ensure fonts support Hebrew characters (Noto Sans Hebrew, Assistant)

### Design Principles
- **Dark Mode First:** All UI designed for dark background
- **Neon Aesthetic:** Bright, vibrant colors with subtle glow effects
- **Playful & Dynamic:** Animated elements, floating components
- **Clear Hierarchy:** Bold headings, clear section separation
- **Youth Appeal:** Modern, edgy, slightly rebellious aesthetic
- **Mobile-First:** Design for mobile, enhance for desktop
- **Performance-First:** Maximum speed, minimal loading time
- **Single Page:** Smooth scroll navigation, no page reloads

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18+ with TypeScript
- **Build Tool:** Vite (fast HMR, optimal performance)
- **UI Libraries:**
  - **Framer Motion** (animations, floating wings, page transitions)
  - **React Spring** (alternative for complex animations)
  - **Tailwind CSS** (utility-first styling with custom color palette)
  - **Headless UI** or **Radix UI** (accessible components)
  - **React Hook Form** (form handling)
  - **Zod** (form validation)
- **State Management:**
  - **Zustand** (lightweight, perfect for cart, order state)
  - **React Query/TanStack Query** (API data fetching, caching)
- **Internationalization:**
  - **react-i18next** (i18n with Hebrew as primary)
  - **i18next** (translation management)
- **Image Handling:**
  - **Next Image** (optimized images) OR
  - **Cloudflare Images** (CDN integration)
  - **Lazy loading** with Intersection Observer

### Backend (n8n)
- **Workflow Engine:** n8n (no-code/low-code automation)
- **API Endpoints:** RESTful APIs via n8n HTTP Request nodes
- **Database:** 
  - SQLite (simple) OR
  - PostgreSQL (Cloudflare D1 or external)
  - Supabase (alternative with real-time)
- **Order Management:** n8n workflows for:
  - Order creation
  - Inventory tracking
  - Email/SMS notifications
  - Order status updates
- **Payment Integration:** 
  - Stripe (recommended)
  - PayPal
  - Local payment gateways (Israeli payment solutions)
- **Storage:** Cloudflare R2 (menu images, assets)

### Hosting & Infrastructure
- **Hosting:** Cloudflare Pages (static React app)
- **CDN:** Cloudflare (global edge network)
- **Domain & SSL:** Cloudflare (automatic SSL)
- **Environment:** Node.js 18+ (for n8n)

---

## 📱 UI/UX Design Plan

### Layout Structure - Single Page Application

**Key Design Decision:** Single-page layout with Hero section at top and Menu section below on the same page. Smooth scroll navigation between sections.

#### 1. Header/Navigation
- **Fixed/Sticky Header:**
  - Logo: "NIGHT WING" (NIGHT in `#b7fef6`, WING in `#f66dce` with outline)
  - Navigation links (Hebrew): כנפיים, רטבים, סלטים, משקאות, הוסף (anchor links that scroll to sections)
  - Cart icon with badge (showing item count)
  - Language switcher (עברית / English)
  - Mobile menu toggle (hamburger icon)
- **Behavior:** Header scrolls with page, becomes sticky/fixed on scroll down

#### 2. Hero/Landing Section (First Section - Above Fold)
- **Full Viewport Height:** Takes 100vh on mobile, 80vh on desktop
- **Animated Background:**
  - Floating chicken wings (orange `#fa7e61`) with rotation/path animations
  - Twinkling stars (white, 4-pointed)
  - Subtle parallax effect
- **Content (Centered):**
  - Large, bold title: "NIGHT WING" or tagline in Hebrew
  - Subtitle/description text (Hebrew): Brief appetizing description
  - Operating hours display: "21:00-2:00" (smaller, below title)
  - Location: "Paar 29 Pardes Hanna" (small, subtle)
  - **PRIMARY CTA: Big "הזמן" (ORDER) Button:**
    - Large size: 60px+ height on mobile, 80px on desktop
    - Prominent: Hot pink background (`#f66dce`) with glow effect
    - Bold text: Large font size (32px+ on mobile, 48px on desktop)
    - Smooth scroll behavior: Scrolls to menu section (same page)
    - No page navigation: Uses anchor link with smooth scroll
    - Animation: Pulse/glow animation to draw attention
- **Scroll Indicator:** Optional subtle down arrow animation

#### 3. Menu Section (Same Page, Below Hero)
- **Section Anchor:** `id="menu"` for smooth scroll targeting
- **Layout:** Grid or Masonry layout for menu items
- **Section Header:**
  - "תפריט" (Menu) title in Hebrew
  - Hot pink underline accent
- **Menu Item Card:**
  - Product image (lazy-loaded, hover zoom effect)
  - Item name (Hebrew + English)
  - Description (light teal text)
  - Price (prominent, right-aligned)
  - Add to cart button (hot pink with hover glow)
  - Spice indicator (chili icon for spicy items)
  - Animation: Card lifts on hover with shadow glow

#### 4. Cart/Order Panel
- **Slide-out Panel (Mobile/Desktop):**
  - Triggered by cart icon
  - Dark background with teal border
  - Cart items list with:
    - Item image thumbnail
    - Name and quantity controls
    - Price per item
    - Remove button
  - Subtotal, delivery fee, total
  - CTA: "השלם הזמנה" (Complete Order)
  - Empty cart state with animation

#### 5. Checkout Flow
- **Step 1: Cart Review**
  - Cart summary
  - Continue button

- **Step 2: Customer Information**
  - Form fields (Hebrew labels, RTL support):
    - Name (שם מלא)
    - Phone (טלפון)
    - Email (optional)
    - Address (כתובת)
    - Delivery/Pickup toggle
    - Special instructions (הערות)
  - Validation with error messages
  - Back/Continue buttons

- **Step 3: Order Summary & Payment**
  - Final order review
  - Payment method selection
  - Terms & conditions checkbox
  - Submit order button (disabled until valid)

- **Step 4: Confirmation**
  - Success animation
  - Order number
  - Estimated time
  - Contact information
  - Return to menu button

#### 6. Footer
- **Contact Information:**
  - Phone: 058-6230849 (clickable)
  - Hours: 21:00-2:00
  - Location: Paar 29 Pardes Hanna
  - Disclaimer: Pickup available, delivery cost ₪20
- **Social Media Links** (if applicable)
- **Language Switcher**

---

## 🎬 Animation & Interactive Elements

### Floating Chicken Wings
- **Implementation:** Framer Motion
- **Behavior:**
  - Random initial positions
  - Floating animation paths (sine wave, circular)
  - Rotation on float
  - Parallax effect on scroll
  - Random speeds (2-5 seconds per cycle)
  - Pause on hover (if interactable)

### Star Field Effect
- **Static stars:** CSS with `::before`/`::after` pseudo-elements
- **Animated stars:** Small twinkling animation
- **Parallax layers:** Multiple layers with different scroll speeds

### Component Animations
- **Page Transitions:** Fade + slide animations
- **Menu Item Hover:**
  - Scale up (1.05x)
  - Shadow glow (hot pink)
  - Image zoom effect
- **Button Interactions:**
  - Ripple effect on click
  - Glow pulse on hover
  - Disabled state with reduced opacity
- **Cart Panel:**
  - Slide in from right (Hebrew RTL: from left)
  - Backdrop blur
  - Item add animation (bounce + fade)
- **Form Fields:**
  - Focus state: border glow (hot pink)
  - Error shake animation
  - Success checkmark animation

### Loading States
- **Skeleton Screens:** For menu items loading
- **Spinner:** Custom animated chicken wing icon
- **Progress Indicators:** For order submission

---

## 🌐 Internationalization (i18n) Strategy

### Structure
```
/locales
  /he
    translation.json (default)
  /en
    translation.json
```

### Key Translation Keys
- Navigation items
- Menu items (names, descriptions)
- Cart labels
- Form fields
- Buttons
- Error messages
- Success messages
- Footer content

### Implementation
- **RTL Support:** CSS `dir="rtl"` for Hebrew
- **Language Detection:** Browser language + localStorage preference
- **Language Switcher:** Persistent toggle in header

---

## 📊 User Flow Diagrams

### Main User Flow
```
Landing Page
  ↓
Browse Menu
  ↓
Add Items to Cart
  ↓
View Cart
  ↓
Proceed to Checkout
  ↓
Fill Customer Info
  ↓
Review Order
  ↓
Submit Payment
  ↓
Order Confirmation
```

### Cart Interaction Flow
```
View Menu Item
  ↓
Click "Add to Cart"
  ↓
Cart Badge Updates
  ↓
Cart Panel Opens (optional)
  ↓
Continue Shopping / View Cart
  ↓
Modify Quantity / Remove Items
  ↓
Proceed to Checkout
```

---

## 🏗️ Component Architecture

### Core Components

#### 1. Layout Components
- `Header` - Navigation, logo, cart icon
- `Footer` - Contact info, disclaimer
- `LanguageSwitcher` - עברית/English toggle
- `MobileMenu` - Hamburger menu for mobile

#### 2. Hero Section
- `Hero` - Landing section with tagline
- `FloatingWings` - Animated chicken wing graphics
- `StarField` - Background star effect
- `CTAButton` - Primary action button

#### 3. Menu Components
- `MenuSection` - Container for menu categories
- `MenuItemCard` - Individual menu item display
- `MenuItemImage` - Optimized image with lazy loading
- `PriceDisplay` - Formatted price with currency
- `SpiceIndicator` - Chili icon for spicy items
- `AddToCartButton` - Add item to cart with animation

#### 4. Cart Components
- `CartPanel` - Slide-out cart drawer
- `CartItem` - Individual cart item row
- `QuantityControl` - +/- buttons for quantity
- `CartSummary` - Totals calculation
- `EmptyCart` - Empty state message

#### 5. Checkout Components
- `CheckoutWizard` - Multi-step form container
- `StepIndicator` - Progress bar
- `CustomerInfoForm` - Customer details form
- `OrderSummary` - Final order review
- `PaymentForm` - Payment method selection
- `OrderConfirmation` - Success screen

#### 6. Shared Components
- `Button` - Reusable button with variants
- `Input` - Form input with validation
- `Modal` - Dialog/modal component
- `LoadingSpinner` - Loading indicator
- `Toast` - Notification messages

---

## 🗄️ State Management Structure

### Zustand Stores

#### `useCartStore`
```typescript
{
  items: CartItem[],
  addItem: (item) => void,
  removeItem: (id) => void,
  updateQuantity: (id, quantity) => void,
  clearCart: () => void,
  getTotal: () => number,
  getItemCount: () => number
}
```

#### `useOrderStore`
```typescript
{
  customerInfo: CustomerInfo,
  orderItems: OrderItem[],
  deliveryType: 'pickup' | 'delivery',
  specialInstructions: string,
  setCustomerInfo: (info) => void,
  submitOrder: () => Promise<OrderResponse>,
  orderStatus: 'idle' | 'loading' | 'success' | 'error'
}
```

#### `useMenuStore`
```typescript
{
  menuItems: MenuItem[],
  categories: Category[],
  loading: boolean,
  fetchMenu: () => Promise<void>,
  getItemsByCategory: (category) => MenuItem[]
}
```

---

## 🔌 Backend Integration (n8n)

### API Endpoints Structure

#### Menu API
- `GET /api/menu` - Fetch all menu items
- `GET /api/menu/:id` - Get single menu item

#### Order API
- `POST /api/orders` - Create new order
  - Request: `{ customerInfo, items, deliveryType, total }`
  - Response: `{ orderId, estimatedTime, status }`
- `GET /api/orders/:id` - Get order status
- `GET /api/orders/:id/status` - Check order status

#### Configuration API
- `GET /api/config` - Get site configuration (hours, location, etc.)

### n8n Workflow Design

#### Order Processing Workflow
```
1. HTTP Trigger (POST /api/orders)
2. Validate Order Data
3. Calculate Total (with delivery fee if needed)
4. Create Order Record (Database)
5. Send Confirmation Email/SMS
6. Notify Kitchen (if integration exists)
7. Return Order Response
```

#### Order Status Workflow
```
1. HTTP Trigger (GET /api/orders/:id/status)
2. Query Database
3. Return Status JSON
```

### Database Schema (Example)

#### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  customer_name VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  address TEXT,
  delivery_type VARCHAR(10), -- 'pickup' | 'delivery'
  items JSONB,
  total DECIMAL(10,2),
  status VARCHAR(20), -- 'pending', 'confirmed', 'preparing', 'ready', 'completed'
  special_instructions TEXT,
  created_at TIMESTAMP,
  estimated_ready_time TIMESTAMP
);
```

#### Menu Items Table
```sql
CREATE TABLE menu_items (
  id UUID PRIMARY KEY,
  name_he VARCHAR(255),
  name_en VARCHAR(255),
  description_he TEXT,
  description_en TEXT,
  price DECIMAL(10,2),
  category VARCHAR(50),
  image_url VARCHAR(255),
  is_available BOOLEAN,
  spice_level INTEGER -- 0-5
);
```

---

## 📱 Responsive Design Strategy

### Breakpoints
- **Mobile:** < 640px (single column, full-width cards)
- **Tablet:** 640px - 1024px (2-column grid)
- **Desktop:** > 1024px (3-4 column grid, side cart)
- **Large Desktop:** > 1280px (max-width container)

### Mobile Optimizations
- **Touch Targets:** Minimum 44x44px
- **Simplified Navigation:** Hamburger menu
- **Bottom Cart Bar:** Fixed bottom bar with cart summary
- **Large Buttons:** Easy-to-tap CTA buttons
- **Optimized Images:** Smaller image sizes for mobile

### Tablet Optimizations
- **Side-by-side Layout:** Cart panel + menu grid
- **Larger Images:** Medium resolution images
- **Touch-friendly:** Maintained touch targets

---

## 🎯 Performance Optimizations

### Image Optimization
- **Format:** WebP with fallback to JPEG/PNG
- **Lazy Loading:** Intersection Observer API
- **Responsive Images:** `srcset` for different screen sizes
- **CDN:** Cloudflare Images or Cloudflare R2

### Code Splitting
- **Route-based:** React.lazy() for routes
- **Component-based:** Lazy load heavy components
- **Chunk Optimization:** Vite code splitting

### Caching Strategy
- **Static Assets:** Long-term caching (1 year)
- **API Responses:** React Query caching (5 minutes)
- **Service Worker:** Offline support (PWA optional)

### Bundle Size
- **Tree Shaking:** Remove unused code
- **Minification:** Production builds
- **Compression:** Gzip/Brotli via Cloudflare

---

## ♿ Accessibility (a11y)

### Requirements
- **WCAG 2.1 AA Compliance**
- **Keyboard Navigation:** Full keyboard support
- **Screen Readers:** ARIA labels, semantic HTML
- **Color Contrast:** Ensure text meets contrast ratios
- **Focus Indicators:** Visible focus states
- **Alt Text:** All images have descriptive alt text
- **RTL Support:** Proper Hebrew text direction

### Implementation
- Use semantic HTML (`<nav>`, `<main>`, `<article>`)
- ARIA labels for icons and buttons
- Skip to main content link
- Proper heading hierarchy

---

## 🧪 Testing Strategy

### Unit Tests
- **Framework:** Vitest
- **Components:** React Testing Library
- **Coverage:** > 70% target

### Integration Tests
- **E2E:** Playwright
- **User Flows:** Cart, checkout, order submission
- **Cross-browser:** Chrome, Firefox, Safari, Edge

### Visual Regression
- **Tool:** Percy or Chromatic (optional)

---

## 📦 Development Workflow

### Project Structure
```
nightwing_ph/
├── public/
│   ├── images/
│   │   ├── menu/
│   │   └── wings/
│   └── locales/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── menu/
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── shared/
│   ├── stores/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

### Git Workflow
- **Main Branch:** Production-ready code
- **Develop Branch:** Development work
- **Feature Branches:** `feature/component-name`
- **Commits:** Conventional commits

### Environment Variables
```
VITE_API_BASE_URL=https://your-n8n-instance.com
VITE_SITE_NAME=Night Wing PH
VITE_PHONE=058-6230849
VITE_LOCATION=Paar 29 Pardes Hanna
```

---

## 🚀 Deployment Plan

### Cloudflare Pages Setup
1. **Connect Repository:** GitHub/GitLab integration
2. **Build Settings:**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: 18.x
3. **Environment Variables:** Add in Cloudflare dashboard
4. **Custom Domain:** Configure DNS
5. **Preview Deployments:** Automatic for PRs

### n8n Deployment
- **Self-hosted:** Docker container
- **Cloudflare Workers:** For lightweight endpoints (if needed)
- **External Hosting:** Railway, Render, or DigitalOcean

### CI/CD Pipeline
1. **Push to branch** → Trigger build
2. **Run tests** → Fail build if tests fail
3. **Build production** → Create optimized bundle
4. **Deploy to Cloudflare Pages** → Automatic
5. **Notify team** → Slack/Discord webhook

---

## 📋 Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Project setup (Vite + React + TypeScript)
- [ ] Tailwind CSS configuration with custom colors
- [ ] Basic layout components (Header, Footer)
- [ ] i18n setup (Hebrew + English)
- [ ] Routing setup
- [ ] Basic styling and color palette

### Phase 2: Core UI (Week 2)
- [ ] Hero section with animations
- [ ] Floating wings component
- [ ] Star field background
- [ ] Menu section layout
- [ ] Menu item cards
- [ ] Image optimization setup

### Phase 3: Cart & State (Week 3)
- [ ] Zustand cart store
- [ ] Cart panel component
- [ ] Add to cart functionality
- [ ] Quantity controls
- [ ] Cart summary calculations
- [ ] LocalStorage persistence

### Phase 4: Checkout Flow (Week 4)
- [ ] Multi-step checkout wizard
- [ ] Customer info form with validation
- [ ] Order summary component
- [ ] Form error handling
- [ ] RTL support for forms

### Phase 5: Backend Integration (Week 5)
- [ ] n8n workflow setup
- [ ] API endpoints configuration
- [ ] Order submission integration
- [ ] Error handling
- [ ] Loading states

### Phase 6: Polish & Animations (Week 6)
- [ ] Advanced animations (Framer Motion)
- [ ] Hover effects
- [ ] Page transitions
- [ ] Loading states
- [ ] Success animations

### Phase 7: Testing & Optimization (Week 7)
- [ ] Unit tests
- [ ] E2E tests
- [ ] Performance optimization
- [ ] Image optimization
- [ ] Mobile testing

### Phase 8: Launch Preparation (Week 8)
- [ ] Final QA
- [ ] Accessibility audit
- [ ] SEO optimization
- [ ] Analytics setup
- [ ] Production deployment

---

## 🎨 UI Component Specifications

### Button Variants
- **Primary:** Hot pink (`#f66dce`) background, white text, glow effect
- **Secondary:** Transparent with teal (`#b7fef6`) border
- **Ghost:** Text only with hover background
- **Disabled:** Reduced opacity, no interactions

### Input Fields
- **Background:** Dark grey (`#1a1d23`)
- **Border:** Teal (`#b7fef6`) when focused
- **Text:** Light teal (`#b7fef6`)
- **Placeholder:** Grey with reduced opacity
- **Error:** Red border, shake animation

### Card Components
- **Background:** `#1a1d23` with subtle border
- **Hover:** Lift effect with shadow glow
- **Border:** Subtle teal outline on hover

### Modal/Dialog
- **Backdrop:** Dark overlay with blur
- **Content:** Dark background with pink border
- **Close Button:** Top-right, teal color

---

## 🔐 Security Considerations

### Frontend
- **Input Validation:** Client-side validation (Zod)
- **XSS Prevention:** React's built-in escaping
- **CSRF Protection:** Token-based (if needed)

### Backend (n8n)
- **Rate Limiting:** Prevent abuse
- **Input Validation:** Server-side validation
- **HTTPS Only:** Enforce secure connections
- **Environment Variables:** Secure secrets management

---

## 📈 Analytics & Monitoring

### Tools
- **Google Analytics 4** (optional, privacy-conscious)
- **Cloudflare Analytics** (built-in)
- **Error Tracking:** Sentry (optional)
- **Performance:** Web Vitals monitoring

### Metrics to Track
- Page views
- Order completion rate
- Cart abandonment rate
- Most popular menu items
- Mobile vs desktop usage

---

## 🌟 Future Enhancements (Post-MVP)

1. **User Accounts:** Login, order history
2. **Favorites:** Save favorite items
3. **Loyalty Program:** Points/rewards system
4. **Live Order Tracking:** Real-time order status
5. **Push Notifications:** Order updates
6. **PWA:** Installable app
7. **Social Sharing:** Share menu items
8. **Reviews/Ratings:** Customer feedback
9. **Special Offers:** Promotions/discounts
10. **Multi-language Expansion:** More languages

---

## 📞 Contact & Resources

### Client Information
- **Name:** Night Wing PH
- **Phone:** 058-6230849
- **Hours:** 21:00-2:00 (9 PM - 2 AM)
- **Location:** Paar 29 Pardes Hanna
- **Delivery:** Available (₪20 fee)
- **Pickup:** Available

### Design References
- Menu design (provided)
- Color palette (specified)
- Style: Modern, edgy, youthful

---

## ✅ Checklist Before Launch

### Design
- [ ] All colors match specification
- [ ] Typography is consistent
- [ ] Images are optimized
- [ ] Animations are smooth
- [ ] Mobile responsive

### Functionality
- [ ] Cart works correctly
- [ ] Checkout flow is complete
- [ ] Form validation works
- [ ] Order submission works
- [ ] Error handling is in place

### Content
- [ ] All menu items translated
- [ ] Contact information correct
- [ ] Pricing is accurate
- [ ] Hebrew text is correct
- [ ] English translations are accurate

### Technical
- [ ] All tests pass
- [ ] Performance is optimized
- [ ] SEO meta tags set
- [ ] Analytics configured
- [ ] Error tracking set up

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets standards
- [ ] Focus indicators visible
- [ ] RTL support works

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Status:** Planning Phase

