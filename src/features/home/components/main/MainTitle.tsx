import Link from "next/link";

// 피그마 title_reco_home: 큰 제목 + 옆 설명 + 더보기 버튼
export function MainTitle({ id, title, desc, moreHref }: { id: string; title: string; desc?: string; moreHref?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
        <h2 id={id} className="text-2xl font-semibold text-[#353535] md:text-[38px]">{title}</h2>
        {desc && <p className="text-sm font-medium text-[#353535] md:text-xl">{desc}</p>}
      </div>
      {moreHref && (
        <Link href={moreHref} className="inline-flex h-11 shrink-0 items-center rounded-full border border-stone-300 px-4 text-sm text-[#474747] hover:border-stone-500">더보기 &gt;</Link>
      )}
    </div>
  );
}
