import { ProductCard } from "@/features/product/components/ProductCard";
import type { Product } from "@/features/product/types";
import { MainTitle } from "./MainTitle";

// 피그마 "강화도 신선 산지 직송 마켓" 가로 슬라이드(스크롤 스냅)
export function ProductSlider({ id, title, desc, moreHref, products }: { id: string; title: string; desc?: string; moreHref?: string; products: Product[] }) {
  return (
    <section aria-labelledby={id} className="bg-white">
      <div className="mx-auto max-w-[1000px] px-4 py-12 md:py-16">
        <MainTitle id={id} title={title} desc={desc} moreHref={moreHref} />
        <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
          {products.map((p) => (
            <li key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[30%] md:w-[calc(25%-12px)]"><ProductCard product={p} /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
