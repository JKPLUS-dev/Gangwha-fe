"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/features/cart/store";
import { WishButton } from "@/features/wishlist/components/WishButton";
import { formatPrice } from "../format";

export function BuyBox({ productId, price, soldOut }: { productId: string; price: number; soldOut: boolean }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);
  const router = useRouter();
  if (soldOut) {
    return (
      <div className="flex gap-3">
        <WishButton productId={productId} className="size-14 shrink-0" />
        <button disabled className="h-14 w-full rounded-lg bg-stone-300 text-lg font-bold text-stone-700">품절된 상품이에요</button>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg bg-stone-50 p-4">
        <div className="flex items-center rounded-lg border border-stone-300 bg-white" role="group" aria-label="수량">
          <button type="button" aria-label="수량 빼기" onClick={() => setQty((q) => Math.max(1, q - 1))} className="size-11 text-xl">−</button>
          <output aria-live="polite" className="w-10 text-center text-lg font-semibold">{qty}</output>
          <button type="button" aria-label="수량 더하기" onClick={() => setQty((q) => Math.min(99, q + 1))} className="size-11 text-xl">+</button>
        </div>
        <p className="text-right">
          <span className="block text-sm text-stone-600">총 상품금액</span>
          <span className="text-2xl font-bold text-stone-900">{formatPrice(price * qty)}</span>
        </p>
      </div>
      <div className="flex gap-3">
        <WishButton productId={productId} className="size-14 shrink-0" />
        <button type="button" onClick={() => { add(productId, qty); setAdded(true); }} className="h-14 flex-1 rounded-lg border-2 border-brand text-lg font-bold text-brand hover:bg-brand-soft">장바구니</button>
        <button type="button" onClick={() => { add(productId, qty); router.push("/cart"); }} className="h-14 flex-1 rounded-lg bg-brand text-lg font-bold text-white hover:opacity-90">바로 구매</button>
      </div>
      <p aria-live="polite" className="min-h-6 text-sm text-brand">
        {added && <>장바구니에 {qty}개 담았어요. <Link href="/cart" className="font-semibold underline">장바구니 보기</Link></>}
      </p>
    </div>
  );
}
