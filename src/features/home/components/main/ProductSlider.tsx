import { CONTAINER } from "@/components/ui/Container";
import { ProductCard } from "@/features/product/components/ProductCard";
import type { Product } from "@/features/product/types";
import { MainTitle } from "./MainTitle";

// 피그마 "강화도 신선 산지 직송 마켓" 가로 슬라이드(스크롤 스냅)
export function ProductSlider({ id, title, desc, moreHref, products }: { id: string; title: string; desc?: string; moreHref?: string; products: Product[] }) {
  return (
    <section aria-labelledby={id} className="bg-white">
      <div className={`${CONTAINER} py-12 md:py-16`}>
        <MainTitle id={id} title={title} desc={desc} moreHref={moreHref} />
        <ul className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-subtle pb-2 pr-4 md:mr-0 md:pr-0">
          {products.map((p) => (
            <li key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[30%] md:w-[calc(25%-12px)]"><ProductCard product={p} /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
