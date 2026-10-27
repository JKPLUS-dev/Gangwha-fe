import { CONTAINER } from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { ContentCard } from "@/features/content/data";
import { FadeInSection } from "./FadeInSection";
import { MainTitle } from "./MainTitle";

const PROMO_CROPS: CSSProperties[] = [
  { width: "330.49%", height: "198.12%", left: "-8.97%", top: "-49.73%" },
  { width: "330.49%", height: "197.59%", left: "-115.17%", top: "-49.37%" },
  { width: "330.49%", height: "198.12%", left: "-221.52%", top: "-49.46%" },
];
const FESTIVAL_IMAGES = ["/images/main/festival-1.webp", "/images/main/festival-2.webp", "/images/main/festival-3.webp"];
const STORY_IMAGES = ["/images/main/story-1.webp", "/images/main/story-2.webp", "/images/main/story-3.webp"];

// 피그마 home_reco_more: 80x31, #fff, 1px #B5B5B5, r10, 14/500 #474747 + chevron 1.5px. 보이는 박스는 그대로, 터치 영역만 44px로 넓혀요.
export function MoreButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="relative inline-flex h-[31px] w-20 shrink-0 items-center rounded-[10px] border border-[#B5B5B5] bg-white pl-[13px] text-[14px] font-medium leading-[17px] text-[#474747] after:absolute after:-inset-x-0 after:-inset-y-[7px] after:content-[''] hover:bg-[#f7f7f7] focus-visible:outline-2 focus-visible:outline-brand"
    >
      더보기
      <svg aria-hidden="true" width="6" height="10" viewBox="0 0 6 10" className="absolute right-[13px] top-1/2 -translate-y-1/2">
        <path d="M1 1l4 4-4 4" fill="none" stroke="#474747" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

function SubHead({ children, moreHref }: { children: string; moreHref?: string }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4 border-b border-[#e5e5e5] pb-2">
      <h3 className="text-left text-sm font-bold text-[#222222] md:text-[15px]">{children}</h3>
      {moreHref && <MoreButton href={moreHref} />}
    </div>
  );
}

export function GanghwaContents({ videos, festivals, stories }: { videos: ContentCard[]; festivals: ContentCard[]; stories: ContentCard[] }) {
  return (
    <section aria-labelledby="gh-title" className="border-b border-[#e5e5e5] bg-white">
      <FadeInSection className={`${CONTAINER} py-14 md:py-24`}>
        <MainTitle id="gh-title" kicker="GANGHWA STORY" title="강화도 콘텐츠" desc="강화도몰에서 콘텐츠를 즐겨보세요!" />

        <SubHead moreHref="/search?q=%EA%B0%95%ED%99%94">홍보·숏폼</SubHead>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {videos.map((v, i) => (
            <li key={v.id} className={i > 1 ? "max-sm:hidden" : undefined}>
              <Link href={v.href ?? "/help"} className="group block">
                <div className="relative aspect-[285/476] overflow-hidden rounded bg-[#f4f2ee]">
                  {v.image ? (
                    <Image src={v.image} alt="" fill sizes="285px" className="object-cover" />
                  ) : (
                    <img src="/images/main/promo-videos.webp" alt="" width={2048} height={2048} className="absolute max-w-none" style={PROMO_CROPS[i % 3]} />
                  )}
                  <span aria-hidden className="absolute inset-0 m-auto grid size-11 place-items-center rounded-full bg-black/55 text-sm text-white">
                    ▶
                  </span>
                </div>
                <p className="mt-2 text-left text-sm font-semibold text-[#222222] group-hover:underline">{v.title}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <SubHead moreHref="/search?q=%EC%B6%95%EC%A0%9C">축제·행사</SubHead>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {festivals.map((f, i) => (
            <li key={f.id} className={`overflow-hidden border border-[#e5e5e5] ${i > 1 ? "max-sm:hidden" : ""}`}>
              <div className="relative aspect-square bg-[#f4f2ee]">
                <Image src={f.image ?? FESTIVAL_IMAGES[i % 3]} alt="" fill sizes="(min-width:640px) 305px, 50vw" className="object-cover" loading="eager" />
              </div>
              <div className="p-3">
                <p className="text-sm font-bold text-[#222222]">{f.title}</p>
                <p className="mt-1 text-[13px] text-[#6b6b6b]">
                  {f.date && `${f.date} · `}
                  {f.summary}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="relative mt-10">
          <SubHead>지역 생산자 이야기</SubHead>
          <Link
            href="/search"
            className="absolute right-0 top-0 inline-flex h-11 min-w-11 items-center justify-end text-[13px] font-medium text-[#6b6b6b] hover:text-[#222222] md:h-auto"
          >
            더보기
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {stories.map((s, i) => (
            <li key={s.id} className={`group grid grid-cols-1 overflow-hidden border border-[#e5e5e5] sm:block ${i > 1 ? "max-sm:hidden" : ""}`}>
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f2ee]">
                <Image
                  src={STORY_IMAGES[i % 3]}
                  alt=""
                  fill
                  sizes="(min-width:640px) 323px, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                  loading="eager"
                />
                {(s.region ?? s.name) && (
                  <span className="absolute bottom-0 left-0 bg-black/70 px-2 py-1 text-[12px] font-medium text-white">
                    {s.region ?? s.name}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-3.5 text-left">
                <p className="text-[15px] font-semibold leading-snug text-[#222222]">&ldquo;{s.quote ?? s.title}&rdquo;</p>
                {s.name && (
                  <p className="mt-1.5 text-[13px] text-[#6b6b6b]">
                    <strong className="font-bold text-[#222222]">{s.name}</strong>
                  </p>
                )}
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-[#6b6b6b]">{s.summary}</p>
                <Link
                  href={s.href ?? "/search"}
                  aria-label={`${s.name ?? s.title} 상품 보기`}
                  className="mt-2 inline-flex h-11 items-center self-start text-[13px] font-semibold text-[#3f6b4f] hover:underline md:h-auto"
                >
                  상품 보기
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </FadeInSection>
    </section>
  );
}
