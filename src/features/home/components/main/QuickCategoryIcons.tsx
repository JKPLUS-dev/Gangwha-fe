import { CONTAINER } from "@/components/ui/Container";
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

// 피그마 799:410 메인 바로가기 7개: 색 원 + 흰 라인 아이콘 + 라벨
const MAIN_QUICK = [
  { label: "인기 상품", href: "/search?sort=best", bg: "#ff0000", icon: "/images/main/ic-fire.svg" },
  { label: "강화 특산물", href: "/search?q=" + encodeURIComponent("강화"), bg: "#ffd400", icon: "/images/main/ic-ticket.svg" },
  { label: "수산물·축산물", href: "/search?q=" + encodeURIComponent("수산"), bg: "#00d0ff", icon: "/images/main/ic-shrimp.svg" },
  { label: "기획전", href: "/#exh-title", bg: "#ff0084", icon: "/images/main/ic-calendar.svg" },
  { label: "농부 상점", href: "/sellers", bg: "#636363", icon: "/images/main/ic-cloud.svg" },
  { label: "축제·행사", href: "/search?q=" + encodeURIComponent("축제"), bg: "#0800ff", icon: "/images/main/ic-party.svg" },
  { label: "쿠폰·혜택", href: "/search?q=" + encodeURIComponent("쿠폰"), bg: "#00c000", icon: "/images/main/ic-discount.svg" },
];

export function QuickCategoryIcons(_: { items?: QuickCategory[] }) {
  return (
    <nav aria-label="바로가기 메뉴" className="bg-white">
      <ul className={`${CONTAINER} grid grid-cols-4 gap-y-6 py-8 md:grid-cols-7 md:py-10`}>
        {MAIN_QUICK.map((c) => (
          <li key={c.label}>
            <Link href={c.href} className="group flex min-h-11 flex-col items-center gap-3 rounded-xl text-center focus-visible:outline-2 focus-visible:outline-brand">
              <span className="grid size-16 place-items-center rounded-full transition group-hover:scale-105 md:size-[78px]" style={{ backgroundColor: c.bg }}>
                <img src={c.icon} alt="" width={56} height={56} className="size-9 md:size-11" />
              </span>
              <span className="text-sm font-medium text-[#222222] md:text-[15px]">{c.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
