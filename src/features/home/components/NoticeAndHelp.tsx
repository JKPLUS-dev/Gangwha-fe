import Link from "next/link";

// 공지는 목업이에요. 게시판 API가 생기면 교체.
const NOTICES = [
  { title: "11월 김장철 배송 일정 안내", date: "2026-10-20" },
  { title: "강화장터 1차 입점 업체 150곳 오픈", date: "2026-10-15" },
  { title: "냉장 상품 금요일 출고 중단 안내", date: "2026-10-10" },
];

export function NoticeAndHelp() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-12 md:grid-cols-2 md:pb-16">
      <div className="rounded-2xl border border-stone-200 p-6">
        <h2 className="text-xl font-bold">공지사항</h2>
        <ul className="mt-3 divide-y divide-stone-100">
          {NOTICES.map((n) => (
            <li key={n.title}>
              <Link href="#" className="flex min-h-11 items-center justify-between gap-4 text-base hover:text-brand">
                <span className="line-clamp-1">{n.title}</span>
                <span className="shrink-0 text-sm text-stone-500">{n.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl bg-stone-50 p-6">
        <h2 className="text-xl font-bold">고객센터</h2>
        <p className="mt-3 text-3xl font-bold text-stone-900">1588-0000</p>
        <p className="mt-1 text-base text-stone-600">평일 09:00–18:00 · 주말·공휴일 휴무 (예시)</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link href="#" className="inline-flex h-12 items-center justify-center rounded-lg border border-stone-300 bg-white font-semibold">자주 묻는 질문</Link>
          <Link href="#" className="inline-flex h-12 items-center justify-center rounded-lg border border-stone-300 bg-white font-semibold">1:1 문의</Link>
        </div>
      </div>
    </section>
  );
}
