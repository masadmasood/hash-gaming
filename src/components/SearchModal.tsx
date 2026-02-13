import { useState, useMemo, useCallback, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X, ArrowRight, TrendingUp } from "lucide-react";
import { products, productImages } from "@/data/siteData";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchModal = memo(function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!query.trim()) {
        return products.slice(0, 5);
    }
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query]);

  const handleSelect = (productId: string) => {
    onOpenChange(false);
    setQuery("");
    navigate(`/product/${productId}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onOpenChange(false);
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-card/95 backdrop-blur-xl border-border/50 p-0 gap-0 [&>button]:hidden rounded-2xl shadow-2xl overflow-hidden">
        {/* Search Input */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands..."
              className="w-full pl-11 pr-11 h-12 rounded-lg border border-border/50 bg-background/50 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/10 focus:border-foreground/20 transition-all"
              autoFocus
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : (
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-6 items-center gap-1 rounded-md border border-border/50 bg-muted/30 px-2 text-[10px] font-medium text-muted-foreground/60">
                ESC
              </kbd>
            )}
          </div>
        </form>

        {/* Results */}
        {suggestions.length > 0 && (
          <div className="border-t border-border/30">
            {!query.trim() && (
              <div className="px-5 py-2.5 flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-muted-foreground/50" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                  Trending
                </span>
              </div>
            )}
            {query.trim() && (
              <div className="px-5 py-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50">
                  {suggestions.length} result{suggestions.length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
            <ScrollArea className="max-h-[340px]">
              <div className="px-2 pb-2">
                {suggestions.map((p) => {
                  const inStock = p.stockQty > 0;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelect(p.id)}
                      className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-lg text-left hover:bg-secondary/50 active:scale-[0.99] transition-all group"
                    >
                      <div className="h-12 w-12 rounded-lg bg-secondary/50 overflow-hidden shrink-0 border border-border/30 group-hover:border-border/50 transition-colors">
                        <img
                          src={productImages[p.id] || p.images[0]}
                          alt=""
                          className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-110 ${!inStock ? "grayscale opacity-60" : ""}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate group-hover:text-foreground/90">
                          {p.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground/70">{p.brand}</span>
                          <span className="text-[10px] text-muted-foreground/30">·</span>
                          <span className="text-xs font-semibold text-foreground/80">
                            PKR {p.pricePKR.toLocaleString()}
                          </span>
                          {!inStock && (
                            <>
                              <span className="text-[10px] text-muted-foreground/30">·</span>
                              <span className="text-[10px] text-destructive/70 font-medium">Sold out</span>
                            </>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/20 group-hover:text-muted-foreground/50 shrink-0 transition-all group-hover:translate-x-0.5" />
                    </button>
                  );
                })}
              </div>
            </ScrollArea>

            {/* View all link */}
            {query.trim() && suggestions.length > 0 && (
              <div className="border-t border-border/30 px-2 py-2">
                <button
                  onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
                >
                  View all results for "{query}"
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {query.trim() && suggestions.length === 0 && (
          <div className="border-t border-border/30 px-5 py-12 text-center">
            <Search className="h-8 w-8 text-muted-foreground/20 mx-auto mb-3" />
            <p className="text-sm font-medium text-muted-foreground/70">
              No products found for "{query}"
            </p>
            <p className="text-xs text-muted-foreground/40 mt-1">
              Try a different keyword or browse the shop
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
});
