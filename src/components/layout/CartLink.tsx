"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/store";
import { useHydrated } from "@/lib/useHydrated";

// 장바구니 아이콘 → /cart. 수량 배지는 localStorage 값이라 하이드레이션 뒤에만 그려요(서버와 첫 화면 일치).
export function CartLink() {
  const hydrated = useHydrated();
  const count = useCart((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const n = hydrated ? count : 0;
  return (
    <Link href="/cart" aria-label={n ? `장바구니 (${n}개 담김)` : "장바구니"}
      className="relative grid size-11 shrink-0 place-items-center rounded-lg text-stone-800 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-brand">
      <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L20 8H6.2" /><circle cx="9" cy="20" r="1.3" /><circle cx="17" cy="20" r="1.3" /></svg>
      {n > 0 && (
        <span aria-hidden className="absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-[#b91c1c] px-1 text-[11px] font-bold leading-none text-white ring-2 ring-white">{n > 99 ? "99+" : n}</span>
      )}
    </Link>
  );
}
