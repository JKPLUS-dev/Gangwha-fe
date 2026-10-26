import { Section } from "@/components/ui/Section";
import { Tabs } from "@/components/ui/Tabs";
import { getProducts } from "@/features/product/api";
import { ProductGrid } from "@/features/product/components/ProductGrid";
import { pickVaried } from "../pickVaried";
import { CATEGORIES, type Category } from "@/features/product/types";

export async function BestProducts() {
  const keys: (Category | undefined)[] = [undefined, ...(Object.keys(CATEGORIES) as Category[])];
  const lists = await Promise.all(keys.map((category) => getProducts({ category, sort: "best" })));
  return (
    <Section eyebrow="가장 많이 찾는" title="BEST" moreHref="/products?sort=best">
      <Tabs label="BEST 분류" tabs={keys.map((k, i) => ({ label: k ? CATEGORIES[k] : "전체", panel: <ProductGrid products={pickVaried(lists[i], 4)} /> }))} />
    </Section>
  );
}
