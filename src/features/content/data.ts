// 메인 콘텐츠 목데이터(피그마 UPPLUS 784-434 기준). 서버 생기면 api.ts 본문만 바꿔요.
export type QuickCategory = { slug: string; label: string; q: string };
export type Exhibition = { id: string; title: string; subtitle: string; endsAt: string; image?: string };
export type ContentCard = { id: string; title: string; summary: string; name?: string; region?: string; quote?: string; image?: string; href?: string; date?: string };

// 원형 아이콘 메뉴. 누르면 /search?q= 로 보내요.
export const QUICK_CATEGORIES: QuickCategory[] = [
  { slug: "ginseng", label: "인삼", q: "인삼" },
  { slug: "sunmu", label: "순무", q: "순무" },
  { slug: "ssuk", label: "강화약쑥", q: "쑥" },
  { slug: "eel", label: "장어", q: "장어" },
  { slug: "rice", label: "강화섬쌀", q: "쌀" },
  { slug: "jeotgal", label: "새우젓", q: "젓" },
  { slug: "seafood", label: "수산물", q: "밴댕이" },
  { slug: "craft", label: "화문석", q: "화문석" },
];

export const EXHIBITIONS: Exhibition[] = [
  { id: "e1", title: "가을 햇쌀 기획전", subtitle: "강화섬쌀 첫 수확, 최대 20% 할인", endsAt: "2026-10-31T23:59:59+09:00", image: "/images/rice.webp" },
  { id: "e2", title: "6년근 인삼 대전", subtitle: "명절 선물로 딱 좋은 인삼 세트", endsAt: "2026-11-15T23:59:59+09:00", image: "/images/ginseng.webp" },
  { id: "e3", title: "김장철 새우젓 특가", subtitle: "외포리 추젓·육젓 산지 직송", endsAt: "2026-11-30T23:59:59+09:00", image: "/images/shrimp.webp" },
];

export const PROMO_VIDEOS: ContentCard[] = [
  { id: "v1", title: "강화 문화제 현장 스케치", summary: "고려산 진달래부터 성곽길까지 한 번에 둘러봐요." },
  { id: "v2", title: "1분 만에 보는 강화 특산물", summary: "인삼, 순무, 새우젓이 식탁에 오기까지." },
  { id: "v3", title: "강화 밥상 한 상 차림", summary: "제철 재료로 차린 강화 시골 밥상이에요." },
];

export const FESTIVALS: ContentCard[] = [
  { id: "f1", title: "강화 새우젓 축제", summary: "외포리 젓갈 수산시장 일대", date: "2026-10-30" },
  { id: "f2", title: "강화 개천대축제", summary: "마니산 참성단과 강화읍 일대", date: "2026-10-03" },
  { id: "f3", title: "강화 고려인삼 축제", summary: "강화인삼농협 일대", date: "2026-10-17" },
];

export const PRODUCER_STORIES: ContentCard[] = [
  { id: "st1", name: "교동 햇살농원", region: "교동면", quote: "바람이 세야 쌀알이 단단해져요.", title: "3대째 교동 들녘을 지키는 쌀 농부", summary: "교동 바람이 쌀을 단단하게 만들어요.", image: "/images/rice.webp", href: "/sellers/s1" },
  { id: "st2", name: "강화인삼조합 송해점", region: "송해면", quote: "인삼은 6년을 기다려준 만큼만 맛이 들어요.", title: "6년을 기다리는 인삼 밭", summary: "6년근만 고집하는 송해면 인삼 농가 이야기예요.", image: "/images/ginseng.webp", href: "/sellers/s2" },
  { id: "st3", name: "외포리 젓갈상회", region: "내가면", quote: "새우는 잡은 그날 소금을 쳐야 해요.", title: "새벽 경매에서 바로 염장까지", summary: "외포리 새우젓이 맛있는 이유예요.", image: "/images/shrimp.webp", href: "/sellers/s3" },
];

export type Banner = { id: string; title: string; image: string; href: string; width: number; height: number };
// 기획전 캐로셀 배너. 지금은 김장대전 이미지 하나뿐이라 링크만 다르게 3장 둬요.
export const EXHIBITION_BANNERS: Banner[] = [
  { id: "b1", title: "2026 강화 명품 김장대전 (추젓&햇순무)", image: "/images/main/banner-kimjang.png", href: "/search?q=%EC%83%88%EC%9A%B0%EC%A0%93", width: 1024, height: 341 },
  { id: "b2", title: "2026 강화 명품 김장대전 순무김치", image: "/images/main/banner-kimjang.png", href: "/search?q=%EC%88%9C%EB%AC%B4", width: 1024, height: 341 },
  { id: "b3", title: "2026 강화 명품 김장대전 특가", image: "/images/main/banner-kimjang.png", href: "/deals", width: 1024, height: 341 },
];