import Link from "next/link";
import type { QuickCategory } from "@/features/content/data";

// 피그마 원형 아이콘 8개(색 원 + 흰 선 아이콘). 순서대로 매칭해요.
export const QUICK_ICONS = [
  { ring: "/images/main/ic-ring-1.svg", icon: "/images/main/ic-fire.svg" },
  { ring: "/images/main/ic-ring-2.svg", icon: "/images/main/ic-ticket.svg" },
  { ring: "/images/main/ic-ring-3.svg", icon: "/images/main/ic-shrimp.svg" },
  { ring: "/images/main/ic-ring-4.svg", icon: "/images/main/ic-calendar.svg" },
  { ring: "/images/main/ic-ring-5.svg", icon: "/images/main/ic-discount.svg" },
  { ring: "/images/main/ic-ring-6.svg", icon: "/images/main/ic-cloud.svg" },
  { ring: "/images/main/ic-ring-7.svg", icon: "/images/main/ic-party.svg" },
  { ring: null, icon: "/images/main/ic-gift.svg" },
];

export function QuickCategoryIcons({ items }: { items: QuickCategory[] }) {
  return (
    <nav aria-label="바로가기 카테고리" className="bg-white">
      <ul className="mx-auto grid max-w-[1000px] grid-cols-4 gap-y-6 px-4 py-8 md:grid-cols-8 md:py-10">
        {items.slice(0, 8).map((c, i) => {
          const ic = QUICK_ICONS[i % QUICK_ICONS.length];
          return (
            <li key={c.slug}>
              <Link href={`/search?q=${encodeURIComponent(c.q)}`} className="group flex min-h-11 flex-col items-center gap-2 rounded-xl text-center focus-visible:outline-2 focus-visible:outline-brand">
                <span className="relative grid size-16 place-items-center rounded-full bg-[#FF9700] transition group-hover:scale-105 md:size-[78px]">
                  {ic.ring && <img src={ic.ring} alt="" width={78} height={78} className="absolute inset-0 size-full" />}
                  <img src={ic.icon} alt="" width={56} height={56} className="relative size-10 md:size-[52px]" />
                </span>
                <span className="text-sm font-semibold text-[#474747] md:text-[15px]">{c.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
