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

        <div className="mt-14"><Pill>지역 생산자 이야기</Pill></div>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stories.map((s, i) => (
            <li key={s.id} className="flex flex-col overflow-hidden rounded-xl border border-stone-200">
              <div className="relative aspect-[3/2]"><Image src={STORY_IMAGES[i % 3]} alt="" fill sizes="(min-width:640px) 305px, 100vw" className="object-cover" loading="eager" /></div>
              <div className="flex flex-1 flex-col p-4">
                <p className="font-bold text-[#353535]">&ldquo;{s.title}&rdquo;</p>
                <p className="mt-1 flex-1 text-sm text-[#585858]">{s.summary}</p>
                <Link href={s.href ?? "/search"} className="mt-3 inline-flex h-11 items-center self-end text-sm font-semibold text-[#474747] hover:underline">상품 보기 &gt;</Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
