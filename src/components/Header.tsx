import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Search, Menu, ChevronDown, Keyboard, Mouse, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useState, useRef } from "react";
import { SearchModal } from "@/components/SearchModal";
import logo from "../assets/logo.png";

const shopCategories = [
  { name: "Keyboards", icon: Keyboard, to: "/shop?category=Keyboards" },
  { name: "Mouse", icon: Mouse, to: "/shop?category=Mouse" },
  { name: "Headphones", icon: Headphones, to: "/shop?category=Headphones" },
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
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-background/70 backdrop-blur-xl">
        <div className="container h-full flex items-center justify-between gap-6">
          <Link to="/" className="shrink-0">
            {/* <span className="text-xl font-gaming-black tracking-tight text-foreground">
              HASHTECH
            </span> */}
            <img src={logo} alt="Hashtech" className="size-16 object-cover" />
          </Link>

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
              {megaOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                  <div className="bg-card/95 backdrop-blur-xl border border-border rounded-card p-1 w-[200px] space-y-0.5">
                    {shopCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        to={cat.to}
                        onClick={() => setMegaOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-button text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                      >
                        <cat.icon className="h-4 w-4" />
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/about" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/contact" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="text-muted-foreground hover:text-foreground hover:bg-transparent">
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground hover:bg-transparent">
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
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-transparent">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-border w-[280px]">
                <div className="flex flex-col gap-6 pt-8">
                  <nav className="flex flex-col gap-1">
                    {[
                      { label: "Home", to: "/" },
                      { label: "Shop", to: "/shop" },
                      { label: "About", to: "/about" },
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <div className="h-16" />
      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
