import Image from "next/image";
import Link from "next/link";
import { getCategoryTabs } from "@/features/product/api";
import { HamburgerMenu } from "./HamburgerMenu";
import { StickyHeader } from "./StickyHeader";
import { UserLink } from "./UserLink";
import { MobileSearch } from "./MobileSearch";
import { CartLink } from "./CartLink";
import { DragScroll } from "@/components/ui/DragScroll";

const NAV = [
  { label: "농산물", href: "/products?category=agri" },
  { label: "수산물", href: "/products?category=seafood" },
  { label: "가공식품", href: "/products?category=processed" },
  { label: "특산·공예", href: "/products?category=craft" },
  { label: "기획전", href: "/products?q=%EC%88%9C%EB%AC%B4" },
  { label: "BEST", href: "/products?sort=best" },
  { label: "신상품", href: "/products?sort=new" },
];
const UTIL = [
  { label: "로그인", href: "/login" },
  { label: "회원가입", href: "/signup" },
  { label: "주문조회", href: "/my/orders" },
  { label: "고객센터", href: "/help" },
  { label: "입점신청", href: "/seller/apply" },
];

export async function Header() {
  const categories = await getCategoryTabs();
  return (
    <>
      <div className="hidden border-b border-stone-100 bg-white md:block">
        <ul className="mx-auto flex max-w-7xl justify-end gap-5 px-4 py-2 text-sm text-stone-600">
          {UTIL.map((u) => <li key={u.label}><Link href={u.href} className="hover:text-stone-900">{u.label}</Link></li>)}
        </ul>
      </div>
      <StickyHeader>
      <div className="relative mx-auto flex max-w-7xl items-center gap-2 px-4 py-2 md:gap-6 md:py-4 md:group-data-[compact=true]:py-2">
        <Link href="/" className="inline-flex h-11 shrink-0 items-center md:h-14 md:group-data-[compact=true]:h-11">
          <Image src="/images/logo-full.png" alt="강화도몰" width={2083} height={755} priority sizes="160px" className="hidden h-14 w-auto md:block group-data-[compact=true]:h-10" />
          <Image src="/images/logo-symbol.png" alt="강화도몰" width={755} height={755} priority sizes="44px" className="size-11 md:hidden" />
        </Link>
        <div className="flex-1 md:hidden" />
        {/* Figma 788:999 search: 518×54, 흰 바탕, 2px #007827 테두리, 완전 둥근 모서리, 안쪽 그림자 */}
        <form role="search" action="/search" className="relative mx-auto hidden min-w-0 flex-1 md:block lg:max-w-[520px] lg:group-data-[compact=true]:max-w-[400px]">
          <label htmlFor="q" className="sr-only">상품 검색</label>
          <input id="q" name="q" type="search" placeholder="순무, 새우젓, 강화섬쌀…"
            className="h-[54px] w-full min-w-0 rounded-full border-2 border-[#007827] bg-white pl-6 pr-14 text-base text-stone-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)] outline-none placeholder:text-stone-500 focus-visible:ring-2 focus-visible:ring-[#007827]/30 group-data-[compact=true]:h-11" />
          <button type="submit" aria-label="검색" className="absolute right-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full text-[#007827] hover:bg-[#007827]/10 focus-visible:outline-2 focus-visible:outline-[#007827]">
            <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          </button>
        </form>
        <div className="flex shrink-0 items-center gap-1">
          <MobileSearch />
          <CartLink />
          <UserLink />
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-1 px-4">
        <HamburgerMenu categories={categories} />
        <DragScroll as="div" aria-label="카테고리" role="navigation" className="min-w-0 flex-1 overflow-x-auto">
          <ul className="flex gap-1 whitespace-nowrap">
            {NAV.map((n, i) => (
              <li key={n.label}>
                <a href={n.href} draggable={false} className={`inline-flex h-11 items-center px-3 text-base font-medium hover:text-brand ${i === 4 ? "md:ml-6" : ""}`}>{n.label}</a>
              </li>
            ))}
          </ul>
        </DragScroll>
      </div>
      </StickyHeader>
    </>
  );
}
