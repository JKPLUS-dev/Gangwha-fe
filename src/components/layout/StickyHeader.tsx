"use client";

import { useSyncExternalStore, type ReactNode } from "react";

// 스크롤 감지만 클라이언트로 분리.
// 압축되면 카테고리 줄이 숨어 문서 높이와 scrollY가 바뀌어요. 그 변화가 다시 펼침을 부르지 않게
// 160px 넘으면 압축, 8px 아래로 오면 펼침(히스테리시스). 값 계산은 스크롤 핸들러에서만 하고,
// getSnapshot은 저장된 boolean만 돌려줘요(렌더 중 계산·새 객체 없음).
let compact = false;
const listeners = new Set<() => void>();

function onScroll() {
  const y = window.scrollY;
  const next = compact ? y >= 8 : y > 160;
  if (next === compact) return;
  compact = next;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  if (listeners.size === 0) window.addEventListener("scroll", onScroll, { passive: true });
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0) window.removeEventListener("scroll", onScroll);
  };
}

const getSnapshot = () => compact;
const getServerSnapshot = () => false;

export function StickyHeader({ children }: { children: ReactNode }) {
  const isCompact = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <header data-compact={isCompact} className="group sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur transition-shadow data-[compact=true]:shadow-md">
      {children}
    </header>
  );
}
