"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { products, filterCategories, brands } from "@/data/siteData";
import { VirtualizedProductGrid } from "@/components/VirtualizedProductGrid";
import { PageTransition } from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Search, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SortOption = "newest" | "price-low" | "price-high" | "condition";
type StockFilter = "all" | "in-stock" | "out-of-stock";

interface ShopPageProps {
  initialCategory?: string;
  initialSearch?: string;
  showCombos?: boolean;
}

const PRICE_MIN = 0;
const PRICE_MAX = 35000;

const conditionOptions = [
  { value: "1", label: "Any condition" },
  { value: "5", label: "Good or better" },
  { value: "7", label: "Very good or better" },
  { value: "9", label: "Excellent only" },
] as const;

const stockPresets: { id: StockFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "in-stock", label: "In Stock" },
  { id: "out-of-stock", label: "Out of Stock" },
];

const Shop = ({ initialCategory = "", initialSearch = "", showCombos = false }: ShopPageProps) => {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [conditionMin, setConditionMin] = useState(1);
  const [stockFilter, setStockFilter] = useState<StockFilter>("in-stock");
  const [sort, setSort] = useState<SortOption>("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    } else if (!showCombos) {
      setSelectedCategories([]);
    }
  }, [initialCategory, showCombos]);

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      if (showCombos && !p.isCombo) return false;

      if (search) {
        const q = search.toLowerCase();
        const haystack = `${p.title} ${p.brand} ${p.category}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      if (selectedCategories.length) {
        const wantsCombos = selectedCategories.includes("Combos");
        const otherCats = selectedCategories.filter((c) => c !== "Combos");
        const matchesCategory = otherCats.length ? otherCats.includes(p.category) : false;
        const matchesCombo = wantsCombos && p.isCombo;
        if (!matchesCategory && !matchesCombo) return false;
      }

      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;

      if (p.pricePKR < priceRange[0] || p.pricePKR > priceRange[1]) return false;

      if (p.conditionScore < conditionMin) return false;

      const isInStock = p.stockQty > 0;
      if (stockFilter === "in-stock" && !isInStock) return false;
      if (stockFilter === "out-of-stock" && isInStock) return false;

      return true;
    });

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.pricePKR - b.pricePKR);
        break;
      case "price-high":
        result.sort((a, b) => b.pricePKR - a.pricePKR);
        break;
      case "condition":
        result.sort((a, b) => b.conditionScore - a.conditionScore);
        break;
      default:
        break;
    }
    return result;
  }, [search, selectedCategories, selectedBrands, priceRange, conditionMin, stockFilter, sort, showCombos]);

  const toggleCategory = useCallback((cat: string) => {
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  }, []);
  const toggleBrand = useCallback((brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
  }, []);

  const resetFilters = useCallback(() => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setConditionMin(1);
    setStockFilter("all");
    setSort("newest");
  }, []);

  const activeFilterCount =
    (search ? 1 : 0) +
    (selectedCategories.length > 0 ? 1 : 0) +
    (selectedBrands.length > 0 ? 1 : 0) +
    (priceRange[0] !== PRICE_MIN || priceRange[1] !== PRICE_MAX ? 1 : 0) +
    (conditionMin > 1 ? 1 : 0) +
    (stockFilter !== "in-stock" ? 1 : 0);
  const selectedConditionLabel = conditionOptions.find((option) => option.value === String(conditionMin))?.label ?? "Any condition";

  return (
    <PageTransition>
      <div className="container py-8">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-gaming text-foreground">{showCombos ? "Combo Deals" : "Shop"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Showing {filtered.length} of {products.length} products
            </p>
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="h-10 w-full rounded-input border-border bg-surface capitalize sm:w-[210px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="condition">Condition: Best</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <Button
              variant="outline"
              className="w-full lg:hidden mb-4 rounded-button border-border h-10 gap-2"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              {filtersOpen ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
              {filtersOpen ? "Hide Filters" : `Show Filters${activeFilterCount ? ` (${activeFilterCount})` : ""}`}
            </Button>

            <div className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
              <div className="bg-card border border-border/50 rounded-card p-5 shadow-sm space-y-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto overflow-x-hidden">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-foreground">Filters</span>
                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Reset
                    </button>
                  )}
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-input border-border bg-surface h-10 pl-9"
                  />
                </div>
                <Separator className="bg-border" />

                <div>
                  <h4 className="text-[11px] font-bold text-foreground mb-3 uppercase tracking-widest">Category</h4>
                  <div className="space-y-2.5">
                    {filterCategories.map((cat) => (
                      <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                        <Checkbox
                          checked={selectedCategories.includes(cat)}
                          onCheckedChange={() => toggleCategory(cat)}
                          className="data-[state=checked]:bg-foreground data-[state=checked]:text-background border-border transition-all duration-200"
                        />
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200 ${
                            selectedCategories.includes(cat) ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          {cat}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <Separator className="bg-border" />

                <div>
                  <h4 className="text-[11px] font-bold text-foreground mb-3 uppercase tracking-widest">Brand</h4>
                  <div className="space-y-2.5">
                    {brands.map((brand) => (
                      <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
                        <Checkbox
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                          className="data-[state=checked]:bg-foreground data-[state=checked]:text-background border-border transition-all duration-200"
                        />
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200 ${
                            selectedBrands.includes(brand) ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <Separator className="bg-border" />

                <div>
                  <h4 className="text-[11px] font-bold text-foreground mb-1 uppercase tracking-widest">Price Range</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    PKR {priceRange[0].toLocaleString()} — PKR {priceRange[1].toLocaleString()}
                  </p>
                  <Slider
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={500}
                    value={priceRange}
                    onValueChange={(v) => setPriceRange(v as [number, number])}
                    className="mt-2"
                  />
                </div>
                <Separator className="bg-border" />

                <div>
                  <h4 className="text-[11px] font-bold text-foreground mb-3 uppercase tracking-widest">Condition</h4>
                  <Select value={String(conditionMin)} onValueChange={(value) => setConditionMin(Number(value))}>
                    <SelectTrigger className="h-10 rounded-input border-border bg-surface text-sm">
                      <span>{selectedConditionLabel}</span>
                    </SelectTrigger>
                    <SelectContent className="border-border bg-card">
                      {conditionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Separator className="bg-border" />

                <div>
                  <h4 className="text-[11px] font-bold text-foreground mb-3 uppercase tracking-widest">Availability</h4>
                  <div className="space-y-2.5">
                    {stockPresets.map((preset) => {
                      const active = stockFilter === preset.id;
                      return (
                        <label
                          key={preset.id}
                          className="group flex cursor-pointer items-center gap-3"
                        >
                          <input
                            type="radio"
                            name="stock-filter"
                            value={preset.id}
                            checked={active}
                            onChange={() => setStockFilter(preset.id)}
                            className="peer sr-only"
                          />
                          <span
                            aria-hidden="true"
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
                              active ? "border-foreground bg-foreground" : "border-border group-hover:border-foreground/50",
                            )}
                          >
                            {active && <span className="h-1.5 w-1.5 rounded-full bg-background" />}
                          </span>
                          <span
                            className={cn(
                              "text-[11px] font-semibold uppercase tracking-wider transition-colors duration-200",
                              active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground",
                            )}
                          >
                            {preset.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="min-w-0 flex-1 overflow-hidden">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground space-y-3">
                <p>No products match your filters.</p>
                {activeFilterCount > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetFilters}
                    className="rounded-button border-border gap-2"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset Filters
                  </Button>
                )}
              </div>
            ) : (
              <VirtualizedProductGrid products={filtered} />
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Shop;
