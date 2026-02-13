import { Link } from "react-router-dom";
import { Product } from "@/data/products";

function getConditionStyle(score: number): { label: string; grade: string; colorClass: string } {
  if (score >= 9) return { label: "Excellent", grade: "9/10", colorClass: "text-condition-excellent border-condition-excellent/40" };
  if (score >= 7) return { label: "Very Good", grade: `${score}/10`, colorClass: "text-condition-verygood border-condition-verygood/40" };
  if (score >= 5) return { label: "Good", grade: `${score}/10`, colorClass: "text-condition-good border-condition-good/40" };
  return { label: "Fair", grade: `${score}/10`, colorClass: "text-condition-fair border-condition-fair/40" };
}

export function ProductCard({ product }: { product: Product }) {
  const inStock = product.stockQty > 0;
  const condition = getConditionStyle(product.conditionScore);
  const hasDiscount = product.originalPricePKR && product.originalPricePKR > product.pricePKR;
  const discountPct = hasDiscount ? Math.round((1 - product.pricePKR / product.originalPricePKR!) * 100) : 0;

  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      <div className="overflow-hidden rounded-card border border-border bg-card transition-all duration-200 hover:border-foreground/20 h-full flex flex-col">
        <div className="relative aspect-[4/3] bg-surface overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Condition badge - visible on hover */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-button border bg-background/80 backdrop-blur-sm ${condition.colorClass}`}>
              {condition.label} · {condition.grade}
            </span>
          </div>
          {product.isCombo && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex text-xs font-semibold px-2.5 py-1 rounded-button bg-foreground text-background">
                COMBO
              </span>
            </div>
          )}
          {hasDiscount && !product.isCombo && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex text-xs font-semibold px-2.5 py-1 rounded-button bg-discount text-white">
                -{discountPct}%
              </span>
            </div>
          )}
        </div>
        <div className="p-4 space-y-2 flex-1 flex flex-col">
          <p className="text-xs text-muted-foreground font-medium">{product.brand}</p>
          <h3 className="font-medium text-sm leading-tight text-foreground line-clamp-2 flex-1">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">
                PKR {product.pricePKR.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-xs text-muted-foreground line-through">
                  PKR {product.originalPricePKR!.toLocaleString()}
                </span>
              )}
            </div>
            <span className={`text-xs ${inStock ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
              {inStock ? `${product.stockQty} left` : "Sold out"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
