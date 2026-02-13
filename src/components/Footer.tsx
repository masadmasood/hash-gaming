import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { ArrowUp, Hash } from "lucide-react";
import { siteName, siteTagline, siteCopyright, instagramLink } from "@/data/siteData";

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-card mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Brand - spans 6 cols */}
          <div className="col-span-12 sm:col-span-6 space-y-3">
            <h3 className="font-gaming-black text-foreground text-lg flex items-center gap-2 capitalize"><Hash className="h-5 w-5" /> Hash Tech</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              {siteTagline}
            </p>
          </div>

          {/* Shop - spans 2 cols */}
          <div className="col-span-4 sm:col-span-2 space-y-3">
            <h4 className="font-semibold text-foreground text-sm">Shop</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/shop?category=Keyboards" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Keyboards</Link>
              <Link to="/shop?category=Mouse" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Mouse</Link>
              <Link to="/shop?category=Headphones" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Headphones</Link>
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Products</Link>
            </nav>
          </div>

          {/* Support - spans 2 cols */}
          <div className="col-span-4 sm:col-span-2 space-y-3">
            <h4 className="font-semibold text-foreground text-sm">Support</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
              <Link to="/exchange-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Exchange Policy</Link>
              <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cart</Link>
            </nav>
          </div>

          {/* Legal - spans 2 cols */}
          <div className="col-span-4 sm:col-span-2 space-y-3">
            <h4 className="font-semibold text-foreground text-sm">Legal</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</Link>
            </nav>
          </div>
        </div>
        <Separator className="my-8 bg-border" />
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {siteCopyright}
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
