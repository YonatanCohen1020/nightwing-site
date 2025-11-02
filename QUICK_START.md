# Quick Start Guide - Night Wing PH

## 🚀 Getting Started (Developer)

This guide will help you quickly set up and start developing the Night Wing PH website.

---

## Prerequisites

- **Node.js:** 18.x or higher
- **npm** or **yarn** package manager
- **Git** for version control
- **Code Editor:** VS Code recommended

---

## Step 1: Project Setup

### Initialize Project

```bash
# Create project with Vite
npm create vite@latest nightwing-ph -- --template react-ts

# Navigate to project
cd nightwing-ph

# Install dependencies
npm install
```

### Install Core Dependencies

```bash
# Core React
npm install react react-dom react-router-dom

# Styling & UI
npm install tailwindcss postcss autoprefixer
npm install @headlessui/react
npm install clsx

# State Management
npm install zustand

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# Animations
npm install framer-motion

# Data Fetching
npm install @tanstack/react-query

# Internationalization
npm install react-i18next i18next i18next-browser-languagedetector

# Icons (optional)
npm install lucide-react
```

### Install Dev Dependencies

```bash
npm install -D @types/react @types/react-dom
npm install -D typescript
npm install -D vite @vitejs/plugin-react
npm install -D vitest @testing-library/react
npm install -D prettier eslint
```

---

## Step 2: Configure Tailwind CSS

### Initialize Tailwind

```bash
npx tailwindcss init -p
```

### Update `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
  plugins: [],
}
```

### Add Tailwind to `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;700&family=Inter:wght@400;500;600&family=Assistant:wght@400;600;700&display=swap');

:root {
  --color-bg-primary: #23262d;
  --color-bg-dark: #1a1d23;
  --color-text-primary: #b7fef6;
  --color-accent-pink: #f66dce;
  --color-accent-orange: #fa7e61;
}

body {
  @apply bg-bg-primary text-text-primary font-body;
  direction: rtl; /* Default RTL for Hebrew */
}

.rtl {
  direction: rtl;
}

.ltr {
  direction: ltr;
}
```

---

## Step 3: Setup i18n

### Create `src/i18n.ts`

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import heTranslations from './locales/he/translation.json';
import enTranslations from './locales/en/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      he: { translation: heTranslations },
      en: { translation: enTranslations }
    },
    lng: 'he', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

### Create Translation Files

**`src/locales/he/translation.json`**
```json
{
  "nav": {
    "wings": "כנפיים",
    "sauces": "רטבים",
    "salads": "סלטים",
    "drinks": "משקאות",
    "addons": "הוסף"
  },
  "cart": {
    "title": "עגלת קניות",
    "empty": "העגלה ריקה",
    "checkout": "השלם הזמנה",
    "total": "סה\"כ",
    "subtotal": "סיכום ביניים"
  },
  "checkout": {
    "name": "שם מלא",
    "phone": "טלפון",
    "email": "אימייל",
    "address": "כתובת",
    "delivery": "משלוח",
    "pickup": "איסוף עצמי",
    "instructions": "הערות",
    "submit": "שלח הזמנה"
  }
}
```

**`src/locales/en/translation.json`**
```json
{
  "nav": {
    "wings": "Wings",
    "sauces": "Sauces",
    "salads": "Salads",
    "drinks": "Drinks",
    "addons": "Add-ons"
  },
  "cart": {
    "title": "Shopping Cart",
    "empty": "Cart is empty",
    "checkout": "Checkout",
    "total": "Total",
    "subtotal": "Subtotal"
  },
  "checkout": {
    "name": "Full Name",
    "phone": "Phone",
    "email": "Email",
    "address": "Address",
    "delivery": "Delivery",
    "pickup": "Pickup",
    "instructions": "Special Instructions",
    "submit": "Submit Order"
  }
}
```

---

## Step 4: Setup State Management

### Create Cart Store (`src/stores/useCartStore.ts`)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existingItem = get().items.find(i => i.id === item.id);
        if (existingItem) {
          set((state) => ({
            items: state.items.map(i =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          }));
        } else {
          set((state) => ({
            items: [...state.items, { ...item, quantity: 1 }]
          }));
        }
      },
      removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id)
      })),
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
        } else {
          set((state) => ({
            items: state.items.map(i =>
              i.id === id ? { ...i, quantity } : i
            )
          }));
        }
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);
```

---

## Step 5: Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── menu/
│   │   ├── MenuSection.tsx
│   │   ├── MenuItemCard.tsx
│   │   └── MenuItemImage.tsx
│   ├── cart/
│   │   ├── CartPanel.tsx
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   ├── checkout/
│   │   ├── CheckoutWizard.tsx
│   │   ├── CustomerInfoForm.tsx
│   │   └── OrderSummary.tsx
│   ├── hero/
│   │   ├── Hero.tsx
│   │   ├── FloatingWings.tsx
│   │   └── StarField.tsx
│   └── shared/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Modal.tsx
├── stores/
│   ├── useCartStore.ts
│   ├── useOrderStore.ts
│   └── useMenuStore.ts
├── hooks/
│   └── useTranslation.ts
├── utils/
│   ├── validation.ts
│   └── format.ts
├── types/
│   ├── menu.ts
│   └── order.ts
├── locales/
│   ├── he/
│   │   └── translation.json
│   └── en/
│       └── translation.json
├── styles/
│   └── globals.css
├── App.tsx
├── main.tsx
└── i18n.ts
```

---

## Step 6: Environment Variables

### Create `.env`

```env
VITE_API_BASE_URL=http://localhost:5678
VITE_SITE_NAME=Night Wing PH
VITE_PHONE=058-6230849
VITE_LOCATION=Paar 29 Pardes Hanna
VITE_HOURS=21:00-2:00
```

### Create `.env.example`

```env
VITE_API_BASE_URL=
VITE_SITE_NAME=Night Wing PH
VITE_PHONE=
VITE_LOCATION=
VITE_HOURS=
```

---

## Step 7: Run Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## Step 8: Build for Production

```bash
npm run build
```

Output: `dist/` folder ready for Cloudflare Pages deployment

---

## Step 9: Setup Cloudflare Pages

1. **Push to GitHub/GitLab**
2. **Connect to Cloudflare Pages:**
   - Dashboard → Pages → Create Project
   - Connect repository
   - Build settings:
     - Build command: `npm run build`
     - Build output: `dist`
     - Node version: `18`
3. **Add Environment Variables** in Cloudflare dashboard
4. **Deploy:** Automatic on push to main branch

---

## Step 10: Setup n8n Backend (Quick Start)

### Local n8n Setup

```bash
# Using Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  n8nio/n8n

# Or using npm
npm install n8n -g
n8n start
```

Access: `http://localhost:5678`

### Create First Workflow

1. **Create HTTP Trigger Node**
   - Method: GET
   - Path: `/api/menu`
   - Response: JSON

2. **Add Code Node** (mock data)
   ```javascript
   return [{
     json: {
       items: [
         {
           id: "1",
           nameHe: "כנפיים",
           nameEn: "Wings",
           price: 45,
           category: "wings"
         }
       ]
     }
   }];
   ```

3. **Add Respond to Webhook Node**
   - Respond with: JSON
   - Response code: 200

4. **Save & Activate Workflow**

---

## 🧪 Testing Setup

### Unit Test Example

**`src/components/shared/Button.test.tsx`**
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Run Tests

```bash
npm run test
```

---

## 📝 Development Checklist

- [ ] Project initialized with Vite + React + TypeScript
- [ ] Tailwind CSS configured with custom colors
- [ ] i18n setup (Hebrew + English)
- [ ] Cart store created
- [ ] Basic routing setup
- [ ] Header component
- [ ] Footer component
- [ ] Menu section structure
- [ ] Cart panel component
- [ ] Checkout flow structure
- [ ] Environment variables set
- [ ] Cloudflare Pages connected
- [ ] n8n workflow created

---

## 🔗 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format with Prettier

# Testing
npm run test         # Run tests
npm run test:watch   # Watch mode
```

---

## 📚 Next Steps

1. **Design Components:** Start with Header, Footer, Hero
2. **Implement Menu:** MenuItemCard, MenuSection
3. **Build Cart:** CartPanel, CartItem
4. **Create Checkout:** Multi-step form
5. **Add Animations:** Framer Motion integration
6. **Connect Backend:** n8n API integration
7. **Polish & Test:** Final touches, testing

---

## 🆘 Troubleshooting

### Issue: Tailwind styles not applying
**Solution:** Ensure `index.css` imports Tailwind, check `tailwind.config.js` content paths

### Issue: i18n not working
**Solution:** Import `i18n.ts` in `main.tsx`, check translation file paths

### Issue: Zustand persistence not working
**Solution:** Install `zustand/middleware/persist`, check localStorage

### Issue: Build fails on Cloudflare
**Solution:** Check Node version, ensure all dependencies in `package.json`

---

## 📖 Resources

- **React Docs:** https://react.dev
- **Vite Docs:** https://vitejs.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Framer Motion:** https://www.framer.com/motion
- **Zustand:** https://github.com/pmndrs/zustand
- **React Hook Form:** https://react-hook-form.com
- **n8n Docs:** https://docs.n8n.io

---

**Happy Coding! 🚀**

