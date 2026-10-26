import Link from "next/link";
import type { Notice } from "@/features/support/data";

// 피그마 하단: 노란 고객센터 박스 + 공지사항 박스
export function HelpAndNotice({ notices }: { notices: Notice[] }) {
  return (
    <section aria-label="고객센터와 공지사항" className="bg-white">
      <div className="mx-auto grid max-w-[1000px] gap-6 px-4 py-12 md:grid-cols-2 md:py-16">
        <div className="rounded-2xl bg-[#ffe9a8] p-6">
          <h2 className="text-xl font-bold text-[#353535]">대표 전화안내</h2>
          <p className="mt-2 text-3xl font-extrabold text-[#9a3412]">1644-3777</p>
          <p className="mt-2 text-sm text-[#585858]">평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00) · 주말·공휴일 휴무</p>
          <div className="mt-4 flex gap-2">
            <Link href="/help" className="inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-white font-semibold text-[#474747]">Q&amp;A</Link>
            <Link href="/help" className="inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-white font-semibold text-[#474747]">자주하는 질문</Link>
          </div>
        </div>
        <div className="rounded-2xl bg-[#f4f4f4] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#353535]">공지사항</h2>
            <Link href="/help" className="inline-flex h-11 items-center text-sm text-[#474747]">더보기 &gt;</Link>
          </div>
          {notices.length ? (
            <ul className="mt-3 divide-y divide-stone-200">
              {notices.slice(0, 4).map((n) => (
                <li key={n.id}><Link href="/help" className="flex min-h-11 items-center justify-between gap-3 py-2 text-[15px] text-[#353535] hover:underline"><span className="line-clamp-1">{n.title}</span><time className="shrink-0 text-sm text-[#585858]">{n.createdAt}</time></Link></li>
              ))}
            </ul>
          ) : <p className="mt-6 text-[15px] text-[#353535]">공지사항이 없습니다.</p>}
        </div>
      </div>
    </section>
  );
}
