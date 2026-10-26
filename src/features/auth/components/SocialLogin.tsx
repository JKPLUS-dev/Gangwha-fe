"use client";

import { useState } from "react";

export function SocialLogin({ verb = "로그인" }: { verb?: string }) {
  const [msg, setMsg] = useState("");
  return (
    <div>
      <div className="my-6 flex items-center gap-3 text-sm text-stone-600">
        <span className="h-px flex-1 bg-stone-200" />간편 {verb}<span className="h-px flex-1 bg-stone-200" />
      </div>
      <div className="grid gap-3">
        <button type="button" onClick={() => setMsg("카카오 연동은 서버가 붙으면 열려요.")} className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#FEE500] text-base font-bold text-[#191919] hover:brightness-95">
          <span aria-hidden className="grid size-6 place-items-center rounded-full bg-[#191919] text-xs text-[#FEE500]">K</span>카카오로 {verb}
        </button>
        <button type="button" onClick={() => setMsg("네이버 연동은 서버가 붙으면 열려요.")} className="flex h-14 items-center justify-center gap-2 rounded-xl bg-[#027A38] text-base font-bold text-white hover:brightness-95">
          <span aria-hidden className="grid size-6 place-items-center rounded bg-white text-xs font-black text-[#027A38]">N</span>네이버로 {verb}
        </button>
      </div>
      <p aria-live="polite" className="mt-2 min-h-5 text-center text-sm text-stone-600">{msg}</p>
    </div>
  );
}
