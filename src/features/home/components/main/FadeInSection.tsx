"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const RM = "(prefers-reduced-motion: reduce)";
const subRM = (cb: () => void) => {
  const m = window.matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const getRM = () => window.matchMedia(RM).matches;
const getRMServer = () => true;

/** 스크롤 진입 시 살짝 페이드업. prefers-reduced-motion이면 바로 표시. */
export function FadeInSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSyncExternalStore(subRM, getRM, getRMServer);
  const [shown, setShown] = useState(false);
  const visible = reduced || shown;

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      className={`${className} transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
