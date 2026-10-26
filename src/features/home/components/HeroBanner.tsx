import Image from "next/image";
import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-4 px-4 pt-6 md:grid-cols-3">
      <div className="relative flex min-h-96 flex-col justify-end overflow-hidden rounded-2xl p-8 text-white md:col-span-2 md:min-h-[28rem] md:p-12">
        <Image src="/images/paddy.webp" alt="마니산 아래 강화 들녘" fill priority sizes="(min-width: 768px) 66vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative">
          <p className="text-base font-medium text-white/85">11월 기획전 · 김장 준비</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight md:text-5xl">강화 들녘과 갯벌에서<br />오늘 보내드려요</h1>
          <p className="mt-3 max-w-md text-base text-white/85">강화 생산자 150곳이 직접 수확하고 포장해 산지에서 바로 출고해요.</p>
          <Link href="/products" className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-white px-6 text-base font-bold text-brand hover:bg-stone-100 md:w-fit">
            강화 특산품 둘러보기
          </Link>
        </div>
      </div>
      <div className="grid gap-4">
        <PromoCard href="/products?category=agri" image="/images/rice.webp" eyebrow="갓 도정한" title="2026 강화섬쌀 햅쌀" />
        <PromoCard href="/products?category=seafood" image="/images/shrimp.webp" eyebrow="김장철 한정" title="외포항 추젓 새우젓" />
      </div>
    </section>
  );
}

function PromoCard({ href, image, eyebrow, title }: { href: string; image: string; eyebrow: string; title: string }) {
  return (
    <Link href={href} className="group relative flex min-h-44 flex-col justify-end overflow-hidden rounded-2xl p-6 text-white">
      <Image src={image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
      <p className="relative text-sm text-white/85">{eyebrow}</p>
      <p className="relative text-xl font-bold">{title} →</p>
    </Link>
  );
}
