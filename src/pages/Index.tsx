import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { PageTransition } from "@/components/PageTransition";
import bannerImage from "@/assets/banner-arrivals.jpg";
import catKeyboards from "@/assets/cat-keyboards.jpg";
import catMouse from "@/assets/cat-mouse.jpg";
import catHeadphones from "@/assets/cat-headphones.jpg";
import { products, reviews, categories } from "@/data/products";
import { productImages } from "@/data/productImages";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, PackageCheck, Truck, Star, ArrowRight, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const categoryImages: Record<string, string> = {
  Keyboards: catKeyboards,
  Mouse: catMouse,
  Headphones: catHeadphones,
};

const trendingProducts = products.filter((p) => !p.isCombo).slice(0, 8);
const combos = products.filter((p) => p.isCombo);
const displayReviews = reviews.slice(0, 3);

const whyUs = [
  { icon: ShieldCheck, title: "Quality Tested", desc: "Every single item is inspected, graded honestly, and tested for performance before listing on our store." },
  { icon: PackageCheck, title: "Secure Packaging", desc: "We double-box every order with protective foam inserts to ensure your gear arrives in perfect condition." },
  { icon: Truck, title: "Nationwide Delivery", desc: "Fast and reliable shipping to all major cities across Pakistan with real-time tracking on every order." },
  { icon: Star, title: "Trusted by Gamers", desc: "Hundreds of verified buyers trust us for honest condition grading, fair prices, and excellent after-sales support." },
];

const Index = () => {
  const [reviewIndex, setReviewIndex] = useState(0);

  const nextReview = () => setReviewIndex((i) => (i + 1) % displayReviews.length);
  const prevReview = () => setReviewIndex((i) => (i - 1 + displayReviews.length) % displayReviews.length);

  return (
    <PageTransition>
      <main>
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="container text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-gaming-black tracking-tight text-foreground leading-[0.95]">
              USED GAMING GEAR
              <br />
              <span className="text-muted-foreground">TESTED & READY</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Premium pre-owned keyboards, mice & headphones from top brands. Every item quality-checked in Karachi.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link to="/shop">
                <Button className="h-12 px-6 rounded-button bg-foreground text-background hover:bg-foreground/80 font-semibold">
                  Shop Now →
                </Button>
              </Link>
              <Link to="/shop?combo=true">
                <Button variant="outline" className="h-12 px-6 rounded-button border-border text-foreground hover:bg-surface hover:border-foreground/20">
                  View Combos
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories — Overlay cards, compact visual */}
        <section className="pb-20">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <Link key={cat} to={`/shop?category=${cat}`}>
                  <div className="group relative aspect-[16/9] rounded-card overflow-hidden cursor-pointer">
                    <img src={categoryImages[cat]} alt={cat} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-background/50 group-hover:bg-background/30 transition-colors duration-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <h3 className="font-gaming-black text-foreground text-xl md:text-2xl tracking-wide">{cat.toUpperCase()}</h3>
                      <p className="text-xs text-foreground/50 mt-1">
                        {products.filter((p) => p.category === cat && !p.isCombo).length} products
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending — with subtitle and bordered "View all" link */}
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-gaming text-foreground">Trending Products</h2>
                <p className="text-sm text-muted-foreground mt-1">Our most popular picks this week</p>
              </div>
              <Link to="/shop" className="hidden sm:flex text-sm text-muted-foreground hover:text-foreground transition-colors items-center gap-1 border border-border rounded-button px-4 py-2 hover:bg-surface">
                View all <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page Banner — Full width parallax */}
        <section
          className="relative py-24 md:py-32 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className="absolute inset-0 bg-background/70" />
          <div className="relative z-10 container text-center space-y-4">
            <h3 className="font-gaming-black text-foreground text-2xl md:text-3xl">New Arrivals Every Week</h3>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              We source fresh inventory from top gaming brands weekly. Follow us to never miss a drop.
            </p>
            <Link to="/shop">
              <Button variant="outline" className="rounded-button border-foreground/20 text-foreground hover:bg-foreground/10 mt-3">
                Browse New Stock →
              </Button>
            </Link>
          </div>
        </section>

        {/* Combo Deals — on surface background to break the rhythm */}
        <section className="py-16 bg-surface">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-gaming text-foreground">Combo Deals</h2>
                <p className="text-sm text-muted-foreground mt-1">Save more when you bundle</p>
              </div>
              <Link to="/shop?combo=true" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                All combos <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {combos.map((combo) => (
                <Link key={combo.id} to={`/product/${combo.id}`} className="block h-full">
                  <Card className="rounded-card border-border bg-card hover:border-foreground/20 transition-all duration-200 h-full flex flex-col">
                    <div className="aspect-[4/3] bg-background relative overflow-hidden rounded-t-card">
                      <img src={productImages[combo.id] || combo.images[0]} alt={combo.title} className="h-full w-full object-cover" />
                      <span className="absolute top-3 left-3 inline-flex text-xs font-semibold px-2.5 py-1 rounded-button bg-foreground text-background">COMBO</span>
                    </div>
                    <CardContent className="p-4 space-y-2 flex-1 flex flex-col">
                      <h3 className="font-semibold text-sm text-foreground">{combo.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{combo.comboItems?.join(" + ")}</p>
                      <p className="font-semibold text-foreground">PKR {combo.pricePKR.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-gaming text-foreground">Why Hashtech Gaming?</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">Everything we do is built around trust, quality, and the gaming community.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUs.map((item) => (
                <div key={item.title} className="text-center space-y-3">
                  <div className="h-12 w-12 rounded-full border border-border flex items-center justify-center mx-auto">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-gaming text-foreground text-base">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-16 bg-surface">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-gaming text-foreground">What Gamers Say</h2>
                <p className="text-sm text-muted-foreground mt-1">Real feedback from verified buyers</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={prevReview} className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors">
                  <ChevronLeft className="h-4 w-4 text-foreground" />
                </button>
                <button onClick={nextReview} className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors">
                  <ChevronRight className="h-4 w-4 text-foreground" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayReviews.map((review) => (
                <div key={review.id} className="relative p-6 rounded-card border border-border bg-card flex flex-col justify-between">
                  <div className="absolute top-4 right-4 opacity-[0.06]">
                    <Quote className="h-12 w-12 text-foreground" />
                  </div>
                  <div className="space-y-4 relative z-10">
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-star text-star" />
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => (
                        <Star key={`e-${i}`} className="h-4 w-4 text-border" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">"{review.text}"</p>
                  </div>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
                    <div className="h-9 w-9 rounded-full bg-surface-2 overflow-hidden">
                      <img src={review.image} alt={review.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">{review.name}</p>
                      <p className="text-xs text-muted-foreground">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="container max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-gaming text-foreground">Frequently Asked Questions</h2>
              <p className="text-sm text-muted-foreground mt-2">Got questions? We've got answers.</p>
            </div>
            <div className="space-y-3">
              {[
                { q: "Are all products tested before shipping?", a: "Yes, every single item is inspected, graded, and tested for full functionality before being listed on our store." },
                { q: "What does the condition score mean?", a: "We grade every product on a scale of 1–10. Excellent (9–10) means near-new, Very Good (7–8) means minor cosmetic wear, and Good (5–6) means visible wear but fully functional." },
                { q: "Do you offer returns or exchanges?", a: "We offer a 3-day exchange policy on all products. If the item doesn't match the listed condition, we'll replace it at no extra cost." },
                { q: "How long does delivery take?", a: "Delivery takes 2–5 business days depending on your city. We ship nationwide across Pakistan with tracking on every order." },
                { q: "Can I pay cash on delivery?", a: "Yes, we support Cash on Delivery (COD) for all orders within Pakistan. Online payment options are also available." },
              ].map((faq, i) => (
                <details key={i} className="group rounded-card border border-border bg-card">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-sm font-medium text-foreground list-none">
                    {faq.q}
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90 shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto">
            <div className="rounded-card border border-border p-14 md:p-20 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-gaming text-foreground">Ready to Level Up?</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Browse our full collection of quality-tested, pre-owned gaming gear at unbeatable prices.
              </p>
              <div className="pt-3">
                <Link to="/shop">
                  <Button variant="outline" className="h-12 px-8 rounded-button border-border text-foreground hover:bg-surface hover:border-foreground/20 font-semibold">
                    Explore Shop →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Index;
