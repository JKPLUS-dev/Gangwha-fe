import Image from "next/image";
import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { getOrders } from "@/features/account/api";
import { ORDER_STATUS_LABEL, type OrderStatus } from "@/features/account/types";
import { getProduct } from "@/features/product/api";
import { formatPrice } from "@/features/product/format";

export const metadata = { title: "주문조회 | 강화장터" };

const BADGE: Record<OrderStatus, string> = {
  paid: "bg-sky-100 text-sky-900",
  preparing: "bg-amber-100 text-amber-900",
  shipping: "bg-brand-soft text-brand",
  delivered: "bg-stone-100 text-stone-700",
  canceled: "bg-red-50 text-red-800",
};
const STEPS: OrderStatus[] = ["paid", "preparing", "shipping", "delivered"];

export default async function Page() {
  const orders = await getOrders();
  const full = await Promise.all(
    orders.map(async (o) => ({ ...o, lines: await Promise.all(o.items.map(async (i) => ({ ...i, product: await getProduct(i.productId) }))) })),
  );
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <PageHeader title="주문·배송 조회" desc="최근 3개월 주문이에요. (목업)" />
      {!full.length && <EmptyState icon="📦" title="아직 주문한 상품이 없어요" href="/products" cta="첫 장보기 하러 가기" />}
      <ul className="space-y-6">
        {full.map((o) => {
          const total = o.items.reduce((s, i) => s + i.price * i.quantity, 0) + o.shippingFee;
          const step = STEPS.indexOf(o.status);
          return (
            <li key={o.id} className="rounded-2xl border border-stone-200">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 px-5 py-4">
                <p className="text-base"><span className="font-bold">{o.orderedAt}</span> <span className="text-stone-600">· 주문번호 {o.id}</span></p>
                <span className={`rounded-full px-3 py-1 text-sm font-bold ${BADGE[o.status]}`}>{ORDER_STATUS_LABEL[o.status]}</span>
              </div>
              {step >= 0 && (
                <ol aria-label="배송 단계" className="grid grid-cols-4 gap-1 px-5 pt-4">
                  {STEPS.map((s, i) => (
                    <li key={s} className="text-center">
                      <div className={`h-1.5 rounded-full ${i <= step ? "bg-brand" : "bg-stone-200"}`} />
                      <p className={`mt-1 text-xs ${i <= step ? "font-bold text-brand" : "text-stone-600"}`}>{ORDER_STATUS_LABEL[s]}</p>
                    </li>
                  ))}
                </ol>
              )}
              <ul className="divide-y divide-stone-100 px-5">
                {o.lines.map((l) => (
                  <li key={l.productId} className="flex items-center gap-4 py-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                      {l.product?.image && <Image src={l.product.image} alt="" fill sizes="64px" className="object-cover" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      {l.product ? <Link href={`/products/${l.product.id}`} className="flex min-h-11 items-center text-base font-medium hover:underline"><span className="line-clamp-1">{l.product.name}</span></Link> : <p>판매 종료 상품</p>}
                      <p className="text-sm text-stone-600">{formatPrice(l.price)} · {l.quantity}개</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 px-5 py-4">
                <p className="text-base">결제금액 <span className="text-lg font-bold">{formatPrice(total)}</span>{o.shippingFee > 0 && <span className="text-sm text-stone-600"> (배송비 {formatPrice(o.shippingFee)})</span>}</p>
                <div className="flex gap-2">
                  {o.status === "shipping" && <button type="button" className="h-11 rounded-lg border border-stone-300 px-4 font-semibold">배송 조회</button>}
                  {o.status === "delivered" && <button type="button" className="h-11 rounded-lg bg-brand px-4 font-semibold text-white">후기 쓰기</button>}
                  <Link href="/help" className="inline-flex h-11 items-center rounded-lg border border-stone-300 px-4 font-semibold">문의하기</Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
