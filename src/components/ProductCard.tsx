import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  const inStock = product.stockQty > 0;

  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      <div className="overflow-hidden rounded-card border border-border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-foreground/15 h-full flex flex-col">
        <div className="relative aspect-[4/3] bg-surface-2 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {product.isCombo && (
              <Badge className="rounded-md bg-accent text-accent-foreground text-xs font-medium px-2 py-0.5 border-0">
                COMBO
              </Badge>
            )}
          </div>
        </div>
        <div className="p-4 space-y-2 flex-1 flex flex-col">
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <h3 className="font-medium text-sm leading-tight text-foreground line-clamp-2 flex-1">
            {product.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">
              PKR {product.pricePKR.toLocaleString()}
            </span>
            <span className={`text-xs ${inStock ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
              {inStock ? `${product.stockQty} in stock` : "Out of stock"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
