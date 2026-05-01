"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
  UserRound,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useOrders, type PaymentMethod } from "@/context/OrderContext";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Hyderabad",
  "Other",
];

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Full name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().regex(/^[+0-9\s-]{10,18}$/, "Enter a valid phone number"),
  city: z.string().min(1, "Select a city"),
  address: z.string().trim().min(5, "Enter your delivery address"),
  notes: z.string().trim().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const paymentMethods: {
  id: PaymentMethod;
  title: string;
  description: string;
  icon: typeof Banknote;
}[] = [
  {
    id: "online",
    title: "Online Payment",
    description: "Transfer on the next screen and upload proof.",
    icon: CreditCard,
  },
  {
    id: "cod",
    title: "Cash on Delivery",
    description: "Confirm on the next screen and pay on delivery.",
    icon: Banknote,
  },
];

const fieldMotion = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const inputClass = "h-11 rounded-input border-border bg-background pl-9";

const Checkout = () => {
  const router = useRouter();
  const { items, subtotal, isHydrated } = useCart();
  const { createOrder } = useOrders();
  const [payment, setPayment] = useState<PaymentMethod>("online");

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", phone: "", city: "Karachi", address: "", notes: "" },
  });

  useEffect(() => {
    if (isHydrated && items.length === 0) {
      router.replace("/cart");
    }
  }, [isHydrated, items.length, router]);

  if (!isHydrated || items.length === 0) {
    return null;
  }

  const onSubmit = (data: CheckoutForm) => {
    const order = createOrder({
      items: items.map(({ product, quantity }) => ({ product, quantity })),
      subtotal,
      paymentMethod: payment,
      customer: data,
    });

    toast.success("Checkout details saved");
    router.push(`/payment-verification?orderId=${order.id}`);
  };

  return (
    <PageTransition>
      <div className="container py-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Step 1 of 2</p>
            <h1 className="text-3xl font-gaming text-foreground">Checkout</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-button border border-cyan-300/15 bg-cyan-300/10 px-3 py-2 text-xs text-cyan-100">
            <ShieldCheck className="h-4 w-4" />
            Payment continues on the next screen
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  transition={{ staggerChildren: 0.05 }}
                  className="space-y-6"
                >
                  <motion.div variants={fieldMotion}>
                    <Card className="rounded-card border-border bg-card/95 shadow-sm">
                      <CardContent className="p-5 sm:p-6">
                        <div className="mb-5 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-button bg-cyan-300/10 text-cyan-200">
                            <Truck className="h-5 w-5" />
                          </div>
                          <div>
                            <h2 className="font-gaming text-lg text-foreground">Delivery Information</h2>
                            <p className="text-sm text-muted-foreground">Use the same details you want on the parcel.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-muted-foreground">Full Name</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input {...field} autoComplete="name" placeholder="e.g. Ali Hassan" className={inputClass} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-muted-foreground">Email Address</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input type="email" {...field} autoComplete="email" placeholder="e.g. ali@gmail.com" className={inputClass} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-muted-foreground">Phone Number</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input {...field} autoComplete="tel" placeholder="e.g. 0312-3456789" className={inputClass} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-muted-foreground">City</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger className="h-11 rounded-input border-border bg-background">
                                      <SelectValue placeholder="Select your city" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="border-border bg-card">
                                    {cities.map((city) => (
                                      <SelectItem key={city} value={city}>
                                        {city}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="mt-4 space-y-4">
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-muted-foreground">Full Address</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input {...field} autoComplete="street-address" placeholder="House, street, area, city" className={inputClass} />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-muted-foreground">
                                  Order Notes <span className="text-muted-foreground/50">(optional)</span>
                                </FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    rows={5}
                                    className="min-h-[130px] rounded-input border-border bg-background resize-none"
                                    placeholder="Delivery instructions, preferred call time, or product notes."
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={fieldMotion}>
                    <Card className="rounded-card border-border bg-card/95 shadow-sm">
                      <CardContent className="p-5 sm:p-6">
                        <h2 className="mb-4 font-gaming text-lg text-foreground">Choose Payment</h2>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {paymentMethods.map((method) => {
                            const Icon = method.icon;
                            const selected = payment === method.id;

                            return (
                              <button
                                key={method.id}
                                type="button"
                                onClick={() => setPayment(method.id)}
                                className={cn(
                                  "group flex min-h-[116px] flex-col rounded-button border p-4 text-left transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-foreground/50 hover:bg-surface",
                                  selected ? "border-foreground bg-surface shadow-md" : "border-border bg-background",
                                )}
                              >
                                <span className="mb-3 flex items-center justify-between gap-3">
                                  <span
                                    className={cn(
                                      "flex h-10 w-10 items-center justify-center rounded-button transition-colors duration-200",
                                      selected ? "bg-cyan-300 text-slate-950" : "bg-card text-foreground",
                                    )}
                                  >
                                    <Icon className="h-5 w-5" />
                                  </span>
                                  <span
                                    className={cn(
                                      "h-4 w-4 rounded-full border transition-colors duration-200",
                                      selected ? "border-cyan-300 bg-cyan-300 shadow-[inset_0_0_0_4px_hsl(var(--surface))]" : "border-border",
                                    )}
                                    aria-hidden="true"
                                  />
                                </span>
                                <span className="text-sm font-semibold text-foreground">{method.title}</span>
                                <span className="mt-1 text-xs leading-relaxed text-muted-foreground">{method.description}</span>
                              </button>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>

                <Button
                  type="submit"
                  className="h-12 w-full rounded-button bg-cyan-300 text-sm font-semibold text-slate-950 transition-[transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-cyan-200 sm:text-base"
                  disabled={!form.formState.isValid || form.formState.isSubmitting}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Continue
                </Button>
              </form>
            </Form>
          </div>

          <Card className="h-fit rounded-card border-border bg-card/95 shadow-sm lg:sticky lg:top-20">
            <CardContent className="p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-button bg-cyan-300/10">
                  <ShoppingBag className="h-4 w-4 text-cyan-200" />
                </div>
                <h2 className="font-gaming text-lg text-foreground">Order Summary</h2>
              </div>

              <div className="space-y-3">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-surface">
                      <Package className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="flex flex-1 items-start justify-between gap-2 text-sm">
                      <span className="min-w-0 leading-snug text-muted-foreground line-clamp-2">
                        {product.title}
                        <span className="ml-1 text-foreground/60">x {quantity}</span>
                      </span>
                      <span className="shrink-0 font-medium text-foreground">
                        PKR {(product.pricePKR * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4 bg-border" />

              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Tag className="h-3.5 w-3.5" />
                    <span>Subtotal</span>
                  </div>
                  <span className="text-foreground">PKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Wallet className="h-3.5 w-3.5" />
                    <span>Selected payment</span>
                  </div>
                  <span className="font-medium text-foreground">
                    {payment === "online" ? "Online" : "COD"}
                  </span>
                </div>
              </div>

              <Separator className="my-4 bg-border" />

              <div className="flex items-center justify-between">
                <span className="font-gaming text-base text-foreground">Total</span>
                <span className="font-gaming text-base text-foreground">PKR {subtotal.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Checkout;
