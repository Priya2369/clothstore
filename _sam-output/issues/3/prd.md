# PRD: Create a modern, user-friendly website for a tailoring and clothing business.

> **Issue:** #3
> **Repository:** Priya2369/clothstore
> **Generated:** 2026-01-06T04:30:09.906Z
> **Type:** feature
> **Priority:** medium
> **Labels:** feature, website, UI/UX, ecommerce, tailoring

---

## Overview

Develop a modern, user-friendly website for a tailoring and clothing business with various features.

## Original Request

Create a modern, user-friendly website for a tailoring and clothing business. The website should allow users to:

1.Browse Fabric Samples

Show different fabric options with images, colors, and descriptions.

Users should be able to zoom in and view fabric details.

2.Custom Dress Stitching

Users can choose a dress type (e.g., saree blouse, kurti, gown, suit, etc.).

Provide a measurement form where users can enter their body measurements.

Allow users to attach references or design inspirations if needed.

3.Ready-Made Dress Section

Display a catalog of ready-made dresses with images, sizes, price, and details.

Users should be able to place an order online.

4.Shopping Cart & Checkout

Support for placing orders for both stitched and ready-made items.

5.Clean UI/UX

Simple, elegant, responsive design

Mobile-friendly

Easy navigation

6.Other Pages

Home

About Us

Contact / Support

The tone of the website should feel professional, friendly, and trustworthy.

---

Now I have a complete picture of the project. Let me create a detailed, actionable task breakdown for implementing this tailoring and clothing business website.

## 🎯 Implementation Plan

### Summary
Build a complete modern React e-commerce website for a tailoring business from scratch using the existing Vite + React + Tailwind CSS stack. The site needs fabric browsing with zoom, custom dress ordering with measurements, ready-made dress catalog, shopping cart, and standard informational pages.

### Tasks

- [ ] **Task 1: Project Foundation & Configuration**
  - Create `package.json` with scripts (`dev`, `build`, `preview`, `lint`)
  - Create `vite.config.js` with React plugin configuration
  - Create `tailwind.config.js` with custom theme (colors, fonts: Inter + Playfair Display)
  - Create `postcss.config.js` for Tailwind processing
  - Create `src/main.jsx` entry point mounting React app
  - Create `src/App.jsx` with React Router setup (BrowserRouter)
  - Create `src/index.css` with Tailwind directives and global styles
  - Verify dev server runs with `npm run dev`
  - Acceptance: `npm run dev` starts local server, blank page renders without errors, Tailwind classes work

- [ ] **Task 2: Layout Components & Navigation**
  - Create `src/components/layout/Header.jsx` with logo, navigation links, cart icon with badge
  - Create `src/components/layout/Footer.jsx` with contact info, quick links, social media icons
  - Create `src/components/layout/Layout.jsx` wrapper component (Header + main content + Footer)
  - Implement responsive mobile menu (hamburger icon, slide-out navigation)
  - Add route configuration for all pages (Home, Fabrics, Custom Stitching, Ready-Made, About, Contact)
  - Style navigation with Tailwind (sticky header, smooth transitions)
  - Acceptance: Navigation works on all screen sizes, links navigate correctly, cart badge shows item count

- [ ] **Task 3: Home & Informational Pages**
  - Create `src/pages/Home.jsx` with hero section, featured categories, call-to-action buttons
  - Create `src/pages/About.jsx` with business story, team/services section, trust indicators
  - Create `src/pages/Contact.jsx` with contact form (react-hook-form), map placeholder, business hours
  - Create `src/components/ui/Button.jsx` reusable button component (primary, secondary variants)
  - Create `src/components/ui/Card.jsx` reusable card component for content sections
  - Add placeholder images in `src/assets/` for hero and about sections
  - Acceptance: All three pages render, contact form validates inputs, responsive on mobile/tablet/desktop

- [ ] **Task 4: Fabric Samples Browsing with Zoom**
  - Create `src/pages/Fabrics.jsx` catalog page with filter sidebar (by color, type, price)
  - Create `src/components/fabric/FabricCard.jsx` displaying fabric image, name, color, price
  - Create `src/components/fabric/FabricModal.jsx` detail view with react-zoom-pan-pinch integration
  - Implement zoom/pan functionality for fabric detail images
  - Create `src/data/fabrics.js` mock data array with sample fabrics
  - Add filter state management (useState) and filtering logic
  - Acceptance: Fabric grid displays, filters work, clicking opens modal with working zoom/pan controls

- [ ] **Task 5: Custom Dress Stitching Feature**
  - Create `src/pages/CustomStitching.jsx` main page with dress type selection
  - Create `src/components/stitching/DressTypeSelector.jsx` (saree blouse, kurti, gown, suit, etc.)
  - Create `src/components/stitching/MeasurementForm.jsx` with react-hook-form validation
    - Fields: bust, waist, hips, shoulder, arm length, dress length, etc. (varies by dress type)
  - Create `src/components/stitching/ReferenceUpload.jsx` for design inspiration images (file input with preview)
  - Create `src/components/stitching/FabricSelector.jsx` to choose fabric from catalog
  - Store custom order details in state/context for cart
  - Acceptance: User can select dress type, dynamic measurement fields display, file upload shows preview, can add to cart

- [ ] **Task 6: Ready-Made Dress Catalog & Product Pages**
  - Create `src/pages/ReadyMade.jsx` catalog grid with sorting (price, newest)
  - Create `src/pages/ProductDetail.jsx` individual product page with size selector
  - Create `src/components/product/ProductCard.jsx` with image, name, price, "Add to Cart" button
  - Create `src/components/product/SizeSelector.jsx` size options with availability indicators
  - Create `src/data/products.js` mock data for ready-made dresses
  - Implement dynamic routing `/ready-made/:productId`
  - Acceptance: Catalog displays products, clicking navigates to detail page, size selection works, add to cart functions

- [ ] **Task 7: Shopping Cart & Checkout Flow**
  - Create `src/context/CartContext.jsx` using React Context for cart state management
  - Create `src/pages/Cart.jsx` showing cart items, quantities, subtotal, remove functionality
  - Create `src/pages/Checkout.jsx` with shipping form, order summary, place order button
  - Create `src/components/cart/CartItem.jsx` displaying item with quantity controls
  - Create `src/components/cart/CartSummary.jsx` price breakdown component
  - Support both stitched (custom) and ready-made items in cart
  - Add toast/notification for "Added to Cart" feedback
  - Implement localStorage persistence for cart data
  - Acceptance: Items add/remove from cart, quantities update, cart persists on refresh, checkout form validates

### Technical Considerations
- **State Management**: Use React Context for cart; local state sufficient for filtering/forms
- **Form Handling**: Leverage react-hook-form for all forms (measurements, contact, checkout)
- **Routing**: React Router v6 with nested routes; use `<Outlet>` for layout patterns
- **Zoom Feature**: react-zoom-pan-pinch already installed - use `TransformWrapper` and `TransformComponent`
- **Icons**: Lucide React for all icons (shopping-cart, menu, x, zoom-in, etc.)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints (sm, md, lg, xl)
- **Mock Data**: Use JSON files/arrays for products and fabrics until backend is connected
- **Images**: Use placeholder services (Unsplash/Pexels) or generic clothing images initially

### Dependencies
- All npm packages already installed (react, react-router-dom, tailwindcss, react-hook-form, react-zoom-pan-pinch, lucide-react)
- No backend required for initial implementation - mock data and localStorage for persistence
- Placeholder images needed (can use external image URLs or add to `src/assets/`)

### Estimated Complexity
**Medium-Complex** - While there's no backend integration, this is a full e-commerce frontend with multiple interconnected features. The zoom functionality, measurement forms with dynamic fields, and cart system (handling two product types) add complexity. Building from a blank `src/` folder means everything needs to be created, but the tech stack is well-suited for the task.

---
*🏷️ Add label `ready-for-dev` when ready for implementation*


---

Now I have a clear picture of the codebase. Let me provide the architecture review.

## 🏗️ Architecture Review

### Overview
This is a greenfield React e-commerce frontend for a tailoring business. The project has dependencies installed but lacks all configuration files and source code. The implementation plan is generally sound but requires refinement in data modeling, error handling, and component contracts.

### Component Design
```
                           ┌─────────────────────────────────────┐
                           │              App.jsx                │
                           │    (BrowserRouter + Routes)         │
                           └──────────────┬──────────────────────┘
                                          │
                           ┌──────────────▼──────────────────────┐
                           │           Layout.jsx                │
                           │   ┌─────────┬───────────────┐       │
                           │   │ Header  │    <Outlet>   │       │
                           │   │ Footer  │   (pages)     │       │
                           └───┴─────────┴───────────────┴───────┘
                                          │
        ┌──────────────┬──────────────────┼──────────────────┬───────────────┐
        ▼              ▼                  ▼                  ▼               ▼
   ┌─────────┐   ┌───────────┐    ┌─────────────────┐  ┌───────────┐  ┌──────────┐
   │  Home   │   │  Fabrics  │    │ CustomStitching │  │ ReadyMade │  │ Cart/    │
   │  About  │   │           │    │                 │  │ + Detail  │  │ Checkout │
   │ Contact │   └─────┬─────┘    └────────┬────────┘  └─────┬─────┘  └────┬─────┘
   └─────────┘         │                   │                 │             │
                       ▼                   ▼                 ▼             ▼
              ┌────────────────┐  ┌────────────────┐  ┌────────────┐  ┌─────────┐
              │ FabricCard     │  │ DressTypeSelect│  │ProductCard │  │CartItem │
              │ FabricModal    │  │ MeasurementForm│  │SizeSelector│  │Summary  │
              │ (zoom-pan)     │  │ ReferenceUpload│  └────────────┘  └─────────┘
              └────────────────┘  │ FabricSelector │
                                  └────────────────┘

  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                          CartContext (Global State)                         │
  │  - items: CartItem[]                                                        │
  │  - addItem(item)  removeItem(id)  updateQuantity(id, qty)  clearCart()     │
  │  - Persisted to localStorage                                                │
  └─────────────────────────────────────────────────────────────────────────────┘
```

### Data Model

The implementation plan lacks explicit data type definitions. Here are the essential structures:

```javascript
// src/types/product.js (or inline JSDoc)

/** @typedef {Object} Fabric
 *  @property {string} id - Unique identifier
 *  @property {string} name - Display name
 *  @property {string} description
 *  @property {string} imageUrl
 *  @property {string[]} colors - Available color variants
 *  @property {string} type - 'cotton' | 'silk' | 'polyester' | 'linen' | 'wool'
 *  @property {number} pricePerMeter
 *  @property {boolean} inStock
 */

/** @typedef {Object} ReadyMadeProduct
 *  @property {string} id
 *  @property {string} name
 *  @property {string} description
 *  @property {string[]} images - Multiple product images
 *  @property {number} price
 *  @property {string} category - 'saree-blouse' | 'kurti' | 'gown' | 'suit' | etc.
 *  @property {{size: string, available: boolean}[]} sizes
 *  @property {string} createdAt - For "newest" sorting
 */

/** @typedef {Object} Measurements
 *  @property {number} [bust]
 *  @property {number} [waist]
 *  @property {number} [hips]
 *  @property {number} [shoulder]
 *  @property {number} [armLength]
 *  @property {number} [dressLength]
 *  @property {string} [notes] - Additional instructions
 */

/** @typedef {Object} CustomOrder
 *  @property {string} id - Generated UUID
 *  @property {'custom'} type - Discriminator for cart
 *  @property {string} dressType
 *  @property {string} fabricId
 *  @property {Measurements} measurements
 *  @property {string[]} referenceImages - Base64 or URLs
 *  @property {number} estimatedPrice
 */

/** @typedef {Object} CartItem
 *  @property {string} id
 *  @property {'custom' | 'readymade'} type
 *  @property {string} productId - fabric or product ID
 *  @property {string} name
 *  @property {number} price
 *  @property {number} quantity
 *  @property {string} [size] - For ready-made only
 *  @property {CustomOrder} [customDetails] - For custom only
 *  @property {string} imageUrl
 */
```

### Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| State Management | React Context | Sufficient for cart; avoid Redux overhead for this scope |
| Form Validation | react-hook-form | Already installed; performant, minimal re-renders |
| Image Zoom | react-zoom-pan-pinch | Already installed; TransformWrapper pattern |
| Routing | React Router v6 | Modern hooks API, nested routes with Outlet |
| Styling | Tailwind CSS | Already configured in dist; rapid development |
| ID Generation | crypto.randomUUID() | Native browser API for cart/order IDs |
| Image Storage | Base64 in localStorage | Simple for MVP; has size limits (~5MB total) |

### Risk Assessment

**High Risk:**
- **Reference Image Storage**: Storing uploaded images as Base64 in localStorage will hit storage limits quickly (5-10MB per domain). For MVP, limit to 1-2 small images per order. Long-term needs backend integration.
- **Missing Configuration Files**: package.json and config files don't exist. Task 1 must complete successfully before anything else works.

**Medium Risk:**
- **Measurement Form Complexity**: Dynamic fields based on dress type need careful state management. Each dress type should have a defined measurement schema:
  ```javascript
  const MEASUREMENT_SCHEMAS = {
    'saree-blouse': ['bust', 'waist', 'shoulder', 'armLength', 'blouseLength'],
    'kurti': ['bust', 'waist', 'hips', 'shoulder', 'kurtaLength'],
    'gown': ['bust', 'waist', 'hips', 'shoulder', 'armLength', 'gownLength'],
    'suit': ['chest', 'waist', 'hips', 'shoulder', 'sleeveLength', 'jacketLength'],
  };
  ```
- **Cart Item Discrimination**: Two product types (custom vs ready-made) in one cart requires careful type checking throughout checkout flow.

**Low Risk:**
- **No Backend**: Mock data is fine for MVP, but ensure data structure matches future API contracts.
- **Image Placeholders**: Using external URLs (Unsplash) works but may have rate limits. Consider committing a few local placeholder images.

### Implementation Notes

1. **Create all config files in Task 1 before running `npm run dev`**. The order matters:
   - `package.json` (with correct scripts)
   - `vite.config.js`
   - `postcss.config.js`
   - `tailwind.config.js`
   - `index.html` (in root, not src)
   - `src/main.jsx`
   - `src/App.jsx`
   - `src/index.css`

2. **CartContext pattern** - Use a reducer for complex state updates:
   ```javascript
   // Preferred over multiple useState calls
   const cartReducer = (state, action) => {
     switch (action.type) {
       case 'ADD_ITEM': // Handle both product types
       case 'REMOVE_ITEM':
       case 'UPDATE_QUANTITY':
       case 'CLEAR_CART':
     }
   };
   ```

3. **Form validation schemas** - Define Zod or inline validation rules for:
   - Measurements (all positive numbers, reasonable ranges 10-200cm)
   - Contact form (email format, required fields)
   - Checkout (shipping address validation)

4. **Component props contracts** - Each component should have clear prop interfaces:
   ```javascript
   // Example: ProductCard.jsx
   /** @param {{product: ReadyMadeProduct, onAddToCart: (id, size) => void}} props */
   function ProductCard({ product, onAddToCart }) { ... }
   ```

5. **Error boundaries** - Wrap major route sections to prevent full app crashes:
   ```jsx
   <Route path="/fabrics" element={
     <ErrorBoundary fallback={<ErrorPage />}>
       <FabricsPage />
     </ErrorBoundary>
   } />
   ```

6. **Existing dist/ folder** - The dist/ folder has pre-built assets. This should be added to `.gitignore` to avoid confusion. It appears to be from a previous build or template.

### Architecture Diagram: Data Flow

```
User Interaction → Component State → Context (Cart) → localStorage
                                   ↓
                            UI Updates
                            
┌─────────────────────────────────────────────────────────────┐
│  Page Load                                                  │
│  ─────────                                                  │
│  1. main.jsx mounts App                                     │
│  2. CartProvider initializes from localStorage              │
│  3. Router renders Layout + initial page                    │
│  4. Header reads cart count from context                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Add to Cart Flow (Ready-Made)                              │
│  ─────────────────────────────                              │
│  1. User selects size on ProductDetail                      │
│  2. Clicks "Add to Cart"                                    │
│  3. Component calls cartContext.addItem({                   │
│       type: 'readymade', productId, size, quantity: 1       │
│     })                                                      │
│  4. Context updates state + localStorage                    │
│  5. Header badge updates reactively                         │
│  6. Toast notification confirms action                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  Add to Cart Flow (Custom Order)                            │
│  ─────────────────────────────                              │
│  1. User selects dress type                                 │
│  2. Dynamic measurement form appears                        │
│  3. User fills measurements + uploads reference (optional)  │
│  4. User selects fabric from FabricSelector                 │
│  5. Form submits → validates all fields                     │
│  6. Creates CustomOrder object with generated ID            │
│  7. Adds to cart as type: 'custom'                          │
│  8. Reference images stored as base64 (size warning)        │
└─────────────────────────────────────────────────────────────┘
```

### Questions for Stakeholder

1. **Price Calculation for Custom Orders**: How should custom dress prices be calculated? Options:
   - Fixed price per dress type (e.g., Kurti = ₹500)
   - Fabric cost + stitching fee
   - Quote-based (user submits, business responds with price)

2. **Order Confirmation**: Without a backend, what happens when user "places order"?
   - Display order confirmation with details to screenshot?
   - Email integration via third-party (EmailJS, Formspree)?
   - WhatsApp integration for order details?

3. **Measurement Units**: Are all measurements in centimeters or inches? The form should clearly indicate units and potentially support conversion.

4. **Image Sizing for Reference Uploads**: Should we compress images before storing? Limit file size to prevent localStorage overflow (suggest max 500KB per image, max 2 images)?

5. **Payment Integration**: The plan mentions checkout but no payment gateway. Is this intentional (offline payment)? If Razorpay/Stripe is needed later, the checkout flow should be designed with that in mind.

---
*🏗️ Architecture review complete. The implementation plan is solid for an MVP. Address the high-risk items (config files and image storage limits) early. Ready for implementation.*


---

## Notes

- Target Directory: `/tmp/sam-repos/Priya2369/clothstore`
- Tech Stack: JavaScript

---

*🤖 Generated by Sam 🎯 (Triage) → Pete 📋 (Planning) → Alex 🏗️ (Architecture)*
