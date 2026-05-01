"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Product, productImages } from "@/data/siteData";
import { useCart } from "@/context/CartContext";

function getConditionStyle(score: number): { label: string; grade: string } {
  if (score >= 9) return { label: "Excellent", grade: "9/10" };
  if (score >= 8) return { label: "Great", grade: `${score}/10` };
  if (score >= 7) return { label: "Very Good", grade: `${score}/10` };
  if (score >= 5) return { label: "Good", grade: `${score}/10` };
  return { label: "Fair", grade: `${score}/10` };
}

export const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const shouldReduceMotion = useReducedMotion();
  const inStock = product.stockQty > 0;
  const condition = getConditionStyle(product.conditionScore);
  const hasDiscount = product.originalPricePKR && product.originalPricePKR > product.pricePKR;
  const discountPct = hasDiscount ? Math.round((1 - product.pricePKR / product.originalPricePKR!) * 100) : 0;
  const stockText = inStock ? `${product.stockQty} left` : "Sold out";

  const handleQuickAdd = () => {
    addToCart(product, 1);
    toast.success(`${product.title} added to cart`);
  };

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.36, ease: "easeOut" }}
      className="group relative h-full overflow-hidden rounded-card border border-border bg-card transition-[border-color,box-shadow] duration-300 ease-out hover:z-10 hover:border-cyan-200/35 hover:shadow-md"
    >
      <div className="relative flex h-full flex-col">
        {!inStock && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/50">
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-bold text-foreground shadow-sm backdrop-blur-md">
              OUT OF STOCK
            </span>
          </div>
        )}

        <div className="relative h-60 overflow-hidden bg-surface sm:h-64 lg:h-64">
          <Link href={`/product/${product.id}`} className="block h-full cursor-pointer">
            <Image
              src={productImages[product.id] || product.images[0]}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08] ${!inStock ? "grayscale" : ""}`}
            />
            <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-2">
              {product.isCombo && (
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-bold text-foreground shadow-sm backdrop-blur-md">
                  COMBO
                </span>
              )}
              {hasDiscount && !product.isCombo && inStock && (
                <span className="inline-flex rounded-full bg-red-500/25 px-2.5 py-1 text-[10px] font-bold text-red-50 shadow-sm backdrop-blur-md">
                  -{discountPct}%
                </span>
              )}
            </div>
            <div className="pointer-events-none absolute inset-0 z-20 flex translate-y-3 flex-col items-center justify-center bg-background/62 px-5 text-center opacity-0 backdrop-blur-[2px] transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-100/80">Condition</span>
              <span className="mt-2 text-2xl font-gaming text-foreground">{condition.label}</span>
              <span className="mt-1 text-sm font-semibold text-muted-foreground">{condition.grade} tested grade</span>
            </div>
          </Link>
        </div>

        <div className="flex flex-1 flex-col p-3.5">
          <Link href={`/product/${product.id}`} className="block cursor-pointer">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="text-[10px] font-bold uppercase text-muted-foreground/70">{product.brand}</p>
              <span
                className="shrink-0 text-[10px] font-bold uppercase text-foreground"
                aria-label={`${stockText}; condition ${condition.label}`}
              >
                {stockText}
              </span>
            </div>
            <h3 className="text-sm font-semibold leading-snug text-foreground line-clamp-2 transition-colors duration-200 group-hover:text-foreground/90">
              {product.title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-1">
              {product.description}
            </p>
          </Link>

          <div className="mt-auto flex items-end justify-between gap-3 pt-2">
            <div className="min-w-0">
              <span className={`block text-[10px] text-muted-foreground line-through ${hasDiscount ? "" : "hidden"}`}>
                PKR {(product.originalPricePKR ?? product.pricePKR).toLocaleString()}
              </span>
              <span className="block font-bold text-foreground">PKR {product.pricePKR.toLocaleString()}</span>
              {hasDiscount && (
                <span className="mt-0.5 block text-[10px] font-semibold text-emerald-400">
                  Save PKR {(product.originalPricePKR! - product.pricePKR).toLocaleString()}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={!inStock}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-button border border-border bg-surface text-foreground transition-[transform,background-color,border-color,opacity] duration-200 ease-out hover:-translate-y-0.5 hover:border-foreground/40 hover:bg-foreground hover:text-background active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={`Add ${product.title} to cart`}
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
});
