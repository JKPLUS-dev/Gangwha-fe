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
import { QUICK_ICONS } from "@/features/home/components/main/QuickCategoryIcons";
import { ACard, AGrid, APhoto, Leaf, SectionA, Wave } from "./ui";

const btnGreen = "inline-flex h-12 items-center justify-center rounded-full bg-[#2f5d3a] px-7 text-base font-bold text-white transition hover:bg-[#244a2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5d3a]";
const btnWhite = "inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-base font-bold text-[#2f5d3a] transition hover:bg-[#eef4ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// 1. 히어로: 큰 사진 + 한 줄 + 버튼 하나
export function AHero() {
  return (
    <section className="bg-[#fbf8f1] pt-3 md:pt-6">
      <div className={CONTAINER}>
        <div className="relative isolate flex aspect-[4/5] items-end overflow-hidden rounded-3xl sm:aspect-[16/9] md:aspect-[21/9]">
          <Image src="/images/paddy.webp" alt="마니산 아래 강화 들녘" fill priority sizes="(min-width:1280px) 1248px, 100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
          <div className="p-6 md:p-12">
            <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">강화 들녘에서 오늘, 우리 집 식탁으로</h1>
            <Link href="/products" className={`${btnWhite} mt-6`}>강화 특산품 보기</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// 2. 원형 아이콘
export async function AQuick() {
  const items = await getQuickCategories();
  return (
    <nav aria-label="바로가기 카테고리" className="bg-[#fbf8f1]">
      <ul className={`${CONTAINER} grid grid-cols-4 gap-y-6 py-10 md:grid-cols-8 md:py-12`}>
        {items.slice(0, 8).map((c, i) => {
          const ic = QUICK_ICONS[i % QUICK_ICONS.length];
          return (
            <li key={c.slug}>
              <Link href={`/search?q=${encodeURIComponent(c.q)}`} className="group flex min-h-11 flex-col items-center gap-2 rounded-2xl focus-visible:outline-2 focus-visible:outline-[#2f5d3a]">
                <span className="relative grid size-16 place-items-center rounded-full bg-[#FF9700] shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition group-hover:-translate-y-1 md:size-[72px]">
                  {ic.ring && <img src={ic.ring} alt="" width={78} height={78} className="absolute inset-0 size-full" />}
                  <img src={ic.icon} alt="" width={56} height={56} className="relative size-9 md:size-11" />
                </span>
                <span className="text-sm font-semibold text-stone-700">{c.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// 3. 약속 띠
const TRUST = [
  { title: "강화 생산자 직접 입점", desc: "13개 읍·면 150곳" },
  { title: "산지에서 바로 출고", desc: "주문 후 1~2일 안에" },
  { title: "냉장·냉동 신선 배송", desc: "수산물은 아이스박스" },
  { title: "원산지 확인", desc: "읍·면 단위 표기" },
];
export function ATrust() {
  return (
    <section aria-label="강화도몰 약속" className="bg-[#fbf8f1]">
      <ul className={`${CONTAINER} grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6`}>
        {TRUST.map((t, i) => (
          <li key={t.title} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(47,93,58,0.06)]">
            <span aria-hidden className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${["bg-[#2f5d3a]", "bg-[#1d5f8a]", "bg-[#c2410c]", "bg-[#2f5d3a]"][i]}`}>{i + 1}</span>
            <div><p className="font-semibold text-stone-900">{t.title}</p><p className="text-sm text-stone-600">{t.desc}</p></div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// 4. 타임특가 (시계 장식)
export async function ATimeDeals() {
  const deals = await getTimeDeals(12);
  const endsAt = deals[0]?.dealEndsAt;
  if (!deals.length || !endsAt) return null;
  return (
    <section aria-labelledby="a-deal" className="relative overflow-hidden bg-[#fbf8f1]">
      <Image src="/images/exhibition-clock.png" alt="" aria-hidden width={583} height={533} className="pointer-events-none absolute -right-10 top-6 hidden w-64 opacity-20 lg:block" />
      <div className={`${CONTAINER} relative py-14 md:py-20`}>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <h2 id="a-deal" className="text-2xl font-bold tracking-tight text-stone-900 md:text-[32px]">타임특가</h2>
            <p className="mt-2 text-base text-stone-600">이번 주만 이 가격이에요.</p>
          </div>
          <p className="inline-flex h-11 items-center gap-2 rounded-full bg-[#c2410c] px-5 font-bold text-white">남은 시간 <Countdown endsAt={endsAt} /></p>
        </div>
        <AGrid products={pickVaried(deals, 5)} />
      </div>
    </section>
  );
}

// 5. 대표 특산품
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
    <SectionA id="a-sig" title="강화 대표 특산품" sub="강화에서만 나는 여섯 가지 맛" tone="white" deco="wave">
      <DragScroll as="ul" className="-mr-4 flex gap-4 overflow-x-auto pb-2 pr-4 md:mr-0 md:grid md:grid-cols-6 md:gap-6 md:overflow-visible md:pr-0">
        {SIG.map((s) => (
          <li key={s.label} className="w-32 shrink-0 md:w-auto">
            <Link href={`/products?q=${encodeURIComponent(s.q)}`} className="group block text-center focus-visible:outline-2 focus-visible:outline-[#2f5d3a]">
              <APhoto src={s.image} className="aspect-square rounded-3xl" sizes="200px" />
              <span className="mt-3 block font-semibold text-stone-800">{s.label}</span>
            </Link>
          </li>
        ))}
      </DragScroll>
    </SectionA>
  );
}

// 6. BEST
export async function ABest() {
  const keys: (Category | undefined)[] = [undefined, ...(Object.keys(CATEGORIES) as Category[])];
  const lists = await Promise.all(keys.map((category) => getProducts({ category, sort: "best" })));
  return (
    <SectionA id="a-best" title="BEST" sub="가장 많이 찾는 강화 특산품" moreHref="/products?sort=best">
      <Tabs label="BEST 분류" tabs={keys.map((k, i) => ({ label: k ? CATEGORIES[k] : "전체", panel: <AGrid products={pickVaried(lists[i], 5)} /> }))} />
    </SectionA>
  );
}

// 7. 기획 배너
export function ABanner() {
  return (
    <section aria-label="강화도몰 기획 배너" className="bg-[#fbf8f1]">
      <div className={CONTAINER}>
        <Link href="/deals" className="group relative block aspect-[1480/560] overflow-hidden rounded-3xl sm:aspect-[1480/450] md:aspect-[1480/367]">
          <Image src="/images/main/hero.webp" alt="강화도의 자연을 담다, 강화 대표 특산물 기획전 보러가기" fill sizes="(min-width:1280px) 1248px, 100vw" className="object-cover object-left transition duration-500 group-hover:scale-[1.02]" />
        </Link>
      </div>
    </section>
  );
}

// 8. 제철
export async function ASeasonal() {
  const [kimchi, jeot] = await Promise.all([getProducts({ q: "순무" }), getProducts({ q: "젓" })]);
  const picks = [...kimchi.slice(0, 3), ...jeot.slice(0, 3), ...kimchi.slice(3), ...jeot.slice(3)].slice(0, 6);
  return (
    <SectionA id="a-season" title="지금 강화는 순무·새우젓 제철" sub="알싸한 순무와 가을 추젓으로 김장 준비" tone="green">
      <div className="grid gap-6 lg:grid-cols-5">
        <Link href="/products?q=%EC%88%9C%EB%AC%B4" className="group relative block min-h-72 overflow-hidden rounded-3xl lg:col-span-2">
          <APhoto src="/images/sunmu.webp" alt="강화 순무김치" className="aspect-[4/3] min-h-72 lg:aspect-auto lg:h-full" sizes="(min-width:1024px) 40vw, 100vw" />
          <span className={`${btnWhite} absolute bottom-6 left-6`}>제철 상품 보기</span>
        </Link>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:col-span-3">{picks.map((p) => <li key={p.id}><ACard product={p} /></li>)}</ul>
      </div>
    </SectionA>
  );
}

// 9. 신상품
export async function ANew() {
  const products = pickVaried((await getProducts({ sort: "new" })).filter((p) => p.image && !p.soldOut), 10);
  return <SectionA id="a-new" title="이번 주 신상품" sub="새로 들어온 강화 특산품" moreHref="/products?sort=new" tone="white" deco="wave"><AGrid products={products} /></SectionA>;
}

// 10. 선물세트
export async function AGift() {
  const sets = pickVaried(await getGiftSets(16), 5);
  if (!sets.length) return null;
  return (
    <SectionA id="a-gift" title="강화 선물세트관" sub="인삼, 섬쌀, 젓갈을 선물 포장해 보내드려요" moreHref="/products?q=%EC%84%B8%ED%8A%B8">
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 max-md:[&>li:nth-child(odd):last-child]:hidden">{sets.map((p) => <li key={p.id}><ACard product={p} /></li>)}</ul>
    </SectionA>
  );
}

// 11. 배송 과정
const STEPS = [
  { title: "주문", desc: "오후 2시 전 주문은 당일 생산자에게 전달돼요." },
  { title: "수확·포장", desc: "그날 수확하거나 손질해서 포장해요." },
  { title: "산지 출고", desc: "중간 창고 없이 강화에서 바로 출고해요." },
  { title: "도착", desc: "대부분 출고 다음 날 받아보세요." },
];
export function AHowItShips() {
  return (
    <SectionA id="a-ship" title="강화에서 식탁까지 하루" sub="산지직송은 이렇게" tone="white" deco="wave">
      <ol className="grid gap-4 md:grid-cols-4 md:gap-6">
        {STEPS.map((s, i) => (
          <li key={s.title} className="rounded-3xl bg-[#fbf8f1] p-6">
            <span className="text-sm font-bold text-[#1d5f8a]">STEP {i + 1}</span>
            <p className="mt-1 text-lg font-bold text-stone-900">{s.title}</p>
            <p className="mt-1 text-stone-600">{s.desc}</p>
          </li>
        ))}
      </ol>
    </SectionA>
  );
}

// 12. 생산자
const STORY_IMAGES = ["/images/main/story-1.webp", "/images/main/story-2.webp", "/images/main/story-3.webp"];
export async function AProducers() {
  const sellers = (await getFeaturedSellers()).slice(0, 3);
  if (!sellers.length) return null;
  return (
    <SectionA id="a-prod" title="이달의 생산자" sub="누가 키웠는지 보여드려요" moreHref="/sellers/s1">
      <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
        {sellers.map((s, i) => (
          <li key={s.id}>
            <Link href={`/sellers/${s.id}`} className="group block h-full overflow-hidden rounded-3xl bg-white shadow-[0_2px_12px_rgba(47,93,58,0.08)] transition hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[#2f5d3a]">
              <APhoto src={STORY_IMAGES[i % 3]} className="aspect-[3/2]" sizes="(min-width:768px) 33vw, 100vw" />
              <div className="p-5">
                <p className="text-sm font-semibold text-[#2f5d3a]">{s.area} · {s.name}</p>
                <p className="mt-2 text-lg font-bold leading-snug text-stone-900">“{s.interview}”</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </SectionA>
  );
}

// 13. 농부 상점 배너
export function AFarmerBanner() {
  return (
    <section aria-label="자연을 담은 농부 상점" className="bg-[#fbf8f1]">
      <div className={CONTAINER}>
        <Link href="/sellers/s1" className="relative block aspect-[1200/259] overflow-hidden rounded-3xl">
          <img src="/images/main/farmer-banner.webp" alt="자연을 담은 농부 상점, 바로가기" width={2752} height={1536} className="absolute max-w-none" style={{ width: "121.92%", height: "315.29%", left: "-21.9%", top: "-108.68%" }} />
        </Link>
      </div>
    </section>
  );
}

// 14. 갯벌 배너
export function ATidal() {
  return (
    <section aria-labelledby="a-tidal" className="bg-[#fbf8f1] py-14 md:py-20">
      <div className={CONTAINER}>
        <div className="relative isolate overflow-hidden rounded-3xl px-6 py-14 md:px-12 md:py-20">
          <Image src="/images/scenery2.webp" alt="" fill sizes="(min-width:1280px) 1248px, 100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1d5f8a]/90 to-[#1d5f8a]/30" />
          <Wave className="pointer-events-none absolute right-6 top-6 h-6 w-28 opacity-80" />
          <h2 id="a-tidal" className="max-w-lg text-2xl font-bold leading-snug text-white md:text-[32px]">강화 갯벌과 해풍이 맛을 만들어요</h2>
          <Link href="/products?category=seafood" className={`${btnWhite} mt-6`}>갯벌 수산물 보기</Link>
        </div>
      </div>
    </section>
  );
}

// 15. 강화 이야기 + 축제
const STORIES = [
  { title: "세계 5대 갯벌, 강화 갯벌 이야기", image: "/images/scenery2.webp", tag: "갯벌" },
  { title: "고려 때부터 이어온 강화 인삼", image: "/images/ginseng.webp", tag: "인삼" },
  { title: "석 달을 엮는 왕골 화문석", image: "/images/hero.webp", tag: "공예" },
];
export function AStories() {
  return (
    <SectionA id="a-story" title="강화 이야기" sub="읽을거리" tone="white" deco="wave">
      <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
        {STORIES.map((s) => (
          <li key={s.title}>
            <Link href="/help" className="group block focus-visible:outline-2 focus-visible:outline-[#2f5d3a]">
              <div className="relative">
                <APhoto src={s.image} className="aspect-[4/3] rounded-3xl" sizes="(min-width:768px) 33vw, 100vw" />
                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#2f5d3a]">{s.tag}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-stone-900 group-hover:underline">{s.title}</h3>
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
      <ul className="grid gap-4 sm:grid-cols-3 md:gap-6">
        {festivals.map((f, i) => (
          <li key={f.id} className="overflow-hidden rounded-3xl bg-white shadow-[0_2px_12px_rgba(47,93,58,0.08)]">
            <div className="relative aspect-square"><Image src={f.image ?? FESTIVAL_IMAGES[i % 3]} alt="" fill loading="eager" sizes="(min-width:640px) 33vw, 100vw" className="object-cover" /></div>
            <div className="p-5">
              <p className="text-lg font-bold text-stone-900">{f.title}</p>
              <p className="mt-1 text-sm text-stone-600">{f.date && `${f.date} · `}{f.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </SectionA>
  );
}

// 16. 읍·면
const REGIONS = ["강화읍", "선원면", "불은면", "길상면", "화도면", "양도면", "내가면", "하점면", "양사면", "송해면", "교동면", "삼산면", "서도면"];
export async function ARegion() {
  const [sellers, products] = await Promise.all([getSellers(), getProducts({ sort: "best" })]);
  const areaOf = new Map(sellers.map((s) => [s.id, s.area]));
  return (
    <SectionA id="a-region" title="산지에서 고르기" sub="13개 읍·면" tone="white" deco="wave">
      <Tabs label="강화 읍·면" variant="chip" tabs={REGIONS.map((r) => ({ label: r, panel: <AGrid products={pickVaried(products.filter((p) => areaOf.get(p.sellerId) === r), 5)} empty={`${r} 상품은 곧 입점 예정이에요.`} /> }))} />
    </SectionA>
  );
}

// 17. 후기
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
      <ul className="grid gap-4 md:grid-cols-3 md:gap-6">
        {reviews.map((r) => (
          <li key={r.id} className="rounded-3xl bg-white p-6 shadow-[0_2px_12px_rgba(47,93,58,0.06)]">
            <p className="text-[#c2410c]" aria-label={`별점 ${r.rating}점`}>{"★".repeat(r.rating)}</p>
            <p className="mt-3 leading-relaxed text-stone-800">{r.body}</p>
            <Link href={`/products/${r.productId}`} className="mt-4 inline-flex min-h-11 items-center text-sm text-stone-600 hover:text-stone-900">{r.author} · {names.get(r.productId)}</Link>
          </li>
        ))}
      </ul>
    </SectionA>
  );
}

// 18. 입점 CTA
export function ASellerCta() {
  return (
    <section aria-labelledby="a-cta" className="bg-[#fbf8f1] pb-14 md:pb-20">
      <div className={CONTAINER}>
        <div className="relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-[#2f5d3a] p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <Leaf className="pointer-events-none absolute -bottom-4 right-10 size-32 opacity-60" />
          <div>
            <h2 id="a-cta" className="text-2xl font-bold text-white md:text-[32px]">강화 생산자라면, 내 상점을 열어보세요</h2>
            <p className="mt-2 text-white/90">상품 등록부터 정산까지 함께해요.</p>
          </div>
          <Link href="/seller/apply" className={`${btnWhite} relative shrink-0`}>입점 신청하기</Link>
        </div>
      </div>
    </section>
  );
}

// 19. 공지 + 고객센터
export async function ANotice() {
  const notices = await getNotices();
  return (
    <section aria-label="공지사항과 고객센터" className="bg-white">
      <div className={`${CONTAINER} grid gap-4 py-14 md:grid-cols-2 md:gap-6 md:py-20`}>
        <div className="rounded-3xl bg-[#fbf8f1] p-6 md:p-8">
          <h2 className="text-xl font-bold text-stone-900">공지사항</h2>
          <ul className="mt-3 divide-y divide-stone-200">
            {notices.slice(0, 3).map((n) => (
              <li key={n.id}><Link href="/help" className="flex min-h-11 items-center justify-between gap-4 hover:text-[#2f5d3a]"><span className="line-clamp-1">{n.title}</span><span className="shrink-0 text-sm text-stone-600">{n.createdAt}</span></Link></li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-[#eef4ec] p-6 md:p-8">
          <h2 className="text-xl font-bold text-stone-900">고객센터</h2>
          <p className="mt-3 text-3xl font-bold text-[#2f5d3a]">1644-3777</p>
          <p className="mt-1 text-stone-600">평일 09:00–18:00 · 주말·공휴일 휴무</p>
          <Link href="/help" className={`${btnGreen} mt-5`}>자주 묻는 질문</Link>
        </div>
      </div>
    </section>
  );
}

// 20. 배송 안내 띠
const INFO = [
  { title: "무료배송", desc: "3만 원 이상 구매 시" },
  { title: "냉장·냉동 출고", desc: "월~목 출고" },
  { title: "도서산간", desc: "추가 배송비가 있어요" },
];
export function AShipping() {
  return (
    <section aria-label="배송 안내" className="border-t border-stone-200 bg-[#fbf8f1]">
      <ul className={`${CONTAINER} grid gap-3 py-5 md:grid-cols-3`}>
        {INFO.map((i) => <li key={i.title}><span className="font-bold text-[#1d5f8a]">{i.title}</span><span className="ml-2 text-stone-700">{i.desc}</span></li>)}
      </ul>
    </section>
  );
}
