import Image from "next/image";
import Link from "next/link";

// 피그마 784:914 home_event_banner. 배너 이미지 안에 문구가 들어 있어요.
export function MainHero() {
  return (
    <section aria-label="메인 배너" className="bg-white">
      <Link href="/deals" className="relative mx-auto block aspect-[1480/367] w-full max-w-[1480px] overflow-hidden">
        <Image src="/images/main/hero.webp" alt="강화도의 자연을 담다, 강화도몰. 강화 대표 특산물을 한곳에. 지금 쇼핑하기" fill priority sizes="100vw" className="object-cover" />
      </Link>
    </section>
  );
}
