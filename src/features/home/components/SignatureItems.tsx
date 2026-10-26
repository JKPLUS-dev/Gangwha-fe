import Image from "next/image";
import Link from "next/link";

const ITEMS = [
  { label: "강화섬쌀", q: "쌀", image: "/images/rice.webp" },
  { label: "6년근 인삼", q: "삼", image: "/images/ginseng.webp" },
  { label: "순무", q: "순무", image: "/images/radish.webp" },
  { label: "새우젓", q: "젓", image: "/images/shrimp.webp" },
  { label: "밴댕이", q: "밴댕이", image: "/images/fish.webp" },
  { label: "홍삼", q: "홍삼", image: "/images/redginseng.webp" },
];

export function SignatureItems() {
  return (
    <section aria-labelledby="sig-title" className="mx-auto w-full max-w-7xl px-4 pt-12">
      <h2 id="sig-title" className="mb-5 text-xl font-bold text-stone-900 md:text-2xl">강화 대표 특산품</h2>
      <ul className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-6 md:overflow-visible">
        {ITEMS.map((item) => (
          <li key={item.label} className="shrink-0">
            <Link href={`/products?q=${encodeURIComponent(item.q)}`} className="group flex flex-col items-center gap-2">
              <span className="relative size-20 overflow-hidden rounded-full ring-1 ring-stone-200 md:size-28">
                <Image src={item.image} alt="" fill sizes="112px" className="object-cover transition group-hover:scale-110" />
              </span>
              <span className="text-base font-medium text-stone-800">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
