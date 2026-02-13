// ─── Centralized Data Source ───────────────────────────────────────────
// All application content lives here. No database — this is the single
// source of truth consumed by every page and component.
// ───────────────────────────────────────────────────────────────────────

// ─── Product Images (mapped by product ID) ────────────────────────────
import prodKb1 from "@/assets/prod-kb1.jpg";
import prodKb2 from "@/assets/prod-kb2.jpg";
import prodKb3 from "@/assets/prod-kb3.jpg";
import prodKb4 from "@/assets/prod-kb4.jpg";
import prodMs1 from "@/assets/prod-ms1.jpg";
import prodMs2 from "@/assets/prod-ms2.jpg";
import prodMs3 from "@/assets/prod-ms3.jpg";
import prodMs4 from "@/assets/prod-ms4.jpg";
import prodHp1 from "@/assets/prod-hp1.jpg";
import prodHp2 from "@/assets/prod-hp2.jpg";
import prodHp3 from "@/assets/prod-hp3.jpg";
import prodHp4 from "@/assets/prod-hp4.jpg";
import prodCombo1 from "@/assets/prod-combo1.jpg";
import prodCombo2 from "@/assets/prod-combo2.jpg";
import prodCombo3 from "@/assets/prod-combo3.jpg";
import prodCombo4 from "@/assets/prod-combo4.jpg";
import bannerImage from "@/assets/banner-arrivals.jpg";
import catKeyboards from "@/assets/cat-keyboards.jpg";
import catMouse from "@/assets/cat-mouse.jpg";
import catHeadphones from "@/assets/cat-headphones.jpg";

// ─── Types ────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  title: string;
  category: "Keyboards" | "Mouse" | "Headphones";
  brand: "HyperX" | "Razer" | "Corsair" | "Logitech";
  pricePKR: number;
  originalPricePKR?: number;
  conditionScore: number;
  conditionNote: string;
  stockQty: number;
  images: string[];
  description: string;
  specs: { label: string; value: string }[];
  isCombo: boolean;
  comboItems?: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  image: string;
  productId?: string;
}

export interface DeliveryOption {
  id: string;
  label: string;
  days: string;
  description: string;
}

export interface CityDelivery {
  city: string;
  express: number;
  standard: number;
  economy: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactDetail {
  type: "location" | "email" | "phone" | "hashtag";
  label: string;
  value: string;
}

export interface PolicySection {
  title: string;
  content: string;
  list?: string[];
}

// ─── Images ───────────────────────────────────────────────────────────

export const productImages: Record<string, string> = {
  "kb-1": prodKb1,
  "kb-2": prodKb2,
  "kb-3": prodKb3,
  "kb-4": prodKb4,
  "ms-1": prodMs1,
  "ms-2": prodMs2,
  "ms-3": prodMs3,
  "ms-4": prodMs4,
  "hp-1": prodHp1,
  "hp-2": prodHp2,
  "hp-3": prodHp3,
  "hp-4": prodHp4,
  "combo-1": prodCombo1,
  "combo-2": prodCombo2,
  "combo-3": prodCombo3,
  "combo-4": prodCombo4,
  // combo-5 and combo-6 reuse existing images
  "combo-5": prodCombo1,
  "combo-6": prodCombo2,
};

export { bannerImage };

export const categoryImages: Record<string, string> = {
  Keyboards: catKeyboards,
  Mouse: catMouse,
  Headphones: catHeadphones,
  Combos: prodCombo1,
};

// ─── Categories & Brands ──────────────────────────────────────────────

export const categories = ["Keyboards", "Mouse", "Headphones"] as const;
export const filterCategories = ["Keyboards", "Mouse", "Headphones", "Combos"] as const;
export const brands = ["HyperX", "Razer", "Corsair", "Logitech"] as const;

// ─── Products ─────────────────────────────────────────────────────────

export const products: Product[] = [
  {
    id: "kb-1",
    title: "HyperX Alloy FPS Pro",
    category: "Keyboards",
    brand: "HyperX",
    pricePKR: 7500,
    originalPricePKR: 12000,
    conditionScore: 8,
    conditionNote: "Minor key shine on WASD, fully functional. Cherry MX Red switches.",
    stockQty: 3,
    images: [prodKb1],
    description: "Compact tenkeyless mechanical keyboard with Cherry MX Red switches. Ultra-portable design with detachable cable. Red LED backlighting with multiple modes.",
    specs: [
      { label: "Switch Type", value: "Cherry MX Red" },
      { label: "Layout", value: "Tenkeyless (TKL)" },
      { label: "Backlight", value: "Red LED" },
      { label: "Connection", value: "Wired USB" },
      { label: "Weight", value: "900g" },
    ],
    isCombo: false,
  },
  {
    id: "kb-2",
    title: "Razer BlackWidow V3",
    category: "Keyboards",
    brand: "Razer",
    pricePKR: 12000,
    originalPricePKR: 22000,
    conditionScore: 9,
    conditionNote: "Like new condition. Minimal use, all keys responsive. Original box included.",
    stockQty: 2,
    images: [prodKb2],
    description: "Full-size mechanical keyboard with Razer Green switches. Doubleshot ABS keycaps for superior durability. Chroma RGB with individually addressable keys.",
    specs: [
      { label: "Switch Type", value: "Razer Green" },
      { label: "Layout", value: "Full-size" },
      { label: "Backlight", value: "Chroma RGB" },
      { label: "Connection", value: "Wired USB-C" },
      { label: "Weight", value: "1.2kg" },
    ],
    isCombo: false,
  },
  {
    id: "kb-3",
    title: "Corsair K70 RGB MK.2",
    category: "Keyboards",
    brand: "Corsair",
    pricePKR: 14000,
    conditionScore: 7,
    conditionNote: "Visible wear on spacebar. All switches work perfectly. Volume wheel included.",
    stockQty: 1,
    images: [prodKb3],
    description: "Premium mechanical keyboard with Cherry MX Speed switches. Aircraft-grade aluminum frame with per-key RGB backlighting and dedicated media controls.",
    specs: [
      { label: "Switch Type", value: "Cherry MX Speed" },
      { label: "Layout", value: "Full-size" },
      { label: "Backlight", value: "Per-key RGB" },
      { label: "Connection", value: "Wired USB" },
      { label: "Frame", value: "Aluminum" },
    ],
    isCombo: false,
  },
  {
    id: "kb-4",
    title: "Logitech G Pro X",
    category: "Keyboards",
    brand: "Logitech",
    pricePKR: 11000,
    conditionScore: 8,
    conditionNote: "Great condition. Hot-swappable switches. Comes with extra GX Blue switches.",
    stockQty: 4,
    images: [prodKb4],
    description: "Compact tenkeyless design built for esports. Hot-swappable GX switches let you change switch types without soldering. LIGHTSYNC RGB.",
    specs: [
      { label: "Switch Type", value: "GX Red (swappable)" },
      { label: "Layout", value: "Tenkeyless (TKL)" },
      { label: "Backlight", value: "LIGHTSYNC RGB" },
      { label: "Connection", value: "Wired micro-USB" },
      { label: "Weight", value: "980g" },
    ],
    isCombo: false,
  },
  {
    id: "ms-1",
    title: "Razer DeathAdder V2",
    category: "Mouse",
    brand: "Razer",
    pricePKR: 5500,
    originalPricePKR: 9000,
    conditionScore: 9,
    conditionNote: "Barely used. No scratches, smooth glides. Sensor tracks flawlessly.",
    stockQty: 5,
    images: [prodMs1],
    description: "Iconic ergonomic shape with Focus+ 20K DPI optical sensor. 8 programmable buttons with Razer Optical switches rated for 70 million clicks.",
    specs: [
      { label: "Sensor", value: "Focus+ 20K DPI" },
      { label: "Switches", value: "Razer Optical" },
      { label: "Weight", value: "82g" },
      { label: "Connection", value: "Wired USB" },
      { label: "Buttons", value: "8 programmable" },
    ],
    isCombo: false,
  },
  {
    id: "ms-2",
    title: "Logitech G502 Hero",
    category: "Mouse",
    brand: "Logitech",
    pricePKR: 6000,
    originalPricePKR: 11000,
    conditionScore: 7,
    conditionNote: "Some grip wear on sides. Scroll wheel and buttons in great shape. Weights included.",
    stockQty: 3,
    images: [prodMs2],
    description: "Legendary gaming mouse with HERO 25K sensor. 11 programmable buttons, adjustable weight system, and dual-mode scroll wheel.",
    specs: [
      { label: "Sensor", value: "HERO 25K DPI" },
      { label: "Switches", value: "Omron" },
      { label: "Weight", value: "121g (adjustable)" },
      { label: "Connection", value: "Wired USB" },
      { label: "Buttons", value: "11 programmable" },
    ],
    isCombo: false,
  },
  {
    id: "ms-3",
    title: "HyperX Pulsefire Haste",
    category: "Mouse",
    brand: "HyperX",
    pricePKR: 4500,
    conditionScore: 8,
    conditionNote: "Honeycomb shell in perfect shape. Extra grip tape and skates included.",
    stockQty: 6,
    images: [prodMs3],
    description: "Ultra-light 59g gaming mouse with honeycomb hex shell design. TTC Golden micro dustproof switches rated for 60M clicks. Pure virgin-grade PTFE skates.",
    specs: [
      { label: "Sensor", value: "16K DPI" },
      { label: "Switches", value: "TTC Golden" },
      { label: "Weight", value: "59g" },
      { label: "Connection", value: "Wired USB-C" },
      { label: "Buttons", value: "6" },
    ],
    isCombo: false,
  },
  {
    id: "ms-4",
    title: "Corsair Dark Core RGB Pro",
    category: "Mouse",
    brand: "Corsair",
    pricePKR: 8000,
    conditionScore: 6,
    conditionNote: "Wireless dongle included. Some cosmetic wear. Battery holds well (~30hrs).",
    stockQty: 2,
    images: [prodMs4],
    description: "Wireless/wired gaming mouse with 18K DPI sensor. Sub-1ms Slipstream wireless, Qi charging compatible. Interchangeable side grips.",
    specs: [
      { label: "Sensor", value: "18K DPI" },
      { label: "Connection", value: "Wireless / Wired" },
      { label: "Battery", value: "~30 hours" },
      { label: "Weight", value: "133g" },
      { label: "Buttons", value: "8 programmable" },
    ],
    isCombo: false,
  },
  {
    id: "hp-1",
    title: "HyperX Cloud II",
    category: "Headphones",
    brand: "HyperX",
    pricePKR: 8500,
    originalPricePKR: 14000,
    conditionScore: 9,
    conditionNote: "Excellent condition. Memory foam pads still plush. 7.1 USB sound card included.",
    stockQty: 4,
    images: [prodHp1],
    description: "Award-winning gaming headset with 53mm drivers. Virtual 7.1 surround sound via USB sound card. Memory foam ear cushions and padded headband.",
    specs: [
      { label: "Drivers", value: "53mm" },
      { label: "Surround", value: "7.1 Virtual" },
      { label: "Mic", value: "Detachable noise-cancelling" },
      { label: "Connection", value: "3.5mm + USB" },
      { label: "Weight", value: "309g" },
    ],
    isCombo: false,
  },
  {
    id: "hp-2",
    title: "Razer Kraken X",
    category: "Headphones",
    brand: "Razer",
    pricePKR: 5000,
    conditionScore: 7,
    conditionNote: "Headband padding slightly compressed. Sound quality excellent. Mic works perfectly.",
    stockQty: 3,
    images: [prodHp2],
    description: "Ultra-light 250g gaming headset with custom-tuned 40mm drivers. 7.1 surround sound for positional audio. Bendable cardioid microphone.",
    specs: [
      { label: "Drivers", value: "40mm" },
      { label: "Surround", value: "7.1" },
      { label: "Mic", value: "Bendable cardioid" },
      { label: "Connection", value: "3.5mm" },
      { label: "Weight", value: "250g" },
    ],
    isCombo: false,
  },
  {
    id: "hp-3",
    title: "Corsair HS70 Pro Wireless",
    category: "Headphones",
    brand: "Corsair",
    pricePKR: 9500,
    conditionScore: 8,
    conditionNote: "Wireless works perfectly. ~16hr battery. Minor cosmetic marks on earcups.",
    stockQty: 2,
    images: [prodHp3],
    description: "Premium wireless gaming headset with custom-tuned 50mm neodymium drivers. Discord-certified detachable mic. Up to 16 hours of battery life.",
    specs: [
      { label: "Drivers", value: "50mm Neodymium" },
      { label: "Connection", value: "2.4GHz Wireless" },
      { label: "Battery", value: "~16 hours" },
      { label: "Mic", value: "Detachable, Discord-certified" },
      { label: "Weight", value: "330g" },
    ],
    isCombo: false,
  },
  {
    id: "hp-4",
    title: "Logitech G Pro X",
    category: "Headphones",
    brand: "Logitech",
    pricePKR: 10000,
    originalPricePKR: 18000,
    conditionScore: 9,
    conditionNote: "Near-mint. Blue VO!CE mic tech works perfectly. Both ear pads in great shape.",
    stockQty: 1,
    images: [prodHp4],
    description: "Pro-grade gaming headset with Blue VO!CE microphone technology. PRO-G 50mm drivers with next-gen surround sound. Memory foam padding with premium leatherette.",
    specs: [
      { label: "Drivers", value: "PRO-G 50mm" },
      { label: "Mic", value: "Blue VO!CE" },
      { label: "Surround", value: "DTS Headphone:X 2.0" },
      { label: "Connection", value: "3.5mm + USB DAC" },
      { label: "Weight", value: "320g" },
    ],
    isCombo: false,
  },
  // Combo deals
  {
    id: "combo-1",
    title: "Starter FPS Bundle",
    category: "Keyboards",
    brand: "HyperX",
    pricePKR: 11000,
    conditionScore: 8,
    conditionNote: "Both items in great condition. Tested together.",
    stockQty: 2,
    images: [prodCombo1],
    description: "Get started with competitive FPS gaming. Includes HyperX Alloy FPS Pro keyboard and HyperX Pulsefire Haste mouse at a bundle discount.",
    specs: [
      { label: "Includes", value: "Keyboard + Mouse" },
      { label: "Savings", value: "PKR 1,000 off" },
    ],
    isCombo: true,
    comboItems: ["HyperX Alloy FPS Pro", "HyperX Pulsefire Haste"],
  },
  {
    id: "combo-2",
    title: "Razer Essentials Pack",
    category: "Keyboards",
    brand: "Razer",
    pricePKR: 20000,
    conditionScore: 8,
    conditionNote: "All three items tested and working perfectly.",
    stockQty: 1,
    images: [prodCombo2],
    description: "Complete Razer gaming setup: BlackWidow V3 keyboard, DeathAdder V2 mouse, and Kraken X headset. Full ecosystem, one price.",
    specs: [
      { label: "Includes", value: "Keyboard + Mouse + Headset" },
      { label: "Savings", value: "PKR 2,500 off" },
    ],
    isCombo: true,
    comboItems: ["Razer BlackWidow V3", "Razer DeathAdder V2", "Razer Kraken X"],
  },
  {
    id: "combo-3",
    title: "Budget Audio Bundle",
    category: "Headphones",
    brand: "HyperX",
    pricePKR: 12500,
    conditionScore: 8,
    conditionNote: "Both headsets in excellent shape. Great for having a backup.",
    stockQty: 2,
    images: [prodCombo3],
    description: "Two premium headsets: HyperX Cloud II and Razer Kraken X. One for your desk, one on the go.",
    specs: [
      { label: "Includes", value: "2x Gaming Headsets" },
      { label: "Savings", value: "PKR 1,000 off" },
    ],
    isCombo: true,
    comboItems: ["HyperX Cloud II", "Razer Kraken X"],
  },
  {
    id: "combo-4",
    title: "Corsair Pro Setup",
    category: "Keyboards",
    brand: "Corsair",
    pricePKR: 28000,
    conditionScore: 7,
    conditionNote: "All items functional with cosmetic wear. Great value bundle.",
    stockQty: 1,
    images: [prodCombo4],
    description: "Full Corsair ecosystem: K70 RGB keyboard, Dark Core Pro wireless mouse, and HS70 Pro wireless headset.",
    specs: [
      { label: "Includes", value: "Keyboard + Mouse + Headset" },
      { label: "Savings", value: "PKR 3,500 off" },
    ],
    isCombo: true,
    comboItems: ["Corsair K70 RGB MK.2", "Corsair Dark Core RGB Pro", "Corsair HS70 Pro Wireless"],
  },
  {
    id: "combo-5",
    title: "Logitech Pro Performance",
    category: "Mouse",
    brand: "Logitech",
    pricePKR: 16000,
    conditionScore: 9,
    conditionNote: "Professional grade gear in excellent condition.",
    stockQty: 2,
    images: [prodCombo1],
    description: "The choice of esports pros. Logitech G Pro X Keyboard paired with the legendary G502 Hero mouse.",
    specs: [
      { label: "Includes", value: "Pro Keyboard + G502 Mouse" },
      { label: "Savings", value: "PKR 1,500 off" },
    ],
    isCombo: true,
    comboItems: ["Logitech G Pro X", "Logitech G502 Hero"],
  },
  {
    id: "combo-6",
    title: "Wireless Freedom Pack",
    category: "Keyboards",
    brand: "Corsair",
    pricePKR: 16500,
    conditionScore: 8,
    conditionNote: "Cut the cords without losing performance.",
    stockQty: 1,
    images: [prodCombo2],
    description: "Experience true wireless freedom with the Corsair Dark Core RGB Pro mouse and HS70 Pro Wireless headset.",
    specs: [
      { label: "Includes", value: "Wireless Mouse + Headset" },
      { label: "Savings", value: "PKR 1,000 off" },
    ],
    isCombo: true,
    comboItems: ["Corsair Dark Core RGB Pro", "Corsair HS70 Pro Wireless"],
  },
];

// ─── Delivery ─────────────────────────────────────────────────────────

export const deliveryOptions: DeliveryOption[] = [
  { id: "express", label: "Express", days: "1–2 days", description: "Fastest delivery" },
  { id: "standard", label: "Standard", days: "3–5 days", description: "Regular delivery" },
  { id: "economy", label: "Economy", days: "6–8 days", description: "Budget-friendly" },
];

export const cityDeliveryCharges: CityDelivery[] = [
  { city: "Karachi", express: 350, standard: 200, economy: 100 },
  { city: "Lahore", express: 500, standard: 350, economy: 200 },
  { city: "Islamabad", express: 550, standard: 400, economy: 250 },
  { city: "Rawalpindi", express: 550, standard: 400, economy: 250 },
  { city: "Faisalabad", express: 500, standard: 350, economy: 200 },
  { city: "Multan", express: 550, standard: 400, economy: 250 },
  { city: "Peshawar", express: 600, standard: 450, economy: 300 },
  { city: "Quetta", express: 700, standard: 500, economy: 350 },
  { city: "Hyderabad", express: 400, standard: 250, economy: 150 },
  { city: "Other", express: 650, standard: 450, economy: 300 },
];

// ─── Reviews ──────────────────────────────────────────────────────────

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Ahmed K.",
    rating: 5,
    text: "The keyboard I bought was listed as 8/10 but honestly looks brand new. Fast delivery to Lahore too!",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "r2",
    name: "Sara M.",
    rating: 5,
    text: "Got a Razer Viper Ultimate. Battery life is amazing and condition is perfect. Highly recommended for competitive gamers.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "r3",
    name: "Bilal R.",
    rating: 4,
    text: "Good packaging and genuine product. The mouse had a tiny scratch as described, but works perfectly.",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "r4",
    name: "Zainab A.",
    rating: 5,
    text: "Best place for used gear. The headphones were clean and sound crisp. Will definitely buy again.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "r5",
    name: "Omar F.",
    rating: 5,
    text: "Customer support on WhatsApp is very responsive. They helped me choose the right keyboard switch.",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "r6",
    name: "Hassan T.",
    rating: 4,
    text: "Delivery took 4 days to Multan, but the product quality made it worth the wait. Solid packaging.",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "r7",
    name: "Usman G.",
    rating: 5,
    text: "Found a rare discontinued mouse here. Condition was even better than the photos. 10/10 experience.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "r8",
    name: "Fatima S.",
    rating: 5,
    text: "Was skeptical about buying used, but the 3-day check warranty gave me peace of mind. Everything works great.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "r9",
    name: "Kamran J.",
    rating: 5,
    text: "Combo deal saved me 5k compared to market prices. The keyboard and mouse sync perfectly.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80",
  },
  {
    id: "r10",
    name: "Ali H.",
    rating: 4,
    text: "Authentic gear. The box was a bit damaged but the headset itself was pristine. Good value.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────

export const faqs: FAQ[] = [
  {
    question: "Are all products tested before shipping?",
    answer: "Yes, every single item is inspected, graded, and tested for full functionality before being listed on our store.",
  },
  {
    question: "What does the condition score mean?",
    answer: "We grade every product on a scale of 1–10. Excellent (9–10) means near-new, Very Good (7–8) means minor cosmetic wear, and Good (5–6) means visible wear but fully functional.",
  },
  {
    question: "Do you offer returns or exchanges?",
    answer: "We offer a 3-day exchange policy on all products. If the item doesn't match the listed condition, we'll replace it at no extra cost.",
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery takes 2–5 business days depending on your city. We ship nationwide across Pakistan with tracking on every order.",
  },
  {
    question: "Can I pay cash on delivery?",
    answer: "Yes, we support Cash on Delivery (COD) for all orders within Pakistan. Online payment options are also available.",
  },
];

// ─── Contact Information ──────────────────────────────────────────────

export const contactInfo: ContactDetail[] = [
  { type: "location", label: "Location", value: "Karachi, Pakistan" },
  { type: "email", label: "Email", value: "hammadparekh52@gmail.com" },
  { type: "phone", label: "Phone", value: "0313-2153277" },
  { type: "hashtag", label: "Hashtag", value: "@hashtechgaming" },
];

export const supportHours = "Monday–Saturday, 10:00 AM – 8:00 PM (PKT)";
export const supportEmail = "support@hashtech.pk";
export const whatsappNumber = "+923132153277";
export const whatsappLink = `https://wa.me/${whatsappNumber.replace("+", "")}`;
export const instagramLink = "https://instagram.com/hashtechgaming";

// ─── Privacy Policy ───────────────────────────────────────────────────

export const privacyPolicy: PolicySection[] = [
  {
    title: "Data Collection",
    content: "We collect information that you provide specifically for the purpose of processing your order. This typically includes your:",
    list: ["Full Name", "Delivery Address", "Phone Number", "Email Address"],
  },
  {
    title: "Usage of Information",
    content: "Your data is used strictly for:",
    list: [
      "Processing and delivering your order via our courier partners.",
      "Communicating order status updates.",
      "Providing customer support if issues arise.",
    ],
  },
  {
    title: "Data Security",
    content: "We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information.",
  },
];

export const privacyNote = "We do NOT sell, trade, or rent your personal identification information to others.";
export const privacyFooter = "You can request deletion of your data at any time by contacting us.";

// ─── Terms & Conditions ───────────────────────────────────────────────

export const termsAndConditions: PolicySection[] = [
  {
    title: "1. General Agreement",
    content: "By accessing or using the Hashtech Gaming website and services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.",
  },
  {
    title: "2. Product Condition & Grading",
    content: "Hashtech specializes in pre-owned gaming gear. We inspect every item and grade it on a scale of 1-10. It is your responsibility to review the condition score and photos before purchasing.",
    list: [
      "Excellent (9-10): Near new condition, minimal to no signs of use.",
      "Very Good (7-8): Minor cosmetic wear, scratches, or shine, but fully functional.",
      "Good (5-6): Visible wear, scuffs, or discoloration. Fully functional unless stated otherwise.",
    ],
  },
  {
    title: "3. Orders & Pricing",
    content: "All prices are listed in Pakistani Rupees (PKR). We reserve the right to change prices at any time without notice. We reserve the right to cancel any order for any reason, including but not limited to stock unavailability, errors in pricing, or suspicion of fraud.",
  },
  {
    title: "4. Warranty & Liability",
    content: "Unless explicitly stated, our used products are sold \"as-is\" without manufacturer warranty. We provide our own 3-day check warranty purely for functional defects present at the time of delivery. Hashtech Gaming shall not be liable for indirect, incidental, or consequential damages resulting from the use of our products.",
  },
];

export const termsFooter = `Questions about our Terms? Contact us at ${supportEmail}`;

// ─── Exchange / Return Policy ─────────────────────────────────────────

export const exchangeHighlight = {
  title: "3-Day Check Warranty",
  description: "We offer a 3-day checking warranty from the date of delivery. If you find a functional defect that wasn't mentioned in the product description, we will exchange it.",
};

export const exchangeEligibility: string[] = [
  "Item must be in the exact same condition as received.",
  "All accessories, cables, and packaging must be returned.",
  "Defect must be reported within 3 days of delivery.",
  "Proof of purchase (Order ID) is required.",
];

export const exchangeNonEligible: string[] = [
  "Change of mind",
  "Physical damage by user",
  "Software/Driver issues",
  "Cosmetic wear noted in listing",
];

// ─── Why Us / Trust Signals ───────────────────────────────────────────

export const whyUsReasons = [
  {
    title: "Quality Tested",
    desc: "Every single item is inspected, graded honestly, and tested for performance before listing on our store.",
  },
  {
    title: "Secure Packaging",
    desc: "We double-box every order with protective foam inserts to ensure your gear arrives in perfect condition.",
  },
  {
    title: "Nationwide Delivery",
    desc: "Fast and reliable shipping to all major cities across Pakistan with real-time tracking on every order.",
  },
  {
    title: "Trusted by Gamers",
    desc: "Hundreds of verified buyers trust us for honest condition grading, fair prices, and excellent after-sales support.",
  },
];

// ─── Site Metadata ────────────────────────────────────────────────────

export const siteName = "Hash Tech";
export const siteTagline = "Premium pre-owned gaming gear. Quality tested and verified in Pakistan. Every item inspected before shipping.";
export const siteCopyright = `© ${new Date().getFullYear()} Hashtech Gaming. All rights reserved.`;
