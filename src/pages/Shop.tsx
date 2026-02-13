import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products, filterCategories, brands } from "@/data/siteData";
import { ProductCard } from "@/components/ProductCard";
import { PageTransition } from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";

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
  const [showInStock, setShowInStock] = useState(true);
  const [showOutOfStock, setShowOutOfStock] = useState(false);
  const [sort, setSort] = useState<SortOption>("newest");

  // Sync category from URL when navigating from homepage category links
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategories([cat]);
    } else if (!showCombos) {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      if (showCombos && !p.isCombo) return false;
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategories.length) {
        const wantsCombos = selectedCategories.includes("Combos");
        const otherCats = selectedCategories.filter(c => c !== "Combos");
        const matchesCategory = otherCats.length ? otherCats.includes(p.category) : false;
        const matchesCombo = wantsCombos && p.isCombo;
        if (!matchesCategory && !matchesCombo) return false;
      }
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (p.pricePKR < priceRange[0] || p.pricePKR > priceRange[1]) return false;
      if (p.conditionScore < conditionMin) return false;
      
      const isInStock = p.stockQty > 0;
      if (showInStock && !showOutOfStock && !isInStock) return false;
      if (!showInStock && showOutOfStock && isInStock) return false;
      if (!showInStock && !showOutOfStock) return false; // Hide all
      // If both are true, show all

      return true;
    });

    switch (sort) {
      case "price-low": result.sort((a, b) => a.pricePKR - b.pricePKR); break;
      case "price-high": result.sort((a, b) => b.pricePKR - a.pricePKR); break;
      case "condition": result.sort((a, b) => b.conditionScore - a.conditionScore); break;
      default: break;
    }
    return result;
  }, [search, selectedCategories, selectedBrands, priceRange, conditionMin, showInStock, showOutOfStock, sort, showCombos]);

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
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="bg-card border border-border/50 rounded-card p-5 shadow-sm space-y-6 sticky top-24">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rounded-input border-border bg-surface h-10 pl-9"
              />
            </div>
            <Separator className="bg-border" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Category</h4>
              <div className="space-y-2">
                {filterCategories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors group">
                    <Checkbox 
                        checked={selectedCategories.includes(cat)} 
                        onCheckedChange={() => toggleCategory(cat)} 
                        className="data-[state=checked]:bg-muted-foreground data-[state=checked]:text-background border-muted-foreground/50"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            <Separator className="bg-border" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Brand</h4>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors group">
                    <Checkbox 
                        checked={selectedBrands.includes(brand)} 
                        onCheckedChange={() => toggleBrand(brand)} 
                        className="data-[state=checked]:bg-muted-foreground data-[state=checked]:text-background border-muted-foreground/50"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{brand}</span>
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
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">Stock Status</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                  <Checkbox 
                     checked={showInStock}
                     onCheckedChange={(v) => setShowInStock(!!v)} 
                     className="data-[state=checked]:bg-muted-foreground data-[state=checked]:text-background border-muted-foreground/50"
                  />
                  <span className="text-muted-foreground">Show In-Stock Only</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-primary transition-colors">
                  <Checkbox 
                     checked={showOutOfStock} 
                     onCheckedChange={(v) => setShowOutOfStock(!!v)} 
                     className="data-[state=checked]:bg-muted-foreground data-[state=checked]:text-background border-muted-foreground/50"
                  />
                  <span className="text-muted-foreground">Show Out-of-Stock Only</span>
                </label>
              </div>
            </div>
            </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
