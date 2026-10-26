"use client";

import { useState } from "react";

const KINDS = ["농산물", "수산물", "가공식품", "특산·공예"];

export function SellerApplyForm() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  if (done) {
    return (
      <div role="status" className="rounded-2xl bg-brand-soft p-8 text-center">
        <p aria-hidden className="text-5xl">🌾</p>
        <p className="mt-4 text-xl font-bold">입점 신청을 받았어요</p>
        <p className="mt-2 text-base text-stone-700">담당자가 영업일 기준 3일 안에 연락드릴게요. (목업이라 실제로 접수되지는 않아요)</p>
      </div>
    );
  }
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        for (const k of ["shop", "owner", "phone", "area"]) if (!String(f.get(k) ?? "").trim()) return setError("필수 항목을 모두 채워주세요.");
        if (!f.getAll("kind").length) return setError("판매할 품목을 하나 이상 골라주세요.");
        if (!f.get("agree")) return setError("개인정보 수집에 동의해 주세요.");
        setDone(true);
      }}
      className="space-y-5"
    >
      {[
        ["shop", "상호명", "text"],
        ["owner", "대표자 이름", "text"],
        ["phone", "연락처", "tel"],
        ["area", "농장·가게 위치 (강화 내 읍·면)", "text"],
        ["bizno", "사업자등록번호 (선택)", "text"],
      ].map(([id, label, type]) => (
        <div key={id}>
          <label htmlFor={id} className="mb-1 block text-base font-semibold">{label}</label>
          <input id={id} name={id} type={type} className="h-12 w-full rounded-lg border border-stone-400 px-4 text-base outline-none focus:border-brand focus:ring-2 focus:ring-brand/30" />
        </div>
      ))}
      <fieldset>
        <legend className="mb-2 text-base font-semibold">판매할 품목</legend>
        <div className="flex flex-wrap gap-2">
          {KINDS.map((k) => (
            <label key={k} className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border border-stone-300 px-4 has-[:checked]:border-brand has-[:checked]:bg-brand-soft has-[:checked]:text-brand">
              <input type="checkbox" name="kind" value={k} className="size-4 accent-[var(--color-brand)]" />{k}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="intro" className="mb-1 block text-base font-semibold">농장·가게 소개 (선택)</label>
        <textarea id="intro" name="intro" rows={4} className="w-full rounded-lg border border-stone-400 p-4 text-base outline-none focus:border-brand focus:ring-2 focus:ring-brand/30" />
      </div>
      <label className="flex min-h-11 items-center gap-3 text-base">
        <input type="checkbox" name="agree" className="size-5 accent-[var(--color-brand)]" />[필수] 입점 상담을 위한 개인정보 수집에 동의해요
      </label>
      <p role="alert" className="min-h-6 text-sm font-medium text-red-700">{error}</p>
      <button className="h-14 w-full rounded-lg bg-brand text-lg font-bold text-white hover:opacity-90">입점 신청하기</button>
    </form>
  );
}
