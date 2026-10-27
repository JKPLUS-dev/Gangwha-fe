"use client";

import { useCart } from "@/features/cart/store";

/** 카드 우하단 장바구니 빠른 담기. 터치 영역 44px, 보이는 원은 36px. */
export function QuickAddButton({ productId, disabled }: { productId: string; disabled?: boolean }) {
  const add = useCart((s) => s.add);
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label="장바구니 담기"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) add(productId);
      }}
      className="absolute bottom-0 right-0 z-10 grid size-11 place-items-center disabled:cursor-not-allowed disabled:opacity-40"
    >
      <span className="grid size-9 place-items-center rounded-full border border-[#e5e5e5] bg-white text-[#3f6b4f] transition-colors hover:border-[#3f6b4f]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="stroke-current">
          <path d="M6 6h15l-1.5 9h-12z" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M6 6 5 3H2" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="9" cy="20" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="18" cy="20" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      </span>
    </button>
  );
}
