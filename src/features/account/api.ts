// 서버 생기면 함수 본문만 fetch로 바꾸면 돼요.
import { getProduct } from "@/features/product/api";
import { CART, MEMBER, ORDERS, WISHLIST } from "./data/mock";

export async function getMember() {
  return MEMBER;
}

export async function getCart() {
  const rows = await Promise.all(CART.map(async (c) => ({ ...c, product: await getProduct(c.productId) })));
  return rows.filter((r) => r.product);
}

export async function getWishlist() {
  const items = await Promise.all(WISHLIST.map(getProduct));
  return items.filter((p) => p !== null);
}

export async function getOrders() {
  return ORDERS;
}

export async function getOrder(id: string) {
  return ORDERS.find((o) => o.id === id) ?? null;
}
