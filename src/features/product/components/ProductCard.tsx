import Link from "next/link";
import { getSeller } from "../api";
import { formatPrice, STORAGE_LABEL } from "../format";
import type { Product } from "../types";
import { ProductImage } from "./ProductImage";

export async function ProductCard({ product }: { product: Product }) {
  const seller = await getSeller(product.sellerId);
  const sale = product.salePrice;
  const rate = sale ? Math.round((1 - sale / product.price) * 100) : 0;

  return (
    <Link href={`/products/${product.id}`} className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
      <div className={`relative aspect-square overflow-hidden rounded-xl bg-stone-100 ${product.soldOut ? "opacity-60" : ""}`}>
        <ProductImage product={product} sizes="(min-width: 768px) 25vw, 50vw" />
        <div className="absolute bottom-2 left-2 flex gap-1">
          <span className="rounded-md bg-white/95 px-2 py-0.5 text-xs font-semibold text-brand">산지직송</span>
          <span className="rounded-md bg-white/95 px-2 py-0.5 text-xs font-medium text-stone-700">{STORAGE_LABEL[product.storage]}</span>
        </div>
        {product.soldOut && <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-stone-900/80 py-2 text-center font-bold text-white">품절</span>}
      </div>
      <p className="mt-3 text-sm text-stone-600">{seller?.area} · {seller?.name}</p>
      <h3 className="mt-1 line-clamp-2 text-base font-medium text-stone-900 group-hover:underline">{product.name}</h3>
      <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
        {rate > 0 && <span className="text-lg font-bold text-red-700">{rate}%</span>}
        <span className="text-lg font-bold text-stone-900">{formatPrice(sale ?? product.price)}</span>
        {rate > 0 && <s className="text-sm text-stone-600">{formatPrice(product.price)}</s>}
      </p>
      <p className="mt-1 text-sm text-stone-600">
        <span className="text-amber-500">★</span> {product.rating.toFixed(1)} ({product.reviewCount}){product.freeShipping && " · 무료배송"}
      </p>
    </Link>
  );
}
