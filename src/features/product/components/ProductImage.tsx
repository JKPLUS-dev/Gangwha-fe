import Image from "next/image";
import type { Product } from "../types";

export function ProductImage({ product, sizes, priority }: { product: Product; sizes: string; priority?: boolean }) {
  if (!product.image) {
    return (
      <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-stone-100 to-stone-200 text-sm text-stone-500">
        사진 준비 중
      </div>
    );
  }
  return <Image src={product.image} alt={product.name} fill sizes={sizes} priority={priority} className="object-cover transition duration-300 group-hover:scale-105" />;
}
