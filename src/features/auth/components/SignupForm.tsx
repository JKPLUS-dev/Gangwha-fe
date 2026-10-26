"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "../session";
import { Field } from "./Field";
import { SocialLogin } from "./SocialLogin";

const STEPS = ["약관 동의", "정보 입력", "가입 완료"];
const TERMS = [
  { id: "age", label: "만 14세 이상이에요", required: true },
  { id: "tos", label: "이용약관 동의", required: true },
  { id: "privacy", label: "개인정보 수집·이용 동의", required: true },
  { id: "ad", label: "특가·신상품 소식 받기", required: false },
];

function Stepper({ step }: { step: number }) {
  return (
    <ol aria-label="가입 단계" className="mb-8 flex items-center">
      {STEPS.map((s, i) => (
        <li key={s} aria-current={i === step ? "step" : undefined} className="flex flex-1 items-center last:flex-none">
          <span className="flex flex-col items-center gap-1">
            <span className={`grid size-9 place-items-center rounded-full text-sm font-bold ${i < step ? "bg-brand text-white" : i === step ? "bg-brand text-white ring-4 ring-brand/20" : "bg-stone-200 text-stone-600"}`}>{i < step ? "✓" : i + 1}</span>
            <span className={`whitespace-nowrap text-xs ${i <= step ? "font-bold text-brand" : "text-stone-600"}`}>{s}</span>
          </span>
          {i < STEPS.length - 1 && <span className={`mx-2 mb-5 h-0.5 flex-1 ${i < step ? "bg-brand" : "bg-stone-200"}`} />}
        </li>
      ))}
    </ol>
  );
}

export function SignupForm() {
  const login = useSession((s) => s.login);
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [agree, setAgree] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const all = TERMS.every((t) => agree[t.id]);
  const requiredOk = TERMS.filter((t) => t.required).every((t) => agree[t.id]);

  return (
    <>
      <Stepper step={step} />
      {step === 0 && (
        <div>
          <label className="flex min-h-14 items-center gap-3 rounded-xl border-2 border-brand/30 bg-brand-soft px-4 text-lg font-bold text-stone-900">
            <input type="checkbox" checked={all} onChange={(e) => setAgree(Object.fromEntries(TERMS.map((t) => [t.id, e.target.checked])))} className="size-6 accent-[var(--color-brand)]" />
            모두 동의해요
          </label>
          <ul className="mt-3 space-y-1 px-1">
            {TERMS.map((t) => (
              <li key={t.id} className="flex items-center justify-between">
                <label className="flex min-h-11 items-center gap-3 text-base text-stone-800">
                  <input type="checkbox" checked={!!agree[t.id]} onChange={(e) => setAgree((a) => ({ ...a, [t.id]: e.target.checked }))} className="size-5 accent-[var(--color-brand)]" />
                  <span className={t.required ? "font-semibold text-brand" : "text-stone-600"}>{t.required ? "[필수]" : "[선택]"}</span>{t.label}
                </label>
                {t.id !== "age" && <Link href="/help" className="inline-flex h-11 min-w-11 items-center justify-center px-2 text-sm text-stone-600 underline">보기</Link>}
              </li>
            ))}
          </ul>
          <button type="button" disabled={!requiredOk} onClick={() => setStep(1)} className="mt-6 h-14 w-full rounded-xl bg-brand text-lg font-bold text-white shadow-lg shadow-brand/25 disabled:bg-stone-300 disabled:text-stone-700 disabled:shadow-none">
            다음
          </button>
          <SocialLogin verb="가입" />
        </div>
      )}
      {step === 1 && (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const email = String(f.get("email") ?? "").trim();
            const pw = String(f.get("password") ?? "");
            const n = String(f.get("name") ?? "").trim();
            if (!n) return setError("이름을 입력해 주세요.");
            if (!/^\S+@\S+\.\S+$/.test(email)) return setError("이메일 형식을 확인해 주세요.");
            if (pw.length < 8) return setError("비밀번호는 8자 이상이어야 해요.");
            if (pw !== f.get("password2")) return setError("비밀번호가 서로 달라요.");
            setError("");
            setName(n);
            login(email);
            setStep(2);
          }}
          className="space-y-4"
        >
          <Field id="name" label="이름" icon="user" autoComplete="name" placeholder="홍길동" />
          <Field id="email" label="이메일" icon="mail" type="email" autoComplete="email" placeholder="example@email.com" />
          <Field id="phone" label="휴대폰 번호 (선택)" icon="phone" type="tel" autoComplete="tel" placeholder="010-0000-0000" />
          <Field id="password" label="비밀번호" icon="lock" type="password" autoComplete="new-password" hint="영문, 숫자를 섞어 8자 이상" />
          <Field id="password2" label="비밀번호 확인" icon="lock" type="password" autoComplete="new-password" />
          <p role="alert" className="min-h-6 text-sm font-medium text-red-700">{error}</p>
          <div className="grid grid-cols-[auto_1fr] gap-3">
            <button type="button" onClick={() => setStep(0)} className="h-14 rounded-xl border border-stone-300 px-6 font-bold text-stone-700">이전</button>
            <button className="h-14 rounded-xl bg-brand text-lg font-bold text-white shadow-lg shadow-brand/25">가입하기</button>
          </div>
        </form>
      )}
      {step === 2 && (
        <div role="status" className="py-4 text-center">
          <p aria-hidden className="text-6xl">🌾</p>
          <p className="mt-4 text-2xl font-extrabold">{name}님, 환영해요!</p>
          <p className="mt-2 text-base text-stone-600">가입 축하 적립금 3,000P를 드렸어요. (예시)</p>
          <div className="mt-8 grid gap-3">
            <button type="button" onClick={() => router.push("/")} className="h-14 rounded-xl bg-brand text-lg font-bold text-white">장보러 가기</button>
            <button type="button" onClick={() => router.push("/my")} className="h-14 rounded-xl border border-stone-300 font-bold">마이페이지</button>
          </div>
        </div>
      )}
      {step < 2 && (
        <p className="mt-2 text-center text-base text-stone-600">
          이미 회원이세요? <Link href="/login" className="inline-flex h-11 min-w-11 items-center justify-center px-2 font-bold text-brand hover:underline">로그인</Link>
        </p>
      )}
    </>
  );
}
