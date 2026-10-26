// 서버가 생기면 이 파일의 함수 본문만 fetch로 바꾸면 돼요. 호출부는 그대로예요.
import { PRODUCTS, REVIEWS } from "./data/products";
import { SELLERS } from "./data/sellers";
import { DEAL_ENDS_AT, GIFT_SET_KEYWORDS, INTERVIEWS } from "./data/promotions";
import type { Category, Product } from "./types";
import { QUICK_CATEGORIES, type QuickCategory } from "../content/data";

export type ProductSort = "best" | "new" | "priceAsc" | "priceDesc";

export type ProductQuery = {
  category?: Category;
  sellerId?: string;
  q?: string;
  freeShipping?: boolean;
  sort?: ProductSort;
};

const finalPrice = (p: Product) => p.salePrice ?? p.price;

const SORTERS: Record<ProductSort, (a: Product, b: Product) => number> = {
  best: (a, b) => b.sales - a.sales,
  new: (a, b) => b.createdAt.localeCompare(a.createdAt),
  priceAsc: (a, b) => finalPrice(a) - finalPrice(b),
  priceDesc: (a, b) => finalPrice(b) - finalPrice(a),
};

export async function getProducts({ category, sellerId, q, freeShipping, sort = "best" }: ProductQuery = {}) {
  return PRODUCTS.filter((p) => {
    const matchesCategory = !category || p.category === category;
    const matchesSeller = !sellerId || p.sellerId === sellerId;
    const matchesKeyword = !q || p.name.includes(q);
    const matchesShipping = !freeShipping || p.freeShipping;
    return matchesCategory && matchesSeller && matchesKeyword && matchesShipping;
  }).sort(SORTERS[sort]);
}

export async function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id) ?? null;
}

export async function getReviews(productId: string) {
  return REVIEWS.filter((r) => r.productId === productId);
}

export async function getSellers() {
  return SELLERS;
}

export async function getSeller(id: string) {
  return SELLERS.find((s) => s.id === id) ?? null;
}

export async function getTimeDeals(limit = 6): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.salePrice && !p.soldOut)
    .slice(0, limit)
    .map((p) => ({ ...p, dealEndsAt: DEAL_ENDS_AT }));
}

export async function getGiftSets(limit = 8): Promise<Product[]> {
  return PRODUCTS.filter((p) => GIFT_SET_KEYWORDS.test(p.name))
    .slice(0, limit)
    .map((p) => ({ ...p, isGiftSet: true }));
}

export async function getFeaturedSellers() {
  return SELLERS.filter((s) => INTERVIEWS[s.id]).map((s) => ({ ...s, interview: INTERVIEWS[s.id] }));
}

export async function getFeaturedSeller() {
  return (await getFeaturedSellers())[0] ?? null;
}

// 메인 "카테고리별 상품" 탭: 원형 아이콘(QUICK_CATEGORIES)과 같은 8개예요.
const QUICK_MATCHERS: Record<string, (p: Product) => boolean> = {
  ginseng: (p) => /인삼|수삼|홍삼/.test(p.name),
  sunmu: (p) => /순무/.test(p.name),
  ssuk: (p) => /쑥/.test(p.name),
  eel: (p) => /장어/.test(p.name),
  rice: (p) => /쌀|누룽지/.test(p.name),
  jeotgal: (p) => /젓/.test(p.name),
  seafood: (p) => p.category === "seafood" && !/젓|장어/.test(p.name),
  craft: (p) => /화문석|왕골/.test(p.name),
};
const QUICK_IMAGES: Record<string, string> = {
  ginseng: "/images/ginseng.webp",
  sunmu: "/images/sunmu.webp",
  ssuk: "/images/paddy.webp",
  eel: "/images/fish.webp",
  rice: "/images/rice.webp",
  jeotgal: "/images/shrimp.webp",
  seafood: "/images/fish.webp",
  craft: "/images/scenery.webp",
};

export type CategoryTab = QuickCategory & { image: string };

export async function getCategoryTabs(): Promise<CategoryTab[]> {
  return QUICK_CATEGORIES.map((c) => ({ ...c, image: QUICK_IMAGES[c.slug] }));
}

export async function getProductsByQuickCategory(slug: string, limit = 8): Promise<Product[]> {
  const match = QUICK_MATCHERS[slug];
  if (!match) return [];
  return PRODUCTS.filter((p) => match(p) && !p.soldOut).sort(SORTERS.best).slice(0, limit);
}

export { finalPrice };
