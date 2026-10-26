import Image from "next/image";
export function Footer() {
  return (
    <footer className="mt-10 border-t border-stone-200 bg-stone-50 pb-20 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-stone-600 md:grid-cols-3">
        <div>
          <Image src="/images/logo-full.png" alt="강화도몰" width={2083} height={755} sizes="140px" className="mb-4 h-12 w-auto" />
          <p className="font-semibold text-stone-900">고객센터</p>
          <p className="mt-2 text-2xl font-bold text-stone-900">1588-0000</p>
          <p className="mt-1">평일 09:00–18:00 (점심 12:00–13:00)</p>
        </div>
        <ul className="space-y-0">
          <li><a href="#" className="inline-flex h-11 items-center">입점 안내</a></li><li><a href="#" className="inline-flex h-11 items-center">이용약관</a></li>
          <li><a href="#" className="inline-flex h-11 items-center font-semibold text-stone-900">개인정보처리방침</a></li>
        </ul>
        <p className="leading-relaxed">
          강화장터는 통신판매중개자이며, 상품 정보와 거래의 책임은 각 판매자에게 있습니다.
          <br />(예시 문구 · 사업자 정보는 확정 후 기입)
        </p>
      </div>
    </footer>
  );
}
