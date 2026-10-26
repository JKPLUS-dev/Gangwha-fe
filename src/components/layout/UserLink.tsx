"use client";

import Link from "next/link";
import { useSession } from "@/features/auth/session";
import { useHydrated } from "@/lib/useHydrated";

// 사람 아이콘 → /my. 로그인 상태면 초록 점과 이름을 라벨에 넣어요.
export function UserLink() {
  const hydrated = useHydrated();
  const member = useSession((s) => s.member);
  const on = hydrated && !!member;
  return (
    <Link href="/my" aria-label={on ? `마이페이지 (${member!.name}님)` : "마이페이지 (로그인 필요)"}
      className="relative grid size-11 shrink-0 place-items-center rounded-lg text-stone-800 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-brand">
      <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
      {on && <span aria-hidden className="absolute right-2 top-2 size-2.5 rounded-full bg-brand ring-2 ring-white" />}
    </Link>
  );
}
