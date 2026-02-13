

# Hashtech Gaming — Used Gaming Accessories E-Commerce

## Overview
A minimal, premium e-commerce website for selling used gaming accessories in Karachi, Pakistan. Dark theme (black/gray/white only), guest checkout with Cash on Delivery and Nayapay, currency in PKR. Built with React + Vite + Tailwind CSS + shadcn/ui.

---

## 🎨 Theme & Design System
- **Dark theme** with custom palette: BG #0A0A0B, surfaces #111113/#17171A, white accent for primary actions
- **Typography**: Inter/Geist Sans with specified heading/body sizes and tight letter-spacing
- **Spacing & Layout**: 1200px max container, 12-col grid desktop / 4-col mobile
- **Card radius 14px, button radius 12px**, subtle hover animations (y -2px lift)
- **Grayscale-only status feedback** — no colored UI elements

---

## 📄 Pages

### 1. Home
- **Hero section**: "Used Gaming Gear. Tested. Ready." with Shop Now + View Combo Deals CTAs
- **Category quick links**: Keyboards, Mouse, Headphones (3 cards)
- **Trending products grid** (8 products)
- **Combo Deals carousel** (3–6 deals with shadcn Carousel)
- **Why Us** section (4 trust bullets)
- **Reviews carousel** with customer images
- **Contact strip** at bottom

### 2. Shop
- **Left sidebar filters** (desktop): Category, Brand, Price range, Condition (1–10 slider), Availability
- **Top bar**: Result count + Sort dropdown (Newest, Price low→high, high→low, Condition)
- **Product grid**: 3 cols desktop, 2 tablet, 1 mobile
- **Product cards** with condition badge, price in PKR, stock status

### 3. Product Detail
- **Image gallery**: Main image + thumbnail strip (4:3 ratio)
- **Product info**: Title, PKR price, condition badge (e.g. "8/10"), stock qty, brand, category, condition notes
- **Actions**: Quantity stepper + Add to Cart + Buy Now
- **Tabs**: Description | Specs | Reviews
- **Related products** row (4 items)

### 4. Cart
- Item list with image, title, price, quantity controls (respecting stock limits), remove button
- **Summary card**: Delivery speed selector + subtotal + delivery charges + total
- Checkout button

### 5. Checkout (Guest)
- **Form fields**: Name, email, phone, city (dropdown), full address, order notes
- **Delivery speed radios**: Express (1–2 days), Standard (3–5 days), Economy (6–8 days) — cheaper with more days, charges vary by city
- **Payment method**: Cash on Delivery or Nayapay (Account Name: Hammad Shafi)
- **Order summary sidebar** + Place Order button (disabled until form is valid)

### 6. Order Confirmation
- Success message with generated Order ID
- "Confirmation email sent" notice (simulated)
- Order summary with items, delivery, payment details
- CTA to continue shopping

### 7. Contact
- Contact info: Hammad Shafi, phone 0313-2153277, email hammadparekh52@gmail.com
- Contact form (name, email, subject, message) with toast on submit

### 8. Policies (Single Page with Tabs/Accordion)
- **Delivery Policy**: City-wise charges + speed-based pricing breakdown
- **Exchange Policy**: Same product exchange only if defective; no acceptance of broken/physically damaged items
- **Privacy Policy** & **Terms of Service**: Short, clear text

---

## 🧩 Key Components

### Header (sticky, 64px)
- Left: Hashtech Gaming logo + store name
- Center: Navigation links (Home, Shop, Contact, Policies)
- Right: Search bar (360px desktop) + Cart icon with item count badge
- Mobile: Hamburger → Sheet with nav + search

### Footer (4 columns)
- Brand & contact info | Shop links | Support links | Legal links
- Bottom bar: © 2026 Hashtech Gaming

### Product Card
- Image (4:3), condition badge, title, brand, price PKR, stock status
- Hover: subtle lift animation

### Toasts (Sonner)
- Add to cart, removed from cart, quantity limited, order placed, email sent notifications

---

## 📦 Sample Data
- ~12–15 hardcoded products across Keyboards, Mouse, Headphones
- Brands: HyperX, Razer, Corsair, Logitech
- 3–6 combo deals
- 5–8 sample reviews with placeholder images
- City-wise delivery charges table

---

## 🛒 Cart & Checkout Flow
- Cart state managed via React Context (persisted in localStorage)
- Guest checkout — no authentication required
- Form validation with react-hook-form + zod
- Simulated order confirmation (no real email sending)

---

## ✨ Animations
- Page enter: fade in + slide up (opacity 0→1, y 12→0, 250ms ease-out)
- Card hover: translateY -2px
- Smooth transitions on all interactive elements

