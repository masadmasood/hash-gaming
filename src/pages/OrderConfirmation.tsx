import { Link, useSearchParams } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const [params] = useSearchParams();
  const orderId = params.get("orderId") || "HG-XXXXX";
  const payment = params.get("payment") === "nayapay" ? "Nayapay" : "Cash on Delivery";
  const total = params.get("total") || "0";

  return (
    <PageTransition>
      <div className="container py-16 max-w-xl mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full bg-surface flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-gaming text-foreground">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Your order <span className="font-mono text-foreground">{orderId}</span> has been placed successfully.
        </p>
        <Card className="rounded-card border-border bg-card text-left">
          <CardContent className="p-6 space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Order ID</span><span className="text-foreground font-mono">{orderId}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span className="text-foreground">{payment}</span></div>
            <div className="flex justify-between font-semibold"><span className="text-foreground">Total</span><span className="text-foreground">PKR {Number(total).toLocaleString()}</span></div>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground">
          We'll contact you to confirm your order details.
        </p>
        <Link to="/shop">
          <Button className="rounded-button bg-foreground text-background hover:bg-foreground/80 mt-2">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </PageTransition>
  );
};

export default OrderConfirmation;
