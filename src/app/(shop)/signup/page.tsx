import { AuthShell } from "@/features/auth/components/AuthShell";
import { SignupForm } from "@/features/auth/components/SignupForm";

export const metadata = { title: "회원가입 | 강화장터" };

export default function Page() {
  return (
    <AuthShell title="강화장터 회원가입" desc="1분이면 끝나요. 첫 주문 배송비를 깎아드려요. (예시)">
      <SignupForm />
    </AuthShell>
  );
}
