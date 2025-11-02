# Component Architecture - Night Wing PH

## 📐 Component Tree Structure

```
App (Single Page - No Routing)
├── Header (Sticky/Fixed)
│   ├── Logo (NIGHT WING)
│   ├── Navigation (Anchor Links - Scroll to Sections)
│   │   ├── NavLink (כנפיים) → scrolls to #menu
│   │   ├── NavLink (רטבים) → scrolls to #sauces
│   │   ├── NavLink (סלטים) → scrolls to #salads
│   │   └── NavLink (משקאות) → scrolls to #drinks
│   ├── CartIcon (with badge)
│   └── LanguageSwitcher
│
├── HeroSection (100vh mobile, 80vh desktop)
│   ├── FloatingWings (background layer)
│   │   └── Wing (x4, animated - floating paths)
│   ├── StarField (background layer)
│   │   └── Star (multiple, twinkling)
│   └── HeroContent (centered, z-index above animations)
│       ├── Title (Large, bold - "NIGHT WING" or tagline)
│       ├── Subtitle/Description (Hebrew text)
│       ├── HoursDisplay ("21:00-2:00")
│       ├── LocationDisplay ("Paar 29 Pardes Hanna")
│       └── OrderButton (BIG, prominent - scrolls to #menu)
│           └── Smooth scroll behavior to menu section
│
├── MenuSection (Same page, id="menu")
│   ├── SectionHeader
│   │   ├── Title (כנפיים / רטבים / etc.)
│   │   └── Underline (pink accent)
│   └── MenuGrid
│       └── MenuItemCard (multiple)
│           ├── MenuItemImage
│           ├── MenuItemInfo
│           │   ├── Name (Hebrew + English)
│           │   ├── Description
│           │   └── PriceDisplay
│           ├── SpiceIndicator (conditional)
│           └── AddToCartButton
│
├── CartPanel (slide-out)
│   ├── CartHeader
│   │   ├── Title
│   │   └── CloseButton
│   ├── CartItemsList
│   │   └── CartItem (multiple)
│   │       ├── ItemImage
│   │       ├── ItemInfo
│   │       │   ├── Name
│   │       │   └── Price
│   │       └── QuantityControl
│   │           ├── DecreaseButton
│   │           ├── QuantityDisplay
│   │           └── IncreaseButton
│   │       └── RemoveButton
│   ├── CartSummary
│   │   ├── Subtotal
│   │   ├── DeliveryFee (conditional)
│   │   └── Total
│   └── CheckoutButton
│
├── CheckoutWizard
│   ├── StepIndicator
│   │   ├── Step 1: Cart Review
│   │   ├── Step 2: Customer Info
│   │   ├── Step 3: Payment
│   │   └── Step 4: Confirmation
│   │
│   ├── StepContent (conditional rendering)
│   │   ├── CartReviewStep
│   │   │   └── OrderSummary
│   │   │
│   │   ├── CustomerInfoStep
│   │   │   └── CustomerInfoForm
│   │   │       ├── Input (Name)
│   │   │       ├── Input (Phone)
│   │   │       ├── Input (Email, optional)
│   │   │       ├── Input (Address)
│   │   │       ├── DeliveryToggle
│   │   │       └── Textarea (Instructions)
│   │   │
│   │   ├── PaymentStep
│   │   │   ├── PaymentMethodSelector
│   │   │   ├── TermsCheckbox
│   │   │   └── SubmitButton
│   │   │
│   │   └── ConfirmationStep
│   │       ├── SuccessAnimation
│   │       ├── OrderNumber
│   │       ├── EstimatedTime
│   │       └── ContactInfo
│   │
│   └── NavigationButtons
│       ├── BackButton
│       └── ContinueButton
│
└── Footer
    ├── ContactInfo
    │   ├── Phone (clickable)
    │   ├── Hours
    │   └── Location
    ├── Disclaimer
    └── SocialLinks (optional)
```

## 🧩 Component Specifications

### Header Component
**Props:**
```typescript
interface HeaderProps {
  cartItemCount: number;
  currentLanguage: 'he' | 'en';
  onLanguageChange: (lang: 'he' | 'en') => void;
  onCartClick: () => void;
}
```

**State:**
- Mobile menu open/closed
- Scroll position (for sticky behavior)

**Behaviors:**
- Sticky positioning on scroll
- Mobile hamburger menu
- Cart badge updates dynamically

---

### FloatingWings Component
**Props:**
```typescript
interface FloatingWingsProps {
  count?: number; // default 4
  speed?: number; // animation speed multiplier
  color?: string; // default #fa7e61
}
```

**Animation Properties:**
- Random initial positions
- Floating path (sine wave, circular)
- Rotation animation
- Parallax scroll effect
- Random duration (2-5s per cycle)

**Implementation:**
```typescript
// Framer Motion example
const wingVariants = {
  float: {
    y: [0, -30, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}
```

---

### MenuItemCard Component
**Props:**
```typescript
interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

interface MenuItem {
  id: string;
  nameHe: string;
  nameEn: string;
  descriptionHe: string;
  descriptionEn: string;
  price: number;
  imageUrl: string;
  category: string;
  spiceLevel?: number; // 0-5
  isAvailable: boolean;
}
```

**Hover Effects:**
- Scale: 1.0 → 1.05
- Shadow: Glow effect (hot pink)
- Image: Zoom in slightly
- Transition: 0.3s ease

---

### CartPanel Component
**Props:**
```typescript
interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}
```

**Animations:**
- Slide in from right (LTR) or left (RTL)
- Backdrop blur
- Item add: Bounce + fade
- Item remove: Shrink + fade

---

### CustomerInfoForm Component
**Props:**
```typescript
interface CustomerInfoFormProps {
  initialData?: Partial<CustomerInfo>;
  onSubmit: (data: CustomerInfo) => void;
  deliveryType: 'pickup' | 'delivery';
  onDeliveryTypeChange: (type: 'pickup' | 'delivery') => void;
}

interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address: string;
  deliveryType: 'pickup' | 'delivery';
  specialInstructions?: string;
}
```

**Validation:**
- Name: Required, min 2 characters
- Phone: Required, Israeli format validation
- Email: Optional, format validation if provided
- Address: Required if delivery, optional if pickup

**RTL Support:**
- Form direction: RTL for Hebrew
- Input alignment: Right for Hebrew
- Labels: Positioned correctly for RTL

---

## 🎨 Styling Strategy

### Tailwind Custom Classes

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'bg-primary': '#23262d',
        'bg-dark': '#1a1d23',
        'bg-light': '#2d3239',
        'text-primary': '#b7fef6',
        'accent-pink': '#f66dce',
        'accent-orange': '#fa7e61',
        'accent-peach': '#e3b5a4',
      },
      fontFamily: {
        'logo': ['Bebas Neue', 'sans-serif'],
        'heading': ['Montserrat', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'hebrew': ['Assistant', 'Noto Sans Hebrew', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px #f66dce' },
          '50%': { boxShadow: '0 0 20px #f66dce, 0 0 30px #f66dce' },
        },
      },
    },
  },
}
```

### CSS Custom Properties (for dynamic theming)

```css
:root {
  --color-bg-primary: #23262d;
  --color-bg-dark: #1a1d23;
  --color-text-primary: #b7fef6;
  --color-accent-pink: #f66dce;
  --color-accent-orange: #fa7e61;
  --font-logo: 'Bebas Neue', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

---

## 🔄 Data Flow

### Cart State Flow
```
User clicks "Add to Cart"
  ↓
AddToCartButton.onClick()
  ↓
useCartStore.addItem(item)
  ↓
Cart state updates
  ↓
CartIcon badge updates
  ↓
CartPanel shows new item (if open)
  ↓
LocalStorage syncs
```

### Order Submission Flow
```
User fills CustomerInfoForm
  ↓
Form validation passes
  ↓
User clicks "Submit Order"
  ↓
useOrderStore.submitOrder()
  ↓
API call to n8n endpoint
  ↓
Loading state: true
  ↓
Success/Error response
  ↓
Redirect to ConfirmationStep or show error
```

---

## 📦 Component Dependencies

### Core Dependencies
- `react` - UI framework
- `react-dom` - DOM rendering
- `react-router-dom` - Routing
- `framer-motion` - Animations
- `zustand` - State management
- `react-hook-form` - Form handling
- `zod` - Validation
- `react-i18next` - Internationalization

### UI Utilities
- `tailwindcss` - Styling
- `clsx` or `classnames` - Conditional classes
- `lucide-react` - Icons (alternative to custom icons)

### Development
- `typescript` - Type safety
- `vite` - Build tool
- `@vitejs/plugin-react` - React support

---

## 🎯 Component Reusability

### Shared Button Component
```typescript
<Button 
  variant="primary" | "secondary" | "ghost"
  size="sm" | "md" | "lg"
  disabled={boolean}
  loading={boolean}
  onClick={() => void}
>
  {children}
</Button>
```

### Shared Input Component
```typescript
<Input
  label={string}
  name={string}
  type="text" | "tel" | "email"
  value={string}
  onChange={(e) => void}
  error={string | undefined}
  required={boolean}
  rtl={boolean}
/>
```

### Shared Modal Component
```typescript
<Modal
  isOpen={boolean}
  onClose={() => void}
  title={string}
  size="sm" | "md" | "lg" | "xl"
>
  {children}
</Modal>
```

---

## 🔍 Component Testing Strategy

### Unit Tests
- **Button:** Click handler, disabled state, variants
- **Input:** Validation, error display, RTL support
- **MenuItemCard:** Display, hover effects, add to cart
- **CartItem:** Quantity control, remove functionality

### Integration Tests
- **Cart Flow:** Add item → Update quantity → Remove item
- **Checkout Flow:** Fill form → Validation → Submit
- **Language Switch:** Change language → Content updates

### Visual Tests
- **MenuItemCard:** Hover states, animations
- **CartPanel:** Slide animations, item animations
- **FloatingWings:** Animation smoothness

---

## 🎨 Animation Specifications

### Page Transitions
- **Duration:** 300ms
- **Easing:** ease-in-out
- **Effect:** Fade + slide

### Button Interactions
- **Hover:** Scale 1.0 → 1.05, glow effect
- **Click:** Scale 0.95 → 1.0, ripple effect
- **Loading:** Spinner animation

### Menu Item Hover
- **Card:** Lift (translateY -8px), shadow glow
- **Image:** Zoom (scale 1.1)
- **Button:** Slide up slightly

### Cart Panel
- **Open:** Slide in from side, backdrop fade
- **Item Add:** Bounce animation (scale 0 → 1.1 → 1)
- **Item Remove:** Shrink + fade out

---

## 🌐 RTL Support Implementation

### CSS Classes
```css
.rtl {
  direction: rtl;
  text-align: right;
}

.rtl .cart-panel {
  right: auto;
  left: 0;
  transform: translateX(-100%);
}
```

### Component Logic
```typescript
const isRTL = i18n.language === 'he';

<div className={clsx('form-container', { 'rtl': isRTL })}>
  <Input rtl={isRTL} />
</div>
```

### Layout Adjustments
- **Cart Panel:** Slide from left (RTL) vs right (LTR)
- **Navigation:** Right-aligned (RTL) vs left-aligned (LTR)
- **Forms:** Label positioning, input alignment
- **Prices:** Always right-aligned (Hebrew convention)

---

**Document Version:** 1.0  
**Status:** Architecture Planning

