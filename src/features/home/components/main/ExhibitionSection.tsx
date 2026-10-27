import Image from "next/image";
import { CONTAINER } from "@/components/ui/Container";
import { Countdown } from "@/components/ui/Countdown";
import type { Banner, Exhibition } from "@/features/content/data";
import { BannerCarousel } from "./BannerCarousel";

export function ExhibitionSection({ items, banners }: { items: Exhibition[]; banners: Banner[] }) {
  const lead = items[0];
  return (
    <section aria-labelledby="exh-title" className="relative isolate overflow-x-clip border-b border-[#e5e5e5] bg-white">
      <div className={`${CONTAINER} relative py-12 md:py-24`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a5a1f]">Season Pick</p>
        <h2 id="exh-title" className="relative z-10 mt-2 text-left text-2xl font-extrabold tracking-[-0.02em] text-[#222222] md:text-[28px]">
          놓치면 후회하는 <span className="text-[#e0322b]">기획전</span>
        </h2>
        {lead && (
          <p className="mt-3 inline-flex min-h-11 flex-wrap items-center gap-2.5 rounded-full bg-[#fff4f3] px-4 py-1.5 text-[13px] font-medium text-[#222222] ring-1 ring-[#f6d5d2]">
            <span aria-hidden className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[#e0322b] opacity-60 motion-reduce:hidden" /><span className="relative inline-flex size-2 rounded-full bg-[#e0322b]" /></span>
            <span className="font-semibold text-[#3f6b4f]">{lead.title}</span>
            <span className="text-[#6b6b6b]">마감까지</span>
            <span className="text-base font-extrabold tabular-nums tracking-tight text-[#c41f18] md:text-lg"><Countdown endsAt={lead.endsAt} /></span>
          </p>
        )}
        <div className="relative mt-6">
          <div className="relative z-10"><BannerCarousel banners={banners} /></div>
          <Image src="/images/exhibition-clock.png" alt="" aria-hidden width={583} height={533} className="pointer-events-none absolute -right-[2%] -top-[22%] z-0 hidden h-auto w-[26%] max-w-[340px] md:block" />
        </div>
      </div>
    </section>
  );
}
