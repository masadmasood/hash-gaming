import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold text-foreground font-gaming text-lg">Hashtech Gaming</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium used gaming accessories in Karachi, Pakistan. Every item tested and verified.
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Hammad Shafi</p>
              <p>0313-2153277</p>
              <p>hammadparekh52@gmail.com</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-foreground text-sm font-gaming">Shop</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/shop?category=Keyboards" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Keyboards</Link>
              <Link to="/shop?category=Mouse" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Mouse</Link>
              <Link to="/shop?category=Headphones" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Headphones</Link>
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Products</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-foreground text-sm font-gaming">Support</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
              <Link to="/policies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Delivery Policy</Link>
              <Link to="/policies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Exchange Policy</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-foreground text-sm font-gaming">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/policies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/policies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
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
