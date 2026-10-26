import Image from "next/image";
import Link from "next/link";
import { getCategoryTabs } from "@/features/product/api";
import { HamburgerMenu } from "./HamburgerMenu";
import { StickyHeader } from "./StickyHeader";
import { UserLink } from "./UserLink";
import { MobileSearch } from "./MobileSearch";

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
      <div className="relative mx-auto flex max-w-7xl items-center gap-2 px-4 py-2 md:py-3 md:gap-6 md:py-4 group-data-[compact=true]:py-2">
        <HamburgerMenu categories={categories} />
        <Link href="/" className="inline-flex h-11 shrink-0 items-center md:h-14">
          <Image src="/images/logo-full.png" alt="강화도몰" width={2083} height={755} priority sizes="160px" className="hidden h-14 w-auto md:block group-data-[compact=true]:h-10" />
          <Image src="/images/logo-symbol.png" alt="강화도몰" width={755} height={755} priority sizes="44px" className="size-11 md:hidden" />
        </Link>
        <div className="flex-1 md:hidden" />
        <form role="search" className="hidden min-w-0 flex-1 md:flex" action="/search">
          <label htmlFor="q" className="sr-only">상품 검색</label>
          <input id="q" name="q" placeholder="순무, 새우젓, 강화섬쌀…" className="h-11 w-full min-w-0 rounded-l-lg border-2 border-r-0 border-brand px-3 md:px-4 text-base outline-none md:h-12" />
          <button className="h-11 shrink-0 rounded-r-lg bg-brand px-4 font-semibold md:px-5 text-white md:h-12">검색</button>
        </form>
        <nav aria-label="내 메뉴" className="hidden gap-4 text-sm md:flex">
          <Link href="/wishlist" className="inline-flex h-11 items-center">찜</Link><Link href="/cart" className="inline-flex h-11 items-center">장바구니</Link>
        </nav>
        <MobileSearch />
        <UserLink />
      </div>
      <nav aria-label="카테고리" className="mx-auto max-w-7xl overflow-x-auto scroll-subtle px-4 group-data-[compact=true]:hidden">
        <ul className="flex gap-1 whitespace-nowrap">
          {NAV.map((n, i) => (
            <li key={n.label}>
              <a href={n.href} className={`inline-flex h-11 items-center px-3 text-base font-medium hover:text-brand ${i === 4 ? "md:ml-6" : ""}`}>{n.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      </StickyHeader>
    </>
  );
}
