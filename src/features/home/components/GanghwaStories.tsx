import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";

// 매거진 카드. 글 본문 페이지가 생기면 href만 바꾸면 돼요. (예시 문구)
const STORIES = [
  { title: "세계 5대 갯벌, 강화 갯벌 이야기", desc: "갯벌이 키운 새우와 밴댕이가 왜 더 고소한지 알려드려요.", image: "/images/scenery2.webp", tag: "갯벌" },
  { title: "고려 때부터 이어온 강화 인삼", desc: "6년을 기다리는 인삼밭과 그 밭을 지키는 사람들.", image: "/images/ginseng.webp", tag: "인삼" },
  { title: "석 달을 엮는 왕골 화문석", desc: "양사면 공방에서 손으로 짜는 꽃무늬 돗자리.", image: "/images/hero.webp", tag: "공예" },
];

export function GanghwaStories() {
  return (
    <Section eyebrow="읽을거리" title="강화 이야기">
      <ul className="grid gap-6 md:grid-cols-3">
        {STORIES.map((s) => (
          <li key={s.title}>
            <Link href="#" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-100">
                <Image src={s.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-300 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-md bg-white/95 px-2 py-0.5 text-xs font-semibold text-brand">{s.tag}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-stone-900 group-hover:underline">{s.title}</h3>
              <p className="mt-1 text-base text-stone-600">{s.desc}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
