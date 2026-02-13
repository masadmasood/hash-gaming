import { useState, lazy, Suspense, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { PageTransition } from "@/components/PageTransition";
import { products, reviews, categories, productImages, categoryImages, bannerImage, faqs, whyUsReasons } from "@/data/siteData";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShieldCheck,
  PackageCheck,
  Truck,
  Star,
  ArrowRight,
  Quote,
  Minus,
  Plus,
  Trophy,
  Send,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { toast } from "sonner";

const trendingProducts = products.filter((p) => !p.isCombo).slice(0, 8);
const combos = products.filter((p) => p.isCombo);
const whyUs = whyUsReasons;
const whyUsIcons = [ShieldCheck, PackageCheck, Truck, Trophy];

const Index = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletter = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error("Please enter your email address");
      return;
    }
    toast.success("Thanks for subscribing! 🎮");
    setNewsletterEmail("");
  }, [newsletterEmail]);

  return (
    <PageTransition>
      <main>
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="container text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[0.95]">
              USED GAMING GEAR
              <br />
              <span className="text-muted-foreground">TESTED & READY</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Premium pre-owned keyboards, mice & headphones from top brands. Every item quality-checked in Karachi.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link to="/shop">
                <Button className="h-12 px-6 rounded-button bg-foreground text-background hover:bg-foreground/80 font-semibold gap-2">
                  Shop Now <ArrowRight className="h-4 w-4" />
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
        <section className="pb-20">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {categories.map((cat) => (
                <Link key={cat} to={`/shop?category=${cat}`}>
                  <div className="group relative aspect-[3/4] sm:aspect-[9/16] rounded-card overflow-hidden cursor-pointer border border-border/30">
                    <img src={categoryImages[cat]} alt={cat} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-sm group-hover:bg-background/30 group-hover:backdrop-blur-sm transition-all duration-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <h3 className="font-bold text-foreground text-lg md:text-2xl tracking-wide">{cat.toUpperCase()}</h3>
                      <p className="text-xs text-foreground/50 mt-1">
                        {products.filter((p) => p.category === cat && !p.isCombo).length} products
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              <Link to="/shop?combo=true">
                <div className="group relative aspect-[3/4] sm:aspect-[9/16] rounded-card overflow-hidden cursor-pointer border border-border/30">
                  <img src={productImages[combos[0]?.id] || bannerImage} alt="Combos" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-sm group-hover:bg-background/30 group-hover:backdrop-blur-sm transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <h3 className="font-bold text-foreground text-lg md:text-2xl tracking-wide">COMBOS</h3>
                    <p className="text-xs text-foreground/50 mt-1">
                      {combos.length} bundles
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Trending */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Trending Products</h2>
                <p className="text-sm text-muted-foreground mt-1">Our most popular picks this week</p>
              </div>
              <Link to="/shop" className="hidden sm:flex text-sm text-muted-foreground hover:text-foreground transition-colors items-center gap-1 group">
                View all <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {trendingProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page Banner */}
        <section
          className="relative py-24 md:py-32 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
          <div className="relative z-10 container text-center space-y-4">
            <h3 className="font-bold text-foreground text-2xl md:text-3xl">New Arrivals Every Week</h3>
            <p className="text-base font-normal text-foreground/70 max-w-lg mx-auto">
              We source fresh inventory from top gaming brands weekly. Follow us to never miss a drop.
            </p>
            <Link to="/shop" className="block mt-2">
              <Button className="h-12 px-6 rounded-button bg-foreground text-background hover:bg-foreground/80 font-semibold gap-2">
                Browse New Stock <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Combo Deals */}
        <section className="pt-16 pb-24 md:pb-32">
          <div className="container">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Combo Deals</h2>
                  <p className="text-sm text-muted-foreground mt-1">Save more when you bundle</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <CarouselPrevious className="static translate-y-0 size-10" />
                    <CarouselNext className="static translate-y-0 size-10" />
                  </div>
                </div>
              </div>
              <CarouselContent>
                {combos.map((combo) => (
                  <CarouselItem key={combo.id} className="basis-1/2 lg:basis-1/4">
                    <Link to={`/product/${combo.id}`} className="block h-full">
                      <Card className="rounded-card border-border/30 bg-card hover:border-foreground/20 transition-all duration-200 h-full flex flex-col">
                        <div className="aspect-[4/3] bg-background relative overflow-hidden rounded-t-card">
                          <img src={productImages[combo.id] || combo.images[0]} alt={combo.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy" />
                          <span className="absolute top-3 left-3 inline-flex text-[10px] font-semibold px-2 py-1 rounded-full bg-foreground text-background">COMBO</span>
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
            </Carousel>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-24 relative overflow-hidden bg-card">
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  WHY CHOOSE <br />
                  <span className="text-primary">HASHTECH?</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We are a team of passionate gamers who understand the importance of reliable gear.
                  We don't just sell used products; we give them a second life.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  {whyUs.map((item, idx) => {
                    const Icon = whyUsIcons[idx] || ShieldCheck;
                    return (
                      <div key={item.title} className="flex flex-col items-start gap-4 p-5 md:p-6 rounded-card bg-background/50 border border-border/50 transition-colors">
                        <div className="shrink-0 h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-primary">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-secondary/30 relative">
                  <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:24px_24px]" />
                  <div className="relative h-full flex flex-col items-center justify-center p-8 text-center bg-background/20 backdrop-blur-sm border border-white/10 m-8 rounded-[2rem]">
                    <div className="flex -space-x-4 rtl:space-x-reverse mb-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-12 h-12 rounded-full border-2 border-background overflow-hidden bg-muted">
                          <img src={reviews[i]?.image} alt="User" className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      ))}
                    </div>
                    <div className="text-7xl font-extrabold text-foreground mb-2">10K+</div>
                    <div className="text-xl text-muted-foreground font-semibold">Happy Gamers Served</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-24">
          <div className="container">
            <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-7xl mx-auto">
              <div className="flex items-end justify-between mb-10">
                <div className="text-start">
                  <h2 className="text-2xl font-bold text-foreground">What the Squad Says</h2>
                  <p className="text-sm text-muted-foreground mt-1">Join thousands of satisfied gamers in Pakistan.</p>
                </div>
                <div className="flex gap-2">
                  <CarouselPrevious className="static translate-y-0 size-10" />
                  <CarouselNext className="static translate-y-0 size-10" />
                </div>
              </div>
              <CarouselContent>
                {reviews.map((review) => (
                  <CarouselItem key={review.id} className="basis-full sm:basis-1/2 lg:basis-1/3 p-2">
                    <div className="h-full p-6 md:p-8 rounded-card bg-secondary/10 border border-border/30 hover:bg-secondary/20 transition-all duration-300 flex flex-col relative overflow-hidden group">
                      <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                        ))}
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-8 flex-1 relative z-10 font-normal text-sm">
                        "{review.text}"
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-border bg-surface">
                          <img src={review.image} alt={review.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-sm">{review.name}</h4>
                          <span className="text-xs text-primary font-medium flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Verified Buyer
                          </span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20">
          <div className="container max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              <p className="text-sm text-muted-foreground mt-2">Got questions? We've got answers.</p>
            </div>
            <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="group rounded-card border border-border/30 bg-card px-6 data-[state=open]:border-foreground/20 transition-all duration-200">
                  <AccordionTrigger className="py-5 text-[15px] text-foreground hover:no-underline [&>svg]:hidden font-['Inter',sans-serif] font-normal">
                    <span className="text-left">{faq.question}</span>
                    <div className="ml-4 shrink-0">
                      <Plus className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:hidden" />
                      <Minus className="h-4 w-4 text-muted-foreground transition-transform duration-200 hidden group-data-[state=open]:block" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm text-muted-foreground leading-relaxed font-['Inter',sans-serif]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-card">
          <div className="container max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Stay in the Loop</h2>
            <p className="text-sm text-muted-foreground mb-8">Get notified about new drops, exclusive deals, and restocks. No spam, ever.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 h-12 px-4 rounded-button border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 transition-colors"
              />
              <Button type="submit" className="h-12 px-6 rounded-button bg-foreground text-background hover:bg-foreground/80 font-semibold gap-2">
                <Send className="h-4 w-4" /> Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Index;
