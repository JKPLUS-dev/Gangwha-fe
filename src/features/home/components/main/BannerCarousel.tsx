"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Banner } from "@/features/content/data";

const RM = "(prefers-reduced-motion: reduce)";
const subRM = (cb: () => void) => {
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const getRM = () => window.matchMedia(RM).matches;
const getRMServer = () => true;

// 무한 루프 배너: 앞뒤에 복제 슬라이드를 붙이고, 복제본에 도착하면 전환 없이 진짜 위치로 순간 이동해요.
// 5초 자동재생, hover/focus 때 멈춤, 움직임 줄이기면 자동재생 끔. 비율은 이미지 원본 그대로라 글자가 잘리지 않아요.
export function BannerCarousel({ banners, label = "기획전 배너" }: { banners: Banner[]; label?: string }) {
  const n = banners.length;
  const loop = n > 1 ? [banners[n - 1], ...banners, banners[0]] : banners;
  const [pos, setPos] = useState(n > 1 ? 1 : 0);
  const [anim, setAnim] = useState(true);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subRM, getRM, getRMServer);
  const touchX = useRef<number | null>(null);
  const real = n > 1 ? (pos - 1 + n) % n : 0;

  const go = (p: number) => { setAnim(true); setPos(p); };
  const next = () => go(pos + 1);
  const prev = () => go(pos - 1);

  // 타이머 구독만 effect에서. setState는 타이머 콜백 안에서만 해요.
  useEffect(() => {
    if (n < 2 || paused || reduced) return;
    const id = setInterval(() => { setAnim(true); setPos((p) => p + 1); }, 5000);
    return () => clearInterval(id);
  }, [n, paused, reduced]);

  const settle = () => {
    if (pos >= n + 1) { setAnim(false); setPos(1); }
    else if (pos <= 0) { setAnim(false); setPos(n); }
  };

  if (!n) return null;
  const { width, height } = banners[0];
  const animate = anim && !reduced;
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="relative"
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: `${width} / ${height}` }}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        }}>
        <ul className={`flex h-full ${animate ? "transition-transform duration-500 ease-out" : ""}`}
          style={{ transform: `translateX(-${pos * 100}%)` }}
          onTransitionEnd={settle}>
          {loop.map((b, i) => {
            const hidden = i !== pos || (n > 1 && (i === 0 || i === n + 1));
            return (
              <li key={`${b.id}-${i}`} className="relative h-full w-full shrink-0" aria-hidden={hidden} inert={hidden}>
                <Link href={b.href} className="block h-full focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white">
                  <Image src={b.image} alt={b.title} fill sizes="(min-width:1280px) 1248px, 100vw" priority={i === 1} className="object-contain" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {n > 1 && (
        <>
          <button type="button" aria-label="이전 배너" onClick={prev} className="absolute left-2 top-[calc(50%-22px)] grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-2xl leading-none text-stone-800 shadow hover:bg-white focus-visible:outline-2 focus-visible:outline-brand">‹</button>
          <button type="button" aria-label="다음 배너" onClick={next} className="absolute right-2 top-[calc(50%-22px)] grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-2xl leading-none text-stone-800 shadow hover:bg-white focus-visible:outline-2 focus-visible:outline-brand">›</button>
          <div className="mt-1 flex justify-center">
            {banners.map((b, i) => (
              <button key={b.id} type="button" aria-label={`${i + 1}번째 배너 보기`} aria-current={i === real ? "true" : undefined} onClick={() => go(i + 1)}
                className="grid size-11 place-items-center focus-visible:outline-2 focus-visible:outline-brand">
                <span className={`block h-2 rounded-full transition-all ${i === real ? "w-6 bg-[#b91c1c]" : "w-2 bg-stone-500"}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
