import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { getFestivals, getQuickCategories } from "@/features/content/api";
import { getFeaturedSellers } from "@/features/product/api";
import { BestProducts } from "@/features/home/components/BestProducts";
import { GanghwaStories } from "@/features/home/components/GanghwaStories";
import { GiftSets } from "@/features/home/components/GiftSets";
import { HeroBanner } from "@/features/home/components/HeroBanner";
import { HowItShips } from "@/features/home/components/HowItShips";
import { NewProducts } from "@/features/home/components/NewProducts";
import { NoticeAndHelp } from "@/features/home/components/NoticeAndHelp";
import { ProducerStories } from "@/features/home/components/ProducerStories";
import { RegionPicker } from "@/features/home/components/RegionPicker";
import { ReviewList } from "@/features/home/components/ReviewList";
import { SeasonalPick } from "@/features/home/components/SeasonalPick";
import { SellerJoinCta } from "@/features/home/components/SellerJoinCta";
import { ShippingInfo } from "@/features/home/components/ShippingInfo";
import { SignatureItems } from "@/features/home/components/SignatureItems";
import { TidalBanner } from "@/features/home/components/TidalBanner";
import { TimeDeals } from "@/features/home/components/TimeDeals";
import { TrustStrip } from "@/features/home/components/TrustStrip";
import { FarmerBanner } from "@/features/home/components/main/FarmerBanner";
import { QuickCategoryIcons } from "@/features/home/components/main/QuickCategoryIcons";

// 이전 메인(A안). 기존 섹션 구성은 그대로 두고 새 메인 이미지·아이콘을 곳곳에 더했어요.
const FESTIVAL_IMAGES = ["/images/main/festival-1.webp", "/images/main/festival-2.webp", "/images/main/festival-3.webp"];

export default async function HomeAPage() {
  const [quick, festivals, sellers] = await Promise.all([getQuickCategories(), getFestivals(), getFeaturedSellers()]);
  return (
    <>
      <HeroBanner />
      <QuickCategoryIcons items={quick} />
      <TrustStrip />
      <div className="relative">
        <Image src="/images/exhibition-clock.png" alt="" aria-hidden width={583} height={533}
          className="pointer-events-none absolute right-0 top-0 hidden w-56 opacity-25 lg:block" />
        <div className="relative"><TimeDeals /></div>
      </div>
      <SignatureItems />
      <BestProducts />
      <section aria-label="강화도몰 기획 배너" className="mx-auto w-full max-w-7xl px-4 pt-12">
        <Link href="/deals" className="relative block aspect-[1480/367] overflow-hidden rounded-2xl">
          <Image src="/images/main/hero.webp" alt="강화도의 자연을 담다, 강화 대표 특산물 기획전 보러가기" fill sizes="(min-width:1280px) 1248px, 100vw" className="object-cover" />
        </Link>
      </section>
      <SeasonalPick />
      <NewProducts />
      <GiftSets />
      <HowItShips />
      <ProducerStories />
      <div className="pt-12"><FarmerBanner sellers={sellers} /></div>
      <TidalBanner />
      <GanghwaStories />
      <Section eyebrow="강화에서 열려요" title="축제·행사" tone="stone">
        <ul className="grid gap-6 sm:grid-cols-3">
          {festivals.map((f, i) => (
            <li key={f.id} className="overflow-hidden rounded-2xl bg-white">
              <div className="relative aspect-square">
                <Image src={f.image ?? FESTIVAL_IMAGES[i % 3]} alt="" fill loading="eager" sizes="(min-width:640px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-4">
                <p className="text-lg font-bold text-stone-900">{f.title}</p>
                <p className="mt-1 text-sm text-stone-600">{f.date && `${f.date} · `}{f.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
      <RegionPicker />
      <ReviewList />
      <SellerJoinCta />
      <NoticeAndHelp />
      <ShippingInfo />
    </>
  );
}
