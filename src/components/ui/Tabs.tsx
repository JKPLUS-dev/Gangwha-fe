"use client";

import { useId, useState, type ReactNode } from "react";

// 서버에서 렌더한 패널을 받아 탭으로 전환만 해요. 데이터 조회는 서버에서.
export function Tabs({ label, tabs, variant = "pill" }: { label: string; tabs: { label: string; panel: ReactNode }[]; variant?: "pill" | "chip" }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const base = variant === "pill" ? "rounded-full px-5" : "rounded-lg px-4";
  return (
    <>
      <div role="tablist" aria-label={label} className={`mb-6 flex gap-2 ${variant === "pill" ? "overflow-x-auto scroll-subtle" : "flex-wrap"}`}>
        {tabs.map((t, i) => (
          <button key={t.label} role="tab" id={`${id}-t${i}`} aria-selected={active === i} aria-controls={`${id}-p${i}`} onClick={() => setActive(i)}
            className={`h-11 shrink-0 border text-base font-medium transition ${base} ${active === i ? "border-brand bg-brand text-white" : "border-stone-300 bg-white text-stone-700 hover:border-brand"}`}>
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.label} role="tabpanel" id={`${id}-p${i}`} aria-labelledby={`${id}-t${i}`} hidden={active !== i}>{t.panel}</div>
      ))}
    </>
  );
}
