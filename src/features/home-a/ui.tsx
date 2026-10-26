import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CONTAINER } from "@/components/ui/Container";
import { getSeller } from "@/features/product/api";
import { formatPrice } from "@/features/product/format";
import type { Product } from "@/features/product/types";
import { ProductImage } from "@/features/product/components/ProductImage";

// /a 리뉴얼 전용 팔레트: 로고 초록, 바다 파랑, 당근 주황, 아이보리 바탕
export const A = {
  ivory: "bg-[#fbf8f1]",
  green: "#2f5d3a",
  sea: "#1d5f8a",
  carrot: "#c2410c",
  carrotText: "text-[#9a3412]",
};

type Deco = "wave" | "leaf";

export function Wave({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 24" className={className} fill="none" strokeWidth="3" strokeLinecap="round">
      <path d="M2 14c10-10 20-10 30 0s20 10 30 0 20-10 30 0 20 10 26 2" stroke="#1d5f8a" opacity=".55" />
    </svg>
  );
}
export function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className} fill="none">
      <path d="M8 32C8 16 18 8 34 6c-2 16-10 26-26 26Z" fill="#2f5d3a" opacity=".18" />
      <path d="M8 32 26 14" stroke="#2f5d3a" strokeWidth="2" strokeLinecap="round" opacity=".5" />
    </svg>
  );
}

// 모든 섹션 공통: 같은 세로 간격(py-14 md:py-20), 같은 제목 스케일, 장식 하나
export function SectionA({ id, title, sub, moreHref, deco = "leaf", tone = "ivory", children }: {
  id: string; title: string; sub?: string; moreHref?: string; deco?: Deco; tone?: "ivory" | "white" | "green"; children: ReactNode;
}) {
  const bg = tone === "white" ? "bg-white" : tone === "green" ? "bg-[#eef4ec]" : A.ivory;
  return (
    <section aria-labelledby={id} className={`relative overflow-hidden ${bg}`}>
      <div className={`${CONTAINER} relative py-14 md:py-20`}>
        {deco === "wave" ? <Wave className="pointer-events-none absolute right-4 top-8 h-6 w-28 md:top-12" /> : <Leaf className="pointer-events-none absolute right-4 top-6 size-12 md:top-10 md:size-16" />}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <h2 id={id} className="text-2xl font-bold tracking-tight text-stone-900 md:text-[32px]">{title}</h2>
            {sub && <p className="mt-2 text-base text-stone-600">{sub}</p>}
          </div>
          {moreHref && (
            <Link href={moreHref} className="inline-flex h-11 items-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-700 transition hover:border-[#2f5d3a] hover:text-[#2f5d3a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5d3a]">더보기</Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

// /a 전용 상품 카드: 큰 사진, 둥근 모서리, 옅은 그림자, 부드러운 hover
export async function ACard({ product }: { product: Product }) {
  const seller = await getSeller(product.sellerId);
  const sale = product.salePrice;
  const rate = sale ? Math.round((1 - sale / product.price) * 100) : 0;
  return (
    <Link href={`/products/${product.id}`} className="group block h-full overflow-hidden rounded-3xl bg-white shadow-[0_2px_12px_rgba(47,93,58,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(47,93,58,0.14)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f5d3a]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f6ebdb]">
        <div className={`absolute inset-0 ${product.soldOut && product.image ? "opacity-60" : ""}`}>
          <ProductImage product={product} sizes="(min-width: 1024px) 25vw, 50vw" />
        </div>
        {rate > 0 && <span className="absolute left-3 top-3 rounded-full bg-[#c2410c] px-2.5 py-1 text-xs font-bold text-white">{rate}%</span>}
        {product.soldOut && <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-stone-900/80 py-2 text-center font-bold text-white">품절</span>}
      </div>
      <div className="p-4">
        <p className="text-sm text-stone-600">{seller?.area}</p>
        <h3 className="mt-1 line-clamp-2 min-h-12 text-base font-semibold text-stone-900">{product.name}</h3>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-lg font-bold text-stone-900">{formatPrice(sale ?? product.price)}</span>
          {rate > 0 && <s className="text-sm text-stone-600">{formatPrice(product.price)}</s>}
        </p>
        {product.freeShipping && <p className="mt-1 text-sm font-medium text-[#1d5f8a]">무료배송</p>}
      </div>
    </Link>
  );
}

export function AGrid({ products, empty = "곧 들어올 예정이에요." }: { products: Product[]; empty?: string }) {
  if (!products.length) return <p className="rounded-3xl bg-white py-12 text-center text-stone-600">{empty}</p>;
  return (
    <ul className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
      {products.map((p) => <li key={p.id}><ACard product={p} /></li>)}
    </ul>
  );
}

export function APhoto({ src, alt = "", className = "", sizes = "100vw", priority }: { src: string; alt?: string; className?: string; sizes?: string; priority?: boolean }) {
  return <div className={`relative overflow-hidden ${className}`}><Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition duration-500 group-hover:scale-105" /></div>;
}
