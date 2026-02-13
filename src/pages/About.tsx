import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ShieldCheck,
  PackageCheck,
  Truck,
  Star,
  Users,
  Heart,
  Plus,
  Minus,
  Quote,
  ArrowRight,
  Target,
  Trophy,
  Gamepad2
} from "lucide-react";
import { Link } from "react-router-dom";
import { reviews } from "@/data/siteData";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const aboutFaqs = [
  { q: "Who is behind Hashtech Gaming?", a: "Hashtech Gaming is a Karachi-based team of passionate gamers who understand the value of quality gear at fair prices." },
  { q: "How do you source your products?", a: "We source from verified sellers, trade-in programs, and direct from gamers upgrading their setups. Every item goes through our quality inspection process." },
  { q: "Is everything really tested?", a: "Absolutely. Every product is inspected, graded on a 1–10 scale, and tested for full functionality before listing." },
  { q: "Do you offer warranty?", a: "We offer a 3-day exchange policy on all products. If the item doesn't match our listed condition, we'll replace it at no extra cost." },
  { q: "Can I sell my used gear to Hashtech?", a: "Yes! Reach out to us via WhatsApp or our contact form and we'll evaluate your gear for a potential trade-in or purchase." },
];

const displayReviews = reviews.slice(0, 6);

const About = () => {
  return (
    <PageTransition>
      <main className="overflow-hidden">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="container text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm font-medium text-foreground mb-4">
              <Users className="w-4 h-4" />
              <span>Built by Gamers, For Gamers</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[0.95]">
              LEVELING THE <br />
              <span className="text-muted-foreground">PLAYING FIELD</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              We're on a mission to make premium gaming gear accessible to every Pakistani gamer through quality pre-owned hardware.
            </p>
          </div>
        </section>

        {/* Mission / Story */}
        <section className="py-20 bg-card">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl text-foreground mb-4">OUR STORY</h2>
                  <div className="h-1 w-20 bg-primary rounded-full mb-6" />
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Hashtech Gaming started with a simple idea: gamers in Pakistan deserve access to quality gear without paying premium retail prices. We noticed that perfectly functional gaming peripherals were being discarded or undervalued, while new gamers struggled to afford quality equipment.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-card bg-background border border-border/50">
                    <Target className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-gaming text-lg mb-2">Our Mission</h3>
                    <p className="text-sm text-muted-foreground">To become Pakistan's most trusted marketplace for used gaming hardware.</p>
                  </div>
                  <div className="p-6 rounded-card bg-background border border-border/50">
                    <Heart className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-gaming text-lg mb-2">Our Values</h3>
                    <p className="text-sm text-muted-foreground">Transparency, quality assurance, and community first.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-card bg-secondary/30 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:24px_24px]" />
                  <div className="relative z-10 text-center p-8">
                    <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 backdrop-blur-sm border border-primary/10 transition-transform hover:rotate-6 duration-300">
                        <Gamepad2 className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-2">SINCE 2023</h3>
                    <p className="text-muted-foreground">Serving the Gaming Community</p>
                    <div className="mt-8 grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 rounded-card bg-background/50 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-primary">10k+</div>
                        <div className="text-xs text-muted-foreground">Items Sold</div>
                      </div>
                      <div className="p-4 rounded-card bg-background/50 backdrop-blur-sm">
                        <div className="text-2xl font-bold text-primary">4.9</div>
                        <div className="text-xs text-muted-foreground">Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart */}
        <section className="py-24 relative">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-gaming-black text-foreground mb-4">WHY US?</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">Standard setting quality control for the peace of mind you deserve.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: ShieldCheck, title: "Rigorous Testing", text: "Every item inspected and graded on a transparent 1–10 scale." },
                { icon: PackageCheck, title: "Secure Packaging", text: "Double-boxed with foam inserts for secure delivery nationwide." },
                { icon: Truck, title: "Fast Delivery", text: "Nationwide shipping with real-time tracking via TCS & Leopard." },
                { icon: Heart, title: "3-Day Exchange", text: "Complete peace of mind with our no-questions-asked exchange policy." },
                { icon: Users, title: "Community First", text: "Join our growing community of happy gamers across Pakistan." },
                { icon: Trophy, title: "Top Brands", text: "We specialized in Razer, Logitech, SteelSeries, HyperX & Corsair." },
              ].map((item, i) => (
                <Card key={i} className="bg-card/50 border-border/50 hover:border-foreground/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-lg bg-secondary/50 flex items-center justify-center mb-4 text-primary">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-gaming text-xl mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-card">
          <div className="container">
            <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-7xl mx-auto">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">What Gamers Say</h2>
                  <p className="text-sm text-muted-foreground mt-1">Real reviews from real customers.</p>
                </div>
                <div className="flex gap-2">
                  <CarouselPrevious className="static translate-y-0 size-10" />
                  <CarouselNext className="static translate-y-0 size-10" />
                </div>
              </div>
              <CarouselContent>
                {displayReviews.map((review) => (
                  <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                    <div className="h-full p-8 rounded-card bg-background border border-border/30 flex flex-col relative overflow-hidden group">
                      <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />
                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                        ))}
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-8 flex-1 relative z-10 font-normal">
                        "{review.text}"
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-border bg-surface">
                          <img src={review.image} alt={review.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground text-sm">{review.name}</h4>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
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
        <section className="py-24">
          <div className="container max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-gaming-black text-foreground">COMMON QUESTIONS</h2>
              <p className="text-sm text-muted-foreground mt-2">Everything you need to know about Hashtech Gaming</p>
            </div>
            <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
              {aboutFaqs.map((faq, i) => (
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

        {/* CTA */}
        <section className="py-24">
          <div className="container">
            <div className="w-full max-w-5xl mx-auto flex flex-col justify-center items-center rounded-card bg-secondary border border-border/50 p-12 md:p-16 text-center overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <Gamepad2 className="w-64 h-64" />
              </div>
              <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-5xl font-gaming-black text-foreground">READY TO LEVEL UP?</h2>
                <p className="text-lg text-muted-foreground">
                  Browse our full collection of quality-tested, pre-owned gaming gear at unbeatable prices.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/shop">
                    <Button size="lg" className="rounded-button px-8 h-12 text-base font-semibold">
                      Explore Shop <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline" size="lg" className="rounded-button px-8 h-12 text-base backdrop-blur-sm">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default About;
