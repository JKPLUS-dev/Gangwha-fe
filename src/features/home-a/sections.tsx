import { DragScroll } from "@/components/ui/DragScroll";
import Image from "next/image";
import Link from "next/link";
import { CONTAINER } from "@/components/ui/Container";
import { Countdown } from "@/components/ui/Countdown";
import { Tabs } from "@/components/ui/Tabs";
import { getFestivals, getQuickCategories } from "@/features/content/api";
import { getFeaturedSellers, getGiftSets, getProducts, getSellers, getTimeDeals } from "@/features/product/api";
import { REVIEWS, PRODUCTS } from "@/features/product/data/products";
import { CATEGORIES, type Category } from "@/features/product/types";
import { getNotices } from "@/features/support/data";
import { pickVaried } from "@/features/home/pickVaried";
import { formatPrice } from "@/features/product/format";
import { QUICK_ICONS } from "@/features/home/components/main/QuickCategoryIcons";
import { ACard, AGrid, APhoto, SectionA } from "./ui";

/** 1. 히어로 — 사진이 주인공, 세리프 제목만 */
export function AHero() {
  return (
    <section className="bg-white pt-3 md:pt-5">
      <div className={CONTAINER}>
        <div className="relative isolate flex aspect-[4/5] items-end overflow-hidden sm:aspect-[16/9] md:aspect-[21/9]">
          <Image src="/images/paddy.webp" alt="마니산 아래 강화 들녘" fill priority sizes="(min-width:1280px) 1248px, 100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
          <div className="p-5 md:p-10">
            <h1 className="a-hero-title">강화 들녘에서 오늘, 우리 집 식탁으로</h1>
            <Link href="/products" className="a-btn-ghost mt-5">특산품 보러가기 →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 2. 바로가기 — 원형 장식 제거, 정사각 아이콘 */
export async function AQuick() {
  const items = await getQuickCategories();
  return (
    <nav aria-label="바로가기 카테고리" className="a-section-border bg-white">
      <ul className={`${CONTAINER} grid grid-cols-4 gap-x-2 gap-y-5 py-8 md:grid-cols-8 md:py-10`}>
        {items.slice(0, 8).map((c, i) => {
          const ic = QUICK_ICONS[i % QUICK_ICONS.length];
          return (
            <li key={c.slug}>
              <Link
                href={`/search?q=${encodeURIComponent(c.q)}`}
                className="flex min-h-11 flex-col items-center gap-2 focus-visible:outline-2 focus-visible:outline-[var(--a-ssuk)]"
              >
                <span className="relative grid size-14 place-items-center overflow-hidden rounded-[4px] bg-[#f3f3f3] md:size-16">
                  <img src={ic.icon} alt="" width={56} height={56} className="relative size-9 md:size-10" />
                </span>
                <span className="text-[12px] font-medium text-[var(--a-text)] md:text-[13px]">{c.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** 3. 약속 — 카드/원형 번호 제거, 헤어라인 구분 */
const TRUST = [
  { title: "강화 생산자 직접 입점", desc: "13개 읍·면 150곳" },
  { title: "산지에서 바로 출고", desc: "주문 후 1~2일 안에" },
  { title: "냉장·냉동 신선 배송", desc: "수산물은 아이스박스" },
  { title: "원산지 확인", desc: "읍·면 단위 표기" },
];
export function ATrust() {
  return (
    <section aria-label="강화도몰 약속" className="a-section-border bg-white">
      <ul className={`${CONTAINER} grid grid-cols-2 md:grid-cols-4`}>
        {TRUST.map((t, i) => (
          <li
            key={t.title}
            className={`flex min-h-11 flex-col justify-center py-5 ${i > 0 ? "md:border-l md:border-[var(--a-line)] md:pl-6" : ""} ${i % 2 === 1 ? "pl-4 md:pl-6" : ""}`}
          >
            <p className="text-[13px] font-bold text-[var(--a-text)] md:text-[14px]">{t.title}</p>
            <p className="mt-0.5 text-[12px] text-[var(--a-secondary)]">{t.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** 4. 타임특가 */
export async function ATimeDeals() {
  const deals = await getTimeDeals(12);
  const endsAt = deals[0]?.dealEndsAt;
  if (!deals.length || !endsAt) return null;
  return (
    <SectionA id="a-deal" title="타임특가" sub="이번 주만 이 가격">
      <div className="mb-4 flex min-h-11 items-center gap-2 text-[13px] font-bold text-[var(--a-sale)] md:mb-5">
        <span>남음</span>
        <Countdown endsAt={endsAt} />
      </div>
      <AGrid products={pickVaried(deals, 5)} />
    </SectionA>
  );
}

/** 5. 대표 특산품 */
const SIG = [
  { label: "강화섬쌀", q: "쌀", image: "/images/rice.webp" },
  { label: "6년근 인삼", q: "삼", image: "/images/ginseng.webp" },
  { label: "순무", q: "순무", image: "/images/radish.webp" },
  { label: "새우젓", q: "젓", image: "/images/shrimp.webp" },
  { label: "밴댕이", q: "밴댕이", image: "/images/fish.webp" },
  { label: "홍삼", q: "홍삼", image: "/images/redginseng.webp" },
];
export function ASignature() {
  return (
    <SectionA id="a-sig" title="강화 대표 특산품" sub="강화에서만 나는 여섯 가지">
      <DragScroll as="ul" className="-mr-4 flex gap-3 overflow-x-auto pb-1 pr-4 md:mr-0 md:grid md:grid-cols-6 md:gap-5 md:overflow-visible md:pr-0">
        {SIG.map((s) => (
          <li key={s.label} className="w-28 shrink-0 md:w-auto">
            <Link href={`/products?q=${encodeURIComponent(s.q)}`} className="group block focus-visible:outline-2 focus-visible:outline-[var(--a-ssuk)]">
              <APhoto src={s.image} className="a-thumb aspect-square" sizes="160px" />
              <span className="mt-2 block text-center text-[13px] font-medium text-[var(--a-text)]">{s.label}</span>
            </Link>
          </li>
        ))}
      </DragScroll>
    </SectionA>
  );
}

/** 6. BEST — 큰 순위 숫자 */
export async function ABest() {
  const keys: (Category | undefined)[] = [undefined, ...(Object.keys(CATEGORIES) as Category[])];
  const lists = await Promise.all(keys.map((category) => getProducts({ category, sort: "best" })));
  return (
    <SectionA id="a-best" title="BEST" sub="가장 많이 찾는 강화 특산품" moreHref="/products?sort=best">
      <Tabs
        label="BEST 분류"
        tabs={keys.map((k, i) => ({
          label: k ? CATEGORIES[k] : "전체",
          panel: <AGrid products={pickVaried(lists[i], 5)} ranked />,
        }))}
      />
    </SectionA>
  );
}

/** 7. 기획전 — 큰 이미지 + 컴팩트 상품 리스트 */
export async function ABanner() {
  const deals = pickVaried(await getTimeDeals(8), 4);
  return (
    <SectionA id="a-banner" title="이달의 기획전" sub="강화 대표 특산물" moreHref="/deals">
      <div className="grid gap-5 lg:grid-cols-12 lg:gap-8">
        <Link href="/deals" className="group relative block aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[380px]">
          <Image
            src="/images/main/hero.webp"
            alt="강화도의 자연을 담다, 강화 대표 특산물 기획전"
            fill
            sizes="(min-width:1024px) 58vw, 100vw"
            className="object-cover object-left transition duration-300 group-hover:scale-[1.04]"
          />
        </Link>
        <ul className="flex flex-col divide-y divide-[var(--a-line)] lg:col-span-5 lg:justify-center">
          {deals.map((p) => {
            const sale = p.salePrice;
            const rate = sale ? Math.round((1 - sale / p.price) * 100) : 0;
            return (
              <li key={p.id}>
                <Link href={`/products/${p.id}`} className="group flex min-h-11 items-center gap-3 py-3 focus-visible:outline-2 focus-visible:outline-[var(--a-ssuk)]">
                  <span className="a-thumb relative size-[72px] shrink-0 overflow-hidden bg-[#f3f3f3]">
                    {p.image ? (
                      <Image src={p.image} alt="" fill sizes="72px" className="object-cover transition duration-300 group-hover:scale-[1.04]" />
                    ) : null}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="a-origin block">{p.origin}</span>
                    <span className="a-name-one">{p.name}</span>
                    <span className="a-price-row">
                      {rate > 0 ? <span className="a-sale">{rate}%</span> : null}
                      <span className="a-price">{formatPrice(sale ?? p.price)}</span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
          {!deals.length ? <li className="py-8 text-[13px] text-[var(--a-secondary)]">준비 중이에요.</li> : null}
        </ul>
      </div>
    </SectionA>
  );
}

/** 8. 제철 — 가로 스크롤 */
export async function ASeasonal() {
  const [kimchi, jeot] = await Promise.all([getProducts({ q: "순무" }), getProducts({ q: "젓" })]);
  const picks = pickVaried([...kimchi, ...jeot], 8);
  return (
    <SectionA id="a-season" title="지금 제철" sub="순무·새우젓으로 김장 준비" moreHref="/products?q=%EC%88%9C%EB%AC%B4">
      <DragScroll as="ul" className="-mr-4 flex gap-3 overflow-x-auto pb-1 pr-4 md:gap-5">
        {picks.map((p) => (
          <li key={p.id} className="w-[42%] shrink-0 sm:w-[30%] md:w-[22%] lg:w-[18%]">
            <ACard product={p} />
          </li>
        ))}
      </DragScroll>
    </SectionA>
  );
}

/** 9. 신상품 */
export async function ANew() {
  const products = pickVaried((await getProducts({ sort: "new" })).filter((p) => p.image && !p.soldOut), 10);
  return (
    <SectionA id="a-new" title="신상품" sub="이번 주 새로 들어온 특산품" moreHref="/products?sort=new">
      <AGrid products={products} />
    </SectionA>
  );
}

/** 10. 선물세트 */
export async function AGift() {
  const sets = pickVaried(await getGiftSets(16), 5);
  if (!sets.length) return null;
  return (
    <SectionA id="a-gift" title="선물세트" sub="인삼·섬쌀·젓갈 선물 포장" moreHref="/products?q=%EC%84%B8%ED%8A%B8">
      <AGrid products={sets} />
    </SectionA>
  );
}

/** 11. 배송 과정 */
const STEPS = [
  { title: "주문", desc: "오후 2시 전 주문은 당일 생산자에게 전달돼요." },
  { title: "수확·포장", desc: "그날 수확하거나 손질해서 포장해요." },
  { title: "산지 출고", desc: "중간 창고 없이 강화에서 바로 출고해요." },
  { title: "도착", desc: "대부분 출고 다음 날 받아보세요." },
];
export function AHowItShips() {
  return (
    <SectionA id="a-ship" title="산지직송 과정" sub="강화에서 식탁까지">
      <ol className="grid gap-0 md:grid-cols-4">
        {STEPS.map((s, i) => (
          <li
            key={s.title}
            className={`border-t border-[var(--a-line)] py-5 md:border-t-0 md:border-l md:px-5 md:py-0 first:md:border-l-0 first:md:pl-0`}
          >
            <p className="a-label">0{i + 1}</p>
            <p className="mt-2 text-[15px] font-bold text-[var(--a-text)]">{s.title}</p>
            <p className="mt-1 text-[13px] text-[var(--a-secondary)]">{s.desc}</p>
          </li>
        ))}
      </ol>
    </SectionA>
  );
}

/** 12. 생산자 — 유일한 틴트 배경, 좌 사진 / 우 텍스트 매거진 */
const STORY_IMAGES = ["/images/main/story-1.webp", "/images/main/story-2.webp", "/images/main/story-3.webp"];
export async function AProducers() {
  const sellers = (await getFeaturedSellers()).slice(0, 3);
  if (!sellers.length) return null;
  return (
    <SectionA id="a-prod" title="이달의 생산자" sub="누가 키웠는지 보여드려요" moreHref="/sellers/s1" tone="paper">
      <ul className="flex flex-col gap-8 md:gap-10">
        {sellers.map((s, i) => (
          <li key={s.id}>
            <Link
              href={`/sellers/${s.id}`}
              className={`group grid items-center gap-5 md:grid-cols-12 md:gap-8 focus-visible:outline-2 focus-visible:outline-[var(--a-ssuk)] ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="md:col-span-7">
                <APhoto src={STORY_IMAGES[i % 3]} className="a-thumb aspect-[3/2]" sizes="(min-width:768px) 58vw, 100vw" />
              </div>
              <div className="md:col-span-5">
                <p className="a-label">{s.area}</p>
                <p className="mt-2 text-[15px] font-bold text-[var(--a-text)]">{s.name}</p>
                <p className="a-quote mt-4">“{s.interview}”</p>
                <span className="mt-5 inline-flex min-h-11 items-center text-[13px] font-medium text-[var(--a-ssuk)] underline-offset-4 group-hover:underline">
                  생산자 상점 보기 →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SectionA>
  );
}

/** 13. 농부 상점 배너 */
export function AFarmerBanner() {
  return (
    <section aria-label="자연을 담은 농부 상점" className="a-section-border bg-white">
      <div className={`${CONTAINER} py-8 md:py-10`}>
        <Link href="/sellers/s1" className="relative block aspect-[1200/259] overflow-hidden">
          <img
            src="/images/main/farmer-banner.webp"
            alt="자연을 담은 농부 상점, 바로가기"
            width={2752}
            height={1536}
            className="absolute max-w-none"
            style={{ width: "121.92%", height: "315.29%", left: "-21.9%", top: "-108.68%" }}
          />
        </Link>
      </div>
    </section>
  );
}

/** 14. 갯벌 */
export function ATidal() {
  return (
    <section aria-labelledby="a-tidal" className="a-section-border bg-white">
      <div className={`${CONTAINER} a-section`}>
        <div className="relative isolate overflow-hidden">
          <div className="relative aspect-[16/9] md:aspect-[21/8]">
            <Image src="/images/scenery2.webp" alt="" fill sizes="(min-width:1280px) 1248px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-5 md:p-10">
              <h2 id="a-tidal" className="max-w-md text-[22px] font-bold leading-snug tracking-tight text-white md:text-[28px]">
                강화 갯벌과 해풍이 맛을 만들어요
              </h2>
              <Link href="/products?category=seafood" className="a-btn-ghost mt-5">갯벌 수산물 보기 →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 15. 강화 이야기 */
const STORIES = [
  { title: "세계 5대 갯벌, 강화 갯벌 이야기", image: "/images/scenery2.webp", tag: "갯벌" },
  { title: "고려 때부터 이어온 강화 인삼", image: "/images/ginseng.webp", tag: "인삼" },
  { title: "석 달을 엮는 왕골 화문석", image: "/images/hero.webp", tag: "공예" },
];
export function AStories() {
  return (
    <SectionA id="a-story" title="강화 이야기" sub="읽을거리">
      <ul className="grid gap-6 md:grid-cols-3 md:gap-5">
        {STORIES.map((s) => (
          <li key={s.title}>
            <Link href="/help" className="group block focus-visible:outline-2 focus-visible:outline-[var(--a-ssuk)]">
              <APhoto src={s.image} className="a-thumb aspect-[4/3]" sizes="(min-width:768px) 33vw, 100vw" />
              <p className="a-label mt-3">{s.tag}</p>
              <h3 className="mt-1 text-[15px] font-bold leading-snug text-[var(--a-text)] group-hover:underline">{s.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </SectionA>
  );
}

const FESTIVAL_IMAGES = ["/images/main/festival-1.webp", "/images/main/festival-2.webp", "/images/main/festival-3.webp"];
export async function AFestivals() {
  const festivals = await getFestivals();
  return (
    <SectionA id="a-fest" title="축제·행사" sub="강화에서 열려요">
      <ul className="grid gap-6 sm:grid-cols-3 md:gap-5">
        {festivals.map((f, i) => (
          <li key={f.id}>
            <div className="relative aspect-square overflow-hidden">
              <Image src={f.image ?? FESTIVAL_IMAGES[i % 3]} alt="" fill loading="eager" sizes="(min-width:640px) 33vw, 100vw" className="object-cover" />
            </div>
            <p className="mt-3 text-[15px] font-bold text-[var(--a-text)]">{f.title}</p>
            <p className="mt-1 text-[12px] text-[var(--a-secondary)]">{f.date && `${f.date} · `}{f.summary}</p>
          </li>
        ))}
      </ul>
    </SectionA>
  );
}

/** 16. 읍·면 */
const REGIONS = ["강화읍", "선원면", "불은면", "길상면", "화도면", "양도면", "내가면", "하점면", "양사면", "송해면", "교동면", "삼산면", "서도면"];
export async function ARegion() {
  const [sellers, products] = await Promise.all([getSellers(), getProducts({ sort: "best" })]);
  const areaOf = new Map(sellers.map((s) => [s.id, s.area]));
  return (
    <SectionA id="a-region" title="산지에서 고르기" sub="13개 읍·면">
      <Tabs
        label="강화 읍·면"
        variant="chip"
        tabs={REGIONS.map((r) => ({
          label: r,
          panel: <AGrid products={pickVaried(products.filter((p) => areaOf.get(p.sellerId) === r), 5)} empty={`${r} 상품은 곧 입점 예정이에요.`} />,
        }))}
      />
    </SectionA>
  );
}

/** 17. 후기 — 박스 없이 인용 타이포 */
export function AReviews() {
  const names = new Map(PRODUCTS.map((p) => [p.id, p.name]));
  const picked = new Set<string>();
  const reviews = REVIEWS.filter((r) => {
    const key = names.get(r.productId)?.split(" ")[1] ?? r.productId;
    if (r.rating !== 5 || picked.has(key) || picked.has(r.body)) return false;
    picked.add(key).add(r.body);
    return true;
  }).slice(0, 3);
  if (!reviews.length) return null;
  return (
    <SectionA id="a-review" title="구매 후기" sub="먼저 받아본 분들">
      <ul className="grid gap-0 md:grid-cols-2">
        {reviews.map((r, i) => (
          <li
            key={r.id}
            className={`border-t border-[var(--a-line)] py-6 md:border-t-0 md:px-6 md:py-0 ${i === 0 ? "md:border-r md:pl-0" : ""} ${i === 1 ? "md:pr-0" : ""} ${i > 1 ? "md:col-span-2 md:border-t md:pt-6 md:mt-6" : ""}`}
          >
            <p className="text-[13px] font-bold text-[var(--a-ssuk)]" aria-label={`별점 ${r.rating}점`}>
              {"★".repeat(r.rating)}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--a-text)] md:text-[16px]">{r.body}</p>
            <Link href={`/products/${r.productId}`} className="mt-4 inline-flex min-h-11 items-center text-[12px] text-[var(--a-secondary)] hover:text-[var(--a-text)]">
              {r.author} · {names.get(r.productId)}
            </Link>
          </li>
        ))}
      </ul>
    </SectionA>
  );
}

/** 18. 입점 CTA */
export function ASellerCta() {
  return (
    <section aria-labelledby="a-cta" className="a-section-border bg-white">
      <div className={`${CONTAINER} a-section`}>
        <div className="flex flex-col gap-5 border border-[var(--a-line)] px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10 md:py-10">
          <div>
            <h2 id="a-cta" className="a-title">강화 생산자라면, 내 상점을 열어보세요</h2>
            <p className="a-sub mt-2">상품 등록부터 정산까지 함께해요.</p>
          </div>
          <Link href="/seller/apply" className="a-btn shrink-0">입점 신청하기</Link>
        </div>
      </div>
    </section>
  );
}

/** 19. 공지 + 고객센터 */
export async function ANotice() {
  const notices = await getNotices();
  return (
    <section aria-label="공지사항과 고객센터" className="a-section-border bg-white">
      <div className={`${CONTAINER} grid gap-8 py-10 md:grid-cols-2 md:gap-10 md:py-14`}>
        <div>
          <h2 className="a-title">공지사항</h2>
          <ul className="mt-4 divide-y divide-[var(--a-line)] border-t border-[var(--a-line)]">
            {notices.slice(0, 3).map((n) => (
              <li key={n.id}>
                <Link href="/help" className="flex min-h-11 items-center justify-between gap-4 text-[14px] text-[var(--a-text)] hover:text-[var(--a-ssuk)]">
                  <span className="line-clamp-1">{n.title}</span>
                  <span className="shrink-0 text-[12px] text-[var(--a-secondary)]">{n.createdAt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="a-title">고객센터</h2>
          <p className="mt-4 text-[28px] font-bold tracking-tight text-[var(--a-text)] md:text-[32px]">1644-3777</p>
          <p className="mt-1 text-[13px] text-[var(--a-secondary)]">평일 09:00–18:00 · 주말·공휴일 휴무</p>
          <Link href="/help" className="a-btn mt-5">자주 묻는 질문</Link>
        </div>
      </div>
    </section>
  );
}

/** 20. 배송 안내 */
const INFO = [
  { title: "무료배송", desc: "3만 원 이상 구매 시" },
  { title: "냉장·냉동 출고", desc: "월~목 출고" },
  { title: "도서산간", desc: "추가 배송비가 있어요" },
];
export function AShipping() {
  return (
    <section aria-label="배송 안내" className="a-section-border bg-white">
      <ul className={`${CONTAINER} grid gap-2 py-5 md:grid-cols-3 md:gap-4`}>
        {INFO.map((i) => (
          <li key={i.title} className="text-[13px]">
            <span className="font-bold text-[var(--a-ssuk)]">{i.title}</span>
            <span className="ml-2 text-[var(--a-secondary)]">{i.desc}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
