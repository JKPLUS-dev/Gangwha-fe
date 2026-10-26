import { Section } from "@/components/ui/Section";
import { getProducts } from "@/features/product/api";
import { ProductGrid } from "@/features/product/components/ProductGrid";
import { pickVaried } from "../pickVaried";

export async function NewProducts() {
  const products = pickVaried((await getProducts({ sort: "new" })).filter((p) => p.image && !p.soldOut), 8);
  return (
    <Section eyebrow="새로 들어왔어요" title="이번 주 신상품" moreHref="/products?sort=new">
      <ProductGrid products={products} />
    </Section>
  );
}
