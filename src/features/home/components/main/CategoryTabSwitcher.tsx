"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { useDragScroll } from "@/lib/useDragScroll";

export type CategoryTabItem = { key: string; label: string; icon: { src: string; w: number; h: number }; panel: ReactNode };

// 피그마 788:1323 카테고리_아이콘: 베이지(#f6ebdb) 바 위 60px 흰 타일 + 40px 주황 아이콘, 선택 시 주황 테두리.
// 바 오른쪽 흰 원 화살표는 탭이 넘칠 때만 보여요.
export function CategoryTabSwitcher({ tabs }: { tabs: CategoryTabItem[] }) {
  const [active, setActive] = useState(0);
  const [more, setMore] = useState(false);
  const id = useId();
  const ref = useDragScroll<HTMLDivElement>();

  // 크기 관찰 구독만 effect에서. setState는 관찰 콜백 안에서만 해요.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 8));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  const onScroll = () => {
    const el = ref.current;
    if (el) setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  return (
    <>
      <div className="relative rounded-2xl bg-[#f6ebdb]">
        <div ref={ref} role="tablist" aria-label="카테고리" onScroll={onScroll}
          className="flex gap-3 overflow-x-auto scroll-subtle px-4 pb-3 pt-4 md:justify-around md:gap-2 md:px-8 md:pt-5">
          {tabs.map((t, i) => {
            const on = active === i;
            return (
              <button key={t.key} type="button" role="tab" id={`${id}-t${i}`} aria-selected={on} aria-controls={`${id}-p${i}`} onClick={() => setActive(i)}
                className="flex w-[72px] shrink-0 flex-col items-center gap-[19px] rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3412] md:w-[88px]">
                <span className={`grid size-[60px] place-items-center rounded-[15px] border-2 bg-white ${on ? "border-[#ff9700]" : "border-transparent"}`}>
                  <img src={t.icon.src} alt="" width={t.icon.w} height={t.icon.h} draggable={false} />
                </span>
                <span className={`min-h-9 text-center text-[15px] font-semibold leading-tight ${on ? "text-[#9a3412]" : "text-[#585858]"}`}>{t.label}</span>
              </button>
            );
          })}
        </div>
        {more && (
          <button type="button" aria-label="카테고리 더 보기" onClick={() => ref.current?.scrollBy({ left: ref.current.clientWidth * 0.8, behavior: "smooth" })}
            className="absolute right-2 top-[46px] hidden size-11 -translate-y-1/2 place-items-center rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] focus-visible:outline-2 focus-visible:outline-[#9a3412] md:grid">
            <img src="/images/main/cat/tab-next.svg" alt="" width={71.49} height={47} className="h-[30px] w-auto -scale-x-100" />
          </button>
        )}
      </div>
      {tabs.map((t, i) => (
        <div key={t.key} role="tabpanel" id={`${id}-p${i}`} aria-labelledby={`${id}-t${i}`} hidden={active !== i} className="px-4 pb-6 pt-8 md:px-6 md:pb-8 md:pt-[52px]">{t.panel}</div>
      ))}
    </>
  );
}
