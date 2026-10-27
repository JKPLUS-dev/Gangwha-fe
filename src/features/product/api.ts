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

// 메인 "카테고리별 상품" 9개 탭(피그마 순서). 탭마다 8개, 같은 탭 안에서는 이미지가 겹치지 않게 골라요.
const isTicket = (p: Product) => p.id.startsWith("t");
const GOODS = () => PRODUCTS.filter((p) => !p.soldOut && !isTicket(p));
const HOME_TABS: { slug: string; label: string; pick: () => Product[] }[] = [
  { slug: "special", label: "강화 특산물", pick: () => GOODS().filter((p) => /인삼|수삼|홍삼|순무|쑥|섬쌀|화문석|새우젓/.test(p.name)).sort(SORTERS.best) },
  { slug: "agri-sea", label: "농수산물", pick: () => GOODS().filter((p) => p.category === "agri" || p.category === "seafood").sort(SORTERS.best) },
  { slug: "processed", label: "가공식품", pick: () => GOODS().filter((p) => p.category === "processed").sort(SORTERS.best) },
  { slug: "popular", label: "인기상품", pick: () => GOODS().sort(SORTERS.best) },
  { slug: "new", label: "신규상품", pick: () => GOODS().sort(SORTERS.new) },
  { slug: "season", label: "시즌·명절상품", pick: () => GOODS().filter((p) => /세트|선물|햅쌀|김장|명절|절편|꿀/.test(p.name)).sort(SORTERS.best) },
  { slug: "producer", label: "생산자판매", pick: () => SELLERS.flatMap((s) => GOODS().filter((p) => p.sellerId === s.id).sort(SORTERS.best).slice(0, 2)) },
  { slug: "vendor", label: "업체별상품", pick: () => GOODS().filter((p) => p.category === "craft" || /액젓|밀키트|즙|티백/.test(p.name)).sort(SORTERS.priceDesc) },
  { slug: "ticket", label: "지역행사 티켓", pick: () => PRODUCTS.filter(isTicket) },
  { slug: "gift", label: "선물세트", pick: () => GOODS().filter((p) => /세트|선물|정|절편|꿀절임|화문석/.test(p.name)).sort(SORTERS.priceDesc) },
  { slug: "banchan", label: "반찬·김치", pick: () => GOODS().filter((p) => /김치|깍두기|장아찌|젓|무침|액젓/.test(p.name)).sort(SORTERS.best) },
  { slug: "health", label: "건강식품", pick: () => GOODS().filter((p) => /홍삼|인삼|수삼|쑥|즙|환|차/.test(p.name)).sort(SORTERS.best) },
  { slug: "liquor", label: "전통주", pick: () => GOODS().filter((p) => p.id.startsWith("l")) },
  { slug: "craft", label: "공예품", pick: () => GOODS().filter((p) => p.category === "craft") },
  { slug: "stay", label: "체험·숙박", pick: () => PRODUCTS.filter((p) => /체험|클래스|투어|스테이|펜션|한옥|캠핑/.test(p.name)) },
];

function takeDistinct(list: Product[], limit: number): Product[] {
  const out: Product[] = [];
  const seen = new Set<string>();
  for (const p of list) if (out.length < limit && !seen.has(p.image ?? p.id)) { out.push(p); seen.add(p.image ?? p.id); }
  for (const p of GOODS().sort(SORTERS.best)) if (out.length < limit && !out.includes(p) && !seen.has(p.image ?? p.id)) { out.push(p); seen.add(p.image ?? p.id); }
  for (const p of list) if (out.length < limit && !out.includes(p)) out.push(p);
  for (const p of GOODS().sort(SORTERS.best)) if (out.length < limit && !out.includes(p)) out.push(p);
  return out;
}

export async function getHomeCategoryTabs(limit = 8): Promise<{ slug: string; label: string; products: Product[] }[]> {
  return HOME_TABS.map((t) => ({ slug: t.slug, label: t.label, products: takeDistinct(t.pick(), limit) }));
}
