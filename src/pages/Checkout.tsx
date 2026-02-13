import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";

const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Hyderabad", "Other"];

const checkoutSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  city: z.string().min(1, "Select a city"),
  address: z.string().min(5, "Full address required"),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [payment, setPayment] = useState<"cod" | "nayapay">("cod");

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", email: "", phone: "", city: "Karachi", address: "", notes: "" },
  });

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const onSubmit = (data: CheckoutForm) => {
    const orderId = `HG-${Date.now().toString(36).toUpperCase()}`;
    clearCart();
    toast.success("Order placed successfully!");
    navigate(`/order-confirmation?orderId=${orderId}&payment=${payment}&total=${subtotal}`);
  };

  return (
    <PageTransition>
      <div className="container py-8">
        <h1 className="text-3xl font-gaming text-foreground mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card className="rounded-card border-border bg-card">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="font-gaming text-foreground">Delivery Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Full Name</FormLabel>
                          <FormControl><Input {...field} className="rounded-input border-border bg-background h-11" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Email</FormLabel>
                          <FormControl><Input type="email" {...field} className="rounded-input border-border bg-background h-11" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">Phone</FormLabel>
                          <FormControl><Input {...field} className="rounded-input border-border bg-background h-11" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">City</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger className="rounded-input border-border bg-background h-11"><SelectValue /></SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-card border-border">
                              {cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Full Address</FormLabel>
                        <FormControl><Textarea {...field} className="rounded-input border-border bg-background min-h-[80px]" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="notes" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground">Order Notes (optional)</FormLabel>
                        <FormControl><Textarea {...field} className="rounded-input border-border bg-background min-h-[60px]" placeholder="Any special instructions..." /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </CardContent>
                </Card>

                <Card className="rounded-card border-border bg-card">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="font-gaming text-foreground">Payment Method</h2>
                    <div className="space-y-2">
                      <label className={`flex items-center gap-3 p-3 rounded-button border cursor-pointer transition-colors ${payment === "cod" ? "border-foreground/30 bg-surface" : "border-border hover:border-foreground/10"}`}>
                        <input type="radio" name="payment" checked={payment === "cod"} onChange={() => setPayment("cod")} className="accent-foreground" />
                        <span className="text-sm font-medium text-foreground">Cash on Delivery</span>
                      </label>
                      <label className={`flex items-center gap-3 p-3 rounded-button border cursor-pointer transition-colors ${payment === "nayapay" ? "border-foreground/30 bg-surface" : "border-border hover:border-foreground/10"}`}>
                        <input type="radio" name="payment" checked={payment === "nayapay"} onChange={() => setPayment("nayapay")} className="accent-foreground" />
                        <span className="text-sm font-medium text-foreground">Nayapay</span>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                <Button type="submit" className="w-full h-12 rounded-button bg-foreground text-background hover:bg-foreground/80 font-medium text-base" disabled={!form.formState.isValid}>
                  Place Order — PKR {subtotal.toLocaleString()}
                </Button>
              </form>
            </Form>
          </div>

          <Card className="rounded-card border-border bg-card h-fit lg:sticky lg:top-20">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-gaming text-foreground">Order Summary</h2>
              <div className="space-y-3">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground truncate pr-2">{product.title} × {quantity}</span>
                    <span className="text-foreground shrink-0">PKR {(product.pricePKR * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between font-semibold text-foreground"><span>Total</span><span>PKR {subtotal.toLocaleString()}</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Checkout;
