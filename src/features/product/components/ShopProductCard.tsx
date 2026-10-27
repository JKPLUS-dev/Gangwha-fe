import Link from "next/link";
import { QuickAddButton } from "@/features/cart/components/QuickAddButton";
import type { Product } from "../types";
import { ProductImage } from "./ProductImage";

function Price({ won, className = "" }: { won: number; className?: string }) {
  return (
    <span className={`inline-flex items-baseline tabular-nums ${className}`}>
      <span>{won.toLocaleString("ko-KR")}</span>
      <span className="ml-px text-[11px] font-semibold leading-none">원</span>
    </span>
  );
}

/** 공용 상품 카드: 1:1 이미지, 할인율 빨강, 산지/리뷰 회색(#6b6b6b). */
export function ShopProductCard({ product, rank }: { product: Product; rank?: number }) {
  const sale = product.salePrice;
  const rate = sale ? Math.round((1 - sale / product.price) * 100) : 0;
  const badge = product.freeShipping ? "무료배송" : "산지직송";

  return (
    <article className="group relative">
      {rank != null && <span className="sr-only">{rank}위</span>}
      <Link
        href={`/products/${product.id}`}
        draggable={false}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3f6b4f]"
      >
        <div className="relative aspect-square overflow-hidden rounded bg-[#f4f2ee]">
          <div className={product.soldOut && product.image ? "absolute inset-0 opacity-60" : "absolute inset-0"}>
            <ProductImage product={product} sizes="(min-width: 1024px) 232px, 46vw" />
          </div>
          <span className="absolute left-0 top-0 bg-[#3f6b4f] px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white">
            {badge}
          </span>
          {product.soldOut && (
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-black/70 py-2 text-center text-sm font-bold text-white">
              품절
            </span>
          )}
        </div>
        <p className="mt-2 text-xs leading-none text-[#6b6b6b]">{product.origin}</p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.6em] text-sm font-medium leading-[1.3] text-[#222222] group-hover:underline">
          {product.name}
        </h3>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-1">
          {rate > 0 && <span className="text-base font-bold tabular-nums text-[#e0322b]">{rate}%</span>}
          <Price won={sale ?? product.price} className="text-base font-bold text-[#222222]" />
        </p>
        {rate > 0 && (
          <p className="mt-0.5 text-xs text-[#6b6b6b] line-through">
            <Price won={product.price} className="text-xs font-normal text-[#6b6b6b]" />
          </p>
        )}
        <p className="mt-1 text-xs text-[#6b6b6b]">리뷰 {product.reviewCount}</p>
      </Link>
      <QuickAddButton productId={product.id} disabled={product.soldOut} />
    </article>
  );
}
