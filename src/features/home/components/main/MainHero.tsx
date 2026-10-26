import { CONTAINER } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";

// 메인 배너. 이미지에 문구가 들어 있어서 원본 비율(1024x254) 그대로 보여줘요.
export function MainHero() {
  return (
    <section aria-label="메인 배너" className="bg-white pt-3 md:pt-6">
      <div className={CONTAINER}>
        <Link href="/products" className="block w-full overflow-hidden rounded-xl md:rounded-2xl">
          <Image
            src="/images/main/hero-2026.png"
            alt="강화도의 자연을 담다, 강화도몰. 강화도 대표 특산품을 한곳에서 모아보세요! 100% 산지 직송, 건강한 특산물. 지금 쇼핑하기"
            width={1024}
            height={254}
            priority
            sizes="(min-width:1280px) 1248px, 100vw"
            className="h-auto w-full object-contain object-left"
          />
        </Link>
      </div>
    </section>
  );
}
