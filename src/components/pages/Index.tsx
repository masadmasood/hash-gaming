"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { PageTransition } from "@/components/PageTransition";
import { products, reviews, categories, productImages, categoryImages, bannerImage, faqs, whyUsReasons } from "@/data/siteData";
import {
  ShieldCheck,
  PackageCheck,
  Truck,
  Star,
  ArrowRight,
  Quote,
  Trophy
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

const trendingProducts = products.filter((p) => !p.isCombo).slice(0, 8);
const combos = products.filter((p) => p.isCombo);

const whyUs = whyUsReasons;

const whyUsIcons = [ShieldCheck, PackageCheck, Truck, Trophy];

const Index = () => {
  const shouldReduceMotion = useReducedMotion();
  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.18 },
        transition: { duration: 0.42, ease: "easeOut" },
      };

  return (
    <PageTransition>
      <main className="overflow-hidden bg-background">
        {/* Hero */}
        <motion.section {...reveal} className="py-20 md:py-28">
          <div className="container text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[0.95]">
              USED GAMING GEAR
              <br />
              <span className="text-muted-foreground">TESTED & READY</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mx-auto">
              Premium pre-owned keyboards, mice & headphones from top brands. Every item quality-checked in Karachi.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2 flex-col sm:flex-row">
              <Link href="/shop">
                <Button className="h-12 px-6 rounded-button bg-foreground text-background hover:bg-foreground/80 font-semibold gap-2">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/shop?combo=true">
                <Button variant="outline" className="h-12 px-6 rounded-button border-border text-foreground hover:bg-surface hover:border-foreground/20">
                  View Combos
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Categories */}
        <motion.section {...reveal} className="pb-20">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <Link key={cat} href={`/shop?category=${cat}`}>
                  <div className="group relative aspect-square sm:aspect-9/16 rounded-card overflow-hidden cursor-pointer border border-border/30 transition-transform duration-300 hover:-translate-y-1">
                    <Image src={categoryImages[cat]} alt={cat} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-125" />
                    <div className="absolute inset-0 bg-background/50 backdrop-blur-sm group-hover:bg-background/30 group-hover:backdrop-blur-sm transition-all duration-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <h3 className="font-bold text-foreground text-xl md:text-2xl tracking-wide">{cat.toUpperCase()}</h3>
                      <p className="text-xs text-foreground/50 mt-1">
                        {products.filter((p) => p.category === cat && !p.isCombo).length} products
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              <Link href="/shop?combo=true">
                <div className="group relative aspect-square sm:aspect-9/16 rounded-card overflow-hidden cursor-pointer border border-border/30 transition-transform duration-300 hover:-translate-y-1">
                  <Image src={productImages[combos[0]?.id] || bannerImage} alt="Combos" fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-125" />
                  <div className="absolute inset-0 bg-background/50 backdrop-blur-sm group-hover:bg-background/30 group-hover:backdrop-blur-sm transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <h3 className="font-bold text-foreground text-xl md:text-2xl tracking-wide">COMBOS</h3>
                    <p className="text-xs text-foreground/50 mt-1">
                      {combos.length} bundles
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Trending */}
        <motion.section {...reveal} className="py-28">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Trending Products</h2>
                <p className="text-sm text-muted-foreground mt-1">Our most popular picks this week</p>
              </div>
              <Link href="/shop" className="hidden sm:flex text-sm text-muted-foreground hover:text-foreground transition-colors items-center gap-1 group">
                View all <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trendingProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </motion.section>

        {/* Mid-page Banner */}
        <motion.section
          {...reveal}
          className="relative overflow-hidden bg-cover bg-center bg-scroll py-24 md:bg-fixed md:py-32"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          <div className="absolute inset-0 bg-background/55 backdrop-blur-sm" />
          <div className="relative z-10 container text-center space-y-4">
            <h3 className="font-bold text-foreground text-2xl md:text-3xl">New Arrivals Every Week</h3>
            <p className="text-base font-normal text-foreground/70 max-w-lg mx-auto">
              We source fresh inventory from top gaming brands weekly. Follow us to never miss a drop.
            </p>
            <Link href="/shop" className="block mt-2">
              <Button className="h-12 px-6 rounded-button bg-foreground text-background hover:bg-foreground/80 font-semibold gap-2">
                Browse New Stock <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.section>

        {/* Combo Deals */}
        <motion.section {...reveal} className="pt-16 pb-32">
          <div className="container">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
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
                  <CarouselItem key={combo.id} className="md:basis-1/2 lg:basis-1/4">
                    <ProductCard product={combo} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </motion.section>

        {/* Why Us (Updated) */}
        <motion.section {...reveal} className="py-24 relative overflow-hidden bg-card border-y border-border/50">
          <div className="container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100/70">Quality-first buying</p>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  WHY CHOOSE <br />
                  <span className="text-foreground">HASHTECH?</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                  We turn used gaming gear into a safer purchase by testing each item, explaining its condition, and backing the order with clear support.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {whyUs.map((item, idx) => {
                    const Icon = whyUsIcons[idx] || ShieldCheck;
                    return (
                      <motion.div
                        key={item.title}
                        whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                        className="flex flex-col items-start gap-4 p-6 rounded-card bg-background/50 border border-border transition-colors hover:border-cyan-200/25"
                      >
                        <div className="shrink-0 h-10 w-10 rounded-lg bg-cyan-200/10 flex items-center justify-center text-cyan-100">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-4/5 rounded-[2rem] overflow-hidden bg-background/70 relative border border-cyan-200/10">
                  <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[24px_24px]" />
                  <div className="relative h-full flex flex-col items-center justify-center p-8 text-center bg-card/80 backdrop-blur-sm border border-white/10 m-8 rounded-4xl">

                    <div className="flex -space-x-4 rtl:space-x-reverse mb-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="relative w-12 h-12 rounded-full border-2 border-background overflow-hidden bg-muted">
                          <Image src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="User" fill sizes="48px" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>

                    <div className="text-7xl font-extrabold text-foreground mb-2">10K+</div>
                    <div className="text-xl text-muted-foreground font-semibold">Happy Gamers Served</div>
                    <div className="mt-8 grid w-full grid-cols-2 gap-3 text-left">
                      <div className="rounded-card border border-white/10 bg-white/5 p-3">
                        <p className="text-xs text-muted-foreground">Exchange window</p>
                        <p className="mt-1 font-semibold text-foreground">3 days</p>
                      </div>
                      <div className="rounded-card border border-white/10 bg-white/5 p-3">
                        <p className="text-xs text-muted-foreground">Condition scale</p>
                        <p className="mt-1 font-semibold text-foreground">1-10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Reviews - Attractive Version */}
        <motion.section {...reveal} className="py-24">
          <div className="container">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-7xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
                <div className="text-start">
                  <h2 className="text-2xl font-bold text-foreground">What the Squad Says</h2>
                  <p className="text-sm text-muted-foreground mt-1">Join thousands of satisfied gamers in Pakistan.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <CarouselPrevious className="static translate-y-0 size-10 border-cyan-200/20 bg-cyan-200/10 text-cyan-50 hover:bg-cyan-200/15" />
                  <CarouselNext className="static translate-y-0 size-10 border-cyan-200/20 bg-cyan-200/10 text-cyan-50 hover:bg-cyan-200/15" />
                </div>
              </div>

              <CarouselContent>
                {reviews.map((review) => (
                  <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 p-4">
                    <motion.div 
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="h-full p-8 rounded-card bg-card border border-border hover:bg-surface/80 transition-colors duration-300 flex flex-col relative overflow-hidden group"
                    >
                      <Quote className="absolute top-6 right-6 w-12 h-12 text-foreground/10 group-hover:text-foreground/20 transition-colors" />

                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                        ))}
                      </div>

                      <p className="text-foreground/90 leading-relaxed mb-8 flex-1 relative z-10 font-normal">
                        "{review.text}"
                      </p>

                      <div className="flex items-center gap-4 mt-auto">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                          <Image src={review.image} alt={review.name} fill sizes="48px" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{review.name}</h4>
                          <span className="text-xs text-foreground/70 font-medium flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> Verified Buyer
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section {...reveal} className="pt-20 pb-28">
          <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
              <p className="text-sm text-muted-foreground mt-2">Got questions? We've got answers.</p>
            </div>
            <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-card border border-border/30 bg-card px-6 transition-colors duration-300 data-open:border-foreground/20">
                  <AccordionTrigger className="py-5 text-[15px] text-foreground hover:no-underline font-['Inter',sans-serif] font-normal">
                    <span className="text-left">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm text-muted-foreground leading-relaxed font-['Inter',sans-serif]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.section>

      </main>
    </PageTransition>
  );
};

export default Index;
