import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
        <form onSubmit={handleSubmit} className="p-5 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, brands..."
              className="pl-10 pr-4 h-12 rounded-card border-border bg-background text-sm font-medium"
              autoFocus
            />
          </div>
        </form>
        {suggestions.length > 0 && (
          <div className="max-h-80 overflow-y-auto">
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
          <div className="px-5 py-10 text-center text-sm text-muted-foreground">
            No products found for "{query}"
          </div>
        )}
        {/* Centered close button */}
        <div className="flex justify-center py-4 border-t border-border">
          <button
            onClick={() => { onOpenChange(false); setQuery(""); }}
            className="h-10 w-10 rounded-full border border-border bg-background hover:bg-surface flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
