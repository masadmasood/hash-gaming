import { Link } from "react-router-dom";
import { Product, productImages } from "@/data/siteData";

function getConditionStyle(score: number): { label: string; grade: string; colorClass: string } {
  if (score >= 9) return { label: "Excellent", grade: "9/10", colorClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" };
  if (score >= 8) return { label: "Great", grade: `${score}/10`, colorClass: "bg-blue-500/10 text-blue-600 border-blue-500/20" };
  if (score >= 7) return { label: "Very Good", grade: `${score}/10`, colorClass: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" };
  if (score >= 5) return { label: "Good", grade: `${score}/10`, colorClass: "bg-orange-500/10 text-orange-600 border-orange-500/20" };
  return { label: "Fair", grade: `${score}/10`, colorClass: "bg-red-500/10 text-red-600 border-red-500/20" };
}

export function ProductCard({ product }: { product: Product }) {
  const inStock = product.stockQty > 0;
  const condition = getConditionStyle(product.conditionScore);
  const hasDiscount = product.originalPricePKR && product.originalPricePKR > product.pricePKR;
  const discountPct = hasDiscount ? Math.round((1 - product.pricePKR / product.originalPricePKR!) * 100) : 0;

  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      <div className="overflow-hidden rounded-card border border-border/30 bg-card transition-all duration-300 hover:shadow-lg hover:border-foreground/20 h-full flex flex-col relative">
        {!inStock && (
           <div className="absolute inset-0 z-20 bg-background/60 backdrop-blur-[1px] flex items-center justify-center">
             <span className="bg-destructive/90 text-destructive-foreground px-3 py-1 text-sm font-bold rounded-full transform -rotate-12 shadow-sm">
               OUT OF STOCK
             </span>
           </div>
        )}
        <div className="relative aspect-[4/3] bg-surface overflow-hidden">
          <img
            src={productImages[product.id] || product.images[0]}
            alt={product.title}
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${!inStock ? "grayscale" : ""}`}
            loading="lazy"
          />
          {/* Condition badge - visible on hover */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border shadow-sm backdrop-blur-md ${condition.colorClass}`}>
              {condition.label}
            </span>
          </div>
          {product.isCombo && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex text-[10px] font-bold px-2 py-1 rounded-full bg-primary text-primary-foreground shadow-sm">
                COMBO
              </span>
            </div>
          )}
          {hasDiscount && !product.isCombo && inStock && (
            <div className="absolute top-3 left-3 z-10">
               <span className="inline-flex text-[10px] font-bold px-2 py-1 rounded-full bg-destructive text-destructive-foreground shadow-sm">
                -{discountPct}%
              </span>
            </div>
          )}
        </div>
        <div className="p-4 space-y-1 flex-1 flex flex-col">
          <div>
             <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground/70 mb-0.5">{product.brand}</p>
             <h3 className="font-semibold text-sm leading-snug text-foreground line-clamp-2 min-h-[2.5rem]">
              {product.title}
             </h3>
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-1">
            <div className="flex flex-col">
              {hasDiscount && (
                <span className="text-[10px] text-muted-foreground line-through">
                  PKR {product.originalPricePKR!.toLocaleString()}
                </span>
              )}
               <span className="font-bold text-foreground">
                PKR {product.pricePKR.toLocaleString()}
              </span>
            </div>
            
             <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${inStock ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>
              {inStock ? `${product.stockQty} left` : "Sold out"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
