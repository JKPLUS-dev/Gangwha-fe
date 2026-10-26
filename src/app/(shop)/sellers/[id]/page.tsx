import { notFound } from "next/navigation";
import { getProducts, getSeller } from "@/features/product/api";
import { ProductGrid } from "@/features/product/components/ProductGrid";
import { SELLERS } from "@/features/product/data/sellers";

type Props = { params: Promise<{ id: string }> };

export const generateStaticParams = () => SELLERS.map((s) => ({ id: s.id }));

export default async function SellerPage({ params }: Props) {
  const { id } = await params;
  const seller = await getSeller(id);
  if (!seller) notFound();
  const products = await getProducts({ sellerId: id });

  return (
    <main className="mx-auto max-w-6xl p-4">
      <h1 className="text-2xl font-bold">{seller.name}</h1>
      <p>{seller.area} · {seller.story}</p>
      <ProductGrid products={products} />
    </main>
  );
}
