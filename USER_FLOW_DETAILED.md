# Detailed User Flow - Night Wing PH

## 🎯 Primary User Journeys

### Journey 1: Quick Order Flow (Ideal Path)
**User Goal:** Order wings quickly without browsing extensively

```
1. Landing Page (Hero Section)
   ├─ User sees: Tagline, hours, CTA button
   ├─ Action: Clicks "הזמן עכשיו" (Order Now)
   └─ Result: Scrolls to menu or opens cart

2. Menu Browse
   ├─ User sees: Menu categories with items
   ├─ Action: Scrolls through menu
   ├─ Sees: Floating wings animation (engaging)
   └─ Result: User identifies desired items

3. Add to Cart (First Item)
   ├─ User sees: Menu item card (image, name, price)
   ├─ Hover effect: Card lifts, image zooms
   ├─ Action: Clicks "הוסף לעגלה" (Add to Cart)
   ├─ Animation: Button pulse, item bounces into cart
   ├─ Feedback: Cart badge updates (shows "1")
   └─ Result: Item added to cart

4. Continue Shopping
   ├─ User sees: More menu items
   ├─ Action: Adds more items (2-3 items typical)
   ├─ Cart badge: Updates to show total count
   └─ Result: Cart has multiple items

5. View Cart
   ├─ User sees: Cart icon with badge (e.g., "3")
   ├─ Action: Clicks cart icon
   ├─ Animation: Cart panel slides in
   ├─ User sees:
   │   ├─ Cart items list
   │   ├─ Quantity controls
   │   ├─ Price per item
   │   ├─ Subtotal
   │   ├─ Delivery fee (if applicable)
   │   └─ Total price
   └─ Result: User reviews cart

6. Modify Cart (Optional)
   ├─ User action: Adjusts quantity or removes item
   ├─ Animation: Item updates smoothly
   ├─ Price: Recalculates automatically
   └─ Result: Cart updated

7. Proceed to Checkout
   ├─ User sees: "השלם הזמנה" (Complete Order) button
   ├─ Action: Clicks button
   ├─ Animation: Smooth transition to checkout
   └─ Result: Checkout wizard opens

8. Step 1: Cart Review
   ├─ User sees: Final order summary
   ├─ Action: Confirms items are correct
   ├─ Action: Clicks "המשך" (Continue)
   └─ Result: Advances to customer info

9. Step 2: Customer Information
   ├─ User sees: Form with fields:
   │   ├─ שם מלא (Full Name) *
   │   ├─ טלפון (Phone) *
   │   ├─ אימייל (Email) [optional]
   │   ├─ כתובת (Address) *
   │   ├─ Delivery/Pickup toggle
   │   └─ הערות (Special Instructions)
   │
   ├─ User fills: All required fields
   ├─ Validation: Real-time (phone format check)
   ├─ If error: Field highlights red, shake animation
   ├─ Action: Clicks "המשך" (Continue)
   └─ Result: Form validated, advances to payment

10. Step 3: Payment & Review
    ├─ User sees:
    │   ├─ Final order summary
    │   ├─ Payment method selection
    │   ├─ Terms & conditions checkbox
    │   └─ Submit button
    │
    ├─ User action: Selects payment method
    ├─ User action: Checks terms checkbox
    ├─ Validation: Submit button enabled
    ├─ Action: Clicks "שלח הזמנה" (Submit Order)
    ├─ Loading state: Button shows spinner
    └─ Result: Order submitted

11. Order Confirmation
    ├─ Animation: Success checkmark, confetti (optional)
    ├─ User sees:
    │   ├─ "ההזמנה התקבלה!" (Order received!)
    │   ├─ Order number
    │   ├─ Estimated ready time
    │   ├─ Contact information
    │   └─ "חזור לתפריט" (Back to Menu) button
    │
    ├─ User action: Takes screenshot or notes order number
    └─ Result: Order complete, user satisfied

---
**Total Time:** 3-5 minutes (optimal flow)
**Steps:** 11
**Potential Drop-offs:** Step 2 (form filling), Step 3 (payment)
```

---

### Journey 2: Browsing First (Exploratory Path)
**User Goal:** Explore menu, understand options before ordering

```
1. Landing Page
   ├─ User sees: Hero section, floating wings
   ├─ Action: Scrolls down (no immediate click)
   └─ Result: Explores visually

2. Menu Exploration
   ├─ User sees: All menu categories
   ├─ Action: Scrolls through each section:
   │   ├─ כנפיים (Wings)
   │   ├─ רטבים (Sauces)
   │   ├─ סלטים (Salads)
   │   ├─ משקאות (Drinks)
   │   └─ קומבו (Combo)
   │
   ├─ Interaction: Hovers over menu items
   ├─ Animation: Cards lift, images zoom
   ├─ Reads: Descriptions, prices
   └─ Result: User familiarizes with menu

3. Language Switch (Optional)
   ├─ User sees: Language switcher (עברית/English)
   ├─ Action: Switches to English
   ├─ Animation: Smooth content transition
   └─ Result: Content translated

4. Add to Cart
   └─ Continues from Journey 1, Step 3

---
**Total Time:** 5-8 minutes
**User Intent:** Research before purchase
**Key Feature:** Comprehensive menu browsing
```

---

### Journey 3: Returning Customer (Fast Path)
**User Goal:** Reorder favorite items quickly

```
1. Landing Page
   ├─ User action: Recognizes site
   ├─ Action: Immediately scrolls to menu
   └─ Result: Skips hero section

2. Quick Add to Cart
   ├─ User knows: What they want
   ├─ Action: Adds 2-3 items quickly
   └─ Result: Cart populated

3. Checkout (Minimal Form Filling)
   ├─ If saved info: Pre-fills form (future feature)
   ├─ If not: Fills form quickly
   └─ Result: Order submitted

---
**Total Time:** 2-3 minutes
**Key Optimization:** Fast cart access, quick checkout
```

---

## 🛒 Detailed Cart Interaction Flows

### Flow: Add Item to Cart

```
User Action: Clicks "Add to Cart" button
  ↓
Button State: Loading (prevents double-click)
  ↓
Cart Store Action: addItem(item)
  ↓
State Update:
  ├─ Items array: [...items, newItem]
  ├─ Item count: +1
  └─ Total: Recalculated
  ↓
Visual Feedback:
  ├─ Cart badge: Updates number
  ├─ Button: Success animation (checkmark)
  └─ Optional: Cart panel auto-opens
  ↓
LocalStorage: Persist cart state
  ↓
Animation:
  ├─ Item card: Brief bounce effect
  └─ Cart icon: Pulse animation
  ↓
Result: Item in cart, user can continue
```

### Flow: Update Quantity in Cart

```
User Action: Clicks + or - button
  ↓
Validation:
  ├─ If quantity = 0: Remove item
  ├─ If quantity > 0: Update quantity
  └─ Max quantity: 10 (reasonable limit)
  ↓
Cart Store Action: updateQuantity(id, newQty)
  ↓
State Update:
  ├─ Item quantity: Updated
  ├─ Item subtotal: Recalculated
  └─ Cart total: Recalculated
  ↓
Visual Feedback:
  ├─ Quantity number: Updates smoothly
  ├─ Price: Updates with animation
  └─ Total: Updates
  ↓
LocalStorage: Persist updated cart
  ↓
Result: Quantity updated, cart synced
```

### Flow: Remove Item from Cart

```
User Action: Clicks remove/trash icon
  ↓
Confirmation: Optional (for UX, skip if item count > 1)
  ↓
Cart Store Action: removeItem(id)
  ↓
State Update:
  ├─ Items array: Filtered (item removed)
  ├─ Item count: Decremented
  └─ Total: Recalculated
  ↓
Animation:
  ├─ Item row: Shrinks and fades out
  ├─ Other items: Slide up smoothly
  └─ Cart badge: Updates
  ↓
LocalStorage: Persist updated cart
  ↓
If cart empty:
  ├─ Show empty state message
  ├─ Hide checkout button
  └─ Suggest: "Continue Shopping"
  ↓
Result: Item removed, cart updated
```

---

## 📝 Detailed Checkout Flow

### Step-by-Step Breakdown

#### Step 1: Cart Review

**UI Elements:**
- Order summary table
- Item images (thumbnails)
- Quantity per item
- Price per item
- Subtotal
- Delivery fee (conditional)
- Total price
- "Continue" button
- "Back to Menu" link

**User Actions:**
- Review items
- Confirm quantities
- Verify total
- Continue or go back

**Validation:**
- Cart must have at least 1 item
- Total must be > 0

---

#### Step 2: Customer Information

**Form Fields:**

1. **שם מלא (Full Name)**
   - Type: Text
   - Required: Yes
   - Validation: Min 2 characters, Hebrew/English letters
   - Error: "אנא הזן שם תקין" (Please enter valid name)

2. **טלפון (Phone)**
   - Type: Tel
   - Required: Yes
   - Format: Israeli format (05X-XXXXXXX or 05XXXXXXXXX)
   - Validation: Regex `^05\d{8}$`
   - Error: "אנא הזן מספר טלפון תקין" (Please enter valid phone)

3. **אימייל (Email)**
   - Type: Email
   - Required: No (optional)
   - Validation: Email format if provided
   - Error: "אנא הזן כתובת אימייל תקינה" (Please enter valid email)

4. **כתובת (Address)**
   - Type: Textarea
   - Required: Yes (if delivery), No (if pickup)
   - Validation: Min 5 characters if delivery
   - Error: "אנא הזן כתובת מלאה" (Please enter full address)

5. **סוג הזמנה (Order Type)**
   - Type: Toggle/Radio
   - Options: "איסוף עצמי" (Pickup) / "משלוח" (Delivery)
   - Default: Pickup
   - Effect: Shows/hides address field, adds/removes delivery fee

6. **הערות (Special Instructions)**
   - Type: Textarea
   - Required: No
   - Max length: 200 characters
   - Placeholder: "הערות מיוחדות..." (Special instructions...)

**Form Behavior:**
- Real-time validation (on blur)
- Error messages below each field
- Fields highlight on focus (pink border glow)
- Submit button disabled until all valid
- RTL support for Hebrew

**Navigation:**
- "חזור" (Back) button → Returns to cart
- "המשך" (Continue) button → Advances if valid

---

#### Step 3: Payment & Final Review

**Order Summary:**
- All items listed
- Customer information summary
- Delivery type
- Total breakdown:
  - Subtotal
  - Delivery fee (if applicable)
  - Total

**Payment Methods:**
- Cash on Delivery (default)
- Credit Card (Stripe integration, future)
- Bank Transfer (future)

**Terms & Conditions:**
- Checkbox: "אני מסכים לתנאים" (I agree to terms)
- Required: Yes
- Link to terms page (if exists)

**Submit Button:**
- Disabled until: Form valid + terms checked
- Loading state: Shows spinner on click
- Text: "שלח הזמנה" (Submit Order)

**On Submit:**
```
Click Submit
  ↓
Loading: Button shows spinner, disabled
  ↓
API Call: POST /api/orders
  Payload: {
    customerInfo: {...},
    items: [...],
    total: 123.45,
    deliveryType: "pickup"
  }
  ↓
Success Response:
  {
    orderId: "ORD-12345",
    estimatedTime: "30 minutes",
    status: "confirmed"
  }
  ↓
Redirect: To confirmation step
  ↓
Clear: Cart (localStorage + state)
```

**Error Handling:**
- Network error: Show toast, retry button
- Validation error: Highlight fields
- Server error: Show error message, allow retry

---

#### Step 4: Order Confirmation

**Success Animation:**
- Checkmark animation (scale + fade)
- Optional: Confetti effect
- Duration: 1-2 seconds

**Information Display:**
- **Header:** "ההזמנה התקבלה!" (Order received!)
- **Order Number:** Large, bold (e.g., "ORD-12345")
- **Estimated Time:** "ההזמנה תהיה מוכנה תוך 30 דקות" (Order will be ready in 30 minutes)
- **Contact Info:**
  - Phone: 058-6230849 (clickable)
  - Hours: 21:00-2:00
- **Delivery Info:** Address or pickup location

**Actions:**
- "חזור לתפריט" (Back to Menu) button
- "שתף הזמנה" (Share Order) - future feature
- "היסטוריית הזמנות" (Order History) - future feature

**Persistence:**
- Order stored in localStorage (for reference)
- Can view order number later (if feature exists)

---

## 🔄 Error & Edge Case Flows

### Flow: Network Error During Order Submission

```
User clicks: "Submit Order"
  ↓
API call fails: Network error
  ↓
UI Feedback:
  ├─ Submit button: Re-enabled
  ├─ Error toast: "שגיאה בשליחת ההזמנה, נסה שוב" (Error submitting order, try again)
  └─ Retry button: Visible
  ↓
User action: Clicks retry
  ↓
API call: Retry (max 3 attempts)
  ↓
If success: Continue to confirmation
If fails: Show contact info, suggest calling
```

### Flow: Cart Empty on Checkout

```
User navigates: Directly to /checkout
  ↓
Validation: Cart empty
  ↓
UI: Redirect to menu
  ↓
Toast message: "העגלה ריקה, הוסף פריטים" (Cart is empty, add items)
```

### Flow: Invalid Form Submission

```
User fills: Incomplete form
  ↓
User clicks: "Continue" button
  ↓
Validation: Checks all fields
  ↓
UI Feedback:
  ├─ Invalid fields: Highlighted red
  ├─ Error messages: Shown below fields
  ├─ Button: Remains disabled
  └─ First invalid field: Scrolls into view
  ↓
User action: Fixes errors
  ↓
Validation: Re-checks on blur
  ↓
If valid: Button enabled
```

### Flow: Browser Back Button

```
User action: Clicks browser back
  ↓
If in checkout:
  ├─ Step > 1: Go to previous step
  └─ Step 1: Return to menu
  ↓
Cart: Preserved (not lost)
  ↓
User can: Continue from where they left off
```

---

## 📱 Mobile-Specific Flows

### Mobile Navigation

```
Small screen: < 640px
  ↓
Header: Shows hamburger icon
  ↓
User clicks: Hamburger
  ↓
Menu: Slides in from side
  ↓
Options:
  ├─ Menu categories
  ├─ Cart (with badge)
  ├─ Language switcher
  └─ Close button
```

### Mobile Cart

```
Cart icon: Always visible (fixed position)
  ↓
User clicks: Cart icon
  ↓
Cart panel: Full-screen overlay
  ↓
Features:
  ├─ Swipe to remove items
  ├─ Bottom-fixed checkout button
  └─ Easy quantity controls (large buttons)
```

### Mobile Checkout

```
Form fields: Full width
  ↓
Keyboard: Auto-focus next field
  ↓
Delivery toggle: Large, touch-friendly
  ↓
Submit button: Fixed bottom, always visible
```

---

## 🎯 Conversion Optimization Points

### Points to Reduce Friction

1. **Hero CTA:** Clear, prominent "Order Now" button
2. **Menu Items:** Easy-to-tap add buttons (mobile)
3. **Cart Access:** Always visible cart icon
4. **Form Validation:** Clear error messages
5. **Progress Indicator:** Show checkout steps
6. **Order Summary:** Clear pricing breakdown
7. **Confirmation:** Clear next steps

### Points to Build Trust

1. **Contact Info:** Visible phone number
2. **Operating Hours:** Clear display
3. **Order Confirmation:** Order number, estimated time
4. **Error Handling:** Helpful error messages
5. **Loading States:** Show progress, not blank screens

---

## 📊 Success Metrics to Track

### Key Performance Indicators (KPIs)

1. **Conversion Rate:** Visitors → Orders
2. **Cart Abandonment:** Items in cart → Order completion
3. **Average Order Value:** Total revenue / Orders
4. **Time to Order:** Landing → Order submission
5. **Error Rate:** Failed orders / Total attempts
6. **Mobile vs Desktop:** Order distribution
7. **Popular Items:** Most added to cart
8. **Checkout Completion:** Step 1 → Step 4 completion

### Analytics Events to Track

```javascript
// Example events to track
trackEvent('add_to_cart', { item_id, item_name, price })
trackEvent('view_cart', { item_count, total })
trackEvent('start_checkout', { item_count, total })
trackEvent('checkout_step_1', { step: 'cart_review' })
trackEvent('checkout_step_2', { step: 'customer_info' })
trackEvent('checkout_step_3', { step: 'payment' })
trackEvent('order_complete', { order_id, total, items_count })
trackEvent('cart_abandon', { item_count, total, step })
```

---

**Document Version:** 1.0  
**Status:** User Flow Documentation Complete

