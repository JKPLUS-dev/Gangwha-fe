import type { Product } from "../types";
import { ShopProductCard } from "./ShopProductCard";

/** 기존 ProductCard 자리. 새 공용 카드로 위임해요. */
export function ProductCard({ product }: { product: Product }) {
  return <ShopProductCard product={product} />;
}
