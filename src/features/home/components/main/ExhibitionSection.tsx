import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Countdown } from "@/components/ui/Countdown";
import type { Exhibition } from "@/features/content/data";

// 피그마 "놓치면 후회하는 기획전": 베이지 배경 + 빨간 시계 + 흰 카드.
export function ExhibitionSection({ items, children }: { items: Exhibition[]; children?: ReactNode }) {
  const lead = items[0];
  return (
    <section aria-labelledby="exh-title" className="relative overflow-hidden bg-[#f6ebdb]">
      <Image src="/images/exhibition-clock.png" alt="" aria-hidden width={583} height={533} className="pointer-events-none absolute right-0 top-0 hidden w-[40%] max-w-[583px] md:block" />
      <div className="relative mx-auto max-w-[1286px] px-4 py-12 md:py-16">
        <h2 id="exh-title" className="text-3xl font-bold text-[#262626] md:text-[56px] md:leading-tight">
          놓치면 후회하는 <span className="text-[#d42222]">기획전</span>
        </h2>
        <div className="mt-8 rounded-[30px] bg-white p-5 shadow-sm md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full border-2 border-[#d42222] px-5 py-1.5 text-lg font-bold text-[#d42222]">기획전</span>
            {lead && (
              <span className="inline-flex items-center gap-2 rounded-full bg-[#262626] px-4 py-2 text-sm font-semibold text-white">
                ⏰ {lead.title} 마감까지 <span className="text-[#ffbb00]"><Countdown endsAt={lead.endsAt} /></span>
              </span>
            )}
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {items.map((e) => (
              <li key={e.id}>
                <Link href="/deals" className="group block overflow-hidden rounded-2xl border border-stone-200 hover:border-[#d42222]">
                  <div className="relative aspect-[16/9] bg-stone-100">
                    {e.image && <Image src={e.image} alt="" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition group-hover:scale-105" />}
                    <span className="absolute left-3 top-3 rounded-md bg-[#d42222] px-2 py-1 text-xs font-bold text-white"><Countdown endsAt={e.endsAt} /></span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#353535]">{e.title}</h3>
                    <p className="mt-1 text-sm text-[#585858]">{e.subtitle}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}
