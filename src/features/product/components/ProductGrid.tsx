import { ProductCard } from "./ProductCard";
import type { Product } from "../types";

export function ProductGrid({ products, empty = "조건에 맞는 상품이 없어요." }: { products: Product[]; empty?: string }) {
  if (products.length === 0) return <p className="rounded-xl bg-stone-50 py-12 text-center text-stone-600">{empty}</p>;

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}
