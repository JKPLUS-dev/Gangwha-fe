import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CONTAINER } from "@/components/ui/Container";
import type { Product } from "@/features/product/types";
import { ShopProductCard } from "@/features/product/components/ShopProductCard";

/** /a 전용 토큰 — CSS var는 globals.css .home-a 와 동기화 */
export const A = {
  text: "#222222",
  secondary: "#6b6b6b",
  ssuk: "#3f6b4f",
  sale: "#e0322b",
  line: "#e5e5e5",
  paper: "#f7f5f0",
} as const;

type Tone = "white" | "paper";

/** 섹션 헤더: Pretendard 700 좌측 + 더보기 우측 베이스라인, 장식 없음 */
export function SectionA({
  id, title, sub, moreHref, tone = "white", bordered = true, children,
}: {
  id: string;
  title: string;
  sub?: string;
  moreHref?: string;
  tone?: Tone;
  bordered?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={id}
      className={`${tone === "paper" ? "a-bg-paper" : "bg-white"}${bordered ? " a-section-border" : ""}`}
    >
      <div className={`${CONTAINER} a-section`}>
        <div className="a-head">
          <div className="min-w-0">
            <h2 id={id} className="a-title">{title}</h2>
            {sub ? <p className="a-sub">{sub}</p> : null}
          </div>
          {moreHref ? (
            <Link href={moreHref} className="a-more">
              더보기 <span aria-hidden>→</span>
            </Link>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}

/** /·/a 동일 카드 — 개발노예 ShopProductCard 래퍼. BEST 순위 숫자만 /a에서 오버레이 */
export function ACard({ product, rank }: { product: Product; rank?: number }) {
  return (
    <div className="relative h-full">
      {typeof rank === "number" ? (
        <span className="a-rank pointer-events-none z-[1]">{rank}</span>
      ) : null}
      <ShopProductCard product={product} rank={rank} />
    </div>
  );
}

export function AGrid({
  products,
  empty = "곧 들어올 예정이에요.",
  ranked = false,
}: {
  products: Product[];
  empty?: string;
  ranked?: boolean;
}) {
  if (!products.length) {
    return <p className="py-10 text-center text-[13px] text-[var(--a-secondary)]">{empty}</p>;
  }
  return (
    <ul className="a-grid max-md:[&>li:nth-child(odd):last-child]:hidden">
      {products.map((p, i) => (
        <li key={p.id}>
          <ACard product={p} rank={ranked ? i + 1 : undefined} />
        </li>
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
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition duration-300 group-hover:scale-[1.04]"
      />
    </div>
  );
}