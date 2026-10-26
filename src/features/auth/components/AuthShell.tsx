import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

// 사진과 폼을 한 장의 카드로 붙여 화면 가운데에 둬요. 모바일은 사진이 위로 가요.
export function AuthShell({ title, desc, children }: { title: string; desc: string; children: ReactNode }) {
  return (
    <main className="bg-stone-100 px-4 py-8 md:py-14">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-stone-200 md:grid-cols-[1fr_28rem]">
        <section className="relative h-52 md:h-auto md:min-h-[40rem]">
          <Image src="/images/paddy.webp" alt="" fill priority sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10 md:bg-gradient-to-b md:from-black/65 md:via-black/10 md:to-black/50" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white md:bottom-auto md:top-0 md:p-10">
            <Link href="/" className="inline-flex h-11 items-center text-xl font-extrabold">강화장터</Link>
            <p className="mt-2 text-2xl font-extrabold leading-snug md:text-4xl md:leading-tight">
              강화 들녘에서<br />우리 집 식탁까지
            </p>
            <p className="mt-3 hidden text-base text-white/90 md:block">농부와 어부가 직접 보내는 강화 특산품 장터</p>
          </div>
          <ul className="absolute inset-x-0 bottom-0 hidden gap-2 p-10 md:flex">
            {["산지직송", "강화 특산품만", "생산자 실명"].map((t) => (
              <li key={t} className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur">{t}</li>
            ))}
          </ul>
        </section>
        <section className="p-6 md:p-10">
          <h1 className="text-2xl font-extrabold text-stone-900 md:text-3xl">{title}</h1>
          <p className="mb-8 mt-2 text-base text-stone-600">{desc}</p>
          {children}
        </section>
      </div>
    </main>
  );
}
