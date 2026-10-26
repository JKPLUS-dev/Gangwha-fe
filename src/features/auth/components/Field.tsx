"use client";

import { useState, type InputHTMLAttributes } from "react";

const ICONS = {
  mail: <path d="M3 6h18v12H3zM3 7l9 6 9-6" />,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20a8 8 0 0 1 16 0" /></>,
  phone: <rect x="7" y="3" width="10" height="18" rx="2" />,
};

type Props = InputHTMLAttributes<HTMLInputElement> & { id: string; label: string; icon: keyof typeof ICONS; hint?: string };

export function Field({ id, label, icon, hint, type = "text", ...rest }: Props) {
  const [show, setShow] = useState(false);
  const isPw = type === "password";
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-base font-semibold text-stone-800">{label}</label>
      <div className="relative">
        <svg aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 fill-none stroke-stone-500 stroke-2">{ICONS[icon]}</svg>
        <input
          id={id}
          name={id}
          type={isPw && show ? "text" : type}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`h-14 w-full rounded-xl border border-stone-300 bg-stone-50 pl-12 text-base outline-none transition placeholder:text-stone-500 focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15 ${isPw ? "pr-20" : "pr-4"}`}
          {...rest}
        />
        {isPw && (
          <button type="button" onClick={() => setShow((s) => !s)} aria-pressed={show} className="absolute right-1.5 top-1/2 h-11 min-w-14 -translate-y-1/2 rounded-lg px-3 text-sm font-semibold text-stone-600 hover:bg-stone-100">
            {show ? "숨기기" : "보기"}
          </button>
        )}
      </div>
      {hint && <p id={`${id}-hint`} className="mt-1 text-sm text-stone-600">{hint}</p>}
    </div>
  );
}
