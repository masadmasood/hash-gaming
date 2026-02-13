import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { SearchModal } from "@/components/SearchModal";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Contact", to: "/contact" },
  { label: "Policies", to: "/policies" },
];

export function Header() {
  const { totalItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container h-full flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-lg font-gaming font-bold tracking-tight text-foreground">
              Hashtech Gaming
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 text-sm rounded-button transition-colors ${
                  location.pathname === link.to
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-neon-cyan text-black text-[10px] font-bold flex items-center justify-center p-0 border-0">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background border-border w-[300px]">
                <div className="flex flex-col gap-6 pt-8">
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={`px-4 py-3 rounded-button text-sm transition-colors ${
                          location.pathname === link.to
                            ? "text-foreground font-medium bg-surface"
                            : "text-muted-foreground hover:text-foreground hover:bg-surface"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
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
