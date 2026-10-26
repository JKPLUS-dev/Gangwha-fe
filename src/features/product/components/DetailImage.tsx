"use client";

import Image from "next/image";
import { useState } from "react";

// 세로로 아주 긴 상세 이미지라 처음엔 일부만 보여주고 펼쳐요.
export function DetailImage({ src, width, height, alt }: { src: string; width: number; height: number; alt: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative mx-auto w-full max-w-[860px]">
      <div id="detail-body" className={open ? "" : "max-h-[1200px] overflow-hidden"}>
        <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 860px) 860px, 100vw" className="h-auto w-full" />
      </div>
      {!open && <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-16 h-40 bg-gradient-to-t from-white to-transparent" />}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="detail-body"
        onClick={() => setOpen((o) => !o)}
        className="mt-4 h-14 w-full rounded-lg border-2 border-brand text-lg font-bold text-brand hover:bg-brand-soft"
      >
        {open ? "상세정보 접기 ⌃" : "상세정보 더보기 ⌄"}
      </button>
    </div>
  );
}
