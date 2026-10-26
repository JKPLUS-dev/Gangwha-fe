"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "../session";
import { Field } from "./Field";
import { SocialLogin } from "./SocialLogin";

export function LoginForm() {
  const login = useSession((s) => s.login);
  const router = useRouter();
  const [error, setError] = useState("");
  return (
    <>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          const email = String(f.get("email") ?? "").trim();
          if (!/^\S+@\S+\.\S+$/.test(email) || !f.get("password")) return setError("이메일과 비밀번호를 확인해 주세요.");
          login(email);
          router.push("/my");
        }}
        className="space-y-4"
      >
        <Field id="email" label="이메일" icon="mail" type="email" autoComplete="email" placeholder="example@email.com" />
        <Field id="password" label="비밀번호" icon="lock" type="password" autoComplete="current-password" placeholder="비밀번호 입력" />
        <div className="flex items-center justify-between">
          <label className="flex min-h-11 items-center gap-2 text-base text-stone-700">
            <input type="checkbox" name="keep" className="size-5 accent-[var(--color-brand)]" />로그인 상태 유지
          </label>
          <Link href="/help" className="inline-flex h-11 items-center text-base text-stone-600 hover:text-stone-900">비밀번호 찾기</Link>
        </div>
        <p role="alert" className="min-h-6 text-sm font-medium text-red-700">{error}</p>
        <button className="h-14 w-full rounded-xl bg-brand text-lg font-bold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 hover:shadow-xl">로그인</button>
      </form>
      <SocialLogin />
      <p className="text-center text-base text-stone-600">
        처음 오셨나요? <Link href="/signup" className="inline-flex h-11 min-w-11 items-center justify-center px-2 font-bold text-brand hover:underline">회원가입</Link>
      </p>
    </>
  );
}
