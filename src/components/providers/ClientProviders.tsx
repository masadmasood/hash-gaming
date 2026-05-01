"use client";

import { ReactNode } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <CartProvider>
        <OrderProvider>
          <Sonner position="top-right" closeButton />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </div>
        </OrderProvider>
      </CartProvider>
    </TooltipProvider>
  );
}
