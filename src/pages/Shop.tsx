import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, brands } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { PageTransition } from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

type SortOption = "newest" | "price-low" | "price-high" | "condition";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";
  const showCombos = searchParams.get("combo") === "true";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 35000]);
  const [conditionMin, setConditionMin] = useState(1);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("newest");

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (showCombos && !p.isCombo) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (p.pricePKR < priceRange[0] || p.pricePKR > priceRange[1]) return false;
      if (p.conditionScore < conditionMin) return false;
      if (inStockOnly && p.stockQty === 0) return false;
      return true;
    });

    switch (sort) {
      case "price-low": result.sort((a, b) => a.pricePKR - b.pricePKR); break;
      case "price-high": result.sort((a, b) => b.pricePKR - a.pricePKR); break;
      case "condition": result.sort((a, b) => b.conditionScore - a.conditionScore); break;
      default: break;
    }
    return result;
  }, [search, selectedCategories, selectedBrands, priceRange, conditionMin, inStockOnly, sort, showCombos]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
  };
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
  };

  return (
    <PageTransition>
      <div className="container py-8">
        <h1 className="text-3xl font-semibold mb-8 text-foreground">
          {showCombos ? "Combo Deals" : "Shop"}
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            <div>
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-input border-border bg-surface h-11"
              />
            </div>
            <Separator className="bg-border" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={selectedCategories.includes(cat)} onCheckedChange={() => toggleCategory(cat)} />
                    <span className="text-muted-foreground">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            <Separator className="bg-border" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Brand</h4>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox checked={selectedBrands.includes(brand)} onCheckedChange={() => toggleBrand(brand)} />
                    <span className="text-muted-foreground">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
            <Separator className="bg-border" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Price Range: PKR {priceRange[0].toLocaleString()} – {priceRange[1].toLocaleString()}
              </h4>
              <Slider
                min={0}
                max={35000}
                step={500}
                value={priceRange}
                onValueChange={(v) => setPriceRange(v as [number, number])}
                className="mt-2"
              />
            </div>
            <Separator className="bg-border" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Min Condition: {conditionMin}/10
              </h4>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[conditionMin]}
                onValueChange={(v) => setConditionMin(v[0])}
              />
            </div>
            <Separator className="bg-border" />
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox checked={inStockOnly} onCheckedChange={(v) => setInStockOnly(!!v)} />
              <span className="text-muted-foreground">In Stock Only</span>
            </label>
          </aside>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filtered.length} of {products.length} products
              </p>
              <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
                <SelectTrigger className="w-[180px] rounded-input border-border bg-surface h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low → High</SelectItem>
                  <SelectItem value="price-high">Price: High → Low</SelectItem>
                  <SelectItem value="condition">Condition: Best</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p>No products found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Shop;
