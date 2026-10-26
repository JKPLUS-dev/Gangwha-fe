import {
  ABanner, ABest, AFarmerBanner, AFestivals, AGift, AHero, AHowItShips, ANew, ANotice, AProducers, AQuick,
  AReviews, ARegion, ASeasonal, ASellerCta, AShipping, ASignature, AStories, ATidal, ATimeDeals, ATrust,
} from "@/features/home-a/sections";

// 이전 메인(A안) 리뉴얼: 섹션 순서·데이터는 그대로, 아이보리 바탕 + 초록·바다·당근 팔레트로 다듬었어요.
export default function HomeAPage() {
  return (
    <div className="bg-[#fbf8f1]">
      <AHero />
      <AQuick />
      <ATrust />
      <ATimeDeals />
      <ASignature />
      <ABest />
      <ABanner />
      <ASeasonal />
      <ANew />
      <AGift />
      <AHowItShips />
      <AProducers />
      <AFarmerBanner />
      <ATidal />
      <AStories />
      <AFestivals />
      <ARegion />
      <AReviews />
      <ASellerCta />
      <ANotice />
      <AShipping />
    </div>
  );
}
