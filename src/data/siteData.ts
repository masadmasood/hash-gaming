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
import bannerImageAsset from "@/assets/banner-arrivals.jpg";
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
  "kb-1": prodKb1.src,
  "kb-2": prodKb2.src,
  "kb-3": prodKb3.src,
  "kb-4": prodKb4.src,
  "ms-1": prodMs1.src,
  "ms-2": prodMs2.src,
  "ms-3": prodMs3.src,
  "ms-4": prodMs4.src,
  "hp-1": prodHp1.src,
  "hp-2": prodHp2.src,
  "hp-3": prodHp3.src,
  "hp-4": prodHp4.src,
  "combo-1": prodCombo1.src,
  "combo-2": prodCombo2.src,
  "combo-3": prodCombo3.src,
  "combo-4": prodCombo4.src,
  // combo-5 and combo-6 reuse existing images
  "combo-5": prodCombo1.src,
  "combo-6": prodCombo2.src,
};

export const bannerImage = bannerImageAsset.src;

export const categoryImages: Record<string, string> = {
  Keyboards: catKeyboards.src,
  Mouse: catMouse.src,
  Headphones: catHeadphones.src,
  Combos: prodCombo1.src,
};

// ─── Categories & Brands ──────────────────────────────────────────────

export const categories = ["Keyboards", "Mouse", "Headphones"] as const;
export const filterCategories = ["Keyboards", "Mouse", "Headphones", "Combos"] as const;
export const brands = ["HyperX", "Razer", "Corsair", "Logitech"] as const;

// ─── Products ─────────────────────────────────────────────────────────

const rawProducts: Product[] = [
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
    images: [prodKb1.src],
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
    images: [prodKb2.src],
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
    images: [prodKb3.src],
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
    images: [prodKb4.src],
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
    images: [prodMs1.src],
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
    images: [prodMs2.src],
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
    images: [prodMs3.src],
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
    images: [prodMs4.src],
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
    images: [prodHp1.src],
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
    images: [prodHp2.src],
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
    images: [prodHp3.src],
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
    images: [prodHp4.src],
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
    images: [prodCombo1.src],
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
    images: [prodCombo2.src],
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
    images: [prodCombo3.src],
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
    images: [prodCombo4.src],
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
    images: [prodCombo1.src],
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
    images: [prodCombo2.src],
    description: "Experience true wireless freedom with the Corsair Dark Core RGB Pro mouse and HS70 Pro Wireless headset.",
    specs: [
      { label: "Includes", value: "Wireless Mouse + Headset" },
      { label: "Savings", value: "PKR 1,000 off" },
    ],
    isCombo: true,
    comboItems: ["Corsair Dark Core RGB Pro", "Corsair HS70 Pro Wireless"],
  },
  // ── Low condition + out-of-stock items ───────────────────────────────
  {
    id: "kb-oos",
    title: "Corsair K55 RGB Pro",
    category: "Keyboards",
    brand: "Corsair",
    pricePKR: 3500,
    originalPricePKR: 8000,
    conditionScore: 5,
    conditionNote: "Several keys sticky after liquid exposure. RGB uneven on left side. Still types but needs cleaning.",
    stockQty: 1,
    images: [prodKb3.src],
    description: "Entry-level membrane gaming keyboard with per-zone RGB backlighting. 12 dedicated macro keys, multimedia hotkeys, and IP42 dust and spill resistance.",
    specs: [
      { label: "Type", value: "Membrane" },
      { label: "Layout", value: "Full-size" },
      { label: "Backlight", value: "Per-zone RGB (3 zones)" },
      { label: "Connection", value: "Wired USB" },
      { label: "Extra", value: "12 macro keys" },
    ],
    isCombo: false,
  },
  {
    id: "kb-5",
    title: "Razer Huntsman Mini",
    category: "Keyboards",
    brand: "Razer",
    pricePKR: 9500,
    originalPricePKR: 17000,
    conditionScore: 5,
    conditionNote: "Heavy WASD wear and one missing stabiliser plate. Switches functional but mushy. Sold as-is.",
    stockQty: 0,
    images: [prodKb2.src],
    description: "60% compact Razer optical keyboard. Razer Linear Optical switches for instant actuation. Chroma RGB per-key backlighting in a portable form factor.",
    specs: [
      { label: "Switch Type", value: "Razer Linear Optical" },
      { label: "Layout", value: "60%" },
      { label: "Backlight", value: "Chroma RGB" },
      { label: "Connection", value: "Wired USB-C" },
      { label: "Weight", value: "715g" },
    ],
    isCombo: false,
  },
  {
    id: "ms-5",
    title: "Logitech G Pro Wireless",
    category: "Mouse",
    brand: "Logitech",
    pricePKR: 11000,
    originalPricePKR: 19000,
    conditionScore: 4,
    conditionNote: "Deep side scratches and worn left-click. Wireless dongle missing. Sensor still accurate.",
    stockQty: 0,
    images: [prodMs2.src],
    description: "Pro-grade wireless mouse used by top esports athletes. HERO 25K sensor with zero smoothing or filtering. Ambidextrous design at a featherweight 61g.",
    specs: [
      { label: "Sensor", value: "HERO 25K DPI" },
      { label: "Connection", value: "Lightspeed Wireless" },
      { label: "Battery", value: "~60 hours" },
      { label: "Weight", value: "61g" },
      { label: "Buttons", value: "8 programmable" },
    ],
    isCombo: false,
  },
  {
    id: "hp-5",
    title: "HyperX Cloud Alpha S",
    category: "Headphones",
    brand: "HyperX",
    pricePKR: 7000,
    originalPricePKR: 15000,
    conditionScore: 5,
    conditionNote: "Right earcup foam torn. Headband creak present. Audio and mic fully functional. Perfect for repair enthusiasts.",
    stockQty: 0,
    images: [prodHp1.src],
    description: "Dual-chamber audio design for rich low-end and crisp highs. Adjustable bass slider for personalised sound. Braided USB cable with 7.1 surround.",
    specs: [
      { label: "Drivers", value: "50mm Dual-Chamber" },
      { label: "Surround", value: "7.1 Virtual" },
      { label: "Mic", value: "Detachable noise-cancelling" },
      { label: "Connection", value: "3.5mm + USB" },
      { label: "Weight", value: "335g" },
    ],
    isCombo: false,
  },
];

// ─── Delivery ─────────────────────────────────────────────────────────

const CATALOG_TARGET_COUNT = 200;
const GENERATED_OUT_OF_STOCK_COUNT = 25;

const catalogVariantLabels = [
  "Checked Batch",
  "Karachi Stock",
  "Fresh Arrival",
  "Tournament Ready",
  "Clean Unit",
  "Value Pick",
  "Pro Desk",
  "Weekend Drop",
  "Low Use",
  "Store Tested",
];

function buildExpandedCatalog(baseProducts: Product[]): Product[] {
  const generated: Product[] = [];
  const generatedCount = Math.max(CATALOG_TARGET_COUNT - baseProducts.length, 0);
  let outOfStockGenerated = 0;

  for (let index = 0; index < generatedCount; index += 1) {
    const source = baseProducts[index % baseProducts.length];
    const sequence = index + 1;
    const batch = Math.floor(index / baseProducts.length) + 1;
    const makeOutOfStock = outOfStockGenerated < GENERATED_OUT_OF_STOCK_COUNT && index % 7 === 0;

    if (makeOutOfStock) {
      outOfStockGenerated += 1;
    }

    const conditionShift = (index % 3) - 1;
    const conditionScore = makeOutOfStock
      ? Math.max(4, source.conditionScore - (index % 3))
      : Math.min(10, Math.max(6, source.conditionScore + conditionShift));
    const priceDelta = (batch - 4) * 300 + (index % 5) * 250;
    const pricePKR = Math.max(2500, source.pricePKR + priceDelta);
    const label = catalogVariantLabels[index % catalogVariantLabels.length];

    generated.push({
      ...source,
      id: `catalog-${sequence}`,
      title: `${source.title} ${label}`,
      pricePKR,
      originalPricePKR: source.originalPricePKR
        ? Math.max(pricePKR + 1000, source.originalPricePKR + priceDelta + 800)
        : undefined,
      conditionScore,
      conditionNote: makeOutOfStock
        ? "This inspected unit is currently sold out. Similar stock may return in the next restock."
        : `${source.conditionNote} Rechecked in batch ${batch} with accessories verified where applicable.`,
      stockQty: makeOutOfStock ? 0 : (index % 6) + 1,
      images: [...source.images],
      description: `${source.description} This unit is part of our expanded inspected catalog for quick comparison.`,
      specs: source.specs.map((spec) => ({ ...spec })),
      comboItems: source.comboItems ? [...source.comboItems] : undefined,
    });
  }

  return [...baseProducts, ...generated];
}

function conditionGrade(score: number) {
  if (score >= 9) return `${score}/10 - Excellent`;
  if (score >= 7) return `${score}/10 - Very Good`;
  if (score >= 5) return `${score}/10 - Good`;
  return `${score}/10 - Fair`;
}

function specValue(product: Product, labels: string[], fallback: string) {
  const normalizedLabels = labels.map((label) => label.toLowerCase());
  return product.specs.find((spec) => normalizedLabels.includes(spec.label.toLowerCase()))?.value || fallback;
}

function withSpec(specs: Product["specs"], label: string, value: string) {
  if (specs.some((spec) => spec.label.toLowerCase() === label.toLowerCase())) return specs;
  return [...specs, { label, value }];
}

function completeSpecs(product: Product) {
  let specs = [...product.specs];
  const connection = specValue(product, ["Connection", "Interface", "Connectivity"], "USB / Wireless");
  const backlighting = specValue(product, ["Backlight", "Backlighting"], product.category === "Mouse" ? "Model dependent" : "Not listed");
  const weight = specValue(product, ["Weight"], product.isCombo ? "Varies by included item" : "Not listed");

  const categoryDefaults =
    product.isCombo
      ? {
          formFactor: "Bundle",
          switchType: "Varies by included item",
          cable: "Varies by included item",
          dimensions: "Varies by included item",
        }
      : product.category === "Keyboards"
        ? {
            formFactor: specValue(product, ["Layout", "Form Factor"], "Keyboard"),
            switchType: specValue(product, ["Switch Type", "Type"], "Not listed"),
            cable: connection.toLowerCase().includes("wireless") ? "Wireless or included cable" : "Included USB cable",
            dimensions: specValue(product, ["Dimensions"], "Keyboard dimensions vary by model"),
          }
        : product.category === "Mouse"
          ? {
              formFactor: "Gaming mouse",
              switchType: specValue(product, ["Switches", "Switch Type"], "Not listed"),
              cable: connection.toLowerCase().includes("wireless") ? "Wireless dongle or included cable" : "Included USB cable",
              dimensions: specValue(product, ["Dimensions"], "Mouse dimensions vary by model"),
            }
          : {
              formFactor: "Over-ear gaming headset",
              switchType: "Not applicable",
              cable: connection.toLowerCase().includes("wireless") ? "Wireless dongle or included cable" : "Included audio or USB cable",
              dimensions: specValue(product, ["Dimensions"], "Headset dimensions vary by model"),
            };

  specs = withSpec(specs, "Form Factor", categoryDefaults.formFactor);
  specs = withSpec(specs, "Switch Type", categoryDefaults.switchType);
  specs = withSpec(specs, "Interface", connection);
  specs = withSpec(specs, "Backlighting", backlighting);
  specs = withSpec(specs, "Cable", categoryDefaults.cable);
  specs = withSpec(specs, "Dimensions", categoryDefaults.dimensions);
  specs = withSpec(specs, "Weight", weight);
  specs = withSpec(specs, "Condition Grade", conditionGrade(product.conditionScore));

  return specs;
}

const catalogProducts = buildExpandedCatalog(rawProducts);

export const products: Product[] = catalogProducts.map((product) => ({
  ...product,
  specs: completeSpecs(product),
}));

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
    title: "What We Collect",
    content: "We collect the information needed to run a normal online store and deliver your order safely.",
    list: ["Full name", "Phone number and email address", "Delivery address and city", "Payment method, such as COD, bank transfer, or online payment reference", "Order details, support messages, and exchange requests"],
  },
  {
    title: "How We Use It",
    content: "We use your information only for store operations and customer support.",
    list: [
      "Processing orders, confirming payment, and arranging delivery.",
      "Sending order, shipping, and support updates.",
      "Handling exchanges, product questions, and after-sales support.",
      "Improving product listings, inventory planning, and customer service.",
      "We do not sell or rent customer data.",
    ],
  },
  {
    title: "Cookies",
    content: "We may use basic cookies or analytics tools to understand site traffic, improve page performance, remember preferences, and keep checkout working. These tools are not used to sell your personal information.",
  },
  {
    title: "Your Rights",
    content: "You can request access, correction, or deletion of your personal information by contacting our support email. We may retain limited order records where required for fraud prevention, accounting, exchange handling, or legal compliance.",
  },
  {
    title: "Contact for Privacy Concerns",
    content: `For privacy questions or deletion requests, contact us at ${supportEmail}.`,
  },
];

export const privacyNote = "We do not sell, trade, or rent your personal identification information to others.";
export const privacyFooter = "You can request deletion of your data at any time by contacting us.";

// ─── Terms & Conditions ───────────────────────────────────────────────

export const termsAndConditions: PolicySection[] = [
  {
    title: "1. Acceptance of Terms",
    content: "By using the Hashtech Gaming website, placing an order, contacting support, or buying from us, you agree to these Terms of Service. If you do not agree, please do not place an order.",
  },
  {
    title: "2. Product Condition Disclosure",
    content: "Hashtech specializes in pre-owned gaming gear. Every item is used unless clearly stated otherwise. We inspect and grade each product on a 1-10 scale, and buyers are responsible for reviewing photos, condition notes, accessories, stock status, and specifications before ordering.",
    list: [
      "Excellent (9-10): Near-new condition with minimal visible wear and full tested functionality.",
      "Very Good (7-8): Light cosmetic wear such as shine, small marks, or minor scratches, with full tested functionality.",
      "Good (5-6): Visible wear, scuffs, discoloration, or cosmetic flaws, with functional issues disclosed if present.",
      "Fair (below 5): Heavier wear or missing accessories; sold only when the listing clearly explains the condition.",
    ],
  },
  {
    title: "3. Pricing & Payment",
    content: "All prices are listed in Pakistani Rupees (PKR). We may support Cash on Delivery, bank transfer, or other payment methods shown at checkout. Orders may be cancelled if stock is unavailable, payment cannot be verified, pricing is incorrect, or fraud is suspected.",
  },
  {
    title: "4. Shipping & Delivery",
    content: "We ship orders across Pakistan. Typical delivery is 3-5 business days for major cities, though courier delays, weather, public holidays, incomplete addresses, or remote locations may extend timelines. Delivery charges and options are shown during checkout.",
  },
  {
    title: "5. Limitation of Liability",
    content: "Used products are sold with the condition disclosures shown in the listing and without manufacturer warranty unless stated otherwise. Hashtech Gaming is not responsible for indirect losses, software issues, misuse, compatibility problems, user-caused damage, or normal wear after delivery. Our maximum responsibility is limited to the amount paid for the relevant item.",
  },
  {
    title: "6. Governing Law",
    content: "These terms are governed by the laws of Pakistan. Any dispute should first be raised with Hashtech support so we can try to resolve it fairly and promptly.",
  },
];

export const termsFooter = `Questions about our Terms? Contact us at ${supportEmail}`;

// ─── Exchange / Return Policy ─────────────────────────────────────────

export const exchangeHighlight = {
  title: "3-Day Check Warranty",
  description: "We offer a 3-day exchange window from the date of delivery. If an item has a functional defect or does not match the listing, contact us on WhatsApp with your order ID and clear photos or video of the issue.",
};

export const exchangeEligibility: string[] = [
  "The issue must be reported within exactly 3 days from delivery.",
  "Start the exchange request on WhatsApp first and include your order ID, photos or video of the issue, and a short explanation.",
  "The item must be returned in the same condition received, with all included accessories, cables, dongles, boxes, and packaging.",
  "Covered issues include functional defects not disclosed in the listing, wrong item delivered, missing included accessories, or a condition that clearly does not match the listed grade.",
  "If the issue is confirmed as our mistake or a covered defect, Hashtech covers the replacement shipping. If the item is not eligible, the customer is responsible for return shipping.",
  "If a direct replacement is unavailable, we may offer a similar item, store credit, or another fair resolution.",
];

export const exchangeNonEligible: string[] = [
  "Change of mind, preference, or ordering the wrong model.",
  "Physical damage, liquid damage, tampering, repairs, opened internals, or misuse after delivery.",
  "Software, driver, RGB profile, operating system, or game compatibility issues when the hardware itself is functional.",
  "Cosmetic wear, scratches, shine, dents, battery estimates, or missing items that were already disclosed in the listing.",
  "Items returned without the included accessories, dongles, cables, or packaging.",
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
