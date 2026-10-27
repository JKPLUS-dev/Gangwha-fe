import { ProductCard } from "./ProductCard";
import type { Product } from "../types";

export function ProductGrid({ products, empty = "조건에 맞는 상품이 없어요." }: { products: Product[]; empty?: string }) {
  if (products.length === 0) return <p className="border border-[#e5e5e5] py-12 text-center text-sm text-[#6b6b6b]">{empty}</p>;

  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5">
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}
