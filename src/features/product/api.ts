// 서버가 생기면 이 파일의 함수 본문만 fetch로 바꾸면 돼요. 호출부는 그대로예요.
import { PRODUCTS, REVIEWS } from "./data/products";
import { SELLERS } from "./data/sellers";
import { DEAL_ENDS_AT, GIFT_SET_KEYWORDS, INTERVIEWS } from "./data/promotions";
import type { Category, Product } from "./types";

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

export { finalPrice };
