"use client";

import { useRouter } from "next/navigation";
import { useSession } from "../session";

export function LogoutButton() {
  const logout = useSession((s) => s.logout);
  const router = useRouter();
  return (
    <button type="button" onClick={() => { logout(); router.push("/"); }} className="h-11 rounded-lg border border-white/40 px-4 text-base font-semibold text-white hover:bg-white/10">
      로그아웃
    </button>
  );
}
