"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Clock3, FileImage, PackageCheck, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { useOrders, type Order, type OrderStatus } from "@/context/OrderContext";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

function statusMeta(status: OrderStatus) {
  if (status === "verified") {
    return {
      label: "Verified",
      icon: CheckCircle2,
      className: "border-foreground/25 bg-surface text-foreground",
    };
  }

  if (status === "awaiting-verification") {
    return {
      label: "Review proof",
      icon: Clock3,
      className: "border-foreground/20 bg-card text-foreground",
    };
  }

  if (status === "pending-cod") {
    return {
      label: "COD pending",
      icon: Clock3,
      className: "border-border bg-background/40 text-muted-foreground",
    };
  }

  return {
    label: "Waiting proof",
    icon: ShieldAlert,
    className: "border-border bg-background/40 text-muted-foreground",
  };
}

function paymentLabel(order: Order) {
  return order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment";
}

const AdminOrders = () => {
  const { orders, isHydrated, verifyOrder } = useOrders();

  if (!isHydrated) {
    return (
      <PageTransition>
        <div className="container py-16 text-center text-muted-foreground">Loading orders...</div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="container py-8">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Admin</p>
            <h1 className="text-3xl font-gaming text-foreground">Order Verification</h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-button border border-border bg-surface px-3 py-2 text-xs text-muted-foreground">
            <PackageCheck className="h-4 w-4 text-foreground" />
            {orders.length} local orders
          </div>
        </div>

        {orders.length === 0 ? (
          <Card className="rounded-card border-border bg-card text-center">
            <CardContent className="p-10">
              <PackageCheck className="mx-auto h-10 w-10 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-gaming text-foreground">No orders yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">New checkout orders will appear here after a customer continues to payment.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-5">
            {orders.map((order, index) => {
              const meta = statusMeta(order.status);
              const Icon = meta.icon;
              const canVerify = order.status === "awaiting-verification";

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, type: "spring", stiffness: 260, damping: 28 }}
                  layout
                >
                  <Card className="rounded-card border-border bg-card">
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="font-mono text-lg font-semibold text-foreground">{order.id}</h2>
                            <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold", meta.className)}>
                              <Icon className="h-3.5 w-3.5" />
                              {meta.label}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {order.customer.name} - {order.customer.city} - {paymentLabel(order)}
                          </p>
                        </div>
                        <Button
                          type="button"
                          disabled={!canVerify}
                          onClick={() => {
                            verifyOrder(order.id);
                            toast.success(`${order.id} verified`);
                          }}
                          className="h-10 rounded-button bg-foreground text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground/85"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Verify Order
                        </Button>
                      </div>

                      <Separator className="my-5 bg-border" />

                      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                        <div className="space-y-2 text-sm">
                          <h3 className="font-semibold text-foreground">Customer</h3>
                          <p className="text-muted-foreground">{order.customer.phone}</p>
                          <p className="text-muted-foreground">{order.customer.email}</p>
                          <p className="rounded-button border border-border bg-background/40 p-3 text-foreground">{order.customer.address}</p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <h3 className="font-semibold text-foreground">Payment</h3>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total</span>
                            <span className="text-foreground">PKR {order.subtotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Paid now</span>
                            <span className="text-foreground">PKR {order.depositAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Due on delivery</span>
                            <span className="text-foreground">PKR {order.remainingAmount.toLocaleString()}</span>
                          </div>
                          <div className="pt-2 text-muted-foreground">
                            {order.items.length} item{order.items.length === 1 ? "" : "s"}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-foreground">Proof</h3>
                          {order.proof ? (
                            <div className="mt-2">
                              <Image
                                src={order.proof.imageDataUrl}
                                alt={`${order.id} payment proof`}
                                width={420}
                                height={260}
                                unoptimized
                                className="max-h-44 w-full rounded-button border border-border object-contain"
                              />
                              <p className="mt-2 truncate text-sm text-muted-foreground">{order.proof.fileName}</p>
                            </div>
                          ) : (
                            <div className="mt-2 flex min-h-32 items-center justify-center rounded-button border border-dashed border-border bg-background/40 text-sm text-muted-foreground">
                              <FileImage className="mr-2 h-4 w-4" />
                              No screenshot yet
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default AdminOrders;
