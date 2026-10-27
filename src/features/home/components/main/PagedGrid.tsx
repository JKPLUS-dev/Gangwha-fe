"use client";

import { Children, useState, type ReactNode } from "react";

// 피그마 788:1323: 4개씩 고정 그리드, 하단 점으로 즉시 페이지 교체(스크롤 아님)
export function PagedGrid({ children, perPage = 4 }: { children: ReactNode; perPage?: number }) {
  const items = Children.toArray(children);
  const count = Math.max(1, Math.ceil(items.length / perPage));
  const [cur, setCur] = useState(0);
  return (
    <div>
      <ol className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-4 md:gap-[22px] xl:grid-cols-[repeat(4,232px)] xl:justify-center">{items.slice(cur * perPage, cur * perPage + perPage)}</ol>
      {count > 1 && (
        <div className="mt-3 flex justify-center">
          {Array.from({ length: count }, (_, i) => (
            <button key={i} type="button" aria-label={`${i + 1}페이지`} aria-current={i === cur ? "true" : undefined} onClick={() => setCur(i)} className="grid size-11 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-[#3f6b4f] md:-mx-[14.5px] md:first:ml-0 md:last:mr-0">
              <span className={`size-[9px] rounded-full transition-colors ${i === cur ? "bg-[#245C37]" : "bg-[#C6C6C6]"}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
