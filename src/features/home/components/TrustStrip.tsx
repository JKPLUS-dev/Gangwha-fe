const ITEMS = [
  { title: "강화 생산자 직접 입점", desc: "강화군 13개 읍·면 150곳" },
  { title: "산지에서 바로 출고", desc: "주문 후 1~2일 안에 출고" },
  { title: "냉장·냉동 신선 배송", desc: "수산물은 아이스박스 포장" },
  { title: "원산지 확인", desc: "상품마다 읍·면 단위 표기" },
];

export function TrustStrip() {
  return (
    <section aria-label="강화장터 약속" className="mx-auto w-full max-w-7xl px-4 pt-6">
      <ul className="grid grid-cols-2 gap-3 rounded-2xl border border-stone-200 p-4 md:grid-cols-4 md:p-6">
        {ITEMS.map((item, i) => (
          <li key={item.title} className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand">{i + 1}</span>
            <div>
              <p className="text-base font-semibold text-stone-900">{item.title}</p>
              <p className="text-sm text-stone-600">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
