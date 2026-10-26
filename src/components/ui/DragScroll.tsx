"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useDragScroll } from "@/lib/useDragScroll";

// 서버 컴포넌트에서 쓰는 드래그 스크롤 래퍼(ul/ol/div)
export function DragScroll({ as = "div", className = "", children, ...rest }: { as?: "div" | "ul" | "ol"; className?: string; children: ReactNode } & HTMLAttributes<HTMLElement>) {
  const ref = useDragScroll<HTMLElement>();
  const Tag = as as "div";
  return <Tag ref={ref as React.Ref<HTMLDivElement>} className={`scroll-subtle md:cursor-grab ${className}`} {...rest}>{children}</Tag>;
}
