import type { CartItem, Member, Order } from "../types";

// 로그인한 척하는 목업 회원이에요. 인증 붙으면 세션에서 가져오게 바꿔요.
export const MEMBER: Member = { id: "m1", name: "주인님", email: "owner@example.com", phone: "010-0000-0000", grade: "강화 단골", point: 3200 };

export const CART: CartItem[] = [
  { productId: "p1", quantity: 1 },
  { productId: "p11", quantity: 2 },
  { productId: "p18", quantity: 1 },
];

export const WISHLIST: string[] = ["p2", "p5", "p13", "p16"];

export const ORDERS: Order[] = [
  { id: "20261021-0001", orderedAt: "2026-10-21", status: "shipping", shippingFee: 0, items: [{ productId: "p1", quantity: 1, price: 42000 }] },
  { id: "20261015-0002", orderedAt: "2026-10-15", status: "delivered", shippingFee: 3000, items: [{ productId: "p12", quantity: 2, price: 15000 }, { productId: "p17", quantity: 1, price: 19800 }] },
  { id: "20261002-0003", orderedAt: "2026-10-02", status: "canceled", shippingFee: 3000, items: [{ productId: "p14", quantity: 1, price: 48000 }] },
];
