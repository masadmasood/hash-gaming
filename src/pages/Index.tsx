import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { PageTransition } from "@/components/PageTransition";
import { products, reviews, categories } from "@/data/products";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Keyboard, Mouse, Headphones, ShieldCheck, PackageCheck, Truck, Star, ArrowRight } from "lucide-react";

const categoryIcons: Record<string, typeof Keyboard> = { Keyboards: Keyboard, Mouse: Mouse, Headphones: Headphones };
const categoryImages: Record<string, string> = {
  Keyboards: "/placeholder.svg",
  Mouse: "/placeholder.svg",
  Headphones: "/placeholder.svg",
};

const trendingProducts = products.filter((p) => !p.isCombo).slice(0, 8);
const combos = products.filter((p) => p.isCombo);

const whyUs = [
  { icon: ShieldCheck, title: "Quality Tested", desc: "Every item inspected and graded honestly", accent: "neon-cyan" },
  { icon: PackageCheck, title: "Secure Packaging", desc: "Double-boxed for safe delivery across Pakistan", accent: "neon-purple" },
  { icon: Truck, title: "Nationwide Delivery", desc: "Express, Standard & Economy options", accent: "neon-lime" },
  { icon: Star, title: "Trusted Reviews", desc: "Real feedback from verified buyers", accent: "neon-cyan" },
];

const Index = () => {
  return (
    <PageTransition>
      <main>
        {/* Hero */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />
          <div className="container text-center max-w-3xl mx-auto space-y-6 relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight font-gaming">
              Used Gaming Gear.
              <br />
              <span className="text-gradient-cyan">Tested. Ready.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Premium pre-owned keyboards, mice & headphones from top brands. Every item quality-checked in Karachi.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link to="/shop">
                <Button className="h-12 px-6 rounded-button bg-neon-cyan text-black hover:bg-neon-cyan/90 font-semibold">
                  Shop Now
                </Button>
              </Link>
              <Link to="/shop?combo=true">
                <Button variant="outline" className="h-12 px-6 rounded-button border-border text-foreground hover:bg-surface hover:border-neon-cyan/30">
                  View Combo Deals
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-foreground font-gaming">Browse Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const Icon = categoryIcons[cat];
                return (
                  <Link key={cat} to={`/shop?category=${cat}`}>
                    <Card className="group rounded-card border-border bg-card hover:-translate-y-1 hover:border-neon-cyan/20 hover:shadow-[0_4px_24px_hsl(185_80%_55%/0.08)] transition-all duration-200 cursor-pointer overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <CardContent className="flex items-center gap-4 p-6 relative z-10">
                        <div className="h-14 w-14 rounded-lg bg-surface-2 border border-border flex items-center justify-center group-hover:border-neon-cyan/20 transition-colors">
                          <Icon className="h-6 w-6 text-neon-cyan" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground font-gaming">{cat}</h3>
                          <p className="text-sm text-muted-foreground">
                            {products.filter((p) => p.category === cat && !p.isCombo).length} products
                          </p>
                        </div>
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
              <h2 className="text-2xl font-bold text-foreground font-gaming">Trending Products</h2>
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-neon-cyan transition-colors flex items-center gap-1">
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

        {/* Combo Deals */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-foreground font-gaming">Combo Deals</h2>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {combos.map((combo) => (
                  <CarouselItem key={combo.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Link to={`/product/${combo.id}`}>
                      <Card className="rounded-card border-border bg-card hover:-translate-y-1 hover:border-neon-purple/20 hover:shadow-[0_4px_24px_hsl(270_70%_60%/0.08)] transition-all duration-200">
                        <div className="aspect-[4/3] bg-surface-2 relative overflow-hidden rounded-t-card">
                          <img src={combo.images[0]} alt={combo.title} className="h-full w-full object-cover" />
                          <Badge className="absolute top-3 left-3 rounded-md bg-neon-purple text-white text-xs border-0">COMBO</Badge>
                        </div>
                        <CardContent className="p-4 space-y-2">
                          <h3 className="font-semibold text-sm text-foreground">{combo.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">{combo.comboItems?.join(" + ")}</p>
                          <p className="font-semibold text-foreground">PKR {combo.pricePKR.toLocaleString()}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4 border-border bg-card hover:bg-surface" />
              <CarouselNext className="hidden md:flex -right-4 border-border bg-card hover:bg-surface" />
            </Carousel>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-foreground font-gaming">Why Hashtech Gaming?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {whyUs.map((item) => (
                <Card key={item.title} className="rounded-card border-border bg-card hover:border-neon-cyan/10 transition-colors">
                  <CardContent className="p-6 space-y-3">
                    <div className={`h-10 w-10 rounded-lg bg-${item.accent}/10 flex items-center justify-center`}>
                      <item.icon className={`h-5 w-5 text-${item.accent}`} />
                    </div>
                    <h3 className="font-semibold text-foreground font-gaming">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-foreground font-gaming">Customer Reviews</h2>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {reviews.map((review) => (
                  <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="rounded-card border-border bg-card h-full relative overflow-hidden group hover:border-neon-cyan/15 transition-colors">
                      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/[0.02] to-neon-purple/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <CardContent className="p-6 space-y-4 relative z-10">
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-star-gold text-star-gold" />
                          ))}
                          {Array.from({ length: 5 - review.rating }).map((_, i) => (
                            <Star key={`e-${i}`} className="h-4 w-4 text-muted-foreground/30" />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">"{review.text}"</p>
                        <div className="flex items-center gap-3 pt-2">
                          <div className="h-8 w-8 rounded-full bg-surface-2 overflow-hidden">
                            <img src={review.image} alt={review.name} className="h-full w-full object-cover" />
                          </div>
                          <p className="font-medium text-sm text-foreground font-gaming">{review.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-4 border-border bg-card hover:bg-surface" />
              <CarouselNext className="hidden md:flex -right-4 border-border bg-card hover:bg-surface" />
            </Carousel>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-border">
          <div className="container text-center space-y-5 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-foreground font-gaming">
              Ready to <span className="text-gradient-cyan">Level Up</span>?
            </h2>
            <p className="text-muted-foreground">Browse our full collection of tested gaming gear.</p>
            <Link to="/shop">
              <Button className="h-12 px-8 rounded-button bg-neon-cyan text-black hover:bg-neon-cyan/90 font-semibold mt-2">
                Explore Shop
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Index;
