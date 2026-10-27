import {
  ABanner, ABest, AFarmerBanner, AFestivals, AGift, AHero, AHowItShips, ANew, ANotice, AProducers, AQuick,
  AReviews, ARegion, ASeasonal, ASellerCta, AShipping, ASignature, AStories, ATidal, ATimeDeals, ATrust,
} from "@/features/home-a/sections";

/** /a 리뉴얼 — Kurly / 29CM 톤 */
export default function HomeAPage() {
  return (
    <>
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
    </>
  );
}
