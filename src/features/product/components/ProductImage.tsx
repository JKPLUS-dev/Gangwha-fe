import Image from "next/image";
import type { Product } from "../types";

export function ProductImage({ product, sizes, priority }: { product: Product; sizes: string; priority?: boolean }) {
  if (!product.image) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#f6ebdb] px-4 pb-10 pt-4 text-center">
        <Image src="/images/logo-symbol.png" alt="" width={755} height={755} sizes="64px" className="size-16 opacity-30" />
        <span className="line-clamp-2 text-sm font-semibold text-[#585858]">{product.name}</span>
      </div>
    );
  }
  return <Image src={product.image} alt={product.name} fill sizes={sizes} priority={priority} className="object-cover transition duration-300 group-hover:scale-105" />;
}
