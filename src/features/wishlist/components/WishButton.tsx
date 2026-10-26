"use client";

import { useHydrated } from "@/lib/useHydrated";
import { useWishlist } from "../store";

export function WishButton({ productId, className = "" }: { productId: string; className?: string }) {
  const on = useWishlist((s) => s.ids.includes(productId));
  const toggle = useWishlist((s) => s.toggle);
  const ready = useHydrated();
  const active = ready && on;
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "찜 해제" : "찜하기"}
      onClick={() => toggle(productId)}
      className={`grid size-12 place-items-center rounded-lg border text-2xl transition ${active ? "border-red-200 bg-red-50 text-red-600" : "border-stone-300 bg-white text-stone-500 hover:text-red-600"} ${className}`}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
