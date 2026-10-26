"use client";

import { useEffect, useRef } from "react";

// 마우스로 잡아끌어 가로 스크롤. 터치는 브라우저 기본 동작 그대로.
// 5px 넘게 움직이면 드래그로 보고, 손을 뗀 직후 클릭 1번은 막아서 링크가 열리지 않게 해요.
export function useDragScroll<T extends HTMLElement = HTMLElement>(threshold = 5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let id: number | null = null;
    let startX = 0;
    let startLeft = 0;
    let dragging = false;
    let suppress = false;
    let snap = "";

    const end = () => {
      if (id === null) return;
      if (el.hasPointerCapture(id)) el.releasePointerCapture(id);
      id = null;
      if (dragging) {
        suppress = true;
        el.style.cursor = "";
        el.style.userSelect = "";
        el.style.scrollSnapType = snap;
        el.style.scrollBehavior = "";
        // 클릭이 안 일어나는 경우 대비
        window.setTimeout(() => { suppress = false; }, 0);
      }
      dragging = false;
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      if (el.scrollWidth <= el.clientWidth) return;
      id = e.pointerId;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      dragging = false;
    };
    const onMove = (e: PointerEvent) => {
      if (id === null || e.pointerId !== id) return;
      const dx = e.clientX - startX;
      if (!dragging) {
        if (Math.abs(dx) < threshold) return;
        dragging = true;
        el.setPointerCapture(id);
        snap = el.style.scrollSnapType;
        el.style.scrollSnapType = "none";
        el.style.scrollBehavior = "auto";
        el.style.cursor = "grabbing";
        el.style.userSelect = "none";
      }
      el.scrollLeft = startLeft - dx;
    };
    const onClick = (e: MouseEvent) => {
      if (!suppress) return;
      suppress = false;
      e.preventDefault();
      e.stopPropagation();
    };
    const onDragStart = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement || e.target instanceof HTMLAnchorElement) e.preventDefault();
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    el.addEventListener("lostpointercapture", end);
    el.addEventListener("click", onClick, true);
    el.addEventListener("dragstart", onDragStart);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
      el.removeEventListener("lostpointercapture", end);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("dragstart", onDragStart);
    };
  }, [threshold]);

  return ref;
}
