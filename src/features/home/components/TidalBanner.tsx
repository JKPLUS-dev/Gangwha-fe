import Image from "next/image";
import Link from "next/link";

export function TidalBanner() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image src="/images/scenery2.webp" alt="강화 해안 갯벌" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 to-black/20" />
      <div className="mx-auto max-w-7xl px-4 py-16 text-white md:py-24">
        <p className="text-sm font-semibold text-white/85">세계 5대 갯벌</p>
        <h2 className="mt-2 max-w-lg text-3xl font-bold leading-snug md:text-4xl">강화 갯벌과 해풍이<br />맛을 만들어요</h2>
        <p className="mt-3 max-w-md text-base text-white/85">바닷바람 맞고 자란 순무, 갯벌 옆 논에서 거둔 섬쌀, 외포항 새우젓까지. 강화에서만 나는 맛을 모았어요.</p>
        <Link href="/products?category=seafood" className="mt-6 inline-flex h-12 items-center rounded-lg bg-white px-6 font-bold text-brand">갯벌 수산물 보기</Link>
      </div>
    </section>
  );
}
