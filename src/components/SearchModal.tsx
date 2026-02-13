import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
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
      <DialogContent className="sm:max-w-lg bg-card border-border p-0 gap-0 [&>button]:hidden">
        <form onSubmit={handleSubmit} className="px-5 pt-5 pb-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands..."
              className="w-full pl-10 pr-10 h-12 rounded-card border border-border bg-surface text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
              autoFocus
            />
            <button
              type="button"
              onClick={() => { onOpenChange(false); setQuery(""); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
        {suggestions.length > 0 && (
          <div className="max-h-80 overflow-y-auto border-t border-border">
            {suggestions.map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelect(p.id)}
                className="w-full flex items-center gap-3 px-5 py-3 text-left hover:bg-surface transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-surface-2 overflow-hidden shrink-0">
                  <img src={p.images[0]} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.brand} · PKR {p.pricePKR.toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>
        )}
        {query.trim() && suggestions.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-muted-foreground border-t border-border">
            No products found for "{query}"
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
