import Image from "next/image";
import Link from "next/link";
import { CONTAINER } from "@/components/ui/Container";

// 피그마 788:1482 하단: 상단 링크 바(70px, 하단 라인) + UPplus 로고 + 회사정보
export function Footer() {
  return (
    <footer className="mt-10 bg-white pb-20 text-[#6b6b6b] md:pb-0">
      <div className="border-y border-[#e5e5e5]">
        <ul className={`${CONTAINER} flex h-[70px] items-center gap-8 text-[15px]`}>
          <li>
            <Link href="/help" className="inline-flex h-11 items-center font-bold text-[#222222]">개인정보처리방침</Link>
          </li>
          <li>
            <Link href="/help" className="inline-flex h-11 items-center text-[#474747]">이용약관</Link>
          </li>
        </ul>
      </div>
      <div className={`${CONTAINER} py-8 md:py-10`}>
        <Image src="/images/upplus-logo.svg" alt="UPplus" width={452} height={150} className="h-9 w-auto md:h-[46px]" />
        <address className="mt-4 max-w-[640px] text-[13px] not-italic leading-[1.7]">
          법인명 : 제이케이플러스자산관리 주식회사 <span aria-hidden="true">|</span> 대표자 : 김수용 <span aria-hidden="true">|</span> 사업자등록번호 : 687-86-03512
          <br />
          사업장소재지 : 서울특별시 송파구 위례서로 252, 504호(거여동, 유원플러스 송파)
          <br />
          통신판매업 신고번호 : 제 2026-서울광진-0835 호 <span aria-hidden="true">|</span> 개인정보관리책임자 : 강형준
        </address>
        <p className="mt-5 text-[13px]">© 2026 제이케이플러스자산관리 주식회사. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
