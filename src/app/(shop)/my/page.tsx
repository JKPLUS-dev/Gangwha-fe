import Link from "next/link";
import { getMember, getOrders } from "@/features/account/api";
import { ORDER_STATUS_LABEL } from "@/features/account/types";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

export const metadata = { title: "마이 | 강화장터" };

const MENU = [
  { icon: "📦", label: "주문·배송 조회", href: "/my/orders" },
  { icon: "♡", label: "찜한 상품", href: "/wishlist" },
  { icon: "🧺", label: "장바구니", href: "/cart" },
  { icon: "💬", label: "고객센터", href: "/help" },
  { icon: "🏡", label: "입점 신청", href: "/seller/apply" },
];

export default async function Page() {
  const [member, orders] = await Promise.all([getMember(), getOrders()]);
  const count = (s: keyof typeof ORDER_STATUS_LABEL) => orders.filter((o) => o.status === s).length;
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="sr-only">마이</h1>
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand p-6 text-white md:p-8">
        <div>
          <p className="text-sm font-semibold text-white/80">{member.grade}</p>
          <p className="mt-1 text-2xl font-bold">{member.name}, 반가워요</p>
          <p className="mt-1 text-base text-white/80">{member.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-right"><span className="block text-sm text-white/80">적립금</span><span className="text-2xl font-bold">{member.point.toLocaleString("ko-KR")}P</span></p>
          <LogoutButton />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">주문 현황</h2>
          <Link href="/my/orders" className="inline-flex h-11 items-center text-base text-stone-600 hover:text-stone-900">전체보기 →</Link>
        </div>
        <ol className="grid grid-cols-4 rounded-2xl border border-stone-200 text-center">
          {(["paid", "preparing", "shipping", "delivered"] as const).map((s) => (
            <li key={s} className="border-r border-stone-200 py-5 last:border-r-0">
              <p className="text-2xl font-bold text-stone-900">{count(s)}</p>
              <p className="mt-1 text-sm text-stone-600">{ORDER_STATUS_LABEL[s]}</p>
            </li>
          ))}
        </ol>
      </section>

      <nav aria-label="마이 메뉴" className="mt-8">
        <ul className="divide-y divide-stone-200 rounded-2xl border border-stone-200">
          {MENU.map((m) => (
            <li key={m.href}>
              <Link href={m.href} className="flex h-14 items-center gap-3 px-5 text-base font-medium hover:bg-stone-50">
                <span aria-hidden className="w-6 text-center">{m.icon}</span>{m.label}<span aria-hidden className="ml-auto text-stone-500">›</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
