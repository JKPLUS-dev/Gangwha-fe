import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CONTAINER } from "@/components/ui/Container";
import { getSeller } from "@/features/product/api";
import { formatPrice } from "@/features/product/format";
import type { Product } from "@/features/product/types";
import { ProductImage } from "@/features/product/components/ProductImage";

/** /a 전용 토큰 (CSS var는 globals.css .home-a 와 동기화) */
export const A = {
  text: "#1f2421",
  secondary: "#5b625e",
  ssuk: "#3f6b4f",
  ssukSoft: "#eef3ec",
  hwangto: "#8a5a1f",
  hwangtoText: "#8a5a1f",
  ivory: "#faf7f0",
} as const;

type Deco = "wave" | "leaf" | "none";
type Tone = "ivory" | "white" | "ssuk" | "gradient";

export function Wave({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 24" className={className} fill="none" strokeWidth="3" strokeLinecap="round">
      <path d="M2 14c10-10 20-10 30 0s20 10 30 0 20-10 30 0 20 10 26 2" stroke="#3f6b4f" opacity=".45" />
    </svg>
  );
}

export function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={className} fill="none">
      <path d="M8 32C8 16 18 8 34 6c-2 16-10 26-26 26Z" fill="#3f6b4f" opacity=".18" />
      <path d="M8 32 26 14" stroke="#3f6b4f" strokeWidth="2" strokeLinecap="round" opacity=".5" />
    </svg>
  );
}

const TONE_BG: Record<Tone, string> = {
  white: "bg-white",
  ivory: "bg-[var(--a-ivory)]",
  ssuk: "bg-[var(--a-ssuk-soft)]",
  gradient: "a-bg-gradient",
};

/** 모든 섹션 공통: PC 80 / 모바일 48, 제목 세리프 스케일 */
export function SectionA({
  id, title, sub, eyebrow, moreHref, deco = "leaf", tone = "ivory", children,
}: {
  id: string; title: string; sub?: string; eyebrow?: string; moreHref?: string; deco?: Deco; tone?: Tone; children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={`relative overflow-hidden ${TONE_BG[tone]}`}>
      <div className={`${CONTAINER} relative py-12 md:py-20`}>
        {deco === "wave" ? (
          <Wave className="pointer-events-none absolute right-4 top-8 h-6 w-28 md:top-12" />
        ) : deco === "leaf" ? (
          <Leaf className="pointer-events-none absolute right-4 top-6 size-12 md:top-10 md:size-16" />
        ) : null}
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4 md:mb-9">
          <div>
            {eyebrow && <p className="a-eyebrow">{eyebrow}</p>}
            <h2 id={id} className={`a-title${eyebrow ? " mt-1" : ""}`}>{title}</h2>
            {sub && <p className="a-sub mt-2">{sub}</p>}
          </div>
          {moreHref && (
            <Link
              href={moreHref}
              className="a-more inline-flex h-11 min-w-11 items-center rounded-full bg-white px-5 text-[13px] font-semibold text-[var(--a-ssuk)] transition hover:bg-[var(--a-ssuk-soft)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--a-ssuk)]"
            >
              더보기
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

/** /a 전용 상품 카드: 12px 라운드, 옅은 그림자, hover lift */
export async function ACard({ product }: { product: Product }) {
  const seller = await getSeller(product.sellerId);
  const sale = product.salePrice;
  const rate = sale ? Math.round((1 - sale / product.price) * 100) : 0;
  return (
    <Link
      href={`/products/${product.id}`}
      className="a-card group block h-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--a-ssuk)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--a-ivory)]">
        <div className={`absolute inset-0 ${product.soldOut && product.image ? "opacity-60" : ""}`}>
          <ProductImage product={product} sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw" />
        </div>
        {rate > 0 && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-[var(--a-hwangto)] px-2.5 py-1 text-[12px] font-bold leading-none text-white md:text-[13px]">
            {rate}%
          </span>
        )}
        {product.soldOut && (
          <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-black/80 py-2 text-center text-[13px] font-bold text-white">
            품절
          </span>
        )}
      </div>
      <div className="p-3.5 md:p-4">
        <p className="a-caption">{seller?.area}</p>
        <h3 className="a-card-title mt-1 line-clamp-2 min-h-[2.6em]">{product.name}</h3>
        <p className="mt-2 flex flex-wrap items-baseline gap-x-1.5">
          <span className="a-price">{formatPrice(sale ?? product.price)}</span>
          {rate > 0 && <s className="a-caption">{formatPrice(product.price)}</s>}
        </p>
        {product.freeShipping && (
          <p className="mt-1 text-[12px] font-semibold text-[var(--a-ssuk)] md:text-[13px]">무료배송</p>
        )}
      </div>
    </Link>
  );
}

export function AGrid({ products, empty = "곧 들어올 예정이에요." }: { products: Product[]; empty?: string }) {
  if (!products.length) {
    return <p className="rounded-[var(--a-radius)] bg-white py-12 text-center text-[var(--a-text-secondary)]">{empty}</p>;
  }
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 max-md:[&>li:nth-child(odd):last-child]:hidden">
      {products.map((p) => (
        <li key={p.id}><ACard product={p} /></li>
      ))}
    </ul>
  );
}

export function APhoto({
  src, alt = "", className = "", sizes = "100vw", priority,
}: {
  src: string; alt?: string; className?: string; sizes?: string; priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition duration-500 group-hover:scale-105" />
    </div>
  );
}
