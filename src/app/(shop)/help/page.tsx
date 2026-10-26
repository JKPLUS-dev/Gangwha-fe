import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { getFaqs, getNotices, SUPPORT_CONTACT } from "@/features/support/data";

export const metadata = { title: "고객센터 | 강화장터" };

const QUICK = [
  { icon: "📦", label: "주문·배송 조회", href: "/my/orders" },
  { icon: "↩️", label: "교환·반품 안내", href: "#faq" },
  { icon: "🏡", label: "입점 신청", href: "/seller/apply" },
  { icon: "📢", label: "공지사항", href: "#notice" },
];

export default async function Page() {
  const [notices, faqs] = await Promise.all([getNotices(), getFaqs()]);
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <PageHeader title="고객센터" desc="궁금한 점은 먼저 자주 묻는 질문에서 찾아보세요." />
      <section className="grid gap-4 md:grid-cols-[1fr_16rem]">
        <ul className="grid grid-cols-2 gap-3">
          {QUICK.map((q) => (
            <li key={q.label}>
              <Link href={q.href} className="flex h-20 items-center gap-3 rounded-xl border border-stone-200 px-4 text-base font-semibold hover:border-brand">
                <span aria-hidden className="text-2xl">{q.icon}</span>{q.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="rounded-xl bg-brand-soft p-5">
          <p className="text-sm font-semibold text-brand">전화 상담</p>
          <a href={`tel:${SUPPORT_CONTACT.phone}`} className="mt-1 inline-flex h-11 items-center text-2xl font-bold text-stone-900">{SUPPORT_CONTACT.phone}</a>
          <p className="text-sm text-stone-700">{SUPPORT_CONTACT.hours}</p>
        </div>
      </section>

      <section id="faq" className="mt-12 scroll-mt-40">
        <h2 className="mb-4 text-xl font-bold">자주 묻는 질문</h2>
        <ul className="divide-y divide-stone-200 border-y border-stone-200">
          {faqs.map((f) => (
            <li key={f.q}>
              <details className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 py-3 text-base font-medium">
                  <span className="font-bold text-brand">Q</span>{f.q}<span aria-hidden className="ml-auto transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="mb-4 rounded-lg bg-stone-50 p-4 text-base text-stone-700"><span className="mr-2 font-bold">A</span>{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </section>

      <section id="notice" className="mt-12 scroll-mt-40">
        <h2 className="mb-4 text-xl font-bold">공지사항</h2>
        <ul className="divide-y divide-stone-200 border-y border-stone-200">
          {notices.map((n) => (
            <li key={n.id} className="py-4">
              <p className="flex flex-wrap items-baseline justify-between gap-2"><span className="text-base font-semibold">{n.title}</span><time className="text-sm text-stone-600">{n.createdAt}</time></p>
              <p className="mt-1 text-base text-stone-700">{n.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
