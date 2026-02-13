import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          <div className="space-y-3">
            <h3 className="font-gaming-black text-foreground text-lg">HASHTECH</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium pre-owned gaming gear. Quality tested and verified in Pakistan.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm">Shop</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/shop?category=Keyboards" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Keyboards</Link>
              <Link to="/shop?category=Mouse" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Mouse</Link>
              <Link to="/shop?category=Headphones" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Headphones</Link>
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Products</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm">Support</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
              <Link to="/exchange-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Exchange Policy</Link>
              <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cart</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</Link>
            </nav>
          </div>
        </div>
        <Separator className="my-8 bg-border" />
        <p className="text-center text-xs text-muted-foreground">
          © 2026 Hashtech Gaming. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
