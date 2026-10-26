import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { getFeaturedSellers, getProducts } from "@/features/product/api";

export async function ProducerStories() {
  const sellers = (await getFeaturedSellers()).slice(0, 4);
  if (!sellers.length) return null;
  const covers = await Promise.all(sellers.map(async (s) => s.photo ?? (await getProducts({ sellerId: s.id })).find((p) => p.image)?.image));
  const [main, ...rest] = sellers;
  return (
    <Section eyebrow="누가 키웠는지 보여드려요" title="이달의 생산자" tone="stone">
      <div className="grid gap-6 md:grid-cols-5">
        <Link href={`/sellers/${main.id}`} className="group overflow-hidden rounded-2xl bg-white md:col-span-3">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image src={main.photo ?? "/images/scenery.webp"} alt={`${main.area} 풍경`} fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover transition duration-300 group-hover:scale-105" />
          </div>
          <div className="p-6 md:p-8">
            <p className="text-sm font-semibold text-brand">{main.area} · {main.name}</p>
            <blockquote className="mt-2 text-2xl font-bold leading-snug text-stone-900">“{main.interview}”</blockquote>
            <p className="mt-3 text-base leading-relaxed text-stone-700">{main.story}</p>
            <p className="mt-4 font-semibold text-brand">상점 구경하기 →</p>
          </div>
        </Link>
        <div className="grid gap-4 md:col-span-2">
          {rest.map((s, i) => (
            <Link key={s.id} href={`/sellers/${s.id}`} className="group flex gap-4 rounded-2xl bg-white p-4">
              <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-stone-100">
                {covers[i + 1] && <Image src={covers[i + 1]!} alt="" fill sizes="96px" className="object-cover" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-brand">{s.area} · {s.name}</p>
                <p className="mt-1 text-base font-bold leading-snug text-stone-900 group-hover:underline">“{s.interview}”</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
