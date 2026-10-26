"use client";

import Image from "next/image";
import Link from "next/link";
import { useHydrated } from "@/lib/useHydrated";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPrice } from "@/features/product/format";
import { useCart } from "../store";

export type CartProduct = { id: string; name: string; price: number; salePrice?: number; image?: string; seller: string; soldOut: boolean; freeShipping: boolean };

const FREE_OVER = 30000; // 예시 기준
const FEE = 3000;

export function CartView({ products }: { products: Record<string, CartProduct> }) {
  const { items, setQuantity, remove, clear } = useCart();
  const ready = useHydrated();
  if (!ready) return <div role="status" className="h-64 animate-pulse rounded-2xl bg-stone-100"><span className="sr-only">장바구니 불러오는 중</span></div>;

  const rows = items.map((i) => ({ ...i, p: products[i.productId] })).filter((r) => r.p);
  if (!rows.length) return <EmptyState icon="🧺" title="장바구니가 비어 있어요" desc="강화에서 갓 올라온 특산품을 담아보세요." href="/products" cta="상품 보러 가기" />;

  const buyable = rows.filter((r) => !r.p.soldOut);
  const subtotal = buyable.reduce((s, r) => s + (r.p.salePrice ?? r.p.price) * r.quantity, 0);
  const listTotal = buyable.reduce((s, r) => s + r.p.price * r.quantity, 0);
  const allFree = buyable.every((r) => r.p.freeShipping);
  const fee = allFree || subtotal >= FREE_OVER ? 0 : FEE;

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_20rem]">
      <section aria-label="담은 상품">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-base text-stone-700">총 {rows.length}개 상품</p>
          <button type="button" onClick={clear} className="h-11 px-2 text-base text-stone-600 hover:text-stone-900">전체 삭제</button>
        </div>
        <ul className="divide-y divide-stone-200 border-y border-stone-200">
          {rows.map(({ productId, quantity, p }) => (
            <li key={productId} className="flex gap-4 py-5">
              <Link href={`/products/${p.id}`} className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-stone-100 md:size-28">
                {p.image && <Image src={p.image} alt="" fill sizes="112px" className="object-cover" />}
              </Link>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-stone-600">{p.seller}</p>
                <Link href={`/products/${p.id}`} className="line-clamp-2 text-base font-medium hover:underline">{p.name}</Link>
                <p className="mt-1 text-lg font-bold">{formatPrice((p.salePrice ?? p.price) * quantity)}</p>
                {p.soldOut && <p className="text-sm font-semibold text-red-700">품절되어 결제에서 빠져요</p>}
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-stone-300" role="group" aria-label={`${p.name} 수량`}>
                    <button type="button" aria-label="수량 빼기" onClick={() => setQuantity(productId, quantity - 1)} className="size-11 text-xl">−</button>
                    <output className="w-9 text-center font-semibold">{quantity}</output>
                    <button type="button" aria-label="수량 더하기" onClick={() => setQuantity(productId, Math.min(99, quantity + 1))} className="size-11 text-xl">+</button>
                  </div>
                  <button type="button" onClick={() => remove(productId)} className="h-11 px-2 text-base text-stone-600 hover:text-red-700">삭제</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <aside aria-label="결제 금액" className="h-fit rounded-2xl border border-stone-200 p-6 md:sticky md:top-40">
        <dl className="space-y-3 text-base">
          <div className="flex justify-between"><dt className="text-stone-600">상품금액</dt><dd>{formatPrice(listTotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-stone-600">할인</dt><dd className="text-red-700">−{formatPrice(listTotal - subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-stone-600">배송비</dt><dd>{fee ? formatPrice(fee) : "무료"}</dd></div>
          <div className="flex justify-between border-t border-stone-200 pt-3 text-xl font-bold"><dt>결제 예정 금액</dt><dd>{formatPrice(subtotal + fee)}</dd></div>
        </dl>
        {fee > 0 && <p className="mt-3 rounded-lg bg-brand-soft p-3 text-sm text-brand">{formatPrice(FREE_OVER - subtotal)} 더 담으면 무료배송이에요. (예시 기준)</p>}
        <Link href="/my/orders?placed=1" onClick={clear} aria-disabled={!buyable.length} className="mt-5 flex h-14 items-center justify-center rounded-lg bg-brand text-lg font-bold text-white hover:opacity-90">
          {formatPrice(subtotal + fee)} 주문하기
        </Link>
        <p className="mt-2 text-center text-sm text-stone-600">결제는 아직 목업이에요.</p>
      </aside>
    </div>
  );
}
