import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Search, Menu, ChevronDown, Keyboard, Mouse, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useState, useRef } from "react";
import { SearchModal } from "@/components/SearchModal";
import { products } from "@/data/products";

const categoryMeta = [
  { name: "Keyboards", icon: Keyboard, count: products.filter(p => p.category === "Keyboards" && !p.isCombo).length },
  { name: "Mouse", icon: Mouse, count: products.filter(p => p.category === "Mouse" && !p.isCombo).length },
  { name: "Headphones", icon: Headphones, count: products.filter(p => p.category === "Headphones" && !p.isCombo).length },
];

export function Header() {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();

  const handleMegaEnter = () => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <>
      <header className="sticky top-0 z-50 h-16 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="container h-full flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <span className="text-xl font-gaming-black tracking-tight text-foreground">
              HASHTECH
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={handleMegaEnter}
              onMouseLeave={handleMegaLeave}
            >
              <Link
                to="/shop"
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  location.pathname === "/shop" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Shop <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              {/* Mega Dropdown */}
              {megaOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                  <div className="bg-card border border-border rounded-card shadow-lg p-5 w-[480px]">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Categories</p>
                    <div className="grid grid-cols-3 gap-3">
                      {categoryMeta.map((cat) => (
                        <Link
                          key={cat.name}
                          to={`/shop?category=${cat.name}`}
                          onClick={() => setMegaOpen(false)}
                          className="group flex flex-col items-center gap-3 p-4 rounded-card border border-border bg-background hover:border-foreground/20 transition-all"
                        >
                          <div className="h-10 w-10 rounded-lg bg-surface-2 flex items-center justify-center group-hover:bg-surface transition-colors">
                            <cat.icon className="h-5 w-5 text-foreground/70" />
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                            <p className="text-xs text-muted-foreground">{cat.count} products</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-border">
                      <Link
                        to="/shop"
                        onClick={() => setMegaOpen(false)}
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        View All Products →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/contact" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="text-muted-foreground hover:text-foreground">
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-foreground text-background text-[10px] font-bold flex items-center justify-center p-0 border-0">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-border w-[300px]">
                <div className="flex flex-col gap-6 pt-8">
                  <nav className="flex flex-col gap-1">
                    {[
                      { label: "Home", to: "/" },
                      { label: "Shop", to: "/shop" },
                      { label: "Contact", to: "/contact" },
                    ].map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={`px-4 py-3 rounded-button text-sm font-medium transition-colors ${
                          location.pathname === link.to
                            ? "text-foreground bg-surface"
                            : "text-muted-foreground hover:text-foreground hover:bg-surface"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  <div className="px-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Categories</p>
                    <div className="space-y-1">
                      {categoryMeta.map((cat) => (
                        <Link
                          key={cat.name}
                          to={`/shop?category=${cat.name}`}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-button text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                        >
                          <cat.icon className="h-4 w-4" />
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
