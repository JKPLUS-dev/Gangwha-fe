import { DragScroll } from "@/components/ui/DragScroll";
import { CONTAINER } from "@/components/ui/Container";
import { ShopProductCard } from "@/features/product/components/ShopProductCard";
import type { Product } from "@/features/product/types";
import { MainTitle } from "./MainTitle";

export function ProductSlider({ id, title, desc, moreHref, products }: { id: string; title: string; desc?: string; moreHref?: string; products: Product[] }) {
  return (
    <section aria-labelledby={id} className="border-b border-[#e5e5e5] bg-white">
      <div className={`${CONTAINER} py-10 md:py-14`}>
        <MainTitle id={id} title={title} desc={desc} moreHref={moreHref} />
        <DragScroll as="ul" className="-mr-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pr-4 md:mr-0 md:gap-5 md:pr-0">
          {products.map((p) => (
            <li key={p.id} className="relative w-[46%] shrink-0 snap-start sm:w-[30%] md:w-[calc(25%-15px)]">
              <ShopProductCard product={p} />
            </li>
          ))}
        </DragScroll>
      </div>
    </section>
  );
}
