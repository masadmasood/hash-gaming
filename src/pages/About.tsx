import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, PackageCheck, Truck, Star, Users, Heart, Plus, Minus, Quote, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { reviews } from "@/data/products";
import { useState } from "react";

const aboutFaqs = [
  { q: "Who is behind Hashtech Gaming?", a: "Hashtech Gaming is a Karachi-based team of passionate gamers who understand the value of quality gear at fair prices." },
  { q: "How do you source your products?", a: "We source from verified sellers, trade-in programs, and direct from gamers upgrading their setups. Every item goes through our quality inspection process." },
  { q: "Is everything really tested?", a: "Absolutely. Every product is inspected, graded on a 1–10 scale, and tested for full functionality before listing." },
  { q: "Do you offer warranty?", a: "We offer a 3-day exchange policy on all products. If the item doesn't match our listed condition, we'll replace it at no extra cost." },
  { q: "Can I sell my used gear to Hashtech?", a: "Yes! Reach out to us via WhatsApp or our contact form and we'll evaluate your gear for a potential trade-in or purchase." },
];

const displayReviews = reviews.slice(0, 3);

const About = () => {
  return (
    <PageTransition>
      <main>
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="container text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-gaming-black tracking-tight text-foreground leading-[0.95]">
              ABOUT HASHTECH
              <br />
              <span className="text-muted-foreground">GAMING</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              We're a team of gamers on a mission to make quality pre-owned gaming gear accessible to everyone in Pakistan.
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="pb-20">
          <div className="container max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-2xl font-gaming text-foreground">Our Story</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Hashtech Gaming started with a simple idea: gamers in Pakistan deserve access to quality gear without paying premium retail prices. We noticed that perfectly functional gaming peripherals were being discarded or undervalued, while new gamers struggled to afford quality equipment.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Today, we've built a trusted platform where every keyboard, mouse, and headset is rigorously tested, honestly graded, and delivered with care. Our community of hundreds of satisfied gamers speaks to our commitment to quality and transparency.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-gaming text-foreground">What Sets Us Apart</h2>
                <div className="space-y-4">
                  {[
                    { icon: ShieldCheck, text: "Every item inspected and graded on a transparent 1–10 scale" },
                    { icon: PackageCheck, text: "Double-boxed with foam inserts for secure delivery" },
                    { icon: Truck, text: "Nationwide shipping with real-time tracking" },
                    { icon: Heart, text: "3-day exchange policy for complete peace of mind" },
                    { icon: Users, text: "A growing community of 500+ happy gamers" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full border border-border/30 flex items-center justify-center shrink-0 mt-0.5">
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-card">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-gaming text-foreground">What Gamers Say</h2>
              <p className="text-sm text-muted-foreground mt-2">Real feedback from verified buyers</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {displayReviews.map((review) => (
                <div key={review.id} className="relative p-6 rounded-card border border-border/30 bg-background flex flex-col justify-between">
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
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border/30">
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
            <div className="text-center mb-12">
              <h2 className="text-2xl font-gaming text-foreground">Frequently Asked Questions</h2>
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
        <section className="py-20 bg-card">
          <div className="container max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-gaming text-foreground">Ready to Level Up?</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Browse our full collection of quality-tested, pre-owned gaming gear at unbeatable prices.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link to="/shop">
                <Button className="h-12 px-6 rounded-button bg-foreground text-background hover:bg-foreground/80 font-semibold">
                  Explore Shop <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="h-12 px-6 rounded-button border-border text-foreground hover:bg-surface hover:border-foreground/20">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

export default About;
