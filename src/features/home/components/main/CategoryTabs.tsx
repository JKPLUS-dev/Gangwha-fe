import { CONTAINER } from "@/components/ui/Container";
import { ProductCard } from "@/features/product/components/ProductCard";
import type { Product } from "@/features/product/types";
import { CategoryTabSwitcher } from "./CategoryTabSwitcher";
import { MainTitle } from "./MainTitle";
import { QUICK_ICONS } from "./QuickCategoryIcons";
import { ScrollRow } from "./ScrollRow";

export type CategoryTabData = { slug: string; label: string; products: Product[] };

// 피그마 790:369 "카테고리별 상품": 그림자 흰 카드 + 아이콘 탭 바(원형 아이콘 8개와 같은 순서) + 순위 배지 상품 슬라이드
export function CategoryTabs({ tabs }: { tabs: CategoryTabData[] }) {
  return (
    <section aria-labelledby="cat-title" className="bg-white">
      <div className={`${CONTAINER} py-12 md:py-16`}>
        <div><MainTitle id="cat-title" title="카테고리별 상품" desc="카테고리별로 상품을 즐기세요!" /></div>
        <div className="rounded-2xl bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)] ring-1 ring-stone-100">
          <CategoryTabSwitcher tabs={tabs.map((t, ti) => ({
            key: t.slug,
            label: t.label,
            ...QUICK_ICONS[ti % QUICK_ICONS.length],
            panel: t.products.length ? (
              <ScrollRow className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scroll-subtle px-4 pb-2 md:-mx-6 md:px-6">
                {t.products.slice(0, 8).map((p, i) => (
                  <li key={p.id} className="relative w-[46%] shrink-0 snap-start sm:w-[30%] md:w-[calc(25%-12px)]">
                    <span className="absolute left-2 top-2 z-10 grid size-8 place-items-center rounded-md bg-[#474747] text-sm font-bold text-white" aria-label={`${i + 1}위`}>{i + 1}</span>
                    <ProductCard product={p} />
                  </li>
                ))}
              </ScrollRow>
            ) : <p className="py-10 text-center text-stone-600">준비 중인 상품이에요.</p>,
          }))} />
        </div>
      </div>
    </section>
  );
}
