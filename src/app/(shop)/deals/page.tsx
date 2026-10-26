import { Countdown } from "@/components/ui/Countdown";
import { EmptyState } from "@/components/ui/EmptyState";
import { getTimeDeals } from "@/features/product/api";
import { ProductGrid } from "@/features/product/components/ProductGrid";

export const metadata = { title: "타임특가 | 강화장터" };

export default async function Page() {
  const deals = await getTimeDeals(48);
  const endsAt = deals[0]?.dealEndsAt;
  const best = deals.reduce((m, p) => Math.max(m, p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0), 0);
  return (
    <main>
      <section className="bg-stone-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-4 py-10 md:py-14">
          <div>
            <p className="text-sm font-semibold text-amber-300">이번 주만 이 가격</p>
            <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">강화 타임특가</h1>
            <p className="mt-2 text-base text-white/80">산지에서 바로 보내는 특가 상품 {deals.length}개{best > 0 && ` · 최대 ${best}% 할인`}</p>
          </div>
          {endsAt && (
            <p className="rounded-xl bg-white/10 px-5 py-3 text-2xl font-bold md:text-3xl">
              <span className="mr-3 text-sm font-medium text-white/80">남은 시간</span>
              <Countdown endsAt={endsAt} />
            </p>
          )}
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-10">
        {deals.length ? <ProductGrid products={deals} /> : <EmptyState icon="⏰" title="지금은 진행 중인 특가가 없어요" desc="다음 특가는 월요일 오전 10시에 열려요. (예시)" href="/products" cta="전체 상품 보기" />}
      </div>
    </main>
  );
}
