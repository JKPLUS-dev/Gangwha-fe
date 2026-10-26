const STEPS = [
  { title: "주문", desc: "오후 2시 전 주문은 당일 생산자에게 전달돼요." },
  { title: "수확·포장", desc: "생산자가 그날 수확하거나 손질해서 포장해요." },
  { title: "산지 출고", desc: "강화에서 바로 출고해요. 중간 창고를 거치지 않아요." },
  { title: "도착", desc: "대부분 출고 다음 날 받아보실 수 있어요." },
];

export function HowItShips() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 md:py-16">
      <p className="mb-1 text-sm font-semibold text-brand">산지직송은 이렇게</p>
      <h2 className="mb-8 text-2xl font-bold text-stone-900 md:text-3xl">강화에서 식탁까지 하루</h2>
      <ol className="grid gap-6 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative border-t-2 border-brand pt-5">
            <span className="text-sm font-bold text-brand">STEP {i + 1}</span>
            <p className="mt-1 text-lg font-bold text-stone-900">{s.title}</p>
            <p className="mt-1 text-base text-stone-600">{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
