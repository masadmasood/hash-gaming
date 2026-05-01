"use client";

import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { Product } from "@/data/siteData";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD"; product: Product; quantity: number }
  | { type: "REMOVE"; productId: string }
  | { type: "UPDATE_QTY"; productId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };

const initialState: CartState = { items: [] };

const CartContext = createContext<{
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isHydrated: boolean;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;
    case "ADD": {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        const newQty = Math.min(existing.quantity + action.quantity, action.product.stockQty);
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id ? { ...i, quantity: newQty } : i
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: action.quantity }] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case "UPDATE_QTY": {
      if (action.quantity <= 0) return { items: state.items.filter((i) => i.product.id !== action.productId) };
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: Math.min(action.quantity, i.product.stockQty) }
            : i
        ),
      };
    }
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

function readStoredCart(): CartState {
  try {
    const data = window.localStorage.getItem("hashtech-cart");
    if (data) return JSON.parse(data);
  } catch {
    // Ignore corrupt or unavailable storage and fall back to an empty cart.
  }
  return initialState;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    dispatch({ type: "HYDRATE", state: readStoredCart() });
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem("hashtech-cart", JSON.stringify(state));
  }, [state, isHydrated]);

  const addToCart = (product: Product, quantity = 1) => dispatch({ type: "ADD", product, quantity });
  const removeFromCart = (productId: string) => dispatch({ type: "REMOVE", productId });
  const updateQuantity = (productId: string, quantity: number) => dispatch({ type: "UPDATE_QTY", productId, quantity });
  const clearCart = () => dispatch({ type: "CLEAR" });
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.product.pricePKR * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal, isHydrated }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}