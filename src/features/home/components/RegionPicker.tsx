import { Section } from "@/components/ui/Section";
import { Tabs } from "@/components/ui/Tabs";
import { getProducts, getSellers } from "@/features/product/api";
import { ProductGrid } from "@/features/product/components/ProductGrid";
import { pickVaried } from "../pickVaried";

const REGIONS = ["강화읍", "선원면", "불은면", "길상면", "화도면", "양도면", "내가면", "하점면", "양사면", "송해면", "교동면", "삼산면", "서도면"];

export async function RegionPicker() {
  const [sellers, products] = await Promise.all([getSellers(), getProducts({ sort: "best" })]);
  const areaOf = new Map(sellers.map((s) => [s.id, s.area]));
  const tabs = REGIONS.map((region) => ({
    label: region,
    panel: <ProductGrid products={pickVaried(products.filter((p) => areaOf.get(p.sellerId) === region), 4)} empty={`${region} 상품은 곧 입점 예정이에요.`} />,
  }));
  return (
    <Section eyebrow="13개 읍·면" title="산지에서 고르기">
      <Tabs label="강화 읍·면" variant="chip" tabs={tabs} />
    </Section>
  );
}
