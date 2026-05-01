"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Search, Menu, ChevronDown, Keyboard, Mouse, Headphones } from "lucide-react";
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
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMegaEnter = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };
  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/10 bg-transparent backdrop-blur-md transition-colors duration-200 hover:bg-background/40">
        <div className="container h-full flex items-center justify-between gap-6">
          <Link href="/" className="shrink-0">
            {/* <span className="text-xl font-gaming-black tracking-tight text-foreground">
              HASHTECH
            </span> */}
            <Image src={logo} alt="Hashtech" width={64} height={64} className="size-16 object-cover" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors ${
                pathname === "/" ? "text-foreground bg-white/5" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
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
                href="/shop"
                className={`flex items-center gap-1 rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors ${
                  pathname === "/shop" ? "text-foreground bg-white/5" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                Shop <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              {megaOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
                  <div className="bg-card/95 backdrop-blur-xl border border-border rounded-card p-1 w-50 space-y-0.5">
                    {shopCategories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.to}
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
              href="/about"
              className={`rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors ${
                pathname === "/about" ? "text-foreground bg-white/5" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors ${
                pathname === "/contact" ? "text-foreground bg-white/5" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {pathname === "/" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="h-9 w-9 rounded-full border border-border/40 bg-transparent p-2 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-white/5 hover:text-foreground active:scale-95"
                aria-label="Open search"
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-full border border-border/40 bg-transparent p-2 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-white/5 hover:text-foreground active:scale-95"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-5 w-5" />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.7, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 24 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Badge className="h-5 w-5 rounded-full border border-white/20 bg-white/15 p-0 text-[10px] font-bold text-foreground shadow-sm backdrop-blur-md flex items-center justify-center">
                        {totalItems}
                      </Badge>
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </Link>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full border border-border/40 bg-transparent p-2 text-muted-foreground transition-all duration-200 hover:border-foreground/20 hover:bg-white/5 hover:text-foreground">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-border w-70">
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
                        href={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={`px-4 py-3 rounded-button text-sm font-medium transition-colors ${
                          pathname === link.to
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
      {pathname === "/" && <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />}
    </>
  );
}
