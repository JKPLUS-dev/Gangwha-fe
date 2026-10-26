"use client";

import Link from "next/link";
import { useRef } from "react";
import { useSession } from "@/features/auth/session";
import { useHydrated } from "@/lib/useHydrated";

export type MenuCategory = { slug: string; label: string; q: string };

const EXTRA = [
  { label: "기획전", href: "/deals" },
  { label: "타임특가", href: "/deals#timedeal" },
  { label: "농부 상점", href: "/sellers/s1" },
  { label: "고객센터", href: "/help" },
];

// 전체 메뉴 서랍. 네이티브 <dialog>라 Esc로 닫히고 포커스가 안에 갇혀요. 바깥(배경) 클릭도 닫혀요.
export function HamburgerMenu({ categories }: { categories: MenuCategory[] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const hydrated = useHydrated();
  const member = useSession((s) => s.member);
  const loggedIn = hydrated && !!member;
  const close = () => ref.current?.close();
  const link = "flex min-h-11 items-center rounded-lg px-3 text-base text-stone-800 hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand";

  return (
    <>
      <button type="button" aria-label="전체 메뉴 열기" aria-haspopup="dialog" onClick={() => ref.current?.showModal()}
        className="grid size-11 shrink-0 place-items-center rounded-lg text-stone-800 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-brand">
        <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <dialog ref={ref} aria-label="전체 메뉴" onClick={(e) => { if (e.target === ref.current) close(); }}
        className="drawer-left fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-[min(20rem,85vw)] max-w-none bg-white p-0 shadow-xl backdrop:bg-black/40">
        <div className="flex h-full flex-col overflow-y-auto p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-lg font-bold text-stone-900">전체 메뉴</p>
            <button type="button" onClick={close} aria-label="메뉴 닫기" className="grid size-11 place-items-center rounded-lg text-2xl text-stone-700 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-brand">×</button>
          </div>
          <p className="mt-2 px-3 text-sm font-semibold text-brand">카테고리</p>
          <ul className="mt-1 grid grid-cols-2 gap-1">
            {categories.map((c) => (
              <li key={c.slug}><Link href={`/search?q=${encodeURIComponent(c.q)}`} onClick={close} className={link}>{c.label}</Link></li>
            ))}
          </ul>
          <hr className="my-3 border-stone-200" />
          <ul className="grid gap-1">
            {EXTRA.map((m) => <li key={m.label}><Link href={m.href} onClick={close} className={link}>{m.label}</Link></li>)}
            <li><Link href={loggedIn ? "/my" : "/login"} onClick={close} className={`${link} font-semibold`}>{loggedIn ? "마이페이지" : "로그인"}</Link></li>
          </ul>
        </div>
      </dialog>
    </>
  );
}
