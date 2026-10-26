export type Notice = { id: string; title: string; body: string; createdAt: string };
export type Faq = { q: string; a: string };

export const NOTICES: Notice[] = [
  { id: "n1", title: "강화장터 오픈 안내", body: "강화 특산품만 모은 장터가 문을 열었어요.", createdAt: "2026-10-20" },
  { id: "n2", title: "냉장·냉동 상품 출고 요일 안내", body: "냉장·냉동 상품은 월~목요일에만 출고해요.", createdAt: "2026-10-18" },
  { id: "n3", title: "추석 선물세트 배송 마감", body: "명절 선물세트 주문은 배송 마감일을 확인해 주세요.", createdAt: "2026-09-25" },
];

export const FAQS: Faq[] = [
  { q: "배송은 얼마나 걸려요?", a: "산지에서 바로 보내서 보통 출고 후 1~2일이면 도착해요." },
  { q: "무료배송 기준이 있나요?", a: "판매자마다 달라요. 상품 상세의 배송 정보를 확인해 주세요." },
  { q: "도서산간 지역도 배송되나요?", a: "되지만 추가 배송비가 붙을 수 있어요." },
  { q: "입점하려면 어떻게 하나요?", a: "입점 신청 페이지에서 사업자 정보를 남겨주시면 연락드려요." },
];

export const SUPPORT_CONTACT = { phone: "032-000-0000", hours: "평일 09:00~18:00 (점심 12:00~13:00)" };

export async function getNotices() {
  return NOTICES;
}

export async function getFaqs() {
  return FAQS;
}
