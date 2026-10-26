"use client";

import { useId, useState, type ReactNode } from "react";
import { useDragScroll } from "@/lib/useDragScroll";

export type CategoryTabItem = { key: string; label: string; icon: string; ring: string | null; panel: ReactNode };

// 피그마 BEST_CATEGORY: 베이지 바 위 60px 흰 아이콘 타일, 선택 시 주황 테두리
export function CategoryTabSwitcher({ tabs }: { tabs: CategoryTabItem[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const ref = useDragScroll<HTMLDivElement>();
  return (
    <>
      <div ref={ref} role="tablist" aria-label="카테고리" className="flex gap-2 overflow-x-auto scroll-subtle md:cursor-grab rounded-t-2xl bg-[#f6ebdb] px-4 py-4 md:justify-between md:gap-0 md:px-6">
        {tabs.map((t, i) => {
          const on = active === i;
          return (
            <button key={t.key} type="button" role="tab" id={`${id}-t${i}`} aria-selected={on} aria-controls={`${id}-p${i}`} onClick={() => setActive(i)}
              className="flex min-w-[72px] shrink-0 flex-col items-center gap-2 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3412]">
              <span className={`grid size-[60px] place-items-center rounded-[15px] bg-white ${on ? "border-[2.5px] border-[#ff9700]" : "border-[2.5px] border-transparent"}`}>
                <span className="relative grid size-11 place-items-center rounded-full bg-[#FF9700]">
                  {t.ring && <img src={t.ring} alt="" width={78} height={78} className="absolute inset-0 size-full" />}
                  <img src={t.icon} alt="" width={56} height={56} className="relative size-7" />
                </span>
              </span>
              <span className={`text-[15px] font-semibold ${on ? "text-[#9a3412]" : "text-[#585858]"}`}>{t.label}</span>
            </button>
          );
        })}
      </div>
      {tabs.map((t, i) => (
        <div key={t.key} role="tabpanel" id={`${id}-p${i}`} aria-labelledby={`${id}-t${i}`} hidden={active !== i} className="px-4 py-6 md:px-6 md:py-8">{t.panel}</div>
      ))}
    </>
  );
}
