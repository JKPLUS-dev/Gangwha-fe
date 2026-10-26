"use client";

import { useState } from "react";

// 모바일 전용: 돋보기 버튼을 누르면 헤더 아래에 검색창이 펼쳐져요. PC는 헤더 안 검색창을 그대로 써요.
export function MobileSearch() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" aria-label={open ? "검색창 닫기" : "검색창 열기"} aria-expanded={open} aria-controls="m-search" onClick={() => setOpen((v) => !v)}
        className="grid size-11 shrink-0 place-items-center rounded-lg text-stone-800 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-brand md:hidden">
        <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      </button>
      <form id="m-search" role="search" action="/search" hidden={!open} className="absolute inset-x-0 top-full border-b border-stone-200 bg-white px-4 py-2 shadow-md md:hidden">
        <div className="flex">
          <label htmlFor="mq" className="sr-only">상품 검색</label>
          <input id="mq" name="q" autoFocus placeholder="순무, 새우젓, 강화섬쌀…" className="h-11 w-full min-w-0 rounded-l-lg border-2 border-r-0 border-brand px-3 text-base outline-none" />
          <button className="h-11 shrink-0 rounded-r-lg bg-brand px-4 font-semibold text-white">검색</button>
        </div>
      </form>
    </>
  );
}
