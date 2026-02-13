import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { PageTransition } from "@/components/PageTransition";
import { products, reviews, categories } from "@/data/products";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, PackageCheck, Truck, Star, ArrowRight, Quote } from "lucide-react";

const categoryImages: Record<string, string> = {
  Keyboards: "/placeholder.svg",
  Mouse: "/placeholder.svg",
  Headphones: "/placeholder.svg",
};

const trendingProducts = products.filter((p) => !p.isCombo).slice(0, 8);
const combos = products.filter((p) => p.isCombo);

const whyUs = [
  { icon: ShieldCheck, title: "Quality Tested", desc: "Every item inspected and graded honestly" },
  { icon: PackageCheck, title: "Secure Packaging", desc: "Double-boxed for safe delivery across Pakistan" },
  { icon: Truck, title: "Nationwide Delivery", desc: "Express, Standard & Economy options" },
  { icon: Star, title: "Trusted Reviews", desc: "Real feedback from verified buyers" },
];

const Index = () => {
  return (
    <PageTransition>
      <main>
        {/* Hero */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
          <div className="container text-center max-w-3xl mx-auto space-y-6 relative z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight font-gaming">
              Used Gaming Gear.
              <br />
              <span className="text-gradient-accent">Tested & Ready.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Premium pre-owned keyboards, mice & headphones from top brands. Every item quality-checked in Karachi.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link to="/shop">
                <Button className="h-12 px-6 rounded-button bg-foreground text-background hover:bg-foreground/90 font-semibold">
                  Shop Now
                </Button>
              </Link>
              <Link to="/shop?combo=true">
                <Button variant="outline" className="h-12 px-6 rounded-button border-foreground/20 text-foreground hover:bg-foreground/10 hover:border-foreground/30">
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
              {categories.map((cat) => (
                  <Link key={cat} to={`/shop?category=${cat}`}>
                    <Card className="group rounded-card border-border bg-card hover:-translate-y-1 hover:border-foreground/15 transition-all duration-200 cursor-pointer overflow-hidden relative">
                      <div className="aspect-[4/3] bg-surface-2 overflow-hidden relative">
                        <img src={categoryImages[cat]} alt={cat} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="font-bold text-foreground font-gaming text-xl">{cat}</h3>
                          <p className="text-sm text-foreground/70">
                            {products.filter((p) => p.category === cat && !p.isCombo).length} products
                          </p>
                        </div>
                      </div>
                    </Card>
                  </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Trending */}
        <section className="py-12">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground font-gaming">Trending Products</h2>
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

        {/* Combo Deals */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-8 text-foreground font-gaming">Combo Deals</h2>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {combos.map((combo) => (
                  <CarouselItem key={combo.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Link to={`/product/${combo.id}`} className="block h-full">
                      <Card className="rounded-card border-border bg-card hover:-translate-y-1 hover:border-accent/20 transition-all duration-200 h-full flex flex-col">
                        <div className="aspect-[4/3] bg-surface-2 relative overflow-hidden rounded-t-card">
                          <img src={combo.images[0]} alt={combo.title} className="h-full w-full object-cover" />
                          <Badge className="absolute top-3 left-3 rounded-md bg-accent text-accent-foreground text-xs border-0">COMBO</Badge>
                        </div>
                        <CardContent className="p-4 space-y-2 flex-1 flex flex-col">
                          <h3 className="font-semibold text-sm text-foreground">{combo.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{combo.comboItems?.join(" + ")}</p>
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
                <Card key={item.title} className="rounded-card border-border bg-card hover:border-foreground/10 transition-colors h-full">
                  <CardContent className="p-6 space-y-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="font-bold text-foreground font-gaming text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews — Unique testimonial layout */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-2xl font-bold mb-10 text-foreground font-gaming text-center">What Gamers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={`relative p-6 rounded-card border border-border bg-card group hover:border-accent/20 transition-all duration-300 flex flex-col justify-between ${
                    index === 0 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  {/* Decorative quote */}
                  <div className="absolute top-4 right-4 opacity-[0.06]">
                    <Quote className="h-12 w-12 text-foreground" />
                  </div>

                  <div className="space-y-4 relative z-10">
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-star-gold text-star-gold" />
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => (
                        <Star key={`e-${i}`} className="h-4 w-4 text-muted-foreground/20" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-sm text-foreground/80 leading-relaxed italic">
                      "{review.text}"
                    </p>
                  </div>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
                    <div className="h-10 w-10 rounded-full bg-accent/20 overflow-hidden ring-2 ring-accent/10">
                      <img src={review.image} alt={review.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground font-gaming">{review.name}</p>
                      <p className="text-xs text-muted-foreground">Verified Buyer</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-border">
          <div className="container text-center space-y-5 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-foreground font-gaming">
              Ready to <span className="text-gradient-accent">Level Up</span>?
            </h2>
            <p className="text-muted-foreground">Browse our full collection of tested gaming gear.</p>
            <Link to="/shop">
              <Button className="h-12 px-8 rounded-button bg-foreground text-background hover:bg-foreground/90 font-semibold mt-2">
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
