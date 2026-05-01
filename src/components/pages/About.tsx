"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  Headphones,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const processSteps = [
  {
    icon: ClipboardCheck,
    title: "Intake check",
    text: "We verify the model, serial details where available, included accessories, and seller history before an item enters stock.",
  },
  {
    icon: ShieldCheck,
    title: "Functional testing",
    text: "Keys, switches, sensors, buttons, microphones, drivers, ports, cables, RGB, and wireless connections are tested before listing.",
  },
  {
    icon: Sparkles,
    title: "Clean and photograph",
    text: "Each item is cleaned, photographed, and described with visible wear called out so buyers know what to expect.",
  },
  {
    icon: BadgeCheck,
    title: "Grade and list",
    text: "Products are graded from Good to Excellent using a clear 1-10 condition score, then priced below comparable new gear.",
  },
];

const trustSignals = [
  { icon: PackageCheck, title: "10K+ Items Sold", text: "Trusted by buyers looking for reliable gaming peripherals." },
  { icon: BadgeCheck, title: "4.9 Buyer Rating", text: "Built on accurate grading, clear photos, and responsive support." },
  { icon: ShieldCheck, title: "Our Mission", text: "Pakistan's most trusted source for pre-owned gaming peripherals." },
  { icon: RotateCcw, title: "Our Values", text: "Honest grading, fair pricing, no surprises." },
];

const aboutStats = [
  { value: "3 days", label: "exchange window" },
  { value: "1-10", label: "condition grade" },
  { value: "PK-wide", label: "delivery coverage" },
];

const buyingPromises = [
  "Every listing separates cosmetic wear from functional condition.",
  "Photos and notes are written for comparison, not guesswork.",
  "Support stays reachable before and after delivery.",
];

const productFocus = [
  {
    title: "Gaming keyboards",
    text: "Switches, stabilizers, keycaps, RGB, cable condition, and layout are checked so typing and gaming feel predictable.",
  },
  {
    title: "Gaming mice",
    text: "Sensors, clicks, scroll wheels, side buttons, skates, cable or wireless response, and grip wear are inspected before sale.",
  },
  {
    title: "Headphones and bundles",
    text: "Drivers, microphone clarity, pads, headband pressure, included accessories, and combo value are reviewed before listing.",
  },
];

const finalLinks = [
  { title: "About Hashtech", text: "Learn how our used-gear process works from sourcing to grading.", href: "/about" },
  { title: "Shop Tested Gear", text: "Browse available keyboards, mice, headphones, and combos.", href: "/shop" },
  { title: "Contact Support", text: "Ask about a product, delivery, exchange, or order status.", href: "/contact" },
];

const grading = [
  { grade: "9-10", label: "Excellent", text: "Near-new feel with minimal visible wear. Fully tested and ready for daily use." },
  { grade: "7-8", label: "Very Good", text: "Light cosmetic signs such as minor shine or small marks. Performance remains strong." },
  { grade: "5-6", label: "Good", text: "Visible wear, but core functions are tested and disclosed clearly in the listing." },
];

const aboutFaqs = [
  {
    q: "What does Hashtech sell?",
    a: "We sell inspected pre-owned gaming keyboards, mice, headphones, and combo bundles for gamers who want premium gear without paying premium new-product prices.",
  },
  {
    q: "Are used products safe to buy?",
    a: "Yes, when they are tested and described honestly. We check each item before listing and include a condition grade, notes, and stock status so you can buy with confidence.",
  },
  {
    q: "What happens if my item has a problem?",
    a: "Contact us within the exchange window with your order number and photos or video of the issue. If the product is defective or not as described, we will help with an exchange according to our policy.",
  },
  {
    q: "Why buy used gaming gear?",
    a: "Used gear helps you access better switches, sensors, microphones, and build quality for less money while knowing the condition before you buy.",
  },
];

const About = () => {
  const shouldReduceMotion = useReducedMotion();
  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.42, ease: "easeOut" },
      };

  return (
    <PageTransition>
      <main className="overflow-hidden bg-background">
        <motion.section {...reveal} className="py-14 md:py-20">
          <div className="container grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="max-w-2xl space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground">
                <Headphones className="h-4 w-4" />
                Pre-owned gaming gear, inspected in Pakistan
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-gaming-black leading-tight text-foreground sm:text-5xl md:text-6xl">
                  PRE-OWNED GAMING GEAR
                  <br />
                  YOU CAN TRUST
                </h1>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  We are a trusted pre-owned gaming gear store in Pakistan. We inspect, grade, and sell used keyboards, mice, and headphones so gamers can get premium gear without premium prices.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 rounded-card border border-border bg-card/60 p-4">
                {aboutStats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-lg font-gaming text-foreground sm:text-xl">{stat.value}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/shop">
                  <Button className="h-12 rounded-button bg-foreground px-6 font-semibold text-background transition-all duration-200 hover:-translate-y-0.5 hover:bg-foreground/85">
                    Shop Tested Gear
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/exchange-policy">
                  <Button variant="outline" className="h-12 rounded-button border-border px-6 transition-transform hover:-translate-y-0.5 hover:border-foreground/25 hover:bg-surface">
                    Read Exchange Policy
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-card border border-cyan-200/15 bg-cyan-200/5 p-6">
                <h2 className="text-lg font-semibold text-foreground">Built for buyers who want clarity first.</h2>
                <div className="mt-5 space-y-3">
                  {buyingPromises.map((promise) => (
                    <div key={promise} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-100" />
                      <span>{promise}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {trustSignals.map(({ icon: Icon, title, text }, index) => (
                  <div
                    key={title}
                    className="rounded-card border border-border/50 bg-card/80 p-5 transition-colors duration-200 hover:border-foreground/25"
                  >
                    <div className={index % 2 === 0 ? "mb-4 flex h-10 w-10 items-center justify-center rounded-button bg-surface text-foreground" : "mb-4 flex h-10 w-10 items-center justify-center rounded-button bg-surface text-muted-foreground"}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-sm font-semibold text-foreground">{title}</h2>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal} className="border-y border-border/50 bg-card py-20">
          <div className="container">
            <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-100/70">About Hashtech</p>
                <h2 className="mt-3 text-2xl font-bold text-foreground">Why This Store Exists</h2>
              </div>
              <p className="text-sm leading-7 text-muted-foreground">
                Hashtech started as a simple solution to a real problem: quality gaming peripherals in Pakistan are expensive, and perfectly good used gear goes to waste. We buy, inspect, grade, and list pre-owned gaming products with clear condition notes, so buyers can make confident decisions without guessing.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {productFocus.map(({ title, text }) => (
                <motion.div
                  key={title}
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  className="rounded-card border border-border/50 bg-background/50 p-5 transition-colors hover:border-cyan-200/25"
                >
                  <Store className="mb-4 h-5 w-5 text-cyan-100" />
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal} className="py-20">
          <div className="container">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-100/70">Quality evaluation</p>
              <h2 className="mt-3 text-2xl font-bold text-foreground">How Every Item Gets Listed</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Before a product appears in the shop, it moves through a simple inspection path that checks identity, function, cleanliness, photos, and condition grade.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map(({ icon: Icon, title, text }, index) => (
                <motion.div
                  key={title}
                  whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                  className="rounded-card border border-border/50 bg-card p-5 transition-colors duration-200 hover:border-foreground/25"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <Icon className="h-6 w-6 text-foreground" />
                    <span className="text-xs font-bold text-muted-foreground">0{index + 1}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal} className="border-y border-border/50 bg-card py-20">
          <div className="container grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold text-foreground">Our Grading System</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                A good used product should not require guesswork. We separate cosmetic wear from functional issues and explain both on the product page.
              </p>
            </div>
            <div className="space-y-3">
              {grading.map((item) => (
                <motion.div
                  key={item.grade}
                  whileHover={shouldReduceMotion ? undefined : { x: 4 }}
                  className="grid grid-cols-[84px_1fr] gap-4 rounded-card border border-border/50 bg-background/50 p-5 transition-colors duration-200 hover:border-cyan-200/25"
                >
                  <div className="rounded-button bg-surface p-3 text-center">
                    <div className="text-lg font-bold text-foreground">{item.grade}</div>
                    <div className="text-[10px] font-bold uppercase text-muted-foreground">Score</div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal} className="py-20">
          <div className="container grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-foreground">Why Buy Used From Us?</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                You get the price advantage of used gear with the structure of a proper online store: testing, condition disclosure, support, and policy-backed buying.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
              {[
                "Better gear for the same budget",
                "No hidden condition surprises",
                "Clear photos and product notes",
                "Support through WhatsApp and email",
              ].map((item) => (
                <motion.div
                  key={item}
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                  className="flex items-center gap-3 rounded-card border border-border/50 bg-card p-4 transition-colors duration-200 hover:border-cyan-200/25"
                >
                  <BadgeCheck className="h-5 w-5 shrink-0 text-foreground" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section {...reveal} className="pt-20 pb-12">
          <div className="container max-w-3xl">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-foreground">Common Questions</h2>
              <p className="mt-2 text-sm text-muted-foreground">Quick answers before you buy used gear online.</p>
            </div>
            <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
              {aboutFaqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`faq-${i}`} className="rounded-card border border-border/40 bg-card px-6 transition-colors duration-300 data-[open]:border-foreground/20">
                  <AccordionTrigger className="py-5 text-[15px] font-medium text-foreground hover:no-underline">
                    <span className="text-left">{faq.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.section>

        <motion.section {...reveal} className="pb-24">
          <div className="container">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {finalLinks.map((item) => (
                <Link key={item.title} href={item.href} className="group rounded-card border border-border/50 bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-200/25">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-50">
                    Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </PageTransition>
  );
};

export default About;
