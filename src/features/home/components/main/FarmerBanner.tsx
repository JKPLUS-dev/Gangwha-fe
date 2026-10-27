import { DragScroll } from "@/components/ui/DragScroll";
import { CONTAINER } from "@/components/ui/Container";
import Link from "next/link";
import type { Seller } from "@/features/product/types";

export type FeaturedSeller = Seller & { interview: string };

export function FarmerBanner({ sellers }: { sellers: FeaturedSeller[] }) {
  return (
    <section aria-label="자연을 담은 농부 상점" className="border-b border-[#e5e5e5] bg-[#f7f5f0]">
      <div className={`${CONTAINER} py-10 md:py-14`}>
        <Link
          href={sellers[0] ? `/sellers/${sellers[0].id}` : "/search"}
          className="relative block aspect-[1200/259] overflow-hidden rounded"
        >
          <img
            src="/images/main/farmer-banner.webp"
            alt="자연을 담은 농부 상점, 바로가기"
            width={2752}
            height={1536}
            className="absolute max-w-none"
            style={{ width: "121.92%", height: "315.29%", left: "-21.9%", top: "-108.68%" }}
          />
        </Link>
        {sellers.length > 0 && (
          <DragScroll
            as="ul"
            className="relative -mx-4 mt-5 flex items-stretch snap-x gap-3 overflow-x-auto px-4 pb-2 after:w-4 after:shrink-0 after:content-[''] md:mx-0 md:gap-4 md:px-0 md:after:w-1"
          >
            {sellers.map((s) => (
              <li key={s.id} className="relative flex w-64 shrink-0 snap-start">
                <Link
                  href={`/sellers/${s.id}`}
                  className="flex h-[120px] w-full flex-col overflow-hidden border border-[#e5e5e5] bg-white p-4 hover:border-[#3f6b4f]"
                >
                  <p className="text-xs text-[#6b6b6b]">{s.area}</p>
                  <p className="mt-0.5 truncate text-sm font-bold text-[#222222]">{s.name}</p>
                  <p className="mt-1 line-clamp-2 min-h-[2lh] text-[13px] leading-relaxed text-[#6b6b6b]">&ldquo;{s.interview}&rdquo;</p>
                </Link>
              </li>
            ))}
          </DragScroll>
        )}
      </div>
    </section>
  );
}
