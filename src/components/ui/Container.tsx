import type { ElementType, ReactNode } from "react";

// 헤더와 같은 가로 기준선(max-w-7xl + px-4). 모든 메인 섹션 안쪽은 이걸로 맞춰요.
export const CONTAINER = "mx-auto w-full max-w-7xl px-4";

export function Container({ as: Tag = "div", className = "", children }: { as?: ElementType; className?: string; children: ReactNode }) {
  return <Tag className={`${CONTAINER} ${className}`}>{children}</Tag>;
}
