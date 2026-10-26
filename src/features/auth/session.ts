"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Member } from "@/features/account/types";
import { MEMBER } from "@/features/account/data/mock";

// 목 로그인: 아무 이메일·비밀번호나 통과해요. 인증 서버 붙으면 login 본문만 바꿔요.
type SessionState = { member: Member | null; login: (email: string) => void; logout: () => void };

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      member: null,
      login: (email) => set({ member: { ...MEMBER, email } }),
      logout: () => set({ member: null }),
    }),
    { name: "gangwha-session" },
  ),
);
