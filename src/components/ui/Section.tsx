import Link from "next/link";
import type { ReactNode } from "react";

type Props = { title: string; eyebrow?: string; moreHref?: string; tone?: "white" | "stone" | "brand"; children: ReactNode };

const TONES = { white: "bg-white", stone: "bg-stone-50", brand: "bg-brand-soft" };

export function Section({ title, eyebrow, moreHref, tone = "white", children }: Props) {
  return (
    <section className={TONES[tone]}>
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:py-16">
        <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
          <div>
            {eyebrow && <p className="mb-1 text-sm font-semibold text-brand">{eyebrow}</p>}
            <h2 className="text-2xl font-bold text-stone-900 md:text-3xl">{title}</h2>
          </div>
          {moreHref && (
            <Link href={moreHref} className="inline-flex h-11 shrink-0 items-center text-base text-stone-600 hover:text-stone-900">
              전체보기 →
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
