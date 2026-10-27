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
  // 마우스 드래그: 끌면 따라오고, 놓으면 폭의 15% 넘게 끌었을 때 다음/이전, 아니면 제자리로 스냅해요.
  // (트랙이 scrollLeft가 아니라 transform이라 useDragScroll 대신 같은 규칙을 포인터 이벤트로 구현)
  const drag = useRef<{ id: number; x: number; w: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [dx, setDx] = useState(0);
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
      <div className="overflow-hidden rounded md:cursor-grab" style={{ aspectRatio: `${width} / ${height}` }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || e.button !== 0 || n < 2) return;
          drag.current = { id: e.pointerId, x: e.clientX, w: e.currentTarget.clientWidth, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || d.id !== e.pointerId) return;
          const m = e.clientX - d.x;
          if (!d.moved) {
            if (Math.abs(m) < 5) return;
            d.moved = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            setAnim(false);
          }
          setDx(m);
        }}
        onPointerUp={(e) => {
          const d = drag.current;
          drag.current = null;
          if (!d || !d.moved) return;
          if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
          suppressClick.current = true;
          window.setTimeout(() => { suppressClick.current = false; }, 0);
          const m = e.clientX - d.x;
          setDx(0);
          if (Math.abs(m) > d.w * 0.15) (m < 0 ? next : prev)();
          else setAnim(true);
        }}
        onPointerCancel={() => { drag.current = null; setDx(0); setAnim(true); }}
        onClickCapture={(e) => { if (suppressClick.current) { suppressClick.current = false; e.preventDefault(); e.stopPropagation(); } }}
        onDragStart={(e) => e.preventDefault()}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        }}>
        <ul className={`flex h-full ${animate ? "transition-transform duration-500 ease-out" : ""}`}
          style={{ transform: dx ? `translateX(calc(-${pos * 100}% + ${dx}px))` : `translateX(-${pos * 100}%)` }}
          onTransitionEnd={settle}>
          {loop.map((b, i) => {
            const hidden = i !== pos || (n > 1 && (i === 0 || i === n + 1));
            return (
              <li key={`${b.id}-${i}`} className="relative h-full w-full shrink-0" aria-hidden={hidden} inert={hidden}>
                <Link href={b.href} className="relative block h-full focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white">
                  <Image src={b.image} alt={b.title} fill sizes="(min-width:1280px) 1248px, 100vw" priority={i === 1} draggable={false} className="object-contain" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {n > 1 && (
        <>
          <button type="button" aria-label="이전 배너" onClick={prev} className="left-4 absolute top-[calc(50%-22px)] z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#F8F8F8]/80 shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16"><path d="M10 3L5 8l5 5" fill="none" stroke="#7B7B7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          <button type="button" aria-label="다음 배너" onClick={next} className="right-4 absolute top-[calc(50%-22px)] z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[#F8F8F8]/80 shadow-[0_1px_3px_rgba(0,0,0,0.15)] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16"><path d="M6 3l5 5-5 5" fill="none" stroke="#7B7B7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
          <div className="mt-1 flex justify-center">
            {banners.map((b, i) => (
              <button key={b.id} type="button" aria-label={`${i + 1}번째 배너 보기`} aria-current={i === real ? "true" : undefined} onClick={() => go(i + 1)}
                className="grid size-11 place-items-center focus-visible:outline-2 focus-visible:outline-brand">
                <span className={`block h-2 rounded-full transition-all ${i === real ? "w-6 bg-[#3f6b4f]" : "w-2 bg-stone-500"}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
