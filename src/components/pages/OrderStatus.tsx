"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Banknote,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileImage,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  User,
} from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useOrders, type Order, type OrderStatus as OrderStatusType } from "@/context/OrderContext";
import { cn } from "@/lib/utils";

interface OrderStatusPageProps {
  orderId?: string;
  payment?: string;
  total?: string;
}

function fallbackPaymentLabel(payment: string) {
  if (payment === "online" || payment === "nayapay") return "Online Payment";
  return "Cash on Delivery";
}

function paymentLabel(order: Order) {
  return order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment";
}

function statusMeta(status?: OrderStatusType) {
  if (status === "verified") {
    return {
      label: "Success",
      title: "Payment verified",
      message: "Your payment has been verified and your order is ready for dispatch coordination.",
      icon: CheckCircle2,
      className: "border-border bg-surface text-foreground",
    };
  }

  if (status === "pending-cod") {
    return {
      label: "Pending",
      title: "COD order received",
      message: "Your order is reserved. Our team will contact you before dispatch and collect cash on delivery.",
      icon: Banknote,
      className: "border-border bg-surface text-foreground",
    };
  }

  if (status === "awaiting-proof") {
    return {
      label: "Pending",
      title: "Payment proof needed",
      message: "Upload payment proof from checkout so our team can verify the order.",
      icon: AlertCircle,
      className: "border-border bg-surface text-foreground",
    };
  }

  return {
    label: "Pending",
    title: "Payment under review",
    message: "Your screenshot has been submitted. Our team will verify it and contact you shortly.",
    icon: Clock3,
    className: "border-border bg-surface text-foreground",
  };
}

const OrderStatus = ({ orderId = "", payment = "cod", total = "0" }: OrderStatusPageProps) => {
  const { getOrder, isHydrated } = useOrders();
  const order = isHydrated ? getOrder(orderId) : undefined;
  const meta = statusMeta(order?.status);
  const StatusIcon = meta.icon;
  const displayPayment = order ? paymentLabel(order) : fallbackPaymentLabel(payment);
  const displayTotal = order ? order.subtotal : Number(total);
  const displayStatus = order ? meta.label : "Pending";

  if (!isHydrated) {
    return (
      <PageTransition>
        <div className="container py-16 text-center text-muted-foreground">Loading order status...</div>
      </PageTransition>
    );
  }

  if (orderId && !order) {
    return (
      <PageTransition>
        <div className="container py-16">
          <Card className="mx-auto max-w-lg rounded-card border-border bg-card text-center">
            <CardContent className="p-8">
              <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
              <h1 className="mt-4 text-2xl font-gaming text-foreground">Order not found</h1>
              <p className="mt-2 text-sm text-muted-foreground">Start checkout again so a fresh order status can be created.</p>
              <Link href="/cart">
                <Button className="mt-5 rounded-button bg-foreground text-background hover:bg-foreground/85">Back to Cart</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container max-w-4xl py-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="mb-8"
        >
          <div className={cn("flex flex-col gap-5 rounded-card border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between", meta.className)}>
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                <StatusIcon className="h-7 w-7" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Order {orderId || "HG-XXXXX"}</p>
                <h1 className="mt-1 text-2xl font-gaming text-foreground sm:text-3xl">{meta.title}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{meta.message}</p>
              </div>
            </div>
            <div className="rounded-button border border-border bg-background p-4 text-left sm:text-right">
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Payment status</p>
              <p className="mt-1 text-lg font-gaming text-foreground">{displayStatus}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="rounded-card border-border bg-card">
            <CardContent className="p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                <h2 className="font-gaming text-base text-foreground">Order details</h2>
              </div>

              {order ? (
                <>
                  <div className="space-y-3">
                    {order.items.map(({ product, quantity }) => (
                      <div key={product.id} className="flex items-center justify-between gap-3 text-sm">
                        <div className="flex min-w-0 items-center gap-2">
                          <Package className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          <span className="truncate text-muted-foreground">
                            {product.title}
                            <span className="text-foreground/60"> x {quantity}</span>
                          </span>
                        </div>
                        <span className="shrink-0 font-medium text-foreground">
                          PKR {(product.pricePKR * quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4 bg-border" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Payment Method</span>
                      <span className="text-right text-foreground">{displayPayment}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Paid now</span>
                      <span className="text-right text-foreground">PKR {order.depositAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">Due on delivery</span>
                      <span className="text-right text-foreground">PKR {order.remainingAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  <Separator className="my-4 bg-border" />
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>Total</span>
                    <span>PKR {displayTotal.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment</span>
                    <span className="text-foreground">{displayPayment}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">PKR {displayTotal.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-5">
            {order && (
              <Card className="rounded-card border-border bg-card">
                <CardContent className="p-5 sm:p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <h2 className="font-gaming text-base text-foreground">Delivery</h2>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="text-foreground">{order.customer.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                      <span className="text-foreground">{order.customer.phone}</span>
                    </div>
                    <div className="mt-2 rounded-button border border-border bg-surface p-3 leading-relaxed text-foreground">
                      {order.customer.address}, {order.customer.city}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="rounded-card border-border bg-card">
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                  {order?.paymentMethod === "online" ? (
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Banknote className="h-4 w-4 text-muted-foreground" />
                  )}
                  <h2 className="font-gaming text-base text-foreground">Payment summary</h2>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Method</span>
                    <span className="text-right text-foreground">{displayPayment}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-right text-foreground">{displayStatus}</span>
                  </div>
                </div>
                {order?.proof ? (
                  <div className="mt-4">
                    <Image
                      src={order.proof.imageDataUrl}
                      alt={`${order.id} payment proof`}
                      width={420}
                      height={260}
                      unoptimized
                      className="max-h-44 w-full rounded-button border border-border object-contain"
                    />
                    <p className="mt-2 truncate text-xs text-muted-foreground">{order.proof.fileName}</p>
                  </div>
                ) : (
                  <div className="mt-4 flex min-h-24 items-center justify-center rounded-button border border-dashed border-border bg-surface text-sm text-muted-foreground">
                    <FileImage className="mr-2 h-4 w-4" />
                    {order?.paymentMethod === "cod" ? "No screenshot required" : "No screenshot uploaded"}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/shop">
            <Button className="h-11 w-full rounded-button bg-foreground text-background transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-foreground/85 sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="h-11 w-full rounded-button border-border bg-transparent hover:bg-surface sm:w-auto">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
};

export default OrderStatus;
