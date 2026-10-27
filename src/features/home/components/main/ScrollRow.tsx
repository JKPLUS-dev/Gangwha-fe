"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useDragScroll } from "@/lib/useDragScroll";

export function ScrollRow({ children, className = "", dots = false }: { children: ReactNode; className?: string; dots?: boolean }) {
  const ref = useDragScroll<HTMLOListElement>();
  const [edge, setEdge] = useState({ start: true, end: false });
  const [page, setPage] = useState({ count: 1, cur: 0 });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdge({ start: el.scrollLeft <= 24, end: el.scrollLeft >= max - 24 });
    const count = Math.max(1, Math.ceil(el.scrollWidth / el.clientWidth - 0.05));
    setPage({ count, cur: max <= 0 ? 0 : Math.round((el.scrollLeft / max) * (count - 1)) });
  };
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const move = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth, behavior: "smooth" });
  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: ((el.scrollWidth - el.clientWidth) * i) / Math.max(1, page.count - 1), behavior: "smooth" });
  };

  const btn =
    "absolute top-[35%] z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#F8F8F8]/80 shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3f6b4f] md:flex";
  const chev = (d: string) => (
    <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#7B7B7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
  );
  return (
    <div className="relative">
      <ol ref={ref} onScroll={update} onPointerEnter={update} className={`md:cursor-grab ${className}`}>
        {children}
      </ol>
      <button type="button" aria-label="이전 상품" onClick={() => move(-1)} disabled={edge.start} className={`${btn} left-1 ${edge.start ? "invisible" : ""}`}>
        {chev("M10 3 5 8l5 5")}
      </button>
      <button type="button" aria-label="다음 상품" onClick={() => move(1)} disabled={edge.end} className={`${btn} right-1 ${edge.end ? "invisible" : ""}`}>
        {chev("M6 3l5 5-5 5")}
      </button>
      {dots && page.count > 1 && (
        <div className="mt-3 flex justify-center">
          {Array.from({ length: page.count }, (_, i) => (
            <button key={i} type="button" aria-label={`${i + 1}페이지`} aria-current={i === page.cur ? "true" : undefined} onClick={() => go(i)} className="grid size-11 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-[#3f6b4f] md:-mx-[14.5px] md:first:ml-0 md:last:mr-0">
              <span className={`size-[9px] rounded-full transition-colors ${i === page.cur ? "bg-[#245C37]" : "bg-[#C6C6C6]"}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
