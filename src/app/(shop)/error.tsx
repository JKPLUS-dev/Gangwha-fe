"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto max-w-xl px-4 py-20 text-center">
      <p aria-hidden className="text-5xl">🌾</p>
      <h1 className="mt-4 text-2xl font-bold">잠시 문제가 생겼어요</h1>
      <p className="mt-2 text-base text-stone-600">잠시 뒤 다시 시도해 주세요. 계속되면 고객센터로 알려주세요.</p>
      <div className="mt-8 flex justify-center gap-3">
        <button type="button" onClick={reset} className="h-12 rounded-lg bg-brand px-6 font-bold text-white">다시 시도</button>
        <Link href="/" className="inline-flex h-12 items-center rounded-lg border border-stone-300 px-6 font-bold">홈으로</Link>
      </div>
    </main>
  );
}
