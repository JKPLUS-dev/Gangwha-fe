import { PageHeader } from "@/components/ui/PageHeader";
import { CartView, type CartProduct } from "@/features/cart/components/CartView";
import { getProducts, getSellers } from "@/features/product/api";

export const metadata = { title: "장바구니 | 강화장터" };

export default async function Page() {
  const [products, sellers] = await Promise.all([getProducts(), getSellers()]);
  const name = new Map(sellers.map((s) => [s.id, s.name]));
  const map: Record<string, CartProduct> = Object.fromEntries(
    products.map((p) => [p.id, { id: p.id, name: p.name, price: p.price, salePrice: p.salePrice, image: p.image, seller: name.get(p.sellerId) ?? "", soldOut: p.soldOut, freeShipping: p.freeShipping }]),
  );
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <PageHeader title="장바구니" desc="판매자마다 산지에서 따로 출고돼요." />
      <CartView products={map} />
    </main>
  );
}
