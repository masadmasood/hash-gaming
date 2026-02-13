import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { PageTransition } from "@/components/PageTransition";
import { products, reviews, categories } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, PackageCheck, Truck, Star, ArrowRight, Quote, ChevronLeft, ChevronRight, Zap, Award, Headphones } from "lucide-react";
import { useState, useRef } from "react";

const categoryIcons: Record<string, typeof Headphones> = {
  Keyboards: Zap,
  Mouse: Award,
  Headphones: Headphones,
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
  const [comboIndex, setComboIndex] = useState(0);
  const maxComboIndex = Math.max(0, combos.length - 3);

  const nextReview = () => setReviewIndex((i) => (i + 1) % displayReviews.length);
  const prevReview = () => setReviewIndex((i) => (i - 1 + displayReviews.length) % displayReviews.length);
  const nextCombo = () => setComboIndex((i) => Math.min(i + 1, maxComboIndex));
  const prevCombo = () => setComboIndex((i) => Math.max(i - 1, 0));

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

        {/* Categories */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-gaming text-foreground mb-8">Browse Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const Icon = categoryIcons[cat];
                return (
                  <Link key={cat} to={`/shop?category=${cat}`}>
                    <Card className="group rounded-card border-border bg-card hover:border-foreground/20 transition-all duration-200 cursor-pointer overflow-hidden">
                      <div className="aspect-[4/3] bg-surface overflow-hidden flex items-center justify-center">
                        <Icon className="h-16 w-16 text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors" />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-gaming text-foreground text-lg">{cat}</h3>
                        <p className="text-sm text-muted-foreground">
                          {products.filter((p) => p.category === cat && !p.isCombo).length} products
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Trending */}
        <section className="py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-gaming text-foreground">Trending Products</h2>
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page Banner */}
        <section className="py-6">
          <div className="container">
            <div className="rounded-card border border-border bg-surface p-8 md:p-10 text-center space-y-3">
              <h3 className="font-gaming text-foreground text-xl">New Arrivals Every Week</h3>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                We source fresh inventory from top gaming brands weekly. Follow us to never miss a drop.
              </p>
              <Link to="/shop">
                <Button variant="outline" className="rounded-button border-border text-foreground hover:bg-card mt-2">
                  Browse New Stock →
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Combo Deals */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-gaming text-foreground mb-8">Combo Deals</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {combos.map((combo) => (
                <Link key={combo.id} to={`/product/${combo.id}`} className="block h-full">
                  <Card className="rounded-card border-border bg-card hover:border-foreground/20 transition-all duration-200 h-full flex flex-col">
                    <div className="aspect-[4/3] bg-surface relative overflow-hidden rounded-t-card">
                      <img src={combo.images[0]} alt={combo.title} className="h-full w-full object-cover" />
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

        {/* Why Us - 4 column grid */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl font-gaming text-foreground mb-10">Why Hashtech Gaming?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyUs.map((item) => (
                <div key={item.title} className="space-y-3">
                  <div className="h-10 w-10 rounded-lg border border-border flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-gaming text-foreground text-base">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews - 3-card Slider */}
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-gaming text-foreground">What Gamers Say</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevReview}
                  className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-surface transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 text-foreground" />
                </button>
                <button
                  onClick={nextReview}
                  className="h-9 w-9 rounded-full border border-border flex items-center justify-center hover:bg-surface transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-foreground" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayReviews.map((review) => (
                <div
                  key={review.id}
                  className="relative p-6 rounded-card border border-border bg-card flex flex-col justify-between"
                >
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
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "{review.text}"
                    </p>
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

        {/* CTA */}
        <section className="py-16">
          <div className="container max-w-3xl mx-auto">
            <Card className="rounded-card border-border bg-card">
              <CardContent className="p-12 md:p-16 text-center space-y-6">
                <h2 className="text-3xl font-gaming text-foreground">
                  Ready to Level Up?
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Browse our full collection of quality-tested, pre-owned gaming gear at unbeatable prices.
                </p>
                <div className="pt-2">
                  <Link to="/shop">
                    <Button variant="outline" className="h-12 px-8 rounded-button border-border text-foreground hover:bg-surface hover:border-foreground/20 font-semibold">
                      Explore Shop →
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Index;
