import type { Product } from "@/features/product/types";

// 같은 사진이 한 줄에 반복되지 않게 이미지가 다른 상품을 우선으로 골라요.
export function pickVaried(products: Product[], count: number) {
  const seen = new Set<string | undefined>();
  const varied = products.filter((p) => (seen.has(p.image) ? false : (seen.add(p.image), true)));
  const rest = products.filter((p) => !varied.includes(p));
  return [...varied, ...rest].slice(0, count);
}
