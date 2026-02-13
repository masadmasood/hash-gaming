import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { PageTransition } from "@/components/PageTransition";
import { products, reviews, categories } from "@/data/products";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Keyboard, Mouse, Headphones, ShieldCheck, PackageCheck, Truck, Star, Send, Plus, Minus, Quote } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const categoryIcons: Record<string, any> = { Keyboards: Keyboard, Mouse: Mouse, Headphones: Headphones };

const trendingProducts = products.filter((p) => !p.isCombo).slice(0, 8);
const combos = products.filter((p) => p.isCombo);

const whyUs = [
  { icon: ShieldCheck, title: "Quality Tested", desc: "Every item inspected and graded honestly" },
  { icon: PackageCheck, title: "Secure Packaging", desc: "Double-boxed for safe delivery across Pakistan" },
  { icon: Truck, title: "Nationwide Delivery", desc: "Express, Standard & Economy options" },
  { icon: Star, title: "Trusted Reviews", desc: "Real feedback from verified buyers" },
];

const faqs = [
  { q: "Are your products really used?", a: "Yes — every product is pre-owned. We source from verified sellers and test each item rigorously before listing." },
  { q: "How do you grade condition?", a: "We use a transparent 1–10 grading scale. Each product is inspected for cosmetic wear, functionality, and included accessories." },
  { q: "Do you offer returns?", a: "We offer a 3-day exchange policy. If the item doesn't match our listed condition, we'll replace it at no extra cost." },
  { q: "How long does shipping take?", a: "Standard delivery takes 3–5 business days nationwide. Express options are available for Karachi orders." },
  { q: "Can I sell my gear to you?", a: "Absolutely! Reach out via WhatsApp or our contact form and we'll evaluate your gear for a potential trade-in." },
];

const Index = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Please enter your email"); return; }
    toast.success("You're subscribed! Welcome to the community.");
    setEmail("");
  };

  return (
    <PageTransition>
      <main>
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-tight">
              Used Gaming Gear.
              <br />
              Tested. Ready.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Premium pre-owned keyboards, mice & headphones from top brands. Every item quality-checked in Karachi.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link to="/shop">
                <Button className="h-12 px-6 rounded-button bg-foreground text-background hover:bg-foreground/90 font-medium">
                  Shop Now
                </Button>
              </Link>
              <Link to="/shop?combo=true">
                <Button variant="outline" className="h-12 px-6 rounded-button border-border text-foreground hover:bg-surface">
                  View Combo Deals
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12">
          <div className="container">
            <h2 className="text-2xl font-semibold mb-8 text-foreground">Browse Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {categories.map((cat) => {
                const Icon = categoryIcons[cat];
                return (
                  <Link key={cat} to={`/shop?category=${cat}`}>
                    <Card className="rounded-card border-border/30 bg-card hover:-translate-y-0.5 hover:border-foreground/20 transition-all duration-200 cursor-pointer">
                      <CardContent className="flex items-center gap-4 p-6">
                        <div className="h-12 w-12 rounded-lg bg-surface-2 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{cat}</h3>
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
              <h2 className="text-2xl font-semibold text-foreground">Trending Products</h2>
              <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                View all →
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
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-foreground">Combo Deals</h2>
              <Link to="/shop?combo=true" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                View all →
              </Link>
            </div>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {combos.map((combo) => (
                  <CarouselItem key={combo.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Link to={`/product/${combo.id}`}>
                      <Card className="rounded-card border-border/30 bg-card hover:-translate-y-0.5 hover:border-foreground/20 transition-all duration-200">
                        <div className="aspect-[4/3] bg-surface-2 relative overflow-hidden rounded-t-card">
                          <img src={combo.images[0]} alt={combo.title} className="h-full w-full object-cover" />
                          <Badge className="absolute top-3 left-3 rounded-full bg-foreground text-background text-xs">
                            COMBO
                          </Badge>
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
        <section className="py-12 bg-card">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground">Why Hashtech Gaming?</h2>
              <p className="text-sm text-muted-foreground mt-2">Everything we do is built around trust, quality, and the gaming community.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {whyUs.map((item) => (
                <Card key={item.title} className="rounded-card border-border/30 bg-background">
                  <CardContent className="p-6 space-y-3">
                    <div className="h-10 w-10 rounded-lg bg-surface-2 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
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
            <h2 className="text-2xl font-semibold mb-8 text-foreground">What Gamers Say</h2>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {reviews.map((review) => (
                  <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="rounded-card border-border/30 bg-card h-full">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-surface-2 overflow-hidden">
                            <img src={review.image} alt={review.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-foreground">{review.name}</p>
                            <div className="flex gap-0.5">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-foreground text-foreground" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">"{review.text}"</p>
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

        {/* FAQ */}
        <section className="py-16">
          <div className="container max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-foreground">Frequently Asked Questions</h2>
              <p className="text-sm text-muted-foreground mt-2">Everything you need to know about buying from us</p>
            </div>
            <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="group rounded-card border border-border/30 bg-card px-6 data-[state=open]:border-foreground/20 transition-all duration-200">
                  <AccordionTrigger className="py-5 text-[15px] text-foreground hover:no-underline [&>svg]:hidden font-['Inter',sans-serif] font-normal">
                    <span className="text-left">{faq.q}</span>
                    <div className="ml-4 shrink-0">
                      <Plus className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:hidden" />
                      <Minus className="h-4 w-4 text-muted-foreground transition-transform duration-200 hidden group-data-[state=open]:block" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm text-muted-foreground leading-relaxed font-['Inter',sans-serif]">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-12 bg-card">
          <div className="container max-w-xl mx-auto text-center space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Stay in the Loop</h2>
            <p className="text-sm text-muted-foreground">Get notified about new drops, restocks, and exclusive combo deals.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-input border-border/30 bg-background h-11 flex-1"
              />
              <Button type="submit" className="h-11 px-5 rounded-button bg-foreground text-background hover:bg-foreground/90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>

        {/* Contact Strip */}
        <section className="py-12 border-t border-border/30">
          <div className="container text-center space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Get in Touch</h2>
            <p className="text-muted-foreground">Questions? Reach out to us anytime.</p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span>0313-2153277</span>
              <span>hammadparekh52@gmail.com</span>
            </div>
            <Link to="/contact">
              <Button variant="outline" className="rounded-button border-border/30 mt-2">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default Index;
