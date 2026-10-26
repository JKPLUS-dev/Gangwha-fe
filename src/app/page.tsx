import { getExhibitions, getFestivals, getProducerStories, getPromoVideos, getQuickCategories } from "@/features/content/api";
import { getCategoryTabs, getFeaturedSellers, getProducts, getProductsByQuickCategory, getTimeDeals } from "@/features/product/api";
import { getNotices } from "@/features/support/data";
import { CategoryTabs } from "@/features/home/components/main/CategoryTabs";
import { ExhibitionSection } from "@/features/home/components/main/ExhibitionSection";
import { FarmerBanner } from "@/features/home/components/main/FarmerBanner";
import { GanghwaContents } from "@/features/home/components/main/GanghwaContents";
import { HelpAndNotice } from "@/features/home/components/main/HelpAndNotice";
import { MainHero } from "@/features/home/components/main/MainHero";
import { ProductSlider } from "@/features/home/components/main/ProductSlider";
import { QuickCategoryIcons } from "@/features/home/components/main/QuickCategoryIcons";
import { ProductCard } from "@/features/product/components/ProductCard";

// 피그마 UPPLUS 784-434 "Desktop - 3" 메인
export default async function HomePage() {
  const [quick, exhibitions, videos, festivals, stories, fresh, deals, sellers, notices] = await Promise.all([
    getQuickCategories(), getExhibitions(), getPromoVideos(), getFestivals(), getProducerStories(),
    getProducts({ category: "agri", sort: "new" }), getTimeDeals(4), getFeaturedSellers(), getNotices(),
  ]);
  const tabs = await Promise.all((await getCategoryTabs()).map(async (t) => ({ slug: t.slug, label: t.label, products: await getProductsByQuickCategory(t.slug) })));

  return (
    <>
      <MainHero />
      <QuickCategoryIcons items={quick} />
      <ExhibitionSection items={exhibitions}>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">{deals.map((p) => <li key={p.id}><ProductCard product={p} /></li>)}</ul>
      </ExhibitionSection>
      <ProductSlider id="fresh-title" title="강화도 신선 산지 직송 마켓" desc="오늘 수확해 내일 도착하는 강화 특산물" moreHref="/search" products={fresh.slice(0, 10)} />
      <FarmerBanner sellers={sellers} />
      <CategoryTabs tabs={tabs} />
      <GanghwaContents videos={videos} festivals={festivals} stories={stories} />
      <HelpAndNotice notices={notices} />
    </>
  );
}
