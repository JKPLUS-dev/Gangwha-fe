import Link from "next/link";
import { Suspense } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import { getProducts } from "@/features/product/api";
import { ProductGrid } from "@/features/product/components/ProductGrid";

export const metadata = { title: "검색 | 강화장터" };

const POPULAR = ["강화섬쌀", "순무김치", "새우젓", "6년근 인삼", "홍삼", "화문석", "밴댕이", "속노랑고구마"];

function SearchForm({ q = "" }: { q?: string }) {
  return (
    <form role="search" action="/search" className="flex">
      <label htmlFor="search-q" className="sr-only">검색어</label>
      <input id="search-q" name="q" defaultValue={q} placeholder="찾는 강화 특산품을 입력하세요" className="h-14 w-full rounded-l-xl border-2 border-r-0 border-brand px-5 text-lg outline-none" />
      <button className="h-14 shrink-0 rounded-r-xl bg-brand px-6 text-lg font-bold text-white">검색</button>
    </form>
  );
}

function Keywords() {
  return (
    <div className="mt-6">
      <h2 className="text-base font-bold text-stone-900">많이 찾는 검색어</h2>
      <ol className="mt-3 flex flex-wrap gap-2">
        {POPULAR.map((k, i) => (
          <li key={k}>
            <Link href={`/search?q=${encodeURIComponent(k)}`} className="inline-flex h-11 items-center gap-2 rounded-full border border-stone-300 px-4 text-base hover:border-brand hover:text-brand">
              <span className="font-bold text-brand">{i + 1}</span>{k}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

async function Results({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  const term = q.trim();
  const products = term ? await getProducts({ q: term }) : [];
  return (
    <>
      <SearchForm q={term} />
      {!term && <Keywords />}
      {term && (
        <section className="mt-10">
          <h1 className="mb-6 text-2xl font-bold"><span className="text-brand">“{term}”</span> 검색 결과 {products.length}개</h1>
          {products.length ? (
            <ProductGrid products={products} />
          ) : (
            <>
              <EmptyState icon="🔍" title="딱 맞는 상품이 없어요" desc="철자를 확인하거나 더 짧은 단어로 찾아보세요." href="/products" cta="전체 상품 보기" />
              <Keywords />
            </>
          )}
        </section>
      )}
      {!term && <h1 className="sr-only">검색</h1>}
    </>
  );
}

export default function Page(props: { searchParams: Promise<{ q?: string }> }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Suspense fallback={<SearchForm />}>
        <Results {...props} />
      </Suspense>
    </main>
  );
}
