import { SellerApplyForm } from "@/features/seller/components/SellerApplyForm";

export const metadata = { title: "입점신청 | 강화장터" };

const PERKS = [
  { t: "강화 특산품만", d: "강화에서 기르고 만든 상품만 팔아서 손님이 믿고 찾아요." },
  { t: "산지 직송", d: "주문이 들어오면 농장과 가게에서 바로 보내요." },
  { t: "낮은 수수료", d: "입점 첫 3개월은 판매 수수료를 깎아드려요. (예시)" },
];

export default function Page() {
  return (
    <main>
      <section className="bg-brand text-white">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <p className="text-sm font-semibold text-white/80">강화장터 판매자 모집</p>
          <h1 className="mt-1 text-3xl font-extrabold md:text-4xl">강화의 맛을 전국에 보내세요</h1>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {PERKS.map((p) => (
              <li key={p.t} className="rounded-xl bg-white/10 p-5">
                <p className="text-lg font-bold">{p.t}</p>
                <p className="mt-1 text-base text-white/85">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="mx-auto max-w-xl px-4 py-10">
        <h2 className="mb-6 text-xl font-bold">신청서 작성</h2>
        <SellerApplyForm />
      </div>
    </main>
  );
}
