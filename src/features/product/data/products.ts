import type { Product, Review, Category } from "../types";
import { SELLERS } from "./sellers";

type Seed = Omit<Product, "rating" | "reviewCount" | "createdAt" | "sales" | "soldOut"> &
  Partial<Pick<Product, "soldOut">>;

const SEEDS: Seed[] = [
  { id: "p1", sellerId: "s1", name: "강화섬쌀 10kg (2026 햅쌀)", category: "agri", price: 42000, salePrice: 37800, origin: "인천 강화군 교동면", storage: "room", shipDays: 1, freeShipping: true },
  { id: "p2", sellerId: "s1", name: "강화섬쌀 4kg", category: "agri", price: 19000, origin: "인천 강화군 교동면", storage: "room", shipDays: 1, freeShipping: false },
  { id: "p3", sellerId: "s1", name: "강화 찹쌀 2kg", category: "agri", price: 14000, origin: "인천 강화군 교동면", storage: "room", shipDays: 2, freeShipping: false },
  { id: "p4", sellerId: "s2", name: "강화 6년근 수삼 750g", category: "agri", price: 89000, salePrice: 79000, origin: "인천 강화군 송해면", storage: "chilled", shipDays: 1, freeShipping: true },
  { id: "p5", sellerId: "s2", name: "강화 홍삼정 240g", category: "processed", price: 128000, origin: "인천 강화군 송해면", storage: "room", shipDays: 2, freeShipping: true },
  { id: "p6", sellerId: "s2", name: "인삼 선물세트 (명절 한정)", category: "agri", price: 150000, origin: "인천 강화군 송해면", storage: "chilled", shipDays: 3, freeShipping: true, soldOut: true },
  { id: "p7", sellerId: "s3", name: "강화 추젓 새우젓 1kg", category: "seafood", price: 32000, salePrice: 28000, origin: "인천 강화군 내가면 (외포항)", storage: "chilled", shipDays: 1, freeShipping: false },
  { id: "p8", sellerId: "s3", name: "강화 육젓 500g", category: "seafood", price: 45000, origin: "인천 강화군 내가면 (외포항)", storage: "chilled", shipDays: 1, freeShipping: true },
  { id: "p9", sellerId: "s3", name: "김장용 새우젓 3kg", category: "seafood", price: 69000, origin: "인천 강화군 내가면 (외포항)", storage: "chilled", shipDays: 2, freeShipping: true },
  { id: "p10", sellerId: "s4", name: "강화 순무 5kg", category: "agri", price: 25000, origin: "인천 강화군 화도면", storage: "room", shipDays: 1, freeShipping: false },
  { id: "p11", sellerId: "s4", name: "강화 순무김치 2kg", category: "processed", price: 28000, salePrice: 24900, origin: "인천 강화군 화도면", storage: "chilled", shipDays: 2, freeShipping: true },
  { id: "p12", sellerId: "s4", name: "순무 깍두기 1kg", category: "processed", price: 15000, origin: "인천 강화군 화도면", storage: "chilled", shipDays: 2, freeShipping: false },
  { id: "p13", sellerId: "s5", name: "강화 화문석 (2인용)", category: "craft", price: 380000, origin: "인천 강화군 양사면", storage: "room", shipDays: 7, freeShipping: true },
  { id: "p14", sellerId: "s5", name: "왕골 방석 2개 세트", category: "craft", price: 48000, origin: "인천 강화군 양사면", storage: "room", shipDays: 5, freeShipping: false },
  { id: "p15", sellerId: "s5", name: "왕골 바구니", category: "craft", price: 36000, origin: "인천 강화군 양사면", storage: "room", shipDays: 5, freeShipping: false, soldOut: true },
  { id: "p16", sellerId: "s6", name: "손질 밴댕이 1kg (냉동)", category: "seafood", price: 27000, origin: "인천 강화군 화도면 (선수항)", storage: "frozen", shipDays: 1, freeShipping: false },
  { id: "p17", sellerId: "s6", name: "밴댕이 회무침 500g", category: "processed", price: 19800, origin: "인천 강화군 화도면 (선수항)", storage: "frozen", shipDays: 1, freeShipping: false },
  { id: "p18", sellerId: "s6", name: "강화 갯벌 낙지 1kg", category: "seafood", price: 55000, salePrice: 49000, origin: "인천 강화군 화도면 (선수항)", storage: "chilled", shipDays: 1, freeShipping: true },
  { id: "p19", sellerId: "s6", name: "강화 갯벌 민물장어 1kg (손질)", category: "seafood", price: 68000, salePrice: 59000, origin: "인천 강화군 화도면 (선수항)", storage: "chilled", shipDays: 1, freeShipping: true },
  { id: "p20", sellerId: "s6", name: "강화 장어 양념구이 500g", category: "processed", price: 39000, origin: "인천 강화군 화도면 (선수항)", storage: "frozen", shipDays: 1, freeShipping: false },
  { id: "p21", sellerId: "s6", name: "장어탕 밀키트 2인분", category: "processed", price: 24000, origin: "인천 강화군 화도면 (선수항)", storage: "frozen", shipDays: 2, freeShipping: false },
  { id: "p22", sellerId: "s2", name: "강화 사자발약쑥 300g", category: "agri", price: 22000, origin: "인천 강화군 송해면", storage: "room", shipDays: 2, freeShipping: false },
  { id: "p23", sellerId: "s2", name: "강화 약쑥 쑥떡 1kg", category: "processed", price: 18000, salePrice: 15900, origin: "인천 강화군 송해면", storage: "frozen", shipDays: 2, freeShipping: true },
  { id: "p24", sellerId: "s2", name: "강화 약쑥차 티백 30개", category: "processed", price: 16000, origin: "인천 강화군 송해면", storage: "room", shipDays: 2, freeShipping: false },
  { id: "p25", sellerId: "s2", name: "강화 4년근 수삼 1kg", category: "agri", price: 65000, salePrice: 58000, origin: "인천 강화군 송해면", storage: "chilled", shipDays: 1, freeShipping: true },
  { id: "p26", sellerId: "s2", name: "강화 홍삼 절편 200g", category: "processed", price: 54000, origin: "인천 강화군 송해면", storage: "room", shipDays: 2, freeShipping: true },
  { id: "p27", sellerId: "s2", name: "강화 인삼 꿀절임 500g", category: "processed", price: 42000, origin: "인천 강화군 송해면", storage: "chilled", shipDays: 2, freeShipping: false },
  { id: "p28", sellerId: "s4", name: "강화 순무 10kg (김장용)", category: "agri", price: 45000, salePrice: 39900, origin: "인천 강화군 화도면", storage: "room", shipDays: 1, freeShipping: true },
  { id: "p29", sellerId: "s4", name: "강화 순무 물김치 1.5kg", category: "processed", price: 19000, origin: "인천 강화군 화도면", storage: "chilled", shipDays: 2, freeShipping: false },
  { id: "p30", sellerId: "s4", name: "순무 장아찌 500g", category: "processed", price: 13000, origin: "인천 강화군 화도면", storage: "chilled", shipDays: 2, freeShipping: false },
  { id: "p31", sellerId: "s2", name: "강화 약쑥환 300g", category: "processed", price: 35000, origin: "인천 강화군 송해면", storage: "room", shipDays: 2, freeShipping: true },
  { id: "p32", sellerId: "s2", name: "사자발약쑥 뜸쑥 100g", category: "agri", price: 15000, origin: "인천 강화군 송해면", storage: "room", shipDays: 2, freeShipping: false },
  { id: "p33", sellerId: "s2", name: "강화 약쑥 족욕제 10포", category: "processed", price: 21000, salePrice: 18900, origin: "인천 강화군 송해면", storage: "room", shipDays: 2, freeShipping: false },
  { id: "p34", sellerId: "s6", name: "강화 민물장어 1.5kg (대)", category: "seafood", price: 98000, salePrice: 89000, origin: "인천 강화군 화도면 (선수항)", storage: "chilled", shipDays: 1, freeShipping: true },
  { id: "p35", sellerId: "s6", name: "강화 장어 소금구이 500g", category: "processed", price: 41000, origin: "인천 강화군 화도면 (선수항)", storage: "frozen", shipDays: 1, freeShipping: false },
  { id: "p36", sellerId: "s6", name: "강화 장어즙 30포", category: "processed", price: 72000, origin: "인천 강화군 화도면 (선수항)", storage: "room", shipDays: 2, freeShipping: true },
  { id: "p37", sellerId: "s1", name: "강화섬쌀 20kg (2026 햅쌀)", category: "agri", price: 79000, salePrice: 72000, origin: "인천 강화군 교동면", storage: "room", shipDays: 1, freeShipping: true },
  { id: "p38", sellerId: "s1", name: "강화섬쌀 현미 4kg", category: "agri", price: 21000, origin: "인천 강화군 교동면", storage: "room", shipDays: 1, freeShipping: false },
  { id: "p39", sellerId: "s1", name: "강화섬쌀 누룽지 1kg", category: "processed", price: 16000, origin: "인천 강화군 교동면", storage: "room", shipDays: 2, freeShipping: false },
  { id: "p40", sellerId: "s3", name: "강화 오젓 1kg", category: "seafood", price: 38000, origin: "인천 강화군 내가면 (외포항)", storage: "chilled", shipDays: 1, freeShipping: false },
  { id: "p41", sellerId: "s3", name: "새우젓 선물세트 3종", category: "seafood", price: 59000, salePrice: 52000, origin: "인천 강화군 내가면 (외포항)", storage: "chilled", shipDays: 2, freeShipping: true },
  { id: "p42", sellerId: "s3", name: "강화 까나리액젓 1.8L", category: "seafood", price: 18000, origin: "인천 강화군 내가면 (외포항)", storage: "room", shipDays: 2, freeShipping: false },
  { id: "p43", sellerId: "s6", name: "강화 꽃게 2kg (활)", category: "seafood", price: 62000, salePrice: 55000, origin: "인천 강화군 화도면 (선수항)", storage: "chilled", shipDays: 1, freeShipping: true },
  { id: "p44", sellerId: "s6", name: "강화 숭어 1kg (손질)", category: "seafood", price: 24000, origin: "인천 강화군 화도면 (선수항)", storage: "chilled", shipDays: 1, freeShipping: false },
  { id: "p45", sellerId: "s6", name: "강화 주꾸미 1kg", category: "seafood", price: 33000, origin: "인천 강화군 화도면 (선수항)", storage: "frozen", shipDays: 1, freeShipping: false },
  { id: "p46", sellerId: "s6", name: "강화 갯벌 백합 2kg", category: "seafood", price: 29000, origin: "인천 강화군 화도면 (선수항)", storage: "chilled", shipDays: 1, freeShipping: false },
  { id: "p47", sellerId: "s5", name: "화문석 방석 (1인용)", category: "craft", price: 58000, origin: "인천 강화군 양사면", storage: "room", shipDays: 5, freeShipping: false },
  { id: "p48", sellerId: "s5", name: "왕골 테이블매트 4장", category: "craft", price: 32000, salePrice: 29000, origin: "인천 강화군 양사면", storage: "room", shipDays: 5, freeShipping: false },
  { id: "p49", sellerId: "s5", name: "강화 화문석 (1인용)", category: "craft", price: 210000, origin: "인천 강화군 양사면", storage: "room", shipDays: 7, freeShipping: true },
];

// 목데이터는 고정값이어야 서버/클라이언트 렌더 결과가 같아요. index 기반으로만 만들어요.
// 나머지 업체마다 대표 상품을 2개씩 붙여요. 품목은 위 시드에서 돌려 써요.
// 업체 이름의 업종(sellers.ts KINDS 순서)에 맞는 품목만 팔게 해요.
const KIND_CATEGORIES: Category[][] = [["agri"], ["seafood"], ["seafood", "processed"], ["craft"], ["processed"]];
const seedsForKind = (i: number) => SEEDS.filter((s) => KIND_CATEGORIES[i % KIND_CATEGORIES.length].includes(s.category));

const GENERATED_SEEDS: Seed[] = SELLERS.slice(6).flatMap((seller, i) =>
  [0, 1].map((k) => {
    const pool = seedsForKind(i);
    const base = pool[(i * 2 + k) % pool.length];
    return {
      ...base,
      id: `g${i}-${k}`,
      sellerId: seller.id,
      name: `${base.name.split(" (")[0]} · ${seller.name}`,
      origin: `인천 강화군 ${seller.area}`,
      soldOut: (i + k) % 17 === 0,
    };
  }),
);

// 목업 사진: 상품명 키워드로 /public/images 사진을 연결해요. 출처는 public/images/CREDITS.md
const IMAGE_BY_KEYWORD: [RegExp, string][] = [
  [/홍삼/, "/images/redginseng.webp"],
  [/인삼|수삼/, "/images/ginseng.webp"],
  [/쌀|누룽지/, "/images/rice.webp"],
  [/백합|꽃게|숭어|주꾸미/, "/images/fish.webp"],
  [/젓/, "/images/shrimp.webp"],
  [/김치|깍두기/, "/images/sunmu.webp"],
  [/순무/, "/images/radish.webp"],
  [/밴댕이|낙지|장어/, "/images/fish.webp"],
];
const imageFor = (name: string) => IMAGE_BY_KEYWORD.find(([re]) => re.test(name))?.[1];

// 상세 설명 이미지: 판매자 이미지가 들어오기 전까지 샘플 한 장으로 통일해요.
const DETAIL_IMAGE = { src: "/images/detail-sample.jpg", width: 500, height: 5680 };

export const PRODUCTS: Product[] = [...SEEDS, ...GENERATED_SEEDS].map((seed, i) => ({
  soldOut: false,
  image: imageFor(seed.name),
  detailImage: DETAIL_IMAGE,
  ...seed,
  rating: 4 + ((i * 7) % 10) / 10,
  reviewCount: 3 + ((i * 13) % 40),
  createdAt: `2026-10-${String(20 - (i % 20)).padStart(2, "0")}`,
  sales: i < SEEDS.length ? 1000 - i * 23 : (i * 37) % 500,
}));

const REVIEW_LINES = [
  "산지에서 바로 와서 그런지 신선해요.",
  "포장이 꼼꼼하고 배송도 빨랐어요.",
  "부모님 선물로 드렸는데 좋아하셨어요.",
  "재구매 의사 있어요.",
];

export const REVIEWS: Review[] = PRODUCTS.flatMap((p, i) =>
  REVIEW_LINES.slice(0, 2 + (i % 3)).map((body, j) => ({
    id: `${p.id}-r${j}`,
    productId: p.id,
    author: `구매자${i + 1}${j}`,
    rating: 5 - (j % 2),
    body,
    createdAt: `2026-10-${String(15 - j).padStart(2, "0")}`,
  })),
);
