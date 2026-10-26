import Image from "next/image";
import Link from "next/link";
import { getGiftSets } from "@/features/product/api";
import { ProductCard } from "@/features/product/components/ProductCard";
import { pickVaried } from "../pickVaried";

export async function GiftSets() {
  const sets = pickVaried(await getGiftSets(16), 3);
  if (!sets.length) return null;
  return (
    <section className="bg-amber-50">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 md:grid-cols-4 md:py-16">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-amber-700">명절·감사 선물</p>
            <h2 className="mt-1 text-2xl font-bold md:text-3xl">강화 선물세트관</h2>
            <p className="mt-3 text-base text-stone-700">인삼, 섬쌀, 젓갈을 선물 포장해서 받는 분께 바로 보내드려요.</p>
          </div>
          <div className="relative hidden aspect-square overflow-hidden rounded-2xl md:block">
            <Image src="/images/redginseng.webp" alt="" fill sizes="25vw" className="object-cover" />
          </div>
          <Link href="/products?q=%EC%84%B8%ED%8A%B8" className="inline-flex h-12 items-center justify-center rounded-lg bg-stone-900 px-6 font-bold text-white">선물세트 모두 보기</Link>
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:col-span-3 md:grid-cols-3">
          {sets.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}
        </ul>
      </div>
    </section>
  );
}
