"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { CartItem } from "@/context/CartContext";

export type PaymentMethod = "cod" | "online";
export type OrderStatus = "pending-cod" | "awaiting-proof" | "awaiting-verification" | "verified";

export interface CheckoutCustomer {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
}

export interface PaymentProof {
  fileName: string;
  fileSize: number;
  imageDataUrl: string;
  uploadedAt: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  depositAmount: number;
  remainingAmount: number;
  paymentMethod: PaymentMethod;
  customer: CheckoutCustomer;
  status: OrderStatus;
  proof?: PaymentProof;
  createdAt: string;
  verifiedAt?: string;
}

interface CreateOrderInput {
  items: CartItem[];
  subtotal: number;
  paymentMethod: PaymentMethod;
  customer: CheckoutCustomer;
  proof?: PaymentProof;
}

interface OrderContextValue {
  orders: Order[];
  isHydrated: boolean;
  createOrder: (input: CreateOrderInput) => Order;
  submitPaymentProof: (orderId: string, proof: PaymentProof) => void;
  verifyOrder: (orderId: string) => void;
  getOrder: (orderId: string) => Order | undefined;
}

const ORDERS_STORAGE_KEY = "hashtech-orders";

export const paymentDepositAmount = 400;
export const paymentAccount = {
  service: "NayaPay",
  name: "Muhammad Hamad",
  number: "0313-2153277",
};

const OrderContext = createContext<OrderContextValue | null>(null);

function parseStoredOrders(value: string | null): Order[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function readStoredOrders(): Order[] {
  if (typeof window === "undefined") return [];
  return parseStoredOrders(window.localStorage.getItem(ORDERS_STORAGE_KEY));
}

function createOrderId() {
  return `HG-${Date.now().toString(36).toUpperCase()}`;
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setOrders(readStoredOrders());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders, isHydrated]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === ORDERS_STORAGE_KEY) {
        setOrders(parseStoredOrders(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const createOrder = useCallback((input: CreateOrderInput) => {
    const isOnline = input.paymentMethod === "online";
    const depositAmount = isOnline ? Math.min(input.subtotal, paymentDepositAmount) : 0;
    const remainingAmount = isOnline ? Math.max(input.subtotal - depositAmount, 0) : input.subtotal;
    const order: Order = {
      id: createOrderId(),
      items: input.items,
      subtotal: input.subtotal,
      depositAmount,
      remainingAmount,
      paymentMethod: input.paymentMethod,
      customer: input.customer,
      status: input.paymentMethod === "cod" ? "pending-cod" : input.proof ? "awaiting-verification" : "awaiting-proof",
      proof: input.proof,
      createdAt: new Date().toISOString(),
    };

    setOrders((current) => [order, ...current]);
    return order;
  }, []);

  const submitPaymentProof = useCallback((orderId: string, proof: PaymentProof) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              proof,
              status: "awaiting-verification",
            }
          : order,
      ),
    );
  }, []);

  const verifyOrder = useCallback((orderId: string) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "verified",
              verifiedAt: new Date().toISOString(),
            }
          : order,
      ),
    );
  }, []);

  const getOrder = useCallback((orderId: string) => orders.find((order) => order.id === orderId), [orders]);

  return (
    <OrderContext.Provider value={{ orders, isHydrated, createOrder, submitPaymentProof, verifyOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
}
