"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/features/account/types";

type CartState = {
  items: CartItem[];
  add: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (productId, quantity = 1) =>
        set(({ items }) => {
          const hit = items.find((i) => i.productId === productId);
          return {
            items: hit
              ? items.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i))
              : [...items, { productId, quantity }],
          };
        }),
      setQuantity: (productId, quantity) =>
        set(({ items }) => ({ items: items.map((i) => (i.productId === productId ? { ...i, quantity: Math.max(1, quantity) } : i)) })),
      remove: (productId) => set(({ items }) => ({ items: items.filter((i) => i.productId !== productId) })),
      clear: () => set({ items: [] }),
    }),
    { name: "gangwha-cart" },
  ),
);
