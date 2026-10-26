export type OrderStatus = "paid" | "preparing" | "shipping" | "delivered" | "canceled";

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  paid: "결제완료",
  preparing: "상품준비중",
  shipping: "배송중",
  delivered: "배송완료",
  canceled: "주문취소",
};

export type Member = { id: string; name: string; email: string; phone: string; grade: string; point: number };
export type CartItem = { productId: string; quantity: number };
export type OrderItem = { productId: string; quantity: number; price: number };
export type Order = { id: string; orderedAt: string; status: OrderStatus; items: OrderItem[]; shippingFee: number };
