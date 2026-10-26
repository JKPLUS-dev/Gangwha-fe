import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct, getReviews, getSeller } from "@/features/product/api";
import { DetailImage } from "@/features/product/components/DetailImage";
import { BuyBox } from "@/features/product/components/BuyBox";
import { ProductImage } from "@/features/product/components/ProductImage";
import { PRODUCTS } from "@/features/product/data/products";
import { formatPrice, STORAGE_LABEL } from "@/features/product/format";

type Props = { params: Promise<{ id: string }> };

export const generateStaticParams = () => PRODUCTS.map((p) => ({ id: p.id }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).id);
  return { title: product ? `${product.name} | 강화장터` : "상품 없음" };
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProduct((await params).id);
  if (!product) notFound();
  const [seller, reviews] = await Promise.all([getSeller(product.sellerId), getReviews(product.id)]);
  const price = product.salePrice ?? product.price;
  const rate = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 md:py-10">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="group relative aspect-square overflow-hidden rounded-2xl bg-stone-100">
          <ProductImage product={product} sizes="(min-width: 768px) 50vw, 100vw" priority />
        </div>
        <div>
          {seller && (
            <Link href={`/sellers/${seller.id}`} className="inline-flex h-11 items-center text-base font-semibold text-brand hover:underline">
              {seller.area} · {seller.name} 상점 →
            </Link>
          )}
          <h1 className="text-2xl font-bold leading-snug text-stone-900 md:text-3xl">{product.name}</h1>
          <p className="mt-2 text-base text-stone-600"><span className="text-amber-500">★</span> {product.rating.toFixed(1)} · 후기 {product.reviewCount}개</p>
          <p className="mt-4 flex items-baseline gap-2">
            {rate > 0 && <span className="text-2xl font-bold text-red-600">{rate}%</span>}
            <span className="text-3xl font-bold text-stone-900">{formatPrice(price)}</span>
            {rate > 0 && <s className="text-base text-stone-500">{formatPrice(product.price)}</s>}
          </p>
          {/* 테스트노예 기준: 원산지, 배송 방식, 출고일, 품절 여부는 첫 화면 필수 */}
          <dl data-testid="product-essentials" className="my-6 grid grid-cols-[6rem_1fr] gap-y-3 border-y border-stone-200 py-5 text-base">
            <dt className="text-stone-600">원산지</dt><dd className="font-medium">{product.origin}</dd>
            <dt className="text-stone-600">배송</dt><dd className="font-medium">{STORAGE_LABEL[product.storage]} 배송 · {product.freeShipping ? "무료배송" : "배송비 3,000원 (예시)"}</dd>
            <dt className="text-stone-600">출고일</dt><dd className="font-medium">주문 후 {product.shipDays}일 이내 산지 출고</dd>
            <dt className="text-stone-600">재고</dt><dd className={`font-medium ${product.soldOut ? "text-red-600" : ""}`}>{product.soldOut ? "품절" : "구매 가능"}</dd>
          </dl>
          <BuyBox productId={product.id} price={price} soldOut={product.soldOut} />
        </div>
      </div>

      <nav aria-label="상품 정보 메뉴" className="sticky top-[7.5rem] z-30 mt-12 border-b border-stone-200 bg-white md:top-[9.5rem]">
        <ul className="grid grid-cols-3 text-center text-base font-semibold">
          <li><a href="#detail" className="flex h-12 items-center justify-center border-b-2 border-brand text-brand">상세정보</a></li>
          <li><a href="#seller" className="flex h-12 items-center justify-center text-stone-600 hover:text-stone-900">판매자</a></li>
          <li><a href="#reviews" className="flex h-12 items-center justify-center text-stone-600 hover:text-stone-900">후기 {reviews.length}</a></li>
        </ul>
      </nav>

            <section id="detail" className="scroll-mt-48 pt-8">
        <h2 className="sr-only">상세정보</h2>
        {product.detailImage ? (
          <DetailImage {...product.detailImage} alt={`${product.name} 상세 설명`} />
        ) : (
          <p className="rounded-xl bg-stone-50 py-16 text-center text-base text-stone-600">상세 설명을 준비하고 있어요.</p>
        )}
      </section>

      {seller && (
        <section id="seller" className="mt-12 scroll-mt-48 rounded-2xl bg-brand-soft p-6 md:p-8">
          <p className="text-sm font-semibold text-brand">이 상품을 키운 사람</p>
          <h2 className="mt-1 text-xl font-bold">{seller.name} <span className="text-base font-normal text-stone-600">· {seller.area}</span></h2>
          <p className="mt-2 text-base text-stone-700">{seller.story}</p>
        </section>
      )}

      <section id="reviews" className="mt-12 scroll-mt-48">
        <h2 className="mb-4 text-xl font-bold">구매 후기 {reviews.length}개</h2>
        <ul className="divide-y divide-stone-200 border-y border-stone-200">
          {reviews.map((r) => (
            <li key={r.id} className="py-4">
              <p className="text-amber-500" aria-label={`별점 ${r.rating}점`}>{"★".repeat(r.rating)}</p>
              <p className="mt-1 text-base text-stone-800">{r.body}</p>
              <p className="mt-1 text-sm text-stone-500">{r.author} · {r.createdAt}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
