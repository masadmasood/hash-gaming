import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { deliveryOptions, cityDeliveryCharges } from "@/data/products";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const [city, setCity] = useState("Karachi");
  const [speed, setSpeed] = useState("standard");

  const cityCharges = cityDeliveryCharges.find((c) => c.city === city) || cityDeliveryCharges[0];
  const deliveryCharge = cityCharges[speed as keyof typeof cityCharges] as number;
  const total = subtotal + deliveryCharge;

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="container py-16 text-center space-y-4">
          <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-semibold text-foreground">Your cart is empty</h1>
          <p className="text-muted-foreground">Start shopping to add items to your cart.</p>
          <Link to="/shop"><Button className="rounded-button bg-foreground text-background hover:bg-foreground/90 mt-2">Browse Products</Button></Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container py-8">
        <h1 className="text-3xl font-semibold mb-8 text-foreground">Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <Card key={product.id} className="rounded-card border-border bg-card">
                <CardContent className="p-4 flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-2 shrink-0">
                    <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${product.id}`} className="text-sm font-semibold text-foreground hover:underline line-clamp-1">{product.title}</Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{product.brand}</p>
                    <p className="text-sm font-semibold text-foreground mt-1">PKR {product.pricePKR.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-border rounded-button">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                        if (quantity >= product.stockQty) { toast.info("Maximum stock reached"); return; }
                        updateQuantity(product.id, quantity + 1);
                      }}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => { removeFromCart(product.id); toast.success("Removed from cart"); }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary */}
          <Card className="rounded-card border-border bg-card h-fit">
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-foreground">Order Summary</h2>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">City</label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="rounded-input border-border bg-surface h-11"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {cityDeliveryCharges.map((c) => <SelectItem key={c.city} value={c.city}>{c.city}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Delivery Speed</label>
                <Select value={speed} onValueChange={setSpeed}>
                  <SelectTrigger className="rounded-input border-border bg-surface h-11"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {deliveryOptions.map((opt) => <SelectItem key={opt.id} value={opt.id}>{opt.label} ({opt.days})</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <Separator className="bg-border" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">PKR {subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="text-foreground">PKR {deliveryCharge.toLocaleString()}</span></div>
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between font-semibold text-foreground">
                <span>Total</span><span>PKR {total.toLocaleString()}</span>
              </div>
              <Link to={`/checkout?city=${city}&speed=${speed}`} className="block">
                <Button className="w-full h-11 rounded-button bg-foreground text-background hover:bg-foreground/90">
                  Proceed to Checkout
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart;
