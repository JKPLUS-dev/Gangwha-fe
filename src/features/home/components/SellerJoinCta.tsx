import Link from "next/link";

export function SellerJoinCta() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:py-16">
      <div className="flex flex-col gap-6 rounded-2xl bg-brand p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
        <div>
          <p className="text-sm font-semibold text-white/80">강화 생산자이신가요?</p>
          <h2 className="mt-1 text-2xl font-bold md:text-3xl">수수료 걱정 없이 내 상점을 열어보세요</h2>
          <p className="mt-2 text-base text-white/85">상품 등록부터 정산까지 강화장터가 도와드려요. (예시 문구)</p>
        </div>
        <Link href="#" className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg bg-white px-6 font-bold text-brand">입점 신청하기</Link>
      </div>
    </section>
  );
}
