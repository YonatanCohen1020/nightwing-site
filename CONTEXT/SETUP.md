# Setup Instructions - Night Wing PH

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - The site will automatically open at `http://localhost:5173`
   - Default language: Hebrew (RTL)
   - Toggle language using the button in the header

## Features Implemented

✅ **Single-Page Layout**
- Hero section with full viewport height on mobile
- Menu section on the same page
- Smooth scroll from ORDER button to menu

✅ **RTL/LTR Support**
- Full Hebrew (RTL) support
- English (LTR) support
- Language switcher in header
- Automatic direction switching

✅ **Floating Animations**
- Animated chicken wings using wing.png asset
- Twinkling star field background
- Smooth Framer Motion animations

✅ **Menu Items**
- All menu items from the menu description:
  - Wings (9 pieces, 2 sauces, 45₪)
  - Tenders (6 pieces, 2 sauces, 45₪)
  - Sauces (Classic Chili, Spicy Honey, Peanut Butter, Mustard & Honey)
  - Salads (Classic American Coleslaw, 5₪)
  - Drinks (1.5L, 15₪ | Can, 10₪)
  - Add-ons (Fries, 15₪)
  - Combo (65₪)

✅ **Shopping Cart**
- Add items to cart
- Persistent cart (localStorage)
- Cart badge in header

✅ **Mobile-First Design**
- Responsive layout
- Touch-friendly buttons
- Optimized for mobile performance

✅ **Smooth Animations**
- Hero section fade-in
- Menu cards slide-in on scroll
- Hover effects on cards
- Button interactions

## Project Structure

```
nightwing_ph/
├── assets/
│   └── wing.png          # Floating wing image
├── src/
│   ├── components/
│   │   ├── layout/       # Header, Footer
│   │   ├── hero/         # Hero section, FloatingWings, StarField
│   │   └── menu/         # MenuSection, MenuItemCard
│   ├── stores/           # Zustand cart store
│   ├── hooks/            # Custom hooks (useSmoothScroll)
│   ├── types/            # TypeScript types (menu items)
│   ├── locales/          # i18n translations (he, en)
│   ├── styles/           # Global CSS
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
└── public/               # Static assets
```

## Next Steps

- [ ] Add cart panel component (slide-out drawer)
- [ ] Add checkout flow
- [ ] Add menu item images
- [ ] Connect to n8n backend
- [ ] Add order submission
- [ ] Add loading states
- [ ] Add error handling
- [ ] Optimize images (WebP)
- [ ] Add PWA support

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready for Cloudflare Pages deployment.

