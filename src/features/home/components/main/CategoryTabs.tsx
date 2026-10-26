import Link from "next/link";
import { CONTAINER } from "@/components/ui/Container";
import { ProductImage } from "@/features/product/components/ProductImage";
import { formatPrice } from "@/features/product/format";
import type { Product } from "@/features/product/types";
import { CategoryTabSwitcher } from "./CategoryTabSwitcher";
import { MainTitle } from "./MainTitle";
import { ScrollRow } from "./ScrollRow";

export type CategoryTabData = { slug: string; label: string; products: Product[] };

// 피그마 788:1323 카테고리 타일 아이콘(순서대로). 원본 SVG 크기 그대로 써요.
const CAT_ICONS = [
  { src: "/images/main/cat/1-fork.svg", w: 39.2245, h: 39.8945 },
  { src: "/images/main/cat/2-lipstick.svg", w: 36.033, h: 38.9822 },
  { src: "/images/main/cat/3-store.svg", w: 39.9628, h: 39.9628 },
  { src: "/images/main/cat/4-screen.svg", w: 39.9628, h: 38.5225 },
  { src: "/images/main/cat/5-necklace.svg", w: 33.9557, h: 38.8996 },
  { src: "/images/main/cat/6-football.svg", w: 37.1083, h: 37.1083 },
  { src: "/images/main/cat/7-palette.svg", w: 39.2192, h: 39.9629 },
  { src: "/images/main/cat/8-shelf.svg", w: 34.2538, h: 39.9628 },
  { src: "/images/main/cat/9-necktie.svg", w: 14.1321, h: 39.3716 },
];

// 피그마 788:1324 RECO_RANK 카드: 232px 정사각 이미지(#d7d7d7 테두리, 10px 모서리), 좌상단 45px 순위 배지,
// 가격 28px semibold, 상품명 20px 2줄, 별점 16px
function RankCard({ product, rank }: { product: Product; rank: number }) {
  return (
    <Link href={`/products/${product.id}`} draggable={false} className="group block rounded-[10px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
      <div className="relative aspect-square overflow-hidden rounded-[10px] border-[0.8px] border-[#d7d7d7] bg-stone-100 shadow-[0_1px_0.2px_rgba(0,0,0,0.25)]">
        <ProductImage product={product} sizes="(min-width: 1024px) 232px, 46vw" />
        <span className="absolute left-0 top-0 grid size-[45px] place-items-center rounded-br-[10px] rounded-tl-[10px] bg-[#474747] text-2xl font-bold text-white" aria-label={`${rank}위`}>{rank}</span>
      </div>
      <p className="mt-4 text-[22px] font-semibold leading-tight text-[#353535] md:text-[28px]">{formatPrice(product.salePrice ?? product.price)}</p>
      <h3 className="mt-1 line-clamp-2 min-h-[2.4em] text-base font-medium leading-[1.2] text-[#353535] group-hover:underline md:text-xl">{product.name}</h3>
      <p className="mt-3 flex items-center gap-1 text-base font-medium text-[#474747]">
        <img src="/images/main/cat/star.svg" alt="" width={18.9823} height={17.4626} draggable={false} />
        <span><span className="sr-only">별점 </span>{product.rating.toFixed(product.rating % 1 ? 1 : 0)} ({product.reviewCount})</span>
      </p>
    </Link>
  );
}

// 피그마 788:1323 "카테고리별 상품": 제목 + 그림자 흰 카드(베이지 아이콘 바 + 순위 상품 4열 슬라이드)
export function CategoryTabs({ tabs }: { tabs: CategoryTabData[] }) {
  return (
    <section aria-labelledby="cat-title" className="bg-white">
      <div className={`${CONTAINER} py-12 md:py-16`}>
        <MainTitle id="cat-title" title="카테고리별 상품" desc="카테고리별로 상품을 즐기세요!" />
        <div className="rounded-[16px] bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <CategoryTabSwitcher tabs={tabs.map((t, ti) => ({
            key: t.slug,
            label: t.label,
            icon: CAT_ICONS[ti % CAT_ICONS.length],
            panel: t.products.length ? (
              <ScrollRow className="relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scroll-subtle px-4 pb-2 md:-mx-6 md:gap-[22px] md:px-6">
                {t.products.slice(0, 8).map((p, i) => (
                  <li key={p.id} className="relative w-[46%] shrink-0 snap-start sm:w-[30%] md:w-[calc(25%-16.5px)]">
                    <RankCard product={p} rank={i + 1} />
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
