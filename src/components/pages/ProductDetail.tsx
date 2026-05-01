"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Camera,
  ChevronRight,
  Minus,
  Package,
  PackageCheck,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { products, reviews as siteReviews, productImages, type Product } from "@/data/siteData";
import { PageTransition } from "@/components/PageTransition";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { getConditionLabel } from "@/lib/condition";
import { cn } from "@/lib/utils";

interface ProductDetailPageProps {
  productId: string;
}

// ─── Local Review Types ────────────────────────────────────────────────
interface LocalReview {
  id: string;
  productId: string;
  name: string;
  rating: number;
  text: string;
  photoDataUrl?: string;
  createdAt: string;
}

const REVIEWS_KEY = "hashtech-product-reviews";
const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

function readLocalReviews(productId: string): LocalReview[] {
  if (typeof window === "undefined") return [];
  try {
    const all: LocalReview[] = JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
    return all.filter((r) => r.productId === productId);
  } catch {
    return [];
  }
}

function saveLocalReview(review: LocalReview) {
  try {
    const all: LocalReview[] = JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
    localStorage.setItem(REVIEWS_KEY, JSON.stringify([review, ...all]));
  } catch {
    /* ignore */
  }
}

function deleteLocalReview(id: string) {
  try {
    const all: LocalReview[] = JSON.parse(localStorage.getItem(REVIEWS_KEY) || "[]");
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(all.filter((r) => r.id !== id)));
  } catch {
    /* ignore */
  }
}

// ─── Review Form Schema ────────────────────────────────────────────────
const reviewSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  rating: z.number().min(1, "Please select a rating").max(5),
  text: z.string().trim().min(10, "Review must be at least 10 characters"),
});

type ReviewForm = z.infer<typeof reviewSchema>;

function pickSpec(product: Product, labels: string[]) {
  const wanted = labels.map((label) => label.toLowerCase());
  return product.specs.find((spec) => wanted.includes(spec.label.toLowerCase()))?.value;
}

function buildSpecRows(
  product: Product,
  condition: { label: string; grade: string },
  inStock: boolean,
) {
  const connection = pickSpec(product, ["Connection", "Connectivity"]) || "See product notes";
  const weight = pickSpec(product, ["Weight"]) || "Not listed";

  const categoryRows =
    product.isCombo
      ? [
          ["Included Items", product.comboItems?.join(" + ") || "Combo bundle"],
          ["Bundle Type", product.comboItems && product.comboItems.length > 2 ? "Keyboard, mouse, and headset bundle" : "Multi-item gaming bundle"],
          ["Connectivity", connection],
          ["Backlighting", pickSpec(product, ["Backlight", "Backlighting"]) || "Varies by included item"],
          ["Weight", "Varies by included item"],
        ]
      : product.category === "Keyboards"
        ? [
            ["Switch Type", pickSpec(product, ["Switch Type", "Type"]) || "Not listed"],
            ["Form Factor", pickSpec(product, ["Layout", "Form Factor"]) || "Not listed"],
            ["Connectivity", connection],
            ["Backlighting", pickSpec(product, ["Backlight", "Backlighting"]) || "Not listed"],
            ["Weight", weight],
          ]
        : product.category === "Mouse"
          ? [
              ["Sensor", pickSpec(product, ["Sensor"]) || "Not listed"],
              ["Switches", pickSpec(product, ["Switches", "Switch Type"]) || "Not listed"],
              ["Connectivity", connection],
              ["Buttons", pickSpec(product, ["Buttons"]) || "Not listed"],
              ["Weight", weight],
            ]
          : [
              ["Drivers", pickSpec(product, ["Drivers"]) || "Not listed"],
              ["Microphone", pickSpec(product, ["Mic", "Microphone"]) || "Not listed"],
              ["Connectivity", connection],
              ["Surround Sound", pickSpec(product, ["Surround"]) || "Not listed"],
              ["Weight", weight],
            ];

  return [
    ["Brand", product.brand],
    ["Category", product.isCombo ? "Combo bundle" : product.category],
    ...categoryRows,
    ["Cable", pickSpec(product, ["Cable"]) || "Not listed"],
    ["Dimensions", pickSpec(product, ["Dimensions"]) || "Not listed"],
    ["Condition Grade", `${condition.label} (${condition.grade})`],
    ["Condition Notes", product.conditionNote],
    ["Availability", inStock ? `${product.stockQty} units available` : "Out of stock"],
    ["After-Sales Support", "3-day exchange if the item is defective or not as described"],
  ];
}

function buildProductNarrative(
  product: Product,
  condition: { label: string; grade: string },
  inStock: boolean,
) {
  const itemType = product.isCombo ? "bundle" : product.category.toLowerCase();
  const stockSentence = inStock
    ? `${product.stockQty} unit${product.stockQty === 1 ? "" : "s"} currently available.`
    : "This item is currently out of stock.";
  const comboSentence = product.isCombo && product.comboItems?.length
    ? ` The bundle includes ${product.comboItems.join(", ")}.`
    : "";

  return `${product.title} is a pre-owned ${product.brand} ${itemType} inspected by Hashtech before listing. It is graded ${condition.label} (${condition.grade}), with cosmetic and functional notes checked so you know what you are buying before checkout. ${product.description} ${stockSentence}${comboSentence}`;
}

// ─── Star Rating Component ─────────────────────────────────────────────
function StarRating({
  value,
  onChange,
  readonly = false,
  size = "md",
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const [hovered, setHovered] = useState(0);
  const sz = size === "sm" ? "h-3.5 w-3.5" : size === "lg" ? "h-6 w-6" : "h-5 w-5";

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={readonly}
          aria-label={`${i} star${i > 1 ? "s" : ""}`}
          aria-pressed={!readonly ? value === i : undefined}
          onClick={() => onChange?.(i)}
          onMouseEnter={() => !readonly && setHovered(i)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={cn("rounded-sm transition-transform duration-150", !readonly && "cursor-pointer hover:scale-125 active:scale-95", readonly && "cursor-default")}
        >
          <Star
            className={cn(
              sz,
              "transition-colors duration-150",
              (hovered || value) >= i ? "fill-orange-500 text-orange-500" : "fill-transparent text-muted-foreground/40",
            )}
          />
        </button>
      ))}
    </div>
  );
}

// ─── Review Card ───────────────────────────────────────────────────────
function ReviewCard({
  review,
  onDelete,
}: {
  review: { id: string; name: string; rating: number; text: string; image?: string; photoDataUrl?: string; createdAt?: string };
  onDelete?: () => void;
}) {
  const attachedImage = review.photoDataUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="overflow-hidden rounded-card border border-border bg-card/80 shadow-sm"
    >
      {attachedImage && (
        <div className="relative aspect-[16/9] border-b border-border bg-surface">
          <Image
            src={attachedImage}
            alt={`${review.name}'s review photo`}
            fill
            unoptimized
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border bg-surface">
              {review.image ? (
                <Image src={review.image} alt={review.name} fill sizes="48px" className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-base font-bold text-foreground">
                  {review.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{review.name}</p>
              <div className="mt-1 flex items-center gap-2">
                <StarRating value={review.rating} readonly size="sm" />
                <span className="text-xs text-muted-foreground">{review.rating}/5</span>
              </div>
            </div>
          </div>
          {onDelete && (
            <button
              onClick={onDelete}
              className="rounded-full border border-border bg-background/40 p-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Delete review"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">"{review.text}"</p>
      </div>
    </motion.div>
  );
}

function ratingLabel(value: number) {
  if (value >= 4.5) return "Excellent";
  if (value >= 4) return "Great";
  if (value >= 3) return "Good";
  if (value >= 2) return "Fair";
  return "New";
}

// ─── Main Component ────────────────────────────────────────────────────
const ProductDetail = ({ productId }: ProductDetailPageProps) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === productId);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [localReviews, setLocalReviews] = useState<LocalReview[]>([]);
  const [reviewPhoto, setReviewPhoto] = useState<{ dataUrl: string; name: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (product) setLocalReviews(readLocalReviews(product.id));
  }, [product]);

  const form = useForm<ReviewForm>({
    resolver: zodResolver(reviewSchema),
    mode: "onChange",
    defaultValues: { name: "", rating: 0, text: "" },
  });

  if (!product) {
    return (
      <PageTransition>
        <div className="container py-16 text-center">
          <Package className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Product not found.</p>
          <Link href="/shop">
            <Button variant="outline" className="mt-4 rounded-button">
              Back to Shop
            </Button>
          </Link>
        </div>
      </PageTransition>
    );
  }

  const condition = getConditionLabel(product.conditionScore);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id && !p.isCombo).slice(0, 4);
  const inStock = product.stockQty > 0;
  const hasDiscount = product.originalPricePKR && product.originalPricePKR > product.pricePKR;
  const discountPct = hasDiscount ? Math.round((1 - product.pricePKR / product.originalPricePKR!) * 100) : 0;

  // Show a selection of siteData reviews on every product page
  const displayedSiteReviews = siteReviews.slice(0, 4);
  const totalReviewCount = localReviews.length + displayedSiteReviews.length;
  const specRows = buildSpecRows(product, condition, inStock);
  const productNarrative = buildProductNarrative(product, condition, inStock);
  const ratingValues = [...localReviews, ...displayedSiteReviews].map((review) => review.rating);
  const averageRating = ratingValues.length
    ? ratingValues.reduce((total, rating) => total + rating, 0) / ratingValues.length
    : 0;
  const averageRatingDisplay = averageRating ? Number(averageRating.toFixed(1)) : 0;
  const averageRatingLabel = ratingLabel(averageRatingDisplay);
  const stockLabel = inStock ? `${product.stockQty} left` : "Out of stock";
  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${product.title} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    router.push("/cart");
  };

  const readPhotoFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > MAX_PHOTO_SIZE) {
      toast.error("Photo must be under 5 MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setReviewPhoto({ dataUrl: String(reader.result), name: file.name });
    reader.readAsDataURL(file);
  };

  const onSubmitReview = (data: ReviewForm) => {
    const newReview: LocalReview = {
      id: `lr-${Date.now()}`,
      productId: product.id,
      name: data.name,
      rating: data.rating,
      text: data.text,
      photoDataUrl: reviewPhoto?.dataUrl,
      createdAt: new Date().toISOString(),
    };
    saveLocalReview(newReview);
    setLocalReviews((prev) => [newReview, ...prev]);
    setReviewPhoto(null);
    form.reset();
    toast.success("Review submitted! Thank you.");
  };

  const handleDeleteLocalReview = (id: string) => {
    deleteLocalReview(id);
    setLocalReviews((prev) => prev.filter((r) => r.id !== id));
    toast.success("Review removed");
  };

  return (
    <PageTransition>
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/shop?category=${product.category}`} className="hover:text-foreground transition-colors">{product.category}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate max-w-45">{product.title}</span>
        </nav>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* ─── Image Gallery ─────────────────────────── */}
          <div className="space-y-3">
            <div className="relative aspect-4/3 rounded-card overflow-hidden bg-surface border border-border group">
              <Image
                src={productImages[product.id] || product.images[selectedImage]}
                alt={product.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
              {!inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-bold text-foreground shadow-sm backdrop-blur-md">
                    OUT OF STOCK
                  </span>
                </div>
              )}
              {hasDiscount && (
                <div className="absolute top-3 left-3">
                  <span className="rounded-full border border-red-200/25 bg-red-500/20 px-2.5 py-1 text-xs font-bold text-red-100 shadow-sm backdrop-blur-md">
                    -{discountPct}%
                  </span>
                </div>
              )}
              {product.isCombo && (
                <div className="absolute top-3 left-3">
                  <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-bold text-foreground shadow-sm backdrop-blur-md">
                    COMBO
                  </span>
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto overflow-y-hidden pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-button overflow-hidden border transition-all duration-200",
                      i === selectedImage
                        ? "border-foreground shadow-md"
                        : "border-border hover:border-foreground/40",
                    )}
                  >
                    <Image src={img} alt="" fill sizes="80px" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── Product Info ───────────────────────────── */}
          <div className="space-y-5 lg:sticky lg:top-20 lg:h-fit">
            {/* Brand & Category */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{product.brand}</span>
              <span className="text-muted-foreground/40">·</span>
              <Link href={`/shop?category=${product.category}`} className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                {product.category}
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-gaming text-foreground leading-tight">{product.title}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-bold text-foreground">PKR {product.pricePKR.toLocaleString()}</span>
              {hasDiscount && (
                <span className="text-base text-muted-foreground line-through">PKR {product.originalPricePKR!.toLocaleString()}</span>
              )}
            </div>

            {/* Condition + Stock badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-md")}>
                {condition.label} · {condition.grade}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-foreground">
                {stockLabel}
              </span>
            </div>

            {/* Condition note */}
            <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-border pl-3">
              {product.conditionNote}
            </p>

            {product.isCombo && product.comboItems && (
              <div className="rounded-button border border-border bg-surface/50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-foreground mb-2">Combo Includes:</p>
                <ul className="space-y-1">
                  {product.comboItems.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Separator className="bg-border" />

            {/* Quantity + Actions */}
            {inStock ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center border border-border rounded-button bg-background/50 overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-11 w-11 rounded-none hover:bg-surface transition-colors"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      disabled={qty <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center text-sm font-semibold text-foreground">{qty}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-11 w-11 rounded-none hover:bg-surface transition-colors"
                      onClick={() => {
                        if (qty >= product.stockQty) { toast.info("Maximum stock reached"); return; }
                        setQty(qty + 1);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="h-11 flex-1 sm:flex-none px-6 rounded-button bg-foreground text-background font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/85 gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>

                  <Button
                    onClick={handleBuyNow}
                    variant="outline"
                    className="h-11 flex-1 sm:flex-none px-6 rounded-button border-border hover:bg-surface hover:border-foreground/30 transition-all duration-300"
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">This item is currently out of stock. Check back soon.</p>
            )}

            <Separator className="bg-border" />

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, label: "Quality Checked", sub: "Every item graded & tested" },
                { icon: PackageCheck, label: "3-Day Exchange", sub: "If not as described" },
                { icon: Truck, label: "Nationwide Delivery", sub: "Pakistan-wide shipping" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-2.5 rounded-button border border-border/50 bg-surface/30 p-3">
                  <Icon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-foreground">{label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Tabs: Description / Specs / Reviews ─────── */}
        <div className="mt-14">
          <Tabs defaultValue="description">
            <TabsList className="sticky top-16 z-30 h-auto w-full justify-start gap-1 rounded-card border border-border bg-card/95 p-1.5 shadow-sm backdrop-blur-md sm:w-auto">
              <TabsTrigger
                value="description"
                className="rounded-button border border-transparent px-5 py-2.5 text-sm text-muted-foreground transition-all duration-200 data-selected:border-foreground/20 data-selected:bg-foreground data-selected:font-semibold data-selected:text-background data-selected:shadow-sm data-[state=active]:border-foreground/20 data-[state=active]:bg-foreground data-[state=active]:text-background"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specs"
                className="rounded-button border border-transparent px-5 py-2.5 text-sm text-muted-foreground transition-all duration-200 data-selected:border-foreground/20 data-selected:bg-foreground data-selected:font-semibold data-selected:text-background data-selected:shadow-sm data-[state=active]:border-foreground/20 data-[state=active]:bg-foreground data-[state=active]:text-background"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-button border border-transparent px-5 py-2.5 text-sm text-muted-foreground transition-all duration-200 data-selected:border-foreground/20 data-selected:bg-foreground data-selected:font-semibold data-selected:text-background data-selected:shadow-sm data-[state=active]:border-foreground/20 data-[state=active]:bg-foreground data-[state=active]:text-background"
              >
                Reviews ({totalReviewCount})
              </TabsTrigger>
            </TabsList>

            {/* Description Tab */}
            <TabsContent value="description" className="mt-6">
              <div className="w-full">
                <Card className="rounded-card border-border bg-card/50">
                  <CardContent className="p-6 sm:p-8 space-y-6">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">About This Item</h3>
                      <p className="text-base text-muted-foreground leading-8">
                        {productNarrative}
                      </p>
                    </div>

                    {product.conditionNote && (
                      <div className="p-4 rounded-button bg-surface/40 border border-border/60">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">Condition Note</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{product.conditionNote}</p>
                      </div>
                    )}

                    {product.isCombo && product.comboItems && (
                      <div className="p-4 rounded-button bg-surface/50 border border-border/50">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Combo Includes</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{product.comboItems.join(" + ")}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { icon: ShieldCheck, text: "Fully inspected and graded by our team before listing" },
                        { icon: PackageCheck, text: "3-day exchange policy if item doesn't match description" },
                        { icon: Truck, text: "Securely packaged and shipped nationwide across Pakistan" },
                        { icon: Star, text: "Genuine product from a trusted pre-owned gaming gear store" },
                      ].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-start gap-3 p-3 rounded-button border border-border/40 bg-background/40">
                          <Icon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Specifications Tab */}
            <TabsContent value="specs" className="mt-6">
              <div className="max-w-5xl">
                <Card className="rounded-card border-border bg-card/50 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="px-6 py-5 border-b border-border bg-surface/50">
                      <h3 className="font-gaming text-lg text-foreground">Product Information</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{product.brand} · {product.title}</p>
                    </div>
                    <div className="divide-y divide-border">
                      {specRows.map(([label, value], idx) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={cn(
                            "grid grid-cols-1 gap-2 px-6 py-4 transition-colors hover:bg-surface/30 sm:grid-cols-[240px_1fr] sm:gap-6",
                            idx % 2 === 0 ? "bg-background/20" : "bg-transparent",
                          )}
                        >
                          <span className="text-sm font-semibold text-foreground">
                            {label}
                          </span>
                          <span className="text-sm leading-relaxed text-muted-foreground">{value}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="px-6 py-4 border-t border-border bg-surface/30">
                      <div className="flex items-center gap-2">
                        <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-md", condition.badgeClass)}>
                          Condition: {condition.label} · {condition.grade}
                        </span>
                        <span className="text-xs text-muted-foreground">{product.conditionNote}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="mt-6">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                  <div className="rounded-card border border-border bg-card/50 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-gaming text-lg text-foreground">Customer Reviews</h3>
                        <p className="text-sm text-muted-foreground mt-0.5">{totalReviewCount} reviews for this product</p>
                        <p className="mt-2 text-xs text-muted-foreground">Every item is quality-checked before dispatch.</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-3xl font-gaming text-foreground">{averageRatingDisplay || "0.0"}</div>
                        <div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star
                                key={idx}
                                className={cn(
                                  "h-4 w-4",
                                  averageRating >= idx + 1 ? "fill-orange-500 text-orange-500" : "fill-transparent text-muted-foreground/40",
                                )}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground">{averageRatingLabel} · {averageRatingDisplay || "0.0"} / 5</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence initial={false}>
                    {localReviews.map((r) => (
                      <ReviewCard
                        key={r.id}
                        review={{ id: r.id, name: r.name, rating: r.rating, text: r.text, photoDataUrl: r.photoDataUrl }}
                        onDelete={() => handleDeleteLocalReview(r.id)}
                      />
                    ))}
                  </AnimatePresence>

                  <div className="space-y-4">
                    {displayedSiteReviews.map((r) => (
                      <ReviewCard key={r.id} review={{ id: r.id, name: r.name, rating: r.rating, text: r.text, image: r.image }} />
                    ))}
                  </div>
                </div>

                <div className="rounded-card border border-border bg-card/50 p-6">
                  <h3 className="font-gaming text-lg text-foreground mb-1">Write a Review</h3>
                  <p className="text-sm text-muted-foreground mb-6">Share your experience with this product. You can also attach a photo.</p>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitReview)} className="space-y-5">
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-muted-foreground">Your Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Your name"
                                  className="h-11 rounded-input border-border bg-background transition-all duration-200 focus-visible:border-foreground/30"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="rating"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-muted-foreground">Rating</FormLabel>
                              <FormControl>
                                <div className="flex items-center h-11 gap-2">
                                  <StarRating
                                    value={field.value}
                                    onChange={(v) => field.onChange(v)}
                                    size="lg"
                                  />
                                  {field.value > 0 && (
                                    <span className="text-xs text-muted-foreground">
                                      {["", "Poor", "Fair", "Good", "Great", "Excellent"][field.value]}
                                    </span>
                                  )}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground">Your Review</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Tell others about your experience — condition, performance, delivery, etc."
                                className="min-h-27.5 rounded-input border-border bg-background transition-all duration-200 focus-visible:border-foreground/30"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          Add a Photo <span className="text-muted-foreground/50 font-normal">(optional)</span>
                        </p>
                        <input
                          ref={photoInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0];
                            if (file) readPhotoFile(file);
                          }}
                        />

                        {reviewPhoto ? (
                          <div className="relative inline-block">
                            <Image
                              src={reviewPhoto.dataUrl}
                              alt="Review photo preview"
                              width={200}
                              height={140}
                              unoptimized
                              className="rounded-button border border-border object-cover max-h-36 w-auto"
                            />
                            <button
                              type="button"
                              onClick={() => setReviewPhoto(null)}
                              className="absolute -top-2 -right-2 rounded-full bg-card border border-border p-1 text-muted-foreground hover:text-foreground transition-colors shadow-sm"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => photoInputRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setIsDragging(false);
                              const file = e.dataTransfer.files?.[0];
                              if (file) readPhotoFile(file);
                            }}
                            className={cn(
                              "flex items-center gap-3 rounded-button border border-dashed px-5 py-4 text-sm text-muted-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-surface/40 hover:text-foreground",
                              isDragging && "border-foreground/40 bg-surface/60",
                            )}
                          >
                            <Camera className="h-5 w-5 shrink-0" />
                            <span>Drop photo here or click to choose</span>
                          </button>
                        )}
                      </div>

                      <Button
                        type="submit"
                        disabled={!form.formState.isValid || form.formState.isSubmitting}
                        className="h-11 px-8 rounded-button bg-foreground text-background font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/85"
                      >
                        Submit Review
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Suggestions</p>
                <h2 className="mt-1 text-2xl font-gaming text-foreground">Related Products</h2>
              </div>
              <Link href={`/shop?category=${product.category}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
};

export default ProductDetail;
