import Link from "next/link";
import { Countdown } from "@/components/ui/Countdown";
import { getTimeDeals } from "@/features/product/api";
import { ProductGrid } from "@/features/product/components/ProductGrid";
import { pickVaried } from "../pickVaried";

export async function TimeDeals() {
  const deals = await getTimeDeals(12);
  const endsAt = deals[0]?.dealEndsAt;
  if (!deals.length || !endsAt) return null;
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:py-16">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8">
        <div>
          <p className="mb-1 text-sm font-semibold text-red-600">이번 주만 이 가격</p>
          <h2 className="text-2xl font-bold text-stone-900 md:text-3xl">타임특가</h2>
        </div>
        <div className="flex items-center gap-3">
          <p className="rounded-lg bg-stone-900 px-4 py-2 text-lg font-bold text-white">
            <span className="mr-2 text-sm font-medium text-white/70">남은 시간</span>
            <Countdown endsAt={endsAt} />
          </p>
          <Link href="/products?sort=priceAsc" className="inline-flex h-11 items-center text-base text-stone-600 hover:text-stone-900">전체보기 →</Link>
        </div>
      </div>
      <ProductGrid products={pickVaried(deals, 4)} />
    </section>
  );
}
