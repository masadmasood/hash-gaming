import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <PageTransition>
        <div className="container py-16 text-center space-y-4">
          <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-gaming text-foreground">Your cart is empty</h1>
          <p className="text-muted-foreground">Start shopping to add items to your cart.</p>
          <Link to="/shop"><Button className="rounded-button bg-foreground text-background hover:bg-foreground/80 mt-2">Browse Products</Button></Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container py-8">
        <h1 className="text-3xl font-gaming text-foreground mb-8">Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <Card key={product.id} className="rounded-card border-border bg-card">
                <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                  <div className="flex gap-4 flex-1 min-w-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-surface shrink-0">
                      <img src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${product.id}`} className="text-sm font-semibold text-foreground hover:underline line-clamp-1">{product.title}</Link>
                      <p className="text-xs text-muted-foreground mt-0.5">{product.brand}</p>
                      <p className="text-sm font-semibold text-foreground mt-1">PKR {product.pricePKR.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end sm:self-center">
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
              <h2 className="font-gaming text-foreground">Order Summary</h2>
              <Separator className="bg-border" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">PKR {subtotal.toLocaleString()}</span></div>
              </div>
              <Separator className="bg-border" />
              <div className="flex justify-between font-semibold text-foreground">
                <span>Total</span><span>PKR {subtotal.toLocaleString()}</span>
              </div>
              <Link to="/checkout" className="block">
                <Button className="w-full h-11 rounded-button bg-foreground text-background hover:bg-foreground/80">
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
