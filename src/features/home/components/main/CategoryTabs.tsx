import { Tabs } from "@/components/ui/Tabs";
import { ProductCard } from "@/features/product/components/ProductCard";
import type { Product } from "@/features/product/types";
import { MainTitle } from "./MainTitle";

export type CategoryTab = { label: string; products: Product[] };

// 피그마 "카테고리별 상품" 탭 + 4열 상품
export function CategoryTabs({ tabs }: { tabs: CategoryTab[] }) {
  return (
    <section aria-labelledby="cat-title" className="bg-white">
      <div className="mx-auto max-w-[1000px] px-4 py-12 md:py-16">
        <MainTitle id="cat-title" title="카테고리별 상품" desc="카테고리별로 상품을 즐기세요!" />
        <Tabs label="카테고리" tabs={tabs.map((t) => ({
          label: t.label,
          panel: t.products.length ? (
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">{t.products.slice(0, 4).map((p) => <li key={p.id}><ProductCard product={p} /></li>)}</ul>
          ) : <p className="py-10 text-center text-stone-600">준비 중인 상품이에요.</p>,
        }))} />
      </div>
    </section>
  );
}
