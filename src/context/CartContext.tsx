import React, { createContext, useContext, useReducer, useEffect } from "react";
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
  | { type: "CLEAR" };

const CartContext = createContext<{
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
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

function loadCart(): CartState {
  try {
    const data = localStorage.getItem("hashtech-cart");
    if (data) return JSON.parse(data);
  } catch {}
  return { items: [] };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    localStorage.setItem("hashtech-cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (product: Product, quantity = 1) => dispatch({ type: "ADD", product, quantity });
  const removeFromCart = (productId: string) => dispatch({ type: "REMOVE", productId });
  const updateQuantity = (productId: string, quantity: number) => dispatch({ type: "UPDATE_QTY", productId, quantity });
  const clearCart = () => dispatch({ type: "CLEAR" });
  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.product.pricePKR * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
