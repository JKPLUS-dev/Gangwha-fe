"use client";

import { useRef, useState, type ReactNode } from "react";

// 가로 상품 줄 + PC 전용 좌우 화살표(피그마 right 화살표 에셋, 왼쪽은 좌우 반전)
export function ScrollRow({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 24, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 24 });
  };
  const move = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth, behavior: "smooth" });

  const btn = "absolute top-[35%] z-20 hidden h-[51px] w-[72px] -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3412] md:flex";
  return (
    <div className="relative">
      <ol ref={ref} onScroll={update} onPointerEnter={update} className={className}>{children}</ol>
      <button type="button" aria-label="이전 상품" onClick={() => move(-1)} disabled={edge.start} className={`${btn} -left-10 ${edge.start ? "invisible" : ""}`}>
        <img src="/images/main/arrow-right.svg" alt="" width={71} height={51} className="-scale-x-100" />
      </button>
      <button type="button" aria-label="다음 상품" onClick={() => move(1)} disabled={edge.end} className={`${btn} -right-10 ${edge.end ? "invisible" : ""}`}>
        <img src="/images/main/arrow-right.svg" alt="" width={71} height={51} />
      </button>
    </div>
  );
}
