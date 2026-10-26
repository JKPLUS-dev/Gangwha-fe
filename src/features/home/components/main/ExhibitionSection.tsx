import Image from "next/image";
import { CONTAINER } from "@/components/ui/Container";
import { Countdown } from "@/components/ui/Countdown";
import type { Banner, Exhibition } from "@/features/content/data";
import { BannerCarousel } from "./BannerCarousel";

// 피그마 "놓치면 후회하는 기획전": 베이지 배경 + 오른쪽 위 빨간 시계(784-434 기준 1440에서 583×533, 섹션 위로 28px 걸침)
// + 제목 + 마감 타이머 + 무한 루프 배너.
export function ExhibitionSection({ items, banners }: { items: Exhibition[]; banners: Banner[] }) {
  const lead = items[0];
  return (
    <section aria-labelledby="exh-title" className="relative bg-[#f6ebdb]">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-7 bottom-0 overflow-hidden">
        <Image src="/images/exhibition-clock.png" alt="" width={583} height={533}
          className="absolute right-0 top-0 hidden h-auto w-[40.5%] max-w-[583px] md:block" />
      </div>
      <div className={`${CONTAINER} relative py-12 md:py-16`}>
        <h2 id="exh-title" className="text-3xl font-bold text-[#262626] md:text-[56px] md:leading-tight">
          놓치면 후회하는 <span className="text-[#b91c1c]">기획전</span>
        </h2>
        {lead && (
          <p className="mt-4 inline-flex min-h-11 flex-wrap items-center gap-2 rounded-full bg-[#262626] px-4 py-2 text-sm font-semibold text-white">
            <span aria-hidden>⏰</span> {lead.title} 마감까지 <span className="text-[#ffbb00]"><Countdown endsAt={lead.endsAt} /></span>
          </p>
        )}
        <div className="mt-8"><BannerCarousel banners={banners} /></div>
      </div>
    </section>
  );
}
