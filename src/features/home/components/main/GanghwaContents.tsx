import { CONTAINER } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { ContentCard } from "@/features/content/data";
import { MainTitle } from "./MainTitle";

// 피그마 홍보 영상 3장은 한 장짜리 이미지를 잘라 써요(784:933~935).
const PROMO_CROPS: CSSProperties[] = [
  { width: "330.49%", height: "198.12%", left: "-8.97%", top: "-49.73%" },
  { width: "330.49%", height: "197.59%", left: "-115.17%", top: "-49.37%" },
  { width: "330.49%", height: "198.12%", left: "-221.52%", top: "-49.46%" },
];
const FESTIVAL_IMAGES = ["/images/main/festival-1.webp", "/images/main/festival-2.webp", "/images/main/festival-3.webp"];
const STORY_IMAGES = ["/images/main/story-1.webp", "/images/main/story-2.webp", "/images/main/story-3.webp"];

function Pill({ children }: { children: string }) {
  return <h3 className="mx-auto mb-6 w-fit rounded-full bg-[#474747] px-6 py-2 text-xl font-semibold text-white md:text-[26px]">{children}</h3>;
}

export function GanghwaContents({ videos, festivals, stories }: { videos: ContentCard[]; festivals: ContentCard[]; stories: ContentCard[] }) {
  return (
    <section aria-labelledby="gh-title" className="bg-white">
      <div className={`${CONTAINER} py-12 md:py-16`}>
        <MainTitle id="gh-title" title="강화도 콘텐츠" desc="강화도몰에서 콘텐츠를 즐겨보세요!" />

        <Pill>홍보·숏폼</Pill>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {videos.map((v, i) => (
            <li key={v.id}>
              <Link href={v.href ?? "/help"} className="group block">
                <div className="relative mx-auto aspect-[285/476] max-w-[285px] overflow-hidden rounded-xl bg-stone-200">
                  {v.image ? <Image src={v.image} alt="" fill sizes="285px" className="object-cover" />
                    : <img src="/images/main/promo-videos.webp" alt="" width={2048} height={2048} className="absolute max-w-none" style={PROMO_CROPS[i % 3]} />}
                  <span aria-hidden className="absolute inset-0 m-auto grid size-14 place-items-center rounded-full bg-black/50 text-2xl text-white">▶</span>
                </div>
                <p className="mt-3 text-center font-semibold text-[#353535] group-hover:underline">{v.title}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14"><Pill>축제·행사</Pill></div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {festivals.map((f, i) => (
            <li key={f.id} className="overflow-hidden rounded-xl">
              <div className="relative aspect-square">
                <Image src={f.image ?? FESTIVAL_IMAGES[i % 3]} alt="" fill sizes="(min-width:640px) 305px, 100vw" className="object-cover" loading="eager" />
              </div>
              <div className="bg-[#f4f4f4] p-3">
                <p className="font-semibold text-[#353535]">{f.title}</p>
                <p className="text-sm text-[#585858]">{f.date && `${f.date} · `}{f.summary}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="relative mt-14">
          <Pill>지역 생산자 이야기</Pill>
          <Link href="/search" className="absolute right-0 top-0 inline-flex h-11 items-center text-sm font-medium text-[#454545] hover:underline md:top-1 md:h-9 md:rounded-md md:border md:border-[#d6d6d6] md:px-3 md:hover:no-underline md:hover:bg-[#f4f4f4]">더보기 &gt;</Link>
        </div>
        <ul className="mx-auto grid max-w-[1000px] grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-[13px]">
          {stories.map((s, i) => (
            <li key={s.id} className="group flex flex-col overflow-hidden rounded-[20px] bg-[#f4f4f4] ring-1 ring-black/[0.04] transition-colors duration-300 hover:bg-[#eeeeee]">
              <div className="relative aspect-[323/258] overflow-hidden">
                <Image src={STORY_IMAGES[i % 3]} alt="" fill sizes="(min-width:640px) 323px, 100vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" loading="eager" />
                {(s.region ?? s.name) && (
                  <span className="absolute bottom-1 right-1 max-w-[80%] truncate bg-black/70 px-4 py-1 text-center text-base font-medium tracking-tight text-white md:min-w-[172px] md:text-lg">{s.region ?? s.name}</span>
                )}
              </div>
              <div className="flex flex-1 flex-col px-4 pb-3 pt-5 text-center">
                <p className="text-balance text-xl font-semibold leading-snug tracking-tight text-black md:text-[22px]">&ldquo;{s.quote ?? s.title}&rdquo;</p>
                {s.name && <p className="mt-3 text-base text-[#3f3f3f] md:text-[17px]"><strong className="font-extrabold">{s.name}</strong></p>}
                <p className="mx-auto mt-4 max-w-[30ch] flex-1 text-pretty text-[15px] leading-relaxed text-[#4a4a4a] md:text-base">{s.summary}</p>
                <Link href={s.href ?? "/search"} aria-label={`${s.name ?? s.title} 상품 보기`} className="mt-2 inline-flex h-11 items-center self-end text-base font-medium text-[#454545] hover:underline md:text-lg">상품 보기 &gt;</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
