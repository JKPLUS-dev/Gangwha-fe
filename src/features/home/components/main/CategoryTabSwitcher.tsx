"use client";

import { useId, useState, type ReactNode } from "react";

export type CategoryTabItem = { key: string; label: string; icon: string; panel: ReactNode };

// 피그마 BEST_CATEGORY: 베이지 바 위 60px 흰 아이콘 타일, 선택 시 주황 테두리
export function CategoryTabSwitcher({ tabs }: { tabs: CategoryTabItem[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  return (
    <>
      <div role="tablist" aria-label="카테고리" className="flex gap-3 overflow-x-auto rounded-t-2xl bg-[#f6ebdb] px-4 py-4 md:gap-5 md:px-6">
        {tabs.map((t, i) => {
          const on = active === i;
          return (
            <button key={t.key} type="button" role="tab" id={`${id}-t${i}`} aria-selected={on} aria-controls={`${id}-p${i}`} onClick={() => setActive(i)}
              className="flex min-w-[72px] shrink-0 flex-col items-center gap-2 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9a3412]">
              <span className={`grid size-[60px] place-items-center rounded-[15px] bg-white ${on ? "border-[2.5px] border-[#ff9700]" : "border-[2.5px] border-transparent"}`}>
                <img src={t.icon} alt="" width={40} height={40} className="size-10" />
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
