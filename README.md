# Night Wing PH - Website Project

> Hot deep fried wings restaurant website with modern, youth-focused design and ordering functionality.

## 📋 Project Overview

This is a comprehensive plan and implementation guide for the Night Wing PH website - a vibrant, modern online ordering platform designed to appeal to younger generations. The site features floating animations, dark theme aesthetics, and a seamless ordering experience.

### Key Features
- 🎨 **Modern Design:** Dark theme with neon accents matching menu aesthetics
- 🍗 **Floating Animations:** Animated chicken wings and star field effects
- 🛒 **Shopping Cart:** Full cart functionality with smooth animations
- 📝 **Order System:** Multi-step checkout with form validation
- 🌐 **Bilingual:** Hebrew-first with English translation support
- 📱 **Responsive:** Mobile-first, optimized for all devices
- ⚡ **Performance:** Fast loading, optimized images, CDN delivery

---

## 📚 Documentation Index

### Planning Documents
1. **[PROJECT_PLAN.md](./PROJECT_PLAN.md)** - Complete project plan
   - Design system & color palette
   - Tech stack details
   - UI/UX design specifications (Single-page layout)
   - Component architecture
   - Backend integration plan
   - Implementation phases
   - Security & accessibility

2. **[SINGLE_PAGE_LAYOUT.md](./SINGLE_PAGE_LAYOUT.md)** - Single-page layout specification
   - Hero section design (100vh mobile)
   - BIG ORDER button with smooth scroll
   - Menu section on same page
   - Smooth scroll implementation
   - Mobile-first optimizations

3. **[PERFORMANCE_MOBILE_FIRST.md](./PERFORMANCE_MOBILE_FIRST.md)** - Performance & mobile strategy
   - Maximum performance targets
   - Mobile-first design principles
   - Optimization strategies
   - Bundle size targets
   - Runtime performance tips

4. **[COMPONENT_ARCHITECTURE.md](./COMPONENT_ARCHITECTURE.md)** - Component structure
   - Component tree diagram (updated for single-page)
   - Component specifications
   - Styling strategy
   - Data flow diagrams
   - Animation specifications

5. **[TECH_STACK_COMPARISON.md](./TECH_STACK_COMPARISON.md)** - Technology decisions
   - Recommended tech stack
   - Comparison of alternatives
   - Bundle size analysis
   - Performance targets
   - Dependency overview

6. **[USER_FLOW_DETAILED.md](./USER_FLOW_DETAILED.md)** - User journey maps
   - Primary user journeys (updated for single-page)
   - Cart interaction flows
   - Detailed checkout steps
   - Error handling flows
   - Mobile-specific flows
   - Conversion optimization

7. **[QUICK_START.md](./QUICK_START.md)** - Developer setup guide
   - Step-by-step setup
   - Configuration examples
   - Project structure
   - Useful commands
   - Troubleshooting

---

## 🎨 Design System

### Color Palette
- **Background:** `#23262d` (Dark charcoal grey)
- **Background Shades:** `#1a1d23`, `#2d3239`, `#3a3f47`
- **Text & Titles:** `#b7fef6` (Light teal)
- **Highlights & Lines:** `#f66dce` (Hot pink)
- **Accent Orange:** `#fa7e61` (Chicken wings)
- **Soft Accent:** `#e3b5a4` (Subtle accents)

### Typography
- **Logo:** Bebas Neue (Bold, condensed)
- **Headings:** Montserrat (Bold, 700)
- **Body:** Inter/Poppins (Regular, 400-600)
- **Hebrew:** Assistant/Noto Sans Hebrew

### Design Principles
- Dark mode first
- Neon aesthetic with glow effects
- Playful & dynamic animations
- Clear visual hierarchy
- Youth-focused, modern appeal

---

## 🛠️ Tech Stack

### Frontend
- **React 18+** with TypeScript
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **Zustand** (state management)
- **React Hook Form + Zod** (forms & validation)
- **TanStack Query** (data fetching)
- **react-i18next** (internationalization)

### Backend
- **n8n** (workflow automation)
- **RESTful APIs** via n8n HTTP nodes
- **Database:** PostgreSQL or SQLite
- **Storage:** Cloudflare R2 (images)

### Hosting
- **Cloudflare Pages** (frontend hosting)
- **Cloudflare CDN** (global distribution)
- **Cloudflare Images** (image optimization)

---

## 🏗️ Project Structure

```
nightwing_ph/
├── docs/                      # Documentation
│   ├── PROJECT_PLAN.md
│   ├── COMPONENT_ARCHITECTURE.md
│   ├── TECH_STACK_COMPARISON.md
│   ├── USER_FLOW_DETAILED.md
│   └── QUICK_START.md
├── src/
│   ├── components/            # React components
│   │   ├── layout/           # Header, Footer
│   │   ├── menu/             # Menu items, sections
│   │   ├── cart/             # Cart panel, items
│   │   ├── checkout/         # Checkout wizard
│   │   ├── hero/             # Hero section, animations
│   │   └── shared/           # Reusable components
│   ├── stores/               # Zustand state stores
│   ├── hooks/                # Custom React hooks
│   ├── utils/                # Utility functions
│   ├── types/                # TypeScript types
│   ├── locales/              # i18n translations
│   └── styles/               # Global styles
├── public/                   # Static assets
│   └── images/               # Menu item images
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Setup Steps

1. **Clone/Initialize Project**
   ```bash
   git clone <repository-url>
   cd nightwing_ph
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit: `http://localhost:5173`

4. **See [QUICK_START.md](./QUICK_START.md)** for detailed setup instructions

---

## 📊 Implementation Phases

### Phase 1: Foundation (Week 1)
- Project setup
- Tailwind configuration
- Basic layout components
- i18n setup
- Routing

### Phase 2: Core UI (Week 2)
- Hero section
- Floating wings animation
- Menu section
- Menu item cards

### Phase 3: Cart & State (Week 3)
- Cart store (Zustand)
- Cart panel component
- Add to cart functionality
- Quantity controls

### Phase 4: Checkout Flow (Week 4)
- Multi-step checkout wizard
- Customer info form
- Form validation
- RTL support

### Phase 5: Backend Integration (Week 5)
- n8n workflow setup
- API endpoints
- Order submission
- Error handling

### Phase 6: Polish & Animations (Week 6)
- Advanced animations
- Hover effects
- Page transitions
- Loading states

### Phase 7: Testing & Optimization (Week 7)
- Unit tests
- E2E tests
- Performance optimization
- Image optimization

### Phase 8: Launch Preparation (Week 8)
- Final QA
- Accessibility audit
- SEO optimization
- Production deployment

---

## 🎯 Key User Flows

### Single-Page Order Flow
1. **Landing** → Hero section with title, description, hours (full viewport on mobile)
2. **Click ORDER Button** → Smooth scrolls down to menu section (same page, no reload)
3. **Browse Menu** → Menu items visible immediately after scroll
4. **Add Items** → Click "Add to Cart" on menu items
5. **View Cart** → Cart panel opens (slide-out, overlay)
6. **Checkout** → Checkout modal/overlay (no page navigation)
7. **Payment** → Fill form, submit order
8. **Confirmation** → Success screen with order number

### Key Features
- **Single Page:** No page navigation, smooth scrolling
- **Big ORDER Button:** Prominent CTA in hero section, scrolls to menu
- **Mobile-First:** Optimized for phone, enhanced for desktop
- **Fast Loading:** Maximum performance, minimal load time

### Detailed flows: See [USER_FLOW_DETAILED.md](./USER_FLOW_DETAILED.md)  
### Layout details: See [SINGLE_PAGE_LAYOUT.md](./SINGLE_PAGE_LAYOUT.md)

---

## 🧩 Core Components

### Layout (Single Page)
- `Header` - Sticky navigation, logo, cart icon (anchor links for sections)
- `HeroSection` - Full viewport hero with floating wings, title, BIG ORDER button
- `MenuSection` - Menu grid on same page (scroll target for ORDER button)
- `Footer` - Contact info, disclaimer

### Menu
- `MenuSection` - Category container
- `MenuItemCard` - Individual menu item
- `MenuItemImage` - Optimized image with lazy loading

### Cart
- `CartPanel` - Slide-out cart drawer
- `CartItem` - Cart item with quantity controls
- `CartSummary` - Totals calculation

### Checkout
- `CheckoutWizard` - Multi-step form container
- `CustomerInfoForm` - Customer details form
- `OrderSummary` - Final order review
- `OrderConfirmation` - Success screen

### Animations
- `FloatingWings` - Animated chicken wings
- `StarField` - Twinkling stars background

**Full specifications: See [COMPONENT_ARCHITECTURE.md](./COMPONENT_ARCHITECTURE.md)**

---

## 🌐 Internationalization

- **Primary Language:** Hebrew (עברית)
- **Secondary Language:** English
- **RTL Support:** Full Hebrew RTL support
- **Language Switcher:** Header toggle
- **Translation Files:** JSON files in `src/locales/`

---

## 🔌 Backend Integration (n8n)

### API Endpoints

#### Menu
- `GET /api/menu` - Fetch all menu items
- `GET /api/menu/:id` - Get single menu item

#### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `GET /api/orders/:id/status` - Check order status

### n8n Workflow Example
```
HTTP Trigger → Validate → Store in DB → Send Email → Return Response
```

**See [PROJECT_PLAN.md](./PROJECT_PLAN.md)** for detailed backend architecture

---

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

### Mobile Optimizations
- Touch-friendly buttons (44x44px minimum)
- Bottom-fixed cart bar
- Hamburger menu navigation
- Optimized image sizes

---

## ⚡ Performance Targets

### Lighthouse Scores (Target)
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 90+

### Key Metrics
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s

---

## 🔒 Security & Accessibility

### Security
- Input validation (client & server)
- XSS prevention (React escaping)
- HTTPS only
- Secure environment variables

### Accessibility (WCAG 2.1 AA)
- Keyboard navigation
- Screen reader support
- ARIA labels
- Color contrast compliance
- Focus indicators

---

## 📦 Deployment

### Cloudflare Pages
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Configure environment variables
5. Deploy automatically on push

### n8n Backend
- Deploy n8n instance (Docker, Railway, etc.)
- Configure workflows
- Set up database
- Configure API endpoints

---

## 📝 Development Guidelines

### Code Style
- TypeScript for type safety
- ESLint + Prettier for formatting
- Component-based architecture
- Reusable components
- Custom hooks for logic

### Git Workflow
- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- Conventional commits

---

## 🧪 Testing Strategy

- **Unit Tests:** Vitest + React Testing Library
- **E2E Tests:** Playwright
- **Visual Regression:** Optional (Percy/Chromatic)

---

## 📊 Analytics & Monitoring

### Metrics to Track
- Conversion rate (visitors → orders)
- Cart abandonment rate
- Average order value
- Time to order
- Popular menu items

### Tools
- Cloudflare Analytics
- Google Analytics (optional)
- Error tracking (Sentry, optional)

---

## 🔮 Future Enhancements

- User accounts & order history
- Favorites system
- Loyalty program
- Live order tracking
- Push notifications
- PWA (installable app)
- Social sharing
- Reviews & ratings

---

## 📞 Contact Information

**Night Wing PH**
- **Phone:** 058-6230849
- **Hours:** 21:00-2:00 (9 PM - 2 AM)
- **Location:** Paar 29 Pardes Hanna
- **Delivery:** Available (₪20 fee)
- **Pickup:** Available

---

## 📖 Additional Resources

- **[PROJECT_PLAN.md](./PROJECT_PLAN.md)** - Complete project plan
- **[SINGLE_PAGE_LAYOUT.md](./SINGLE_PAGE_LAYOUT.md)** - Single-page layout specification ⭐ NEW
- **[PERFORMANCE_MOBILE_FIRST.md](./PERFORMANCE_MOBILE_FIRST.md)** - Performance & mobile strategy ⭐ NEW
- **[COMPONENT_ARCHITECTURE.md](./COMPONENT_ARCHITECTURE.md)** - Component details
- **[TECH_STACK_COMPARISON.md](./TECH_STACK_COMPARISON.md)** - Technology decisions
- **[USER_FLOW_DETAILED.md](./USER_FLOW_DETAILED.md)** - User journey maps
- **[QUICK_START.md](./QUICK_START.md)** - Developer setup guide

---

## ✅ Pre-Launch Checklist

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
- [ ] Error handling in place

### Content
- [ ] All menu items translated
- [ ] Contact information correct
- [ ] Pricing is accurate
- [ ] Hebrew text is correct
- [ ] English translations accurate

### Technical
- [ ] All tests pass
- [ ] Performance optimized
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

## 📄 License

[Specify license if applicable]

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Status:** Planning Phase Complete - Ready for Implementation

---

## 🚀 Getting Started

Ready to start development? Check out **[QUICK_START.md](./QUICK_START.md)** for step-by-step setup instructions!

---

*For questions or clarifications, refer to the detailed documentation files linked above.*

