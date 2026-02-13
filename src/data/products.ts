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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
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
    images: ["/placeholder.svg"],
    description: "Full Corsair ecosystem: K70 RGB keyboard, Dark Core Pro wireless mouse, and HS70 Pro wireless headset.",
    specs: [
      { label: "Includes", value: "Keyboard + Mouse + Headset" },
      { label: "Savings", value: "PKR 3,500 off" },
    ],
    isCombo: true,
    comboItems: ["Corsair K70 RGB MK.2", "Corsair Dark Core RGB Pro", "Corsair HS70 Pro Wireless"],
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    name: "Ahmed K.",
    rating: 5,
    text: "Got a HyperX Cloud II in amazing condition. Sounds brand new. Fast delivery to Karachi!",
    image: "/placeholder.svg",
    productId: "hp-1",
  },
  {
    id: "r2",
    name: "Sara M.",
    rating: 5,
    text: "The Razer DeathAdder V2 was exactly as described. 9/10 condition and tracks perfectly.",
    image: "/placeholder.svg",
    productId: "ms-1",
  },
  {
    id: "r3",
    name: "Bilal H.",
    rating: 4,
    text: "Bought the Starter FPS Bundle. Great value combo. Both items work flawlessly.",
    image: "/placeholder.svg",
    productId: "combo-1",
  },
  {
    id: "r4",
    name: "Fatima R.",
    rating: 5,
    text: "Impressed by the quality check. My Corsair K70 was thoroughly tested before shipping.",
    image: "/placeholder.svg",
    productId: "kb-3",
  },
  {
    id: "r5",
    name: "Usman T.",
    rating: 4,
    text: "Logitech G502 arrived well-packed. Condition notes were honest. Very trustworthy seller.",
    image: "/placeholder.svg",
    productId: "ms-2",
  },
  {
    id: "r6",
    name: "Zainab A.",
    rating: 5,
    text: "Second time ordering. The exchange policy gave me confidence. Excellent experience overall!",
    image: "/placeholder.svg",
  },
];

export const categories = ["Keyboards", "Mouse", "Headphones"] as const;
export const brands = ["HyperX", "Razer", "Corsair", "Logitech"] as const;
