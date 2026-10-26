import { CONTAINER } from "@/components/ui/Container";
import Link from "next/link";
import type { Seller } from "@/features/product/types";

export type FeaturedSeller = Seller & { interview: string };

// 피그마 784:457 category_best: 원본 이미지를 피그마와 같은 비율로 잘라 보여줘요. 아래에 이달의 농부.
export function FarmerBanner({ sellers }: { sellers: FeaturedSeller[] }) {
  return (
    <section aria-label="자연을 담은 농부 상점" className="bg-white">
      <div className={CONTAINER}>
        <Link href={sellers[0] ? `/sellers/${sellers[0].id}` : "/search"} className="relative block aspect-[1200/259] overflow-hidden rounded-[20px] md:rounded-[33px]">
          <img src="/images/main/farmer-banner.webp" alt="자연을 담은 농부 상점, 바로가기" width={2752} height={1536}
            className="absolute max-w-none" style={{ width: "121.92%", height: "315.29%", left: "-21.9%", top: "-108.68%" }} />
        </Link>
        {sellers.length > 0 && (
          <ul className="-mr-4 mt-4 flex snap-x gap-3 overflow-x-auto scroll-subtle pb-2 pr-4 md:mr-0 md:pr-0">
            {sellers.map((s) => (
              <li key={s.id} className="w-64 shrink-0 snap-start">
                <Link href={`/sellers/${s.id}`} className="block min-h-11 rounded-xl border border-stone-200 p-4 hover:border-brand">
                  <p className="text-sm text-[#585858]">{s.area}</p>
                  <p className="font-semibold text-[#353535]">{s.name}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-[#474747]">&ldquo;{s.interview}&rdquo;</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
