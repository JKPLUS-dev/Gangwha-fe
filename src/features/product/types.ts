export const CATEGORIES = {
  agri: "농산물",
  seafood: "수산물",
  processed: "가공식품",
  craft: "특산·공예",
} as const;

export type Category = keyof typeof CATEGORIES;
export type Storage = "room" | "chilled" | "frozen";

export type Seller = {
  id: string;
  name: string;
  area: string; // 강화 읍·면 단위 지역
  story: string;
  interview?: string; // 이달의 생산자 인터뷰 한 줄
  photo?: string;
};

export type Product = {
  id: string;
  sellerId: string;
  name: string;
  category: Category;
  price: number;
  salePrice?: number;
  origin: string;
  storage: Storage;
  shipDays: number; // 주문 후 출고까지 걸리는 일수
  freeShipping: boolean;
  soldOut: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  sales: number;
  image?: string; // /public 기준 경로. 서버 연동 시 이미지 URL로 대체
  dealEndsAt?: string; // 타임특가 종료 시각(ISO)
  isGiftSet?: boolean;
  detailImage?: { src: string; width: number; height: number }; // 상세 설명 이미지
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  body: string;
  createdAt: string;
};
