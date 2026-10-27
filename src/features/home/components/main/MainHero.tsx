import { CONTAINER } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";

export function MainHero() {
  return (
    <section aria-label="메인 배너" className="border-b border-[#e5e5e5] bg-white pb-3 pt-3 md:pb-5 md:pt-5">
      <div className={CONTAINER}>
        <Link href="/products" className="block w-full overflow-hidden rounded">
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
