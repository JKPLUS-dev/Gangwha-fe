import { getExhibitionBanners, getExhibitions, getFestivals, getProducerStories, getPromoVideos, getQuickCategories } from "@/features/content/api";
import { getHomeCategoryTabs, getFeaturedSellers, getProducts } from "@/features/product/api";
import { getNotices } from "@/features/support/data";
import { CategoryTabs } from "@/features/home/components/main/CategoryTabs";
import { ExhibitionSection } from "@/features/home/components/main/ExhibitionSection";
import { FarmerBanner } from "@/features/home/components/main/FarmerBanner";
import { GanghwaContents } from "@/features/home/components/main/GanghwaContents";
import { HelpAndNotice } from "@/features/home/components/main/HelpAndNotice";
import { MainHero } from "@/features/home/components/main/MainHero";
import { ProductSlider } from "@/features/home/components/main/ProductSlider";
import { QuickCategoryIcons } from "@/features/home/components/main/QuickCategoryIcons";

// 피그마 UPPLUS 784-434 "Desktop - 3" 메인
export default async function HomePage() {
  const [quick, exhibitions, videos, festivals, stories, fresh, banners, sellers, notices] = await Promise.all([
    getQuickCategories(), getExhibitions(), getPromoVideos(), getFestivals(), getProducerStories(),
    getProducts({ category: "agri", sort: "new" }), getExhibitionBanners(), getFeaturedSellers(), getNotices(),
  ]);
  const tabs = await getHomeCategoryTabs();

  return (
    <>
      <MainHero />
      <div className="w-full border-b border-[#e5e5e5]">
        <QuickCategoryIcons items={quick} />
      </div>
      <ExhibitionSection items={exhibitions} banners={banners} />
      <ProductSlider id="fresh-title" title="강화도 신선 산지 직송 마켓" desc="오늘 수확해 내일 도착하는 강화 특산물" moreHref="/search" products={fresh.slice(0, 10)} />
      <FarmerBanner sellers={sellers} />
      <CategoryTabs tabs={tabs} />
      <GanghwaContents videos={videos} festivals={festivals} stories={stories} />
      <HelpAndNotice notices={notices} />
    </>
  );
}
