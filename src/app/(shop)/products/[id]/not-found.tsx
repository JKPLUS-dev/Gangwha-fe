import { EmptyState } from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <EmptyState icon="🔍" title="상품을 찾을 수 없어요" desc="판매가 끝났거나 주소가 바뀌었을 수 있어요." href="/products" cta="다른 상품 보기" />
    </main>
  );
}
