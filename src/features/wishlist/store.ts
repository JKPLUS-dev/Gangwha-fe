"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = { ids: string[]; toggle: (productId: string) => void; has: (productId: string) => boolean };

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => set(({ ids }) => ({ ids: ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id] })),
      has: (id) => get().ids.includes(id),
    }),
    { name: "gangwha-wishlist" },
  ),
);
