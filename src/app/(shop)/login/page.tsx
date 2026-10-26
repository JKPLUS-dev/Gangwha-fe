import { AuthShell } from "@/features/auth/components/AuthShell";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata = { title: "로그인 | 강화장터" };

export default function Page() {
  return (
    <AuthShell title="다시 오셨네요 👋" desc="로그인하고 강화 산지 소식을 받아보세요. 지금은 아무 이메일로나 들어갈 수 있어요.">
      <LoginForm />
    </AuthShell>
  );
}
