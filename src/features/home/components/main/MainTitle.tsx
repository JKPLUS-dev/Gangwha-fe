import Link from "next/link";

/** 섹션 헤더: 영문 kicker + 큰 제목 + 더보기 + 하단 1px 라인. */
export function MainTitle({
  id,
  title,
  desc,
  moreHref,
  kicker,
}: {
  id: string;
  title: string;
  desc?: string;
  moreHref?: string;
  kicker?: string;
}) {
  return (
    <div className="mb-5 border-b border-[#e5e5e5] pb-4 md:mb-6 md:pb-5">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          {kicker && (
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3f6b4f] md:text-xs">
              {kicker}
            </p>
          )}
          <h2
            id={id}
            className="text-left text-[22px] font-bold leading-tight tracking-tight text-[#222222] md:text-[26px]"
          >
            {title}
          </h2>
          {desc && <p className="mt-1.5 text-left text-[13px] text-[#6b6b6b] md:text-sm">{desc}</p>}
        </div>
        {moreHref && (
          <Link
            href={moreHref}
            className="inline-flex h-11 min-w-11 shrink-0 items-center justify-end text-[13px] font-medium text-[#6b6b6b] hover:text-[#222222] md:h-auto md:pb-0.5"
          >
            더보기
          </Link>
        )}
      </div>
    </div>
  );
}
