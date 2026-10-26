import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/features/product/api";
import { ProductCard } from "@/features/product/components/ProductCard";

export async function SeasonalPick() {
  const [kimchi, jeot] = await Promise.all([getProducts({ q: "순무" }), getProducts({ q: "젓" })]);
  const picks = [...kimchi.slice(0, 2), ...jeot.slice(0, 2)];
  return (
    <section className="bg-brand-soft">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 md:grid-cols-5 md:py-16">
        <div className="relative min-h-72 overflow-hidden rounded-2xl md:col-span-2">
          <Image src="/images/sunmu.webp" alt="강화 순무김치" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
            <p className="text-sm font-semibold text-white/85">지금 강화는</p>
            <h2 className="mt-1 text-2xl font-bold md:text-3xl">순무·새우젓 제철이에요</h2>
            <p className="mt-2 text-base text-white/85">알싸한 순무와 가을 추젓으로 올해 김장을 준비해 보세요.</p>
            <Link href="/products?q=%EC%88%9C%EB%AC%B4" className="mt-4 inline-flex h-11 items-center rounded-lg bg-white px-5 font-bold text-brand">제철 상품 모두 보기</Link>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:col-span-3">
          {picks.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
        </ul>
      </div>
    </section>
  );
}
