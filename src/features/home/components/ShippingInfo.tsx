// 이용 안내 띠. 기준 금액·요일은 운영 정책 확정 전 예시예요.
const INFO = [
  { title: "무료배송", desc: "3만 원 이상 구매 시 (예시)" },
  { title: "냉장·냉동 출고", desc: "월~목 출고, 금요일 주문은 다음 주 월요일" },
  { title: "도서산간", desc: "제주·도서 지역은 추가 배송비가 있어요" },
];

export function ShippingInfo() {
  return (
    <section aria-label="배송 안내" className="border-y border-stone-200 bg-white">
      <ul className="mx-auto grid max-w-7xl gap-4 px-4 py-5 md:grid-cols-3">
        {INFO.map((i) => (
          <li key={i.title} className="text-base">
            <span className="font-bold text-brand">{i.title}</span>
            <span className="ml-2 text-stone-700">{i.desc}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
