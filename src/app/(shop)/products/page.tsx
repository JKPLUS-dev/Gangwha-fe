import { Suspense } from "react";
import { getProducts, type ProductSort } from "@/features/product/api";
import { ProductGrid } from "@/features/product/components/ProductGrid";
import { CATEGORIES, type Category } from "@/features/product/types";

type SearchParams = Promise<{ category?: string; q?: string; sort?: string; free?: string }>;

const isCategory = (v?: string): v is Category => !!v && v in CATEGORIES;
const SORTS: ProductSort[] = ["best", "new", "priceAsc", "priceDesc"];
const isSort = (v?: string): v is ProductSort => SORTS.includes(v as ProductSort);

// searchParams는 요청마다 달라서 Suspense 안에서 읽어요. 바깥 껍데기는 정적으로 미리 렌더링돼요.
export default function ProductsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="mx-auto max-w-6xl p-4">
      <Suspense fallback={<p>상품을 불러오는 중이에요.</p>}>
        <ProductResults searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function ProductResults({ searchParams }: { searchParams: SearchParams }) {
  const { category, q, sort, free } = await searchParams;
  const products = await getProducts({
    category: isCategory(category) ? category : undefined,
    q,
    sort: isSort(sort) ? sort : undefined,
    freeShipping: free === "1",
  });
  const title = isCategory(category) ? CATEGORIES[category] : "전체 상품";

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>
      <ProductGrid products={products} />
    </>
  );
}
