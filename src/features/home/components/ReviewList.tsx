import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { PRODUCTS, REVIEWS } from "@/features/product/data/products";

export function ReviewList() {
  const names = new Map(PRODUCTS.map((p) => [p.id, p.name]));
  const picked = new Set<string>();
  // 서로 다른 상품·문장의 후기만 골라 같은 말이 반복되지 않게 해요.
  const reviews = REVIEWS.filter((r) => {
    const key = names.get(r.productId)?.split(" ")[1] ?? r.productId;
    if (r.rating !== 5 || picked.has(key) || picked.has(r.body)) return false;
    picked.add(key).add(r.body);
    return true;
  }).slice(0, 3);
  if (!reviews.length) return null;
  return (
    <Section eyebrow="먼저 받아본 분들" title="구매 후기" tone="stone">
      <ul className="grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <li key={r.id} className="rounded-2xl bg-white p-6">
            <p className="text-amber-500" aria-label={`별점 ${r.rating}점`}>{"★".repeat(r.rating)}</p>
            <p className="mt-3 text-base leading-relaxed text-stone-800">{r.body}</p>
            <Link href={`/products/${r.productId}`} className="mt-4 inline-flex min-h-11 items-center text-sm text-stone-500 hover:text-stone-800">
              {r.author} · {names.get(r.productId)}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
