"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useHydrated } from "@/lib/useHydrated";
import { EmptyState } from "@/components/ui/EmptyState";
import type { CartProduct } from "@/features/cart/components/CartView";
import { useCart } from "@/features/cart/store";
import { formatPrice } from "@/features/product/format";
import { useWishlist } from "../store";

export function WishlistView({ products }: { products: Record<string, CartProduct> }) {
  const { ids, toggle } = useWishlist();
  const add = useCart((s) => s.add);
  const ready = useHydrated();
  const [msg, setMsg] = useState("");
  if (!ready) return <div role="status" className="h-64 animate-pulse rounded-2xl bg-stone-100"><span className="sr-only">찜 목록 불러오는 중</span></div>;
  const list = ids.map((id) => products[id]).filter(Boolean);
  if (!list.length) return <EmptyState icon="♡" title="찜한 상품이 없어요" desc="상품 상세에서 하트를 누르면 여기에 모여요." href="/products" cta="상품 둘러보기" />;
  return (
    <>
      <p aria-live="polite" className="mb-4 min-h-6 text-base text-brand">{msg}</p>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
        {list.map((p) => (
          <li key={p.id}>
            <div className="relative aspect-square overflow-hidden rounded-xl bg-stone-100">
              <Link href={`/products/${p.id}`} aria-label={p.name}>{p.image && <Image src={p.image} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />}</Link>
              <button type="button" aria-label={`${p.name} 찜 해제`} onClick={() => toggle(p.id)} className="absolute right-2 top-2 grid size-11 place-items-center rounded-full bg-white/95 text-xl text-red-600">♥</button>
            </div>
            <p className="mt-3 text-sm text-stone-600">{p.seller}</p>
            <Link href={`/products/${p.id}`} className="mt-1 line-clamp-2 text-base font-medium hover:underline">{p.name}</Link>
            <p className="mt-1 text-lg font-bold">{formatPrice(p.salePrice ?? p.price)}</p>
            <button
              type="button"
              disabled={p.soldOut}
              onClick={() => { add(p.id); setMsg(`${p.name}을(를) 장바구니에 담았어요.`); }}
              className="mt-2 h-11 w-full rounded-lg border-2 border-brand font-bold text-brand hover:bg-brand-soft disabled:border-stone-300 disabled:text-stone-600"
            >
              {p.soldOut ? "품절" : "장바구니 담기"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
