import type { ReactNode } from "react";

export function PageHeader({ title, eyebrow, desc, children }: { title: string; eyebrow?: string; desc?: string; children?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-stone-200 pb-6">
      <div>
        {eyebrow && <p className="mb-1 text-sm font-semibold text-brand">{eyebrow}</p>}
        <h1 className="text-2xl font-bold text-stone-900 md:text-3xl">{title}</h1>
        {desc && <p className="mt-2 text-base text-stone-600">{desc}</p>}
      </div>
      {children}
    </div>
  );
}
